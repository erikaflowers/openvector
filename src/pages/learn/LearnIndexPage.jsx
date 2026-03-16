import { Link, useOutletContext } from 'react-router-dom';
import { SignInPrompt } from '../../components/learn/SignInPrompt';
import ProgressRing from '../../components/learn/ProgressRing';
import LessonBadge from '../../components/learn/LessonBadge';
import RightRail from '../../components/learn/RightRail';
import useSEO from '../../hooks/useSEO';

function LearnIndexPage() {
  const { learn } = useOutletContext();

  useSEO({
    title: 'Learn — The Open Vector',
    description: 'The Open Vector curriculum. Six levels from orientation to auteur. Free. Always free.',
    path: '/learn/curriculum',
  });

  const recentLessons = learn.levels.flatMap(level =>
    level.lessons
      .filter(l => l.badge)
      .map(l => ({
        title: l.title,
        badge: l.badge,
        duration: l.duration,
        levelNumber: level.number,
        levelTitle: level.title,
        path: `/learn/curriculum/${level.slug}/${l.slug}`,
      }))
  ).slice(0, 10);

  return (
    <div className="ovl-index">
      <header className="ovl-index-header">
        <h1 className="ovl-index-title">{learn.index.title}</h1>
        <p className="ovl-index-subtitle">{learn.index.subtitle}</p>
        <p className="ovl-index-intro">{learn.index.intro}</p>
      </header>
      <SignInPrompt />
      <div className="ovl-with-rail">
        <div className="ovl-main">
          <div className="ovl-index-grid">
            {learn.levels.map(level => {
              const hasNewContent = level.lessons.some(l => l.badge);
              return (
                <Link
                  key={level.slug}
                  to={`/learn/curriculum/${level.slug}`}
                  className="ovl-level-card"
                >
                  <div className="ovl-level-card-number">
                    {level.number}
                    {hasNewContent && <span className="ovl-level-card-dot" />}
                  </div>
                  <div className="ovl-level-card-body">
                    <h2 className="ovl-level-card-title">{level.title}</h2>
                    <p className="ovl-level-card-subtitle">{level.subtitle}</p>
                    <div className="ovl-level-card-meta">
                      <span className="ovl-level-card-count">{level.lessons.length} lessons</span>
                      <span className="ovl-level-card-status">{level.status === 'coming' ? 'Coming soon' : 'Available'}</span>
                      <ProgressRing levelSlug={level.slug} lessons={level.lessons} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <RightRail>
          {recentLessons.length > 0 && (
            <div className="ovl-rail-section">
              <div className="ovl-rail-section-header">Recent Updates</div>
              <div className="ovl-rail-list">
                {recentLessons.map((item, i) => (
                  <Link key={i} to={item.path} className="ovl-rail-list-item">
                    <div className="ovl-rail-list-top">
                      <LessonBadge badge={item.badge} />
                      <span className="ovl-rail-list-level">{item.levelNumber} {item.levelTitle}</span>
                    </div>
                    <div className="ovl-rail-list-title">{item.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </RightRail>
      </div>
    </div>
  );
}

export default LearnIndexPage;
