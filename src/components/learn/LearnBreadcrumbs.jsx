import { Link, useLocation } from 'react-router-dom';

function LearnBreadcrumbs({ levelSlug, lessonSlug, levels, guideSlug, approach }) {
  const { pathname } = useLocation();
  const isCurriculum = pathname.includes('/curriculum');
  const isResources = pathname.includes('/resources');
  const isChat = pathname.includes('/chat');
  const isApproach = pathname.includes('/approach') && pathname.includes('/learn');
  const isContribute = pathname.includes('/contribute');
  const isFAQ = pathname.includes('/faq');
  const isChangelog = pathname.includes('/changelog');
  const isProgress = pathname.includes('/progress');
  const isGlossary = pathname.includes('/glossary');

  const level = levels.find(l => l.slug === levelSlug);
  const lesson = level?.lessons.find(l => l.slug === lessonSlug);
  const guide = isApproach && guideSlug ? approach?.guides?.find(g => g.slug === guideSlug) : null;

  // Hub page and chat — no breadcrumbs
  if (isChat) return null;
  if (!isCurriculum && !isResources && !isApproach && !isContribute && !isFAQ && !isChangelog && !isProgress && !isGlossary) return null;

  return (
    <nav className="ovl-breadcrumbs" aria-label="Breadcrumb">
      <Link to="/learn" className="ovl-crumb">Open Vector</Link>
      {isCurriculum && (
        <>
          <span className="ovl-crumb-sep">/</span>
          {level ? (
            <Link to="/learn/curriculum" className="ovl-crumb">Curriculum</Link>
          ) : (
            <span className="ovl-crumb ovl-crumb--current">Curriculum</span>
          )}
        </>
      )}
      {isResources && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">Go Further</span>
        </>
      )}
      {isChat && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">Chat</span>
        </>
      )}
      {isContribute && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">Contribute</span>
        </>
      )}
      {isFAQ && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">FAQ</span>
        </>
      )}
      {isChangelog && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">Changelog</span>
        </>
      )}
      {isProgress && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">Your Progress</span>
        </>
      )}
      {isGlossary && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">Glossary</span>
        </>
      )}
      {isApproach && (
        <>
          <span className="ovl-crumb-sep">/</span>
          {guide ? (
            <Link to="/learn/approach" className="ovl-crumb">Approach</Link>
          ) : (
            <span className="ovl-crumb ovl-crumb--current">Approach</span>
          )}
        </>
      )}
      {guide && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">{guide.title}</span>
        </>
      )}
      {level && (
        <>
          <span className="ovl-crumb-sep">/</span>
          {lesson ? (
            <Link to={`/learn/curriculum/${level.slug}`} className="ovl-crumb">
              {level.number} {level.title}
            </Link>
          ) : (
            <span className="ovl-crumb ovl-crumb--current">
              {level.number} {level.title}
            </span>
          )}
        </>
      )}
      {lesson && (
        <>
          <span className="ovl-crumb-sep">/</span>
          <span className="ovl-crumb ovl-crumb--current">{lesson.title}</span>
        </>
      )}
    </nav>
  );
}

export default LearnBreadcrumbs;
