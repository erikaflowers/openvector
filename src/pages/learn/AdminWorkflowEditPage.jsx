import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminGuard from '../../components/learn/AdminGuard';
import useSEO from '../../hooks/useSEO';

function AdminWorkflowEditContent() {
  const { workflowSlug } = useParams();
  const navigate = useNavigate();

  const [workflow, setWorkflow] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Editing state
  const [editingPage, setEditingPage] = useState(null);
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '', contentMd: '', videoId: '', videoDuration: '' });

  const getToken = useCallback(async () => {
    const session = await supabase?.auth.getSession();
    return session?.data?.session?.access_token;
  }, []);

  const adminCall = useCallback(async (body) => {
    const token = await getToken();
    const res = await fetch('/.netlify/functions/admin-workflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }, [getToken]);

  const fetchWorkflow = useCallback(async () => {
    try {
      const data = await adminCall({ action: 'getWorkflow', slug: workflowSlug });
      setWorkflow(data.workflow);
      setPages(data.pages || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [workflowSlug, adminCall]);

  useEffect(() => {
    fetchWorkflow();
  }, [fetchWorkflow]);

  function showSuccess(msg) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  // --- Workflow metadata ---
  async function handleUpdateWorkflow(updates) {
    setSaving(true);
    setError(null);
    try {
      const data = await adminCall({
        action: 'updateWorkflow',
        workflowId: workflow.id,
        ...updates,
      });
      setWorkflow(data.workflow);
      showSuccess('Workflow updated');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteWorkflow() {
    if (!window.confirm('Delete this workflow and all its pages? This cannot be undone.')) return;

    try {
      await adminCall({ action: 'deleteWorkflow', workflowId: workflow.id });
      navigate('/learn/admin/workflows');
    } catch (err) {
      setError(err.message);
    }
  }

  // --- Page CRUD ---
  async function handleAddPage(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminCall({
        action: 'createPage',
        workflowId: workflow.id,
        title: newPage.title,
        slug: newPage.slug || newPage.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        contentMd: newPage.contentMd,
        videoId: newPage.videoId || null,
        videoDuration: newPage.videoDuration ? parseInt(newPage.videoDuration) : null,
      });
      setNewPage({ title: '', slug: '', contentMd: '', videoId: '', videoDuration: '' });
      setShowAddPage(false);
      fetchWorkflow();
      showSuccess('Page added');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdatePage() {
    if (!editingPage) return;
    setSaving(true);
    setError(null);
    try {
      await adminCall({
        action: 'updatePage',
        pageId: editingPage.id,
        title: editingPage.title,
        slug: editingPage.slug,
        contentMd: editingPage.content_md,
        videoId: editingPage.video_id || null,
        videoDuration: editingPage.video_duration ? parseInt(editingPage.video_duration) : null,
      });
      setEditingPage(null);
      fetchWorkflow();
      showSuccess('Page updated');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePage(pageId) {
    if (!window.confirm('Delete this page?')) return;
    try {
      await adminCall({ action: 'deletePage', pageId });
      fetchWorkflow();
      showSuccess('Page deleted');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleMovePage(pageId, direction) {
    const idx = pages.findIndex((p) => p.id === pageId);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= pages.length) return;

    const reordered = [...pages];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];

    try {
      await adminCall({
        action: 'reorderPages',
        workflowId: workflow.id,
        pageIds: reordered.map((p) => p.id),
      });
      fetchWorkflow();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!workflow) return <p>Workflow not found.</p>;

  return (
    <div className="ovl-admin">
      <header className="ovl-admin-header">
        <div>
          <a href="/learn/admin/workflows" className="ovl-admin-back">&larr; All Workflows</a>
          <h1 className="ovl-admin-title">{workflow.title}</h1>
          <span className="ovl-admin-slug">/{workflow.slug}</span>
        </div>
      </header>

      {error && <p className="ovl-admin-error">{error}</p>}
      {successMsg && <p className="ovl-admin-success">{successMsg}</p>}

      {/* Workflow Metadata */}
      <section className="ovl-admin-section">
        <h2 className="ovl-admin-section-title">Workflow Settings</h2>
        <div className="ovl-admin-form">
          <div className="ovl-admin-field">
            <label>Title</label>
            <input
              type="text"
              defaultValue={workflow.title}
              onBlur={(e) => {
                if (e.target.value !== workflow.title) handleUpdateWorkflow({ title: e.target.value });
              }}
            />
          </div>
          <div className="ovl-admin-field">
            <label>Subtitle</label>
            <input
              type="text"
              defaultValue={workflow.subtitle || ''}
              onBlur={(e) => {
                if (e.target.value !== (workflow.subtitle || '')) handleUpdateWorkflow({ subtitle: e.target.value });
              }}
            />
          </div>
          <div className="ovl-admin-field">
            <label>Description</label>
            <textarea
              defaultValue={workflow.description || ''}
              rows={3}
              onBlur={(e) => {
                if (e.target.value !== (workflow.description || '')) handleUpdateWorkflow({ description: e.target.value });
              }}
            />
          </div>
          <div className="ovl-admin-row">
            <div className="ovl-admin-field">
              <label>Price (USD)</label>
              <input
                type="number"
                defaultValue={(workflow.price_cents / 100).toFixed(2)}
                min="0"
                step="0.01"
                onBlur={(e) => {
                  const cents = Math.round(parseFloat(e.target.value) * 100);
                  if (cents !== workflow.price_cents) handleUpdateWorkflow({ priceCents: cents });
                }}
              />
            </div>
            <div className="ovl-admin-field">
              <label>Status</label>
              <select
                defaultValue={workflow.status}
                onChange={(e) => handleUpdateWorkflow({ status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="ovl-admin-field">
            <label>Cover Image URL</label>
            <input
              type="url"
              defaultValue={workflow.cover_image_url || ''}
              onBlur={(e) => handleUpdateWorkflow({ coverImageUrl: e.target.value || null })}
              placeholder="https://..."
            />
          </div>
          <div className="ovl-admin-meta-row">
            <span className="ovl-admin-meta-item">Stripe Product: {workflow.stripe_product_id || 'none'}</span>
            <span className="ovl-admin-meta-item">Stripe Price: {workflow.stripe_price_id || 'none'}</span>
          </div>
        </div>
      </section>

      {/* Pages */}
      <section className="ovl-admin-section">
        <div className="ovl-admin-section-header">
          <h2 className="ovl-admin-section-title">Pages ({pages.length})</h2>
          <button
            className="ovl-btn ovl-btn-primary ovl-btn--sm"
            onClick={() => setShowAddPage(!showAddPage)}
          >
            {showAddPage ? 'Cancel' : '+ Add Page'}
          </button>
        </div>

        {showAddPage && (
          <form className="ovl-admin-form ovl-admin-form--inset" onSubmit={handleAddPage}>
            <div className="ovl-admin-field">
              <label>Page Title *</label>
              <input
                type="text"
                value={newPage.title}
                onChange={(e) => setNewPage((p) => ({ ...p, title: e.target.value }))}
                required
              />
            </div>
            <div className="ovl-admin-field">
              <label>Slug</label>
              <input
                type="text"
                value={newPage.slug}
                onChange={(e) => setNewPage((p) => ({ ...p, slug: e.target.value }))}
                placeholder="Auto-generated from title"
              />
            </div>
            <div className="ovl-admin-field">
              <label>Mux Playback ID</label>
              <input
                type="text"
                value={newPage.videoId}
                onChange={(e) => setNewPage((p) => ({ ...p, videoId: e.target.value }))}
                placeholder="e.g. DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
              />
            </div>
            <div className="ovl-admin-field">
              <label>Video Duration (seconds)</label>
              <input
                type="number"
                value={newPage.videoDuration}
                onChange={(e) => setNewPage((p) => ({ ...p, videoDuration: e.target.value }))}
                placeholder="e.g. 360"
              />
            </div>
            <div className="ovl-admin-field">
              <label>Content (Markdown)</label>
              <textarea
                value={newPage.contentMd}
                onChange={(e) => setNewPage((p) => ({ ...p, contentMd: e.target.value }))}
                rows={10}
                placeholder="Write your lesson content in Markdown..."
                className="ovl-admin-textarea--code"
              />
            </div>
            <button type="submit" className="ovl-btn ovl-btn-primary" disabled={saving}>
              {saving ? 'Adding...' : 'Add Page'}
            </button>
          </form>
        )}

        <div className="ovl-admin-page-list">
          {pages.map((page, idx) => (
            <div key={page.id} className="ovl-admin-page-item">
              {editingPage?.id === page.id ? (
                <div className="ovl-admin-form ovl-admin-form--inset">
                  <div className="ovl-admin-field">
                    <label>Title</label>
                    <input
                      type="text"
                      value={editingPage.title}
                      onChange={(e) => setEditingPage((p) => ({ ...p, title: e.target.value }))}
                    />
                  </div>
                  <div className="ovl-admin-field">
                    <label>Slug</label>
                    <input
                      type="text"
                      value={editingPage.slug}
                      onChange={(e) => setEditingPage((p) => ({ ...p, slug: e.target.value }))}
                    />
                  </div>
                  <div className="ovl-admin-field">
                    <label>Mux Playback ID</label>
                    <input
                      type="text"
                      value={editingPage.video_id || ''}
                      onChange={(e) => setEditingPage((p) => ({ ...p, video_id: e.target.value }))}
                    />
                  </div>
                  <div className="ovl-admin-field">
                    <label>Video Duration (seconds)</label>
                    <input
                      type="number"
                      value={editingPage.video_duration || ''}
                      onChange={(e) => setEditingPage((p) => ({ ...p, video_duration: e.target.value }))}
                    />
                  </div>
                  <div className="ovl-admin-field">
                    <label>Content (Markdown)</label>
                    <textarea
                      value={editingPage.content_md}
                      onChange={(e) => setEditingPage((p) => ({ ...p, content_md: e.target.value }))}
                      rows={12}
                      className="ovl-admin-textarea--code"
                    />
                  </div>
                  <div className="ovl-admin-btn-row">
                    <button className="ovl-btn ovl-btn-primary ovl-btn--sm" onClick={handleUpdatePage} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button className="ovl-btn ovl-btn-outline ovl-btn--sm" onClick={() => setEditingPage(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ovl-admin-page-row">
                  <span className="ovl-admin-page-num">{page.page_number}</span>
                  <div className="ovl-admin-page-info">
                    <span className="ovl-admin-page-title">{page.title}</span>
                    <span className="ovl-admin-page-meta">
                      /{page.slug}
                      {page.video_id && ' \u00b7 video'}
                      {page.page_number === 1 && ' \u00b7 free preview'}
                    </span>
                  </div>
                  <div className="ovl-admin-page-actions">
                    <button
                      className="ovl-admin-action"
                      onClick={() => handleMovePage(page.id, 'up')}
                      disabled={idx === 0}
                      title="Move up"
                    >&uarr;</button>
                    <button
                      className="ovl-admin-action"
                      onClick={() => handleMovePage(page.id, 'down')}
                      disabled={idx === pages.length - 1}
                      title="Move down"
                    >&darr;</button>
                    <button
                      className="ovl-admin-action"
                      onClick={() => setEditingPage({ ...page })}
                      title="Edit"
                    >Edit</button>
                    <button
                      className="ovl-admin-action ovl-admin-action--danger"
                      onClick={() => handleDeletePage(page.id)}
                      title="Delete"
                    >Del</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section className="ovl-admin-section ovl-admin-section--danger">
        <h2 className="ovl-admin-section-title">Danger Zone</h2>
        <p>Deleting a workflow removes all pages and cannot be undone. Workflows with active purchases cannot be deleted (archive them instead).</p>
        <button
          className="ovl-btn ovl-btn--danger"
          onClick={handleDeleteWorkflow}
        >
          Delete Workflow
        </button>
      </section>
    </div>
  );
}

function AdminWorkflowEditPage() {
  const { workflowSlug } = useParams();

  useSEO({
    title: `Edit: ${workflowSlug} — Admin`,
    description: 'Edit workflow content and settings.',
    path: `/learn/admin/workflows/${workflowSlug}`,
  });

  return (
    <AdminGuard>
      <AdminWorkflowEditContent />
    </AdminGuard>
  );
}

export default AdminWorkflowEditPage;
