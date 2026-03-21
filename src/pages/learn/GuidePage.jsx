import { Link, useParams, useOutletContext } from 'react-router-dom';
import MarkdownRenderer from '../../components/learn/MarkdownRenderer';
import MarkCompleteButton from '../../components/learn/MarkCompleteButton';
import LessonBadge from '../../components/learn/LessonBadge';
import RightRail from '../../components/learn/RightRail';
import useSEO from '../../hooks/useSEO';
// Categories now come from the virtual module via learn.approach.categories

function GuidePage() {
  const { guideSlug } = useParams();
  const { learn } = useOutletContext();
  const { approach } = learn;

  const guide = approach.guides.find(g => g.slug === guideSlug);
  const category = guide
    ? (approach.categories || []).find(c => c.key === guide.category)
    : null;

  useSEO({
    title: guide ? `${guide.title} — Open Vector` : 'Guide Not Found',
    description: guide?.subtitle,
    path: `/learn/approach/${guideSlug}`,
  });

  if (!guide) {
    return (
      <div className="ovl-not-found">
        <h1>Guide not found</h1>
        <p>The guide you are looking for does not exist.</p>
        <Link to="/learn/approach">Back to all guides</Link>
      </div>
    );
  }

  // Build table of contents from pre-extracted headings
  const toc = (guide.headings || []).map(h => ({
    heading: h.text,
    id: h.id,
  }));

  // Resolve prerequisites to actual lesson data
  const prereqs = (guide.prerequisites || []).map(path => {
    const [levelSlug, lessonSlug] = path.split('/');
    const level = learn.levels.find(l => l.slug === levelSlug);
    const lesson = level?.lessons.find(l => l.slug === lessonSlug);
    return lesson ? {
      title: lesson.title,
      levelTitle: `${level.number} ${level.title}`,
      path: `/learn/curriculum/${levelSlug}/${lessonSlug}`,
    } : null;
  }).filter(Boolean);

  return (
    <div className="ovl-with-rail">
      <article className="ovl-main ovl-lesson">
        <header className="ovl-lesson-header">
          <div className="ovl-lesson-meta">
            {category && <span className="ovl-guide-category">{category.label}</span>}
            {guide.duration && <span className="ovl-lesson-duration">{guide.duration}</span>}
            <LessonBadge badge={guide.badge} />
          </div>
          <h1 className="ovl-lesson-title">{guide.title}</h1>
          <p className="ovl-lesson-subtitle">{guide.subtitle}</p>
        </header>
        {prereqs.length > 0 && (
          <div className="ovl-guide-prereqs">
            <span className="ovl-guide-prereqs-label">This guide builds on:</span>
            {prereqs.map((p, i) => (
              <Link key={i} to={p.path} className="ovl-guide-prereqs-link">
                {p.title}
                <span className="ovl-guide-prereqs-level">{p.levelTitle}</span>
              </Link>
            ))}
          </div>
        )}
        <MarkdownRenderer content={guide.markdownBody} />
        <MarkCompleteButton levelSlug="approach" lessonSlug={guideSlug} />
      </article>
      <RightRail>
        {toc.length > 2 && (
          <div className="ovl-rail-section">
            <div className="ovl-rail-section-header">In This Guide</div>
            <div className="ovl-rail-toc">
              {toc.map((item, i) => (
                <a key={i} href={`#${item.id}`} className="ovl-rail-toc-link">
                  {item.heading}
                </a>
              ))}
            </div>
          </div>
        )}
        {prereqs.length > 0 && (
          <div className="ovl-rail-section">
            <div className="ovl-rail-section-header">Prerequisites</div>
            <div className="ovl-rail-list">
              {prereqs.map((p, i) => (
                <Link key={i} to={p.path} className="ovl-rail-list-item">
                  <div className="ovl-rail-list-title">{p.title}</div>
                  <div className="ovl-rail-list-level">{p.levelTitle}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </RightRail>
    </div>
  );
}

export default GuidePage;
