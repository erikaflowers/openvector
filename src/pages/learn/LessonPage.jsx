import { Link, useParams, useOutletContext } from 'react-router-dom';
import MarkdownRenderer from '../../components/learn/MarkdownRenderer';
import KnowledgeCheck from '../../components/learn/KnowledgeCheck';
import MarkCompleteButton from '../../components/learn/MarkCompleteButton';
import LessonBadge from '../../components/learn/LessonBadge';
import RightRail from '../../components/learn/RightRail';
import useSEO from '../../hooks/useSEO';

function LessonPage() {
  const { levelSlug, lessonSlug } = useParams();
  const { learn } = useOutletContext();

  const level = learn.levels.find(l => l.slug === levelSlug);
  const lesson = level?.lessons.find(l => l.slug === lessonSlug);

  useSEO({
    title: lesson ? `${lesson.title} — Open Vector` : 'Lesson Not Found',
    description: lesson?.subtitle,
    path: `/learn/curriculum/${levelSlug}/${lessonSlug}`,
  });

  if (!lesson) {
    return (
      <div className="ovl-not-found">
        <h1>Lesson not found</h1>
        <p>The lesson you are looking for does not exist.</p>
        <Link to="/learn/curriculum">Back to all levels</Link>
      </div>
    );
  }

  // Build table of contents from pre-extracted headings
  const toc = (lesson.headings || []).map(h => ({
    heading: h.text,
    id: h.id,
  }));

  return (
    <div className="ovl-with-rail">
      <article className="ovl-main ovl-lesson">
        <header className="ovl-lesson-header">
          <div className="ovl-lesson-meta">
            <span className="ovl-lesson-level">{level.number} {level.title}</span>
            {lesson.duration && <span className="ovl-lesson-duration">{lesson.duration}</span>}
            <LessonBadge badge={lesson.badge} />
          </div>
          <h1 className="ovl-lesson-title">{lesson.title}</h1>
          <p className="ovl-lesson-subtitle">{lesson.subtitle}</p>
        </header>
        <MarkdownRenderer content={lesson.markdownBody} />
        <KnowledgeCheck questions={lesson.knowledgeCheck} />
        <MarkCompleteButton levelSlug={levelSlug} lessonSlug={lessonSlug} />
      </article>
      <RightRail>
        {toc.length > 2 && (
          <div className="ovl-rail-section">
            <div className="ovl-rail-section-header">In This Lesson</div>
            <div className="ovl-rail-toc">
              {toc.map((item, i) => (
                <a key={i} href={`#${item.id}`} className="ovl-rail-toc-link">
                  {item.heading}
                </a>
              ))}
            </div>
          </div>
        )}
      </RightRail>
    </div>
  );
}

export default LessonPage;
