import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';

function LearnChangelogPage() {
  const { learn } = useOutletContext();

  useSEO({
    title: 'What\'s New — The Open Vector',
    description: 'New and updated lessons and guides in the Open Vector curriculum.',
    path: '/learn/changelog',
  });

  const items = useMemo(() => {
    const all = [];

    // Collect lessons with badges
    learn.levels.forEach(level => {
      level.lessons.forEach(lesson => {
        if (lesson.badge && lesson.updatedAt) {
          all.push({
            type: 'lesson',
            badge: lesson.badge,
            title: lesson.title,
            subtitle: lesson.subtitle,
            date: lesson.updatedAt,
            levelTitle: `${level.number} ${level.title}`,
            path: `/learn/curriculum/${level.slug}/${lesson.slug}`,
          });
        }
      });
    });

    // Collect approach guides with badges
    (learn.approach?.guides || []).forEach(guide => {
      if (guide.badge && guide.updatedAt) {
        all.push({
          type: 'guide',
          badge: guide.badge,
          title: guide.title,
          subtitle: guide.subtitle,
          date: guide.updatedAt,
          levelTitle: 'Approach',
          path: `/learn/approach/${guide.slug}`,
        });
      }
    });

    // Sort newest first
    all.sort((a, b) => b.date.localeCompare(a.date));
    return all;
  }, [learn]);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map();
    items.forEach(item => {
      if (!map.has(item.date)) map.set(item.date, []);
      map.get(item.date).push(item);
    });
    return Array.from(map.entries());
  }, [items]);

  return (
    <div className="ovl-changelog">
      <header className="ovl-changelog-header">
        <h1 className="ovl-changelog-title">What's New</h1>
        <p className="ovl-changelog-subtitle">
          New and updated lessons and guides. Newest first.
        </p>
      </header>

      {grouped.length === 0 ? (
        <p className="ovl-changelog-empty">No updates yet. Check back soon.</p>
      ) : (
        <div className="ovl-changelog-entries">
          {grouped.map(([date, entries]) => (
            <div key={date} className="ovl-changelog-entry">
              <div className="ovl-changelog-date">{date}</div>
              <div className="ovl-changelog-items-list">
                {entries.map((entry, j) => (
                  <Link key={j} to={entry.path} className="ovl-changelog-item">
                    <span className={`ovl-changelog-badge ovl-changelog-badge--${entry.badge}`}>
                      {entry.badge === 'new' ? 'New' : 'Updated'}
                    </span>
                    <span className="ovl-changelog-item-title">{entry.title}</span>
                    <span className="ovl-changelog-item-context">
                      {entry.type === 'guide' ? 'Approach Guide' : entry.levelTitle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LearnChangelogPage;
