import { Link, useParams, useOutletContext } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import LessonBadge from '../../components/learn/LessonBadge';
import CompletionCard from '../../components/learn/CompletionCard';
import NotifyForm from '../../components/NotifyForm';
import RightRail from '../../components/learn/RightRail';
import useSEO from '../../hooks/useSEO';

function LevelPage() {
  const { levelSlug } = useParams();
  const { learn } = useOutletContext();
  const { isComplete, getLevelProgress, enabled } = useProgress();

  const level = learn.levels.find(l => l.slug === levelSlug);

  useSEO({
    title: level ? `${level.number} ${level.title} — Open Vector` : 'Level Not Found',
    description: level?.desc,
    path: `/learn/curriculum/${levelSlug}`,
  });

  if (!level) {
    return (
      <div className="ovl-not-found">
        <h1>Level not found</h1>
        <p>The level you are looking for does not exist.</p>
        <Link to="/learn/curriculum">Back to all levels</Link>
      </div>
    );
  }

  const { done, total, percent } = getLevelProgress(levelSlug, level.lessons);

  // Calculate total estimated time
  const totalMinutes = level.lessons.reduce((sum, l) => {
    const match = l.duration?.match(/(\d+)/);
    return sum + (match ? parseInt(match[1], 10) : 0);
  }, 0);

  // Find adjacent levels for rail navigation
  const levelIndex = learn.levels.findIndex(l => l.slug === levelSlug);
  const prevLevel = levelIndex > 0 ? learn.levels[levelIndex - 1] : null;
  const nextLevel = levelIndex < learn.levels.length - 1 ? learn.levels[levelIndex + 1] : null;

  return (
    <div className="ovl-level-page">
      <header className="ovl-level-header">
        <div className="ovl-level-header-number">{level.number}</div>
        <h1 className="ovl-level-header-title">{level.title}</h1>
        <p className="ovl-level-header-subtitle">{level.subtitle}</p>
        <p className="ovl-level-header-desc">{level.desc}</p>
        <div className="ovl-level-header-stats">
          <span className="ovl-level-header-stat">{level.lessons.length} lessons</span>
          {totalMinutes > 0 && <span className="ovl-level-header-stat">{totalMinutes} min total</span>}
        </div>
        {enabled && (
          <div className="ovl-level-progress">
            <div className="ovl-level-progress-bar">
              <div className="ovl-level-progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <span className="ovl-level-progress-label">{done}/{total} lessons complete</span>
          </div>
        )}
      </header>
      <div className="ovl-with-rail">
        <div className="ovl-main">
          {level.prereqs && (
            <div className="ovl-level-prereqs">
              <div className="ovl-level-prereqs-label">Prerequisites</div>
              <p className="ovl-level-prereqs-text">{level.prereqs}</p>
            </div>
          )}
          {level.outcomes?.length > 0 && (
            <div className="ovl-level-outcomes">
              <div className="ovl-level-outcomes-label">What You Will Learn</div>
              <ul className="ovl-level-outcomes-list">
                {level.outcomes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="ovl-level-lesson-list">
            <div className="ovl-level-lesson-list-label">Lessons</div>
            {level.lessons.map((lesson, i) => {
              const completed = enabled && isComplete(levelSlug, lesson.slug);
              return (
                <Link
                  key={lesson.slug}
                  to={`/learn/curriculum/${level.slug}/${lesson.slug}`}
                  className={`ovl-level-lesson-item ${completed ? 'ovl-level-lesson-item--done' : ''}`}
                >
                  <div className="ovl-level-lesson-index">
                    {completed ? <span className="ovl-level-lesson-check">✓</span> : String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="ovl-level-lesson-info">
                    <div className="ovl-level-lesson-title">{lesson.title}</div>
                    <div className="ovl-level-lesson-subtitle">{lesson.subtitle}</div>
                  </div>
                  <div className="ovl-level-lesson-meta">
                    <LessonBadge badge={lesson.badge} />
                    {lesson.duration && <span className="ovl-level-lesson-duration">{lesson.duration}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
          <CompletionCard level={level} />
          {['03-the-pipeline', '04-orchestration', '05-auteur'].includes(level.slug) && (
            <div className="ovl-level-build-cta">
              <div className="ovl-level-build-cta-label">Ready to Build?</div>
              <p className="ovl-level-build-cta-body">
                Take what you have learned and start building with Investiture — the Zero-Vector starter scaffold.
              </p>
              <a href="https://zerovector.design/investiture" className="ovl-btn ovl-btn-primary">Get Investiture &rarr;</a>
            </div>
          )}
          <div className="ovl-level-email-cta">
            <p className="ovl-level-email-cta-label">Get notified when new lessons and levels are published.</p>
            <NotifyForm variant="learn" tag="zerovector" />
          </div>
        </div>
        <RightRail>
          {(prevLevel || nextLevel) && (
            <div className="ovl-rail-section">
              <div className="ovl-rail-section-header">Other Levels</div>
              <div className="ovl-rail-levels">
                {prevLevel && (
                  <Link to={`/learn/curriculum/${prevLevel.slug}`} className="ovl-rail-level-link">
                    <span className="ovl-rail-level-num">{prevLevel.number}</span>
                    <span className="ovl-rail-level-title">{prevLevel.title}</span>
                  </Link>
                )}
                {nextLevel && (
                  <Link to={`/learn/curriculum/${nextLevel.slug}`} className="ovl-rail-level-link">
                    <span className="ovl-rail-level-num">{nextLevel.number}</span>
                    <span className="ovl-rail-level-title">{nextLevel.title}</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </RightRail>
      </div>
    </div>
  );
}

export default LevelPage;
