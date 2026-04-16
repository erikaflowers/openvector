import { Link } from 'react-router-dom';

function WorkflowPageNav({ workflowSlug, prevPage, nextPage, currentPage, totalPages }) {
  return (
    <nav className="ovl-wf-page-nav">
      <div className="ovl-wf-page-nav-left">
        {prevPage ? (
          <Link
            to={`/learn/workflows/${workflowSlug}/${prevPage.slug}`}
            className="ovl-wf-page-nav-btn ovl-wf-page-nav-btn--prev"
          >
            <span className="ovl-wf-page-nav-arrow">&larr;</span>
            <span className="ovl-wf-page-nav-label">{prevPage.title}</span>
          </Link>
        ) : (
          <Link
            to={`/learn/workflows/${workflowSlug}`}
            className="ovl-wf-page-nav-btn ovl-wf-page-nav-btn--prev"
          >
            <span className="ovl-wf-page-nav-arrow">&larr;</span>
            <span className="ovl-wf-page-nav-label">Overview</span>
          </Link>
        )}
      </div>
      <div className="ovl-wf-page-nav-center">
        <span className="ovl-wf-page-nav-count">
          {currentPage} / {totalPages}
        </span>
      </div>
      <div className="ovl-wf-page-nav-right">
        {nextPage && (
          <Link
            to={`/learn/workflows/${workflowSlug}/${nextPage.slug}`}
            className="ovl-wf-page-nav-btn ovl-wf-page-nav-btn--next"
          >
            <span className="ovl-wf-page-nav-label">{nextPage.title}</span>
            <span className="ovl-wf-page-nav-arrow">&rarr;</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default WorkflowPageNav;
