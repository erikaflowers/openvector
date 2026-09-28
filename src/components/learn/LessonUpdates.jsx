import { useOutletContext } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import useLastVisit from '../../hooks/useLastVisit';

const RECENT_DAYS = 30;

// "What changed" box at the top of a lesson or guide, fed by the Open Vector Autopilot's update notes.
// Learners who completed the lesson before it changed get a direct heads-up.
function LessonUpdates({ lessonKey, levelSlug, lessonSlug }) {
  const { learn } = useOutletContext();
  const { isComplete, enabled } = useProgress();
  const lastVisit = useLastVisit();

  const cutoff = new Date(Date.now() - RECENT_DAYS * 864e5).toISOString().slice(0, 10);
  const updates = (learn.updates || [])
    .filter(u => u.date >= cutoff && u.lessons.some(l => l.key === lessonKey));
  if (!updates.length) return null;

  const completed = enabled && isComplete(levelSlug, lessonSlug);
  const changedSinceVisit = lastVisit && updates.some(u => u.date > lastVisit);

  return (
    <aside className="ovl-lesson-updates" aria-label="Recent changes to this lesson">
      <div className="ovl-lesson-updates-label">
        {completed && changedSinceVisit ? 'Updated since you completed this' : 'Recently updated'}
      </div>
      <ul className="ovl-lesson-updates-list">
        {updates.map((u, i) => (
          <li key={i}>
            <span className="ovl-lesson-updates-date">{u.date}</span> {u.note}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default LessonUpdates;
