import { useProgress } from '../../contexts/ProgressContext';

function ProgressRing({ levelSlug, lessons }) {
  const { getLevelProgress, enabled } = useProgress();

  if (!enabled) return null;

  const { done, total, percent } = getLevelProgress(levelSlug, lessons);

  if (done === 0) return null;

  const isAllDone = done === total;

  return (
    <div className="ovl-progress-ring" title={`${done} of ${total} lessons complete`}>
      <svg viewBox="0 0 36 36" className="ovl-progress-svg">
        <path
          className="ovl-progress-track"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeWidth="3"
        />
        <path
          className="ovl-progress-fill"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeWidth="3"
          strokeDasharray={`${percent}, 100`}
        />
      </svg>
      <span className="ovl-progress-text">
        {isAllDone ? '✓' : `${done}/${total}`}
      </span>
    </div>
  );
}

export default ProgressRing;
