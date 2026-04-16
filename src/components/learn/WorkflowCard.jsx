import { Link } from 'react-router-dom';

function WorkflowCard({ workflow, purchased }) {
  const priceFormatted = workflow.price_cents
    ? `$${(workflow.price_cents / 100).toFixed(2)}`
    : 'Free';

  return (
    <Link
      to={`/learn/workflows/${workflow.slug}`}
      className={`ovl-wf-card ${purchased ? 'ovl-wf-card--purchased' : ''}`}
    >
      {workflow.cover_image_url ? (
        <div className="ovl-wf-card-cover">
          <img src={workflow.cover_image_url} alt="" loading="lazy" />
        </div>
      ) : (
        <div className="ovl-wf-card-cover ovl-wf-card-cover--empty">
          <span className="ovl-wf-card-cover-glyph">&sect;</span>
        </div>
      )}
      <div className="ovl-wf-card-body">
        <h3 className="ovl-wf-card-title">{workflow.title}</h3>
        {workflow.subtitle && (
          <p className="ovl-wf-card-subtitle">{workflow.subtitle}</p>
        )}
        <div className="ovl-wf-card-meta">
          {purchased ? (
            <span className="ovl-wf-card-badge ovl-wf-card-badge--purchased">Purchased</span>
          ) : (
            <span className="ovl-wf-card-price">{priceFormatted}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default WorkflowCard;
