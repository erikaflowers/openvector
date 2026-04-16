import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../contexts/UserContext';
import { useWorkflows } from '../../contexts/WorkflowContext';
import PurchaseButton from '../../components/learn/PurchaseButton';
import WorkflowProgress from '../../components/learn/WorkflowProgress';
import useSEO from '../../hooks/useSEO';

function WorkflowDetailPage() {
  const { workflowSlug } = useParams();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useUser();
  const { hasPurchasedBySlug, refreshPurchases } = useWorkflows();

  const [workflow, setWorkflow] = useState(null);
  const [pages, setPages] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const purchased = hasPurchasedBySlug(workflowSlug);

  useSEO({
    title: workflow ? `${workflow.title} — Workflows` : 'Workflow — The Open Vector',
    description: workflow?.description || 'A structured video workflow on The Open Vector.',
    path: `/learn/workflows/${workflowSlug}`,
  });

  // Check for purchase=success in URL — poll until webhook confirms the purchase
  useEffect(() => {
    if (searchParams.get('purchase') !== 'success') return;

    setShowSuccess(true);
    let attempts = 0;
    const maxAttempts = 12; // Poll for ~30 seconds (12 x 2.5s)

    const poll = setInterval(async () => {
      attempts++;
      await refreshPurchases();

      // Check if purchase is now confirmed (context will re-render with updated state)
      if (hasPurchasedBySlug(workflowSlug) || attempts >= maxAttempts) {
        clearInterval(poll);
      }
    }, 2500);

    const hideSuccess = setTimeout(() => setShowSuccess(false), 10000);

    return () => {
      clearInterval(poll);
      clearTimeout(hideSuccess);
    };
  }, [searchParams, refreshPurchases, hasPurchasedBySlug, workflowSlug]);

  // Fetch workflow data
  useEffect(() => {
    async function fetchWorkflow() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: wf, error: wfError } = await supabase
        .from('workflows')
        .select('*')
        .eq('slug', workflowSlug)
        .eq('status', 'published')
        .single();

      if (wfError || !wf) {
        setLoading(false);
        return;
      }

      setWorkflow(wf);

      // Fetch page titles (RLS handles access — page 1 always visible, rest if purchased)
      const { data: pageData } = await supabase
        .from('workflow_pages')
        .select('id, slug, title, page_number, video_duration')
        .eq('workflow_id', wf.id)
        .order('page_number', { ascending: true });

      setPages(pageData || []);
      setLoading(false);
    }

    fetchWorkflow();
  }, [workflowSlug]);

  // Fetch progress if purchased
  useEffect(() => {
    if (!purchased || !workflow?.id || !isLoggedIn || !supabase) return;

    async function fetchProgress() {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const { data } = await supabase
        .from('workflow_progress')
        .select('page_id')
        .eq('user_id', user.user.id)
        .eq('workflow_id', workflow.id);

      setProgress((data || []).map((p) => p.page_id));
    }

    fetchProgress();
  }, [purchased, workflow?.id, isLoggedIn]);

  if (loading) {
    return (
      <div className="ovl-wf-detail">
        <p className="ovl-wf-detail-loading">Loading workflow...</p>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="ovl-wf-detail">
        <h2>Workflow Not Found</h2>
        <p>This workflow does not exist or is not published yet.</p>
        <Link to="/learn/workflows" className="ovl-btn ovl-btn-outline">
          Back to Workflows
        </Link>
      </div>
    );
  }

  const priceFormatted = workflow.price_cents
    ? `$${(workflow.price_cents / 100).toFixed(2)}`
    : 'Free';

  return (
    <div className="ovl-wf-detail">
      {showSuccess && (
        <div className="ovl-wf-detail-success">
          <span className="ovl-wf-detail-success-icon">&#10003;</span>
          Purchase successful! You now have full access to this workflow.
        </div>
      )}

      <header className="ovl-wf-detail-header">
        <Link to="/learn/workflows" className="ovl-wf-detail-back">
          &larr; All Workflows
        </Link>
        <h1 className="ovl-wf-detail-title">{workflow.title}</h1>
        {workflow.subtitle && (
          <p className="ovl-wf-detail-subtitle">{workflow.subtitle}</p>
        )}
      </header>

      {workflow.cover_image_url && (
        <div className="ovl-wf-detail-cover">
          <img src={workflow.cover_image_url} alt="" />
        </div>
      )}

      {workflow.description && (
        <div className="ovl-wf-detail-desc">
          <p>{workflow.description}</p>
        </div>
      )}

      {purchased && (
        <WorkflowProgress
          completedCount={progress.length}
          totalPages={pages.length}
        />
      )}

      <section className="ovl-wf-detail-pages">
        <h2 className="ovl-wf-detail-section-title">
          {pages.length} {pages.length === 1 ? 'Page' : 'Pages'}
        </h2>
        <ol className="ovl-wf-detail-page-list">
          {pages.map((page) => {
            const isPreview = page.page_number === 1;
            const isCompleted = progress.includes(page.id);
            const canAccess = purchased || isPreview;
            const duration = page.video_duration
              ? `${Math.ceil(page.video_duration / 60)} min`
              : null;

            return (
              <li
                key={page.id}
                className={`ovl-wf-detail-page-item ${isCompleted ? 'ovl-wf-detail-page-item--done' : ''} ${!canAccess ? 'ovl-wf-detail-page-item--locked' : ''}`}
              >
                {canAccess ? (
                  <Link to={`/learn/workflows/${workflowSlug}/${page.slug}`}>
                    <span className="ovl-wf-detail-page-num">{page.page_number}</span>
                    <span className="ovl-wf-detail-page-title">{page.title}</span>
                    {isPreview && !purchased && (
                      <span className="ovl-wf-detail-page-badge">Free Preview</span>
                    )}
                    {isCompleted && (
                      <span className="ovl-wf-detail-page-check">&#10003;</span>
                    )}
                    {duration && (
                      <span className="ovl-wf-detail-page-duration">{duration}</span>
                    )}
                  </Link>
                ) : (
                  <div className="ovl-wf-detail-page-locked">
                    <span className="ovl-wf-detail-page-num">{page.page_number}</span>
                    <span className="ovl-wf-detail-page-title">{page.title}</span>
                    <span className="ovl-wf-detail-page-lock">&#128274;</span>
                    {duration && (
                      <span className="ovl-wf-detail-page-duration">{duration}</span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {!purchased && (
        <section className="ovl-wf-detail-cta">
          <div className="ovl-wf-detail-cta-card">
            <div className="ovl-wf-detail-cta-info">
              <span className="ovl-wf-detail-cta-price">{priceFormatted}</span>
              <span className="ovl-wf-detail-cta-label">One-time purchase. Lifetime access.</span>
            </div>
            <PurchaseButton workflow={workflow} />
          </div>
        </section>
      )}
    </div>
  );
}

export default WorkflowDetailPage;
