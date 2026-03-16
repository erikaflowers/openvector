import { Link, useOutletContext } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useProgress } from '../../contexts/ProgressContext';
import LessonBadge from '../../components/learn/LessonBadge';
import NotifyForm from '../../components/NotifyForm';
import useSEO from '../../hooks/useSEO';
import { approachCategories } from '../../content/learn/approach';
import recommendedReading from '../../content/recommended-reading';

function LearnHubPage() {
  const { learn } = useOutletContext();
  const { user, isLoggedIn } = useUser();
  const { isComplete, enabled, getLevelProgress } = useProgress();

  useSEO({
    title: 'Learn — The Open Vector',
    description: 'The Open Vector learning platform. Curriculum, resources, and everything you need to build with intention.',
    path: '/learn',
    ogImage: 'https://zerovector.design/og/learn.png',
  });

  const totalLessons = learn.levels.reduce((sum, l) => sum + l.lessons.length, 0);
  const totalGuides = learn.approach?.guides?.length || 0;

  // Calculate overall progress
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
  const totalItems = totalLessons + totalGuides;

  // Recent activity — lessons with badges
  const recentLessons = learn.levels.flatMap(level =>
    level.lessons
      .filter(l => l.badge)
      .map(l => ({
        title: l.title,
        badge: l.badge,
        levelTitle: `${level.number} ${level.title}`,
        path: `/learn/curriculum/${level.slug}/${l.slug}`,
      }))
  ).slice(0, 5);

  // Find next uncompleted lesson for "continue" link
  let continueItem = null;
  if (enabled) {
    for (const level of learn.levels) {
      for (const lesson of level.lessons) {
        if (!isComplete(level.slug, lesson.slug)) {
          continueItem = {
            title: lesson.title,
            levelTitle: `${level.number} ${level.title}`,
            path: `/learn/curriculum/${level.slug}/${lesson.slug}`,
          };
          break;
        }
      }
      if (continueItem) break;
    }
  }

  return (
    <div className="ovl-hub">
      {/* Hero / Welcome */}
      <div className="ovl-hub-hero">
        <div className="ovl-hub-hero-content">
          {isLoggedIn ? (
            <>
              <div className="ovl-hub-hero-greeting">Welcome back, {user.name.split(' ')[0]}</div>
              <h1 className="ovl-hub-hero-title">The Open Vector</h1>
            </>
          ) : (
            <>
              <div className="ovl-hub-hero-greeting">Welcome to</div>
              <h1 className="ovl-hub-hero-title">The Open Vector</h1>
            </>
          )}
          <p className="ovl-hub-hero-subtitle">
            A free, open learning platform for design-led engineering.
            Learn the concepts, follow the workflow, build with intention.
          </p>
        </div>

        {/* Progress snapshot — only when logged in with progress */}
        {enabled && totalCompleted > 0 && (
          <div className="ovl-hub-progress">
            <div className="ovl-hub-progress-bar">
              <div
                className="ovl-hub-progress-fill"
                style={{ width: `${Math.round((totalCompleted / totalItems) * 100)}%` }}
              />
            </div>
            <div className="ovl-hub-progress-label">
              {totalCompleted} of {totalItems} completed
            </div>
            {continueItem && (
              <Link to={continueItem.path} className="ovl-hub-continue">
                Continue: {continueItem.title}
                <span className="ovl-hub-continue-level">{continueItem.levelTitle}</span>
                <span className="ovl-hub-continue-arrow">&rarr;</span>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* What this is — for first-time visitors */}
      {!isLoggedIn && (
        <div className="ovl-hub-about">
          <div className="ovl-hub-about-grid">
            <div className="ovl-hub-about-block">
              <div className="ovl-hub-about-icon">&sect;</div>
              <div className="ovl-hub-about-label">Learn</div>
              <div className="ovl-hub-about-desc">
                Concepts, patterns, and principles — from opening a terminal to shipping your own vision.
              </div>
            </div>
            <div className="ovl-hub-about-block">
              <div className="ovl-hub-about-icon">&dagger;</div>
              <div className="ovl-hub-about-label">Practice</div>
              <div className="ovl-hub-about-desc">
                Step-by-step walkthroughs you follow on your own machine. Not theory — IKEA instructions.
              </div>
            </div>
            <div className="ovl-hub-about-block">
              <div className="ovl-hub-about-icon">&loz;</div>
              <div className="ovl-hub-about-label">Build</div>
              <div className="ovl-hub-about-desc">
                Use AI as crew, not crutch. Direct the flow. Understand what you are telling it. Ship real things.
              </div>
            </div>
          </div>

          <div className="ovl-hub-about-statement">
            <p>
              This is not vibe coding. This is a discipline for people who want to
              build software with the same rigor a designer brings to any craft —
              but with AI agents as your crew, not your replacement.
            </p>
            <p>
              The Open Vector is free. Always free. No paywalls, no premium tiers,
              no upsells. If you want to learn how to build with intention, you are
              in the right place.
            </p>
          </div>
        </div>
      )}

      {/* Section cards */}
      <div className="ovl-hub-sections-header">
        {isLoggedIn ? 'Your Sections' : 'Start Here'}
      </div>
      <div className="ovl-hub-sections">
        <Link to="/learn/curriculum" className="ovl-hub-card">
          <div className="ovl-hub-card-icon">
            <span className="ovl-hub-card-glyph">&sect;</span>
          </div>
          <div className="ovl-hub-card-body">
            <h2 className="ovl-hub-card-title">Curriculum</h2>
            <p className="ovl-hub-card-desc">
              {learn.levels.length} levels, {totalLessons} lessons. From orientation to auteur.
              {enabled && completedLessons > 0 && ` ${completedLessons} completed.`}
            </p>
            <span className="ovl-hub-card-action">Browse levels &rarr;</span>
          </div>
        </Link>
        <Link to="/learn/approach" className="ovl-hub-card">
          <div className="ovl-hub-card-icon">
            <span className="ovl-hub-card-glyph">&dagger;</span>
          </div>
          <div className="ovl-hub-card-body">
            <h2 className="ovl-hub-card-title">Approach</h2>
            <p className="ovl-hub-card-desc">
              Step-by-step walkthroughs. IKEA instructions for the Zero Vector workflow.
              {learn.approach && ` ${learn.approach.guides.length} guides across ${approachCategories.length} categories.`}
            </p>
            <span className="ovl-hub-card-action">Browse guides &rarr;</span>
          </div>
        </Link>
        <Link to="/learn/resources" className="ovl-hub-card">
          <div className="ovl-hub-card-icon">
            <span className="ovl-hub-card-glyph">&para;</span>
          </div>
          <div className="ovl-hub-card-body">
            <h2 className="ovl-hub-card-title">Go Further</h2>
            <p className="ovl-hub-card-desc">
              Books, articles, courses, tools, and reference materials. A curated library of external resources to deepen your practice.
            </p>
            <span className="ovl-hub-card-action">Browse resources &rarr;</span>
          </div>
        </Link>
        <Link to="/learn/chat" className="ovl-hub-card">
          <div className="ovl-hub-card-icon">
            <span className="ovl-hub-card-glyph">&loz;</span>
          </div>
          <div className="ovl-hub-card-body">
            <h2 className="ovl-hub-card-title">Chat</h2>
            <p className="ovl-hub-card-desc">
              Ask the Open Vector. An AI learning companion powered by Claude that can answer questions about design, building, and everything in the curriculum.
            </p>
            <span className="ovl-hub-card-action">Start a conversation &rarr;</span>
          </div>
        </Link>
      </div>

      {/* Recommended Reading */}
      <div className="ovl-hub-reading">
        <div className="ovl-hub-reading-header">{recommendedReading.headline}</div>
        <p className="ovl-hub-reading-subtitle">{recommendedReading.subtitle}</p>
        <div className="ovl-hub-reading-list">
          {recommendedReading.articles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-hub-reading-item"
            >
              <span className="ovl-hub-reading-item-title">{article.title}</span>
              <span className="ovl-hub-reading-item-subtitle">{article.subtitle}</span>
              <span className="ovl-hub-reading-item-date">{article.date}</span>
            </a>
          ))}
        </div>
      </div>

      {/* What's New */}
      {recentLessons.length > 0 && (
        <div className="ovl-hub-recent">
          <div className="ovl-hub-recent-header">Recently Added</div>
          <div className="ovl-hub-recent-list">
            {recentLessons.map((item, i) => (
              <Link key={i} to={item.path} className="ovl-hub-recent-item">
                <LessonBadge badge={item.badge} />
                <span className="ovl-hub-recent-title">{item.title}</span>
                <span className="ovl-hub-recent-level">{item.levelTitle}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="ovl-hub-stats">
        <div className="ovl-hub-stat">
          <span className="ovl-hub-stat-num">{learn.levels.length}</span>
          <span className="ovl-hub-stat-label">Levels</span>
        </div>
        <div className="ovl-hub-stat">
          <span className="ovl-hub-stat-num">{totalLessons}</span>
          <span className="ovl-hub-stat-label">Lessons</span>
        </div>
        <div className="ovl-hub-stat">
          <span className="ovl-hub-stat-num">{totalGuides}</span>
          <span className="ovl-hub-stat-label">Guides</span>
        </div>
        <div className="ovl-hub-stat">
          <span className="ovl-hub-stat-num">Free</span>
          <span className="ovl-hub-stat-label">Always</span>
        </div>
      </div>

      {/* Support callout */}
      <div className="ovl-hub-support">
        <div className="ovl-hub-support-content">
          <div className="ovl-hub-support-title">Keep the Open Vector Free</div>
          <p className="ovl-hub-support-desc">
            The Open Vector is free. Always. No paywalls, no premium tiers.
            If it has helped you, consider supporting the project to keep the lights on.
          </p>
          <div className="ovl-hub-support-links">
            <a
              href="https://ko-fi.com/erikaflowers"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-primary"
            >
              Support on Ko-fi
            </a>
            <a
              href="https://github.com/sponsors/erikaflowers"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-outline"
            >
              Sponsor on GitHub
            </a>
          </div>
          <div className="ovl-hub-support-email">
            <p className="ovl-hub-support-email-label">Get notified when new content drops.</p>
            <NotifyForm variant="learn" tag="zerovector" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnHubPage;
