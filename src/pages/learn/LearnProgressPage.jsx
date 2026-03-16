import { Link, useOutletContext } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useProgress } from '../../contexts/ProgressContext';
import useSEO from '../../hooks/useSEO';

function LearnProgressPage() {
  const { learn } = useOutletContext();
  const { user, isLoggedIn } = useUser();
  const { isComplete, getLevelProgress, enabled } = useProgress();

  useSEO({
    title: 'Your Progress — The Open Vector',
    description: 'Track your progress through the Open Vector curriculum.',
    path: '/learn/progress',
  });

  const totalLessons = learn.levels.reduce((sum, l) => sum + l.lessons.length, 0);
  const totalGuides = learn.approach?.guides?.length || 0;
  const totalItems = totalLessons + totalGuides;

  let completedLessons = 0;
  let completedGuides = 0;
  if (enabled) {
    learn.levels.forEach(level => {
      level.lessons.forEach(lesson => {
        if (isComplete(level.slug, lesson.slug)) completedLessons++;
      });
    });
    (learn.approach?.guides || []).forEach(guide => {
      if (isComplete('approach', guide.slug)) completedGuides++;
    });
  }
  const totalCompleted = completedLessons + completedGuides;
  const overallPercent = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  // Find next uncompleted lesson
  let nextLesson = null;
  if (enabled) {
    for (const level of learn.levels) {
      for (const lesson of level.lessons) {
        if (!isComplete(level.slug, lesson.slug)) {
          nextLesson = {
            title: lesson.title,
            levelTitle: `${level.number} ${level.title}`,
            path: `/learn/curriculum/${level.slug}/${lesson.slug}`,
          };
          break;
        }
      }
      if (nextLesson) break;
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="ovl-progress-guest">
        <div className="ovl-progress-guest-icon">&sect;</div>
        <h1 className="ovl-progress-guest-title">Track Your Progress</h1>
        <p className="ovl-progress-guest-desc">
          Sign in with Google to track lesson completion, sync across devices,
          and see your progress dashboard.
        </p>
        <Link to="/learn/curriculum" className="ovl-btn ovl-btn-primary">
          Browse Curriculum
        </Link>
      </div>
    );
  }

  return (
    <div className="ovl-progress">
      <header className="ovl-progress-header">
        <h1 className="ovl-progress-title">Your Progress</h1>
        <p className="ovl-progress-subtitle">
          {totalCompleted === 0
            ? 'Start your first lesson to begin tracking.'
            : `${totalCompleted} of ${totalItems} completed across the curriculum and guides.`
          }
        </p>
      </header>

      {/* Overall progress */}
      <div className="ovl-progress-overall">
        <div className="ovl-progress-overall-bar">
          <div className="ovl-progress-overall-fill" style={{ width: `${overallPercent}%` }} />
        </div>
        <div className="ovl-progress-overall-label">{overallPercent}% complete</div>
      </div>

      {/* Next up */}
      {nextLesson && (
        <Link to={nextLesson.path} className="ovl-progress-next">
          <div className="ovl-progress-next-label">Continue Learning</div>
          <div className="ovl-progress-next-title">{nextLesson.title}</div>
          <div className="ovl-progress-next-level">{nextLesson.levelTitle} &rarr;</div>
        </Link>
      )}

      {/* Per-level breakdown */}
      <div className="ovl-progress-levels">
        <div className="ovl-progress-section-label">Curriculum</div>
        {learn.levels.map(level => {
          const { done, total, percent } = getLevelProgress(level.slug, level.lessons);
          return (
            <div key={level.slug} className="ovl-progress-level">
              <Link to={`/learn/curriculum/${level.slug}`} className="ovl-progress-level-header">
                <span className="ovl-progress-level-number">{level.number}</span>
                <span className="ovl-progress-level-title">{level.title}</span>
                <span className="ovl-progress-level-count">{done}/{total}</span>
              </Link>
              <div className="ovl-progress-level-bar">
                <div className="ovl-progress-level-fill" style={{ width: `${percent}%` }} />
              </div>
              {done > 0 && done < total && (
                <div className="ovl-progress-level-lessons">
                  {level.lessons.map(lesson => {
                    const completed = isComplete(level.slug, lesson.slug);
                    return (
                      <Link
                        key={lesson.slug}
                        to={`/learn/curriculum/${level.slug}/${lesson.slug}`}
                        className={`ovl-progress-lesson ${completed ? 'ovl-progress-lesson--done' : ''}`}
                      >
                        <span className="ovl-progress-lesson-check">{completed ? '✓' : '○'}</span>
                        <span className="ovl-progress-lesson-title">{lesson.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Approach guides */}
      {completedGuides > 0 && (
        <div className="ovl-progress-levels" style={{ marginTop: '32px' }}>
          <div className="ovl-progress-section-label">Approach Guides</div>
          <div className="ovl-progress-level">
            <Link to="/learn/approach" className="ovl-progress-level-header">
              <span className="ovl-progress-level-number">&dagger;</span>
              <span className="ovl-progress-level-title">Guides</span>
              <span className="ovl-progress-level-count">{completedGuides}/{totalGuides}</span>
            </Link>
            <div className="ovl-progress-level-bar">
              <div className="ovl-progress-level-fill" style={{ width: `${totalGuides > 0 ? Math.round((completedGuides / totalGuides) * 100) : 0}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearnProgressPage;
