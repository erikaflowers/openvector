import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminGuard from '../../components/learn/AdminGuard';
import useSEO from '../../hooks/useSEO';

function AdminWorkflowsContent() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  // Form state for new workflow
  const [form, setForm] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    priceCents: 2999,
  });

  const fetchWorkflows = useCallback(async () => {
    try {
      const session = await supabase?.auth.getSession();
      const token = session?.data?.session?.access_token;
      if (!token) return;

      const res = await fetch('/.netlify/functions/admin-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'listWorkflows' }),
      });

      const data = await res.json();
      if (res.ok) {
        setWorkflows(data.workflows || []);
      }
    } catch (err) {
      console.error('Failed to fetch workflows:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const session = await supabase?.auth.getSession();
      const token = session?.data?.session?.access_token;

      const res = await fetch('/.netlify/functions/admin-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'createWorkflow',
          ...form,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setForm({ title: '', slug: '', subtitle: '', description: '', priceCents: 2999 });
      setShowCreate(false);
      fetchWorkflows();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  // Auto-generate slug from title
  function handleTitleChange(value) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug || value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  }

  const statusColors = {
    draft: 'var(--color-orange)',
    published: 'var(--ovl-success)',
    archived: 'var(--ovl-text-tertiary)',
  };

  return (
    <div className="ovl-admin">
      <header className="ovl-admin-header">
        <h1 className="ovl-admin-title">Manage Workflows</h1>
        <button
          className="ovl-btn ovl-btn-primary"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? 'Cancel' : '+ New Workflow'}
        </button>
      </header>

      {showCreate && (
        <form className="ovl-admin-form" onSubmit={handleCreate}>
          <div className="ovl-admin-field">
            <label>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="e.g. Your First Project"
            />
          </div>
          <div className="ovl-admin-field">
            <label>Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              required
              placeholder="e.g. your-first-project"
              pattern="[a-z0-9-]+"
            />
          </div>
          <div className="ovl-admin-field">
            <label>Subtitle</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
              placeholder="Short tagline"
            />
          </div>
          <div className="ovl-admin-field">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              placeholder="Marketing copy visible to all users"
            />
          </div>
          <div className="ovl-admin-field">
            <label>Price (USD) *</label>
            <input
              type="number"
              value={(form.priceCents / 100).toFixed(2)}
              onChange={(e) => setForm((p) => ({ ...p, priceCents: Math.round(parseFloat(e.target.value) * 100) }))}
              min="0"
              step="0.01"
              required
            />
          </div>
          {error && <p className="ovl-admin-error">{error}</p>}
          <button type="submit" className="ovl-btn ovl-btn-primary" disabled={creating}>
            {creating ? 'Creating...' : 'Create Workflow (+ Stripe Product)'}
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading workflows...</p>
      ) : workflows.length === 0 ? (
        <p className="ovl-admin-empty">
          No workflows yet. Click "New Workflow" to create your first one.
        </p>
      ) : (
        <div className="ovl-admin-list">
          {workflows.map((wf) => (
            <Link
              key={wf.id}
              to={`/learn/admin/workflows/${wf.slug}`}
              className="ovl-admin-list-item"
            >
              <div className="ovl-admin-list-info">
                <span className="ovl-admin-list-title">{wf.title}</span>
                <span className="ovl-admin-list-meta">
                  {wf.slug} &middot; ${(wf.price_cents / 100).toFixed(2)} &middot;{' '}
                  {wf.workflow_pages?.[0]?.count || 0} pages
                </span>
              </div>
              <span
                className="ovl-admin-list-status"
                style={{ color: statusColors[wf.status] }}
              >
                {wf.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminWorkflowsPage() {
  useSEO({
    title: 'Admin: Workflows — The Open Vector',
    description: 'Manage paid workflows.',
    path: '/learn/admin/workflows',
  });

  return (
    <AdminGuard>
      <AdminWorkflowsContent />
    </AdminGuard>
  );
}

export default AdminWorkflowsPage;
