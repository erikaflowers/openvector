import { Link } from 'react-router-dom';

function LearnPagination({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className="ovl-pagination" aria-label="Lesson navigation">
      {prev ? (
        <Link to={prev.path} className="ovl-pagination-link ovl-pagination-prev">
          <span className="ovl-pagination-direction">&larr; Previous</span>
          <span className="ovl-pagination-title">{prev.lessonTitle}</span>
          <span className="ovl-pagination-level">{prev.levelTitle}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link to={next.path} className="ovl-pagination-link ovl-pagination-next">
          <span className="ovl-pagination-direction">Next &rarr;</span>
          <span className="ovl-pagination-title">{next.lessonTitle}</span>
          <span className="ovl-pagination-level">{next.levelTitle}</span>
        </Link>
      ) : <div />}
    </nav>
  );
}

export default LearnPagination;
