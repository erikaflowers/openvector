import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useWorkflows } from '../../contexts/WorkflowContext';
import WorkflowCard from '../../components/learn/WorkflowCard';
import useSEO from '../../hooks/useSEO';

function LearnWorkflowsPage() {
  useSEO({
    title: 'Workflows — The Open Vector',
    description: 'Structured, self-paced video courses that walk you through real outcomes step by step.',
    path: '/learn/workflows',
  });

  const { hasPurchased } = useWorkflows();
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkflows() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('workflows')
        .select('id, slug, title, subtitle, description, cover_image_url, price_cents, status')
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setWorkflows(data);
      }
      setLoading(false);
    }

    fetchWorkflows();
  }, []);

  return (
    <div className="ovl-wf-catalog">
      <header className="ovl-wf-catalog-header">
        <h1 className="ovl-wf-catalog-title">Workflows</h1>
        <p className="ovl-wf-catalog-subtitle">
          Structured, self-paced video courses that walk you through real
          outcomes from start to finish.
        </p>
        <p className="ovl-wf-catalog-desc">
          Each workflow is a sequential, guided path with video walkthroughs
          and written content. You start at page one and work through to the
          end. When you finish, you have built something real.
        </p>
      </header>

      {loading ? (
        <div className="ovl-wf-catalog-loading">
          <p>Loading workflows...</p>
        </div>
      ) : workflows.length === 0 ? (
        <div className="ovl-wf-catalog-empty">
          <p>No workflows available yet. Check back soon.</p>
        </div>
      ) : (
        <div className="ovl-wf-catalog-grid">
          {workflows.map((wf) => (
            <WorkflowCard
              key={wf.id}
              workflow={wf}
              purchased={hasPurchased(wf.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LearnWorkflowsPage;
