import { useProgress } from '../../contexts/ProgressContext';

function MarkCompleteButton({ levelSlug, lessonSlug }) {
  const { isComplete, markComplete, markIncomplete, enabled } = useProgress();

  if (!enabled) return null;

  const done = isComplete(levelSlug, lessonSlug);

  const handleClick = () => {
    if (done) {
      markIncomplete(levelSlug, lessonSlug);
    } else {
      markComplete(levelSlug, lessonSlug);
    }
  };

  return (
    <div className="ovl-mark-complete">
      <button
        className={`ovl-mark-complete-btn ${done ? 'ovl-mark-complete-btn--done' : ''}`}
        onClick={handleClick}
      >
        <span className="ovl-mark-complete-check">{done ? '✓' : '○'}</span>
        <span className="ovl-mark-complete-label">{done ? 'Completed' : 'Mark as Complete'}</span>
      </button>
    </div>
  );
}

export default MarkCompleteButton;
