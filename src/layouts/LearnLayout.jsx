import { useState, useEffect, useMemo } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import LearnNav from '../components/learn/LearnNav';
import LearnSidebar from '../components/learn/LearnSidebar';
import LearnBreadcrumbs from '../components/learn/LearnBreadcrumbs';
import LearnPagination from '../components/learn/LearnPagination';
import ErrorBoundary from '../components/ErrorBoundary';
import WelcomeModal from '../components/WelcomeModal';
import AnonWelcomeModal from '../components/AnonWelcomeModal';
import SignInBanner from '../components/learn/SignInBanner';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/site.css';
import learn from 'virtual:learn-content';

function LearnLayout() {
  const { levelSlug, lessonSlug, guideSlug } = useParams();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set body baseline (theme colors handled by ThemeContext)
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
      document.body.style.minHeight = '';
    };
  }, []);

  // Scroll to top and close sidebar on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // GA4 page view tracking (matches SiteLayout pattern)
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  // Flat lesson list for pagination
  const flatLessons = useMemo(() => {
    const list = [];
    learn.levels.forEach(level => {
      level.lessons.forEach(lesson => {
        list.push({
          levelSlug: level.slug,
          lessonSlug: lesson.slug,
          levelTitle: level.title,
          lessonTitle: lesson.title,
          path: `/learn/curriculum/${level.slug}/${lesson.slug}`,
        });
      });
    });
    return list;
  }, []);

  const currentIndex = flatLessons.findIndex(
    l => l.levelSlug === levelSlug && l.lessonSlug === lessonSlug
  );

  // Flat guide list for approach pagination
  const flatGuides = useMemo(() => {
    return (learn.approach?.guides || []).map(guide => ({
      guideSlug: guide.slug,
      lessonTitle: guide.title,
      path: `/learn/approach/${guide.slug}`,
    }));
  }, []);

  const currentGuideIndex = flatGuides.findIndex(
    g => g.guideSlug === guideSlug
  );

  return (
    <ThemeProvider>
    <AnonWelcomeModal />
    <WelcomeModal />
    <div className="ovl-page">
      <LearnNav
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="ovl-shell">
        <LearnSidebar
          levels={learn.levels}
          activeLevelSlug={levelSlug}
          activeLessonSlug={lessonSlug}
          approach={learn.approach}
          activeGuideSlug={guideSlug}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="ovl-content">
          <SignInBanner />
          <LearnBreadcrumbs
            levelSlug={levelSlug}
            lessonSlug={lessonSlug}
            levels={learn.levels}
            guideSlug={guideSlug}
            approach={learn.approach}
          />
          <ErrorBoundary>
            <Outlet context={{ learn, levelSlug, lessonSlug, guideSlug }} />
          </ErrorBoundary>
          {lessonSlug && (
            <LearnPagination
              prev={currentIndex > 0 ? flatLessons[currentIndex - 1] : null}
              next={currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null}
            />
          )}
          {guideSlug && (
            <LearnPagination
              prev={currentGuideIndex > 0 ? flatGuides[currentGuideIndex - 1] : null}
              next={currentGuideIndex < flatGuides.length - 1 ? flatGuides[currentGuideIndex + 1] : null}
            />
          )}
        </main>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default LearnLayout;
