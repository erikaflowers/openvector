import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../lib/supabase';
import MarkdownRenderer from '../../components/learn/MarkdownRenderer';
import WorkflowVideoPlayer from '../../components/learn/WorkflowVideoPlayer';
import WorkflowPageNav from '../../components/learn/WorkflowPageNav';
import useSEO from '../../hooks/useSEO';

function WorkflowPageView() {
  const { workflowSlug, pageSlug } = useParams();
  const { isLoggedIn, signIn } = useUser();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);

  useSEO({
    title: content?.page?.title
      ? `${content.page.title} — ${content.workflow?.title}`
      : 'Workflow — The Open Vector',
    description: `Page ${content?.page?.pageNumber || ''} of ${content?.workflow?.title || 'a workflow'} on The Open Vector.`,
    path: `/learn/workflows/${workflowSlug}/${pageSlug}`,
  });

  // Fetch content from the protected Netlify Function
  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);

      try {
        const headers = { 'Content-Type': 'application/json' };

        // Attach auth token if logged in
        if (isLoggedIn && supabase) {
          const session = await supabase.auth.getSession();
          const token = session?.data?.session?.access_token;
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        }

        const res = await fetch('/.netlify/functions/workflow-content', {
          method: 'POST',
          headers,
          body: JSON.stringify({ workflowSlug, pageSlug }),
        });

        if (res.status === 401) {
          setError('auth');
          setLoading(false);
          return;
        }

        if (res.status === 403) {
          setError('purchase');
          setLoading(false);
          return;
        }

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to load content');
        }

        const data = await res.json();
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [workflowSlug, pageSlug, isLoggedIn]);

  // Check if this page is already completed
  useEffect(() => {
    if (!content?.page?.id || !isLoggedIn || !supabase) return;

    async function checkProgress() {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const { data } = await supabase
        .from('workflow_progress')
        .select('completed_at')
        .eq('user_id', user.user.id)
        .eq('page_id', content.page.id)
        .single();

      setCompleted(!!data);
    }

    checkProgress();
  }, [content?.page?.id, isLoggedIn]);

  const markComplete = useCallback(async () => {
    if (!content?.page?.id || !supabase) return;

    const { data: user } = await supabase.auth.getUser();
    if (!user?.user?.id) return;

    // Get workflow_id from looking up the page
    const { data: pageRow } = await supabase
      .from('workflow_pages')
      .select('workflow_id')
      .eq('id', content.page.id)
      .single();

    if (!pageRow) return;

    const { error } = await supabase
      .from('workflow_progress')
      .upsert({
        user_id: user.user.id,
        workflow_id: pageRow.workflow_id,
        page_id: content.page.id,
      }, { onConflict: 'user_id,page_id' });

    if (!error) setCompleted(true);
  }, [content?.page?.id]);

  const markIncomplete = useCallback(async () => {
    if (!content?.page?.id || !supabase) return;

    const { data: user } = await supabase.auth.getUser();
    if (!user?.user?.id) return;

    const { error } = await supabase
      .from('workflow_progress')
      .delete()
      .eq('user_id', user.user.id)
      .eq('page_id', content.page.id);

    if (!error) setCompleted(false);
  }, [content?.page?.id]);

  // Error states
  if (error === 'auth') {
    return (
      <div className="ovl-wf-page-gate">
        <h2>Sign In Required</h2>
        <p>Sign in to access this workflow page.</p>
        <button className="ovl-btn ovl-btn-primary" onClick={signIn}>
          Sign In with Google
        </button>
      </div>
    );
  }

  if (error === 'purchase') {
    return (
      <div className="ovl-wf-page-gate">
        <h2>Purchase Required</h2>
        <p>You need to purchase this workflow to access this page.</p>
        <Link
          to={`/learn/workflows/${workflowSlug}`}
          className="ovl-btn ovl-btn-primary"
        >
          View Workflow Details
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ovl-wf-page">
        <p className="ovl-wf-page-loading">Loading content...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="ovl-wf-page">
        <h2>Error</h2>
        <p>{error || 'Failed to load content.'}</p>
        <Link to={`/learn/workflows/${workflowSlug}`} className="ovl-btn ovl-btn-outline">
          Back to Workflow
        </Link>
      </div>
    );
  }

  const { page, video, workflow, prevPage, nextPage } = content;

  return (
    <div className="ovl-wf-page">
      <header className="ovl-wf-page-header">
        <Link to={`/learn/workflows/${workflowSlug}`} className="ovl-wf-page-back">
          &larr; {workflow.title}
        </Link>
        <div className="ovl-wf-page-meta">
          <span className="ovl-wf-page-number">
            Page {page.pageNumber} of {workflow.totalPages}
          </span>
        </div>
        <h1 className="ovl-wf-page-title">{page.title}</h1>
      </header>

      {video && (
        <WorkflowVideoPlayer
          playbackId={video.playbackId}
          token={video.token}
          title={page.title}
        />
      )}

      <article className="ovl-wf-page-content">
        <MarkdownRenderer content={page.contentMd} />
      </article>

      {isLoggedIn && (
        <div className="ovl-wf-page-complete">
          {completed ? (
            <button
              className="ovl-wf-page-complete-btn ovl-wf-page-complete-btn--done"
              onClick={markIncomplete}
            >
              <span className="ovl-wf-page-complete-check">&#10003;</span>
              Completed — click to undo
            </button>
          ) : (
            <button
              className="ovl-wf-page-complete-btn"
              onClick={markComplete}
            >
              Mark as Complete
            </button>
          )}
        </div>
      )}

      <WorkflowPageNav
        workflowSlug={workflowSlug}
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={page.pageNumber}
        totalPages={workflow.totalPages}
      />
    </div>
  );
}

export default WorkflowPageView;
