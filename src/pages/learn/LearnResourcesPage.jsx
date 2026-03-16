import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import RightRail from '../../components/learn/RightRail';
import useSEO from '../../hooks/useSEO';
import resources, { resourceTypes, topicFilters } from '../../content/learn/resources';

function LearnResourcesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeType, setActiveType] = useState('all');
  const paramTopic = searchParams.get('topic');
  const activeTopic = paramTopic && topicFilters.some(t => t.key === paramTopic) ? paramTopic : 'all';

  function handleTopicChange(key) {
    const next = new URLSearchParams(searchParams);
    if (key === 'all') {
      next.delete('topic');
    } else {
      next.set('topic', key);
    }
    setSearchParams(next, { replace: true });
  }

  useSEO({
    title: 'Go Further — The Open Vector',
    description: 'Books, articles, courses, tools, and reference materials. A curated library of external resources for designers and builders.',
    path: '/learn/resources',
  });

  const filtered = resources.filter(r => {
    if (activeType !== 'all' && r.type !== activeType) return false;
    if (activeTopic !== 'all' && !r.topics.includes(activeTopic)) return false;
    return true;
  });

  const typeCounts = {};
  resources.forEach(r => {
    typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
  });

  const topicCounts = {};
  const filteredByType = activeType === 'all' ? resources : resources.filter(r => r.type === activeType);
  filteredByType.forEach(r => {
    r.topics.forEach(t => {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
  });

  return (
    <div className="ovl-resources-page">
      <header className="ovl-resources-header">
        <h1 className="ovl-resources-title">Go Further</h1>
        <p className="ovl-resources-subtitle">
          A curated library of books, articles, courses, tools, and references.
          Everything the curriculum points to, and more — all in one place.
        </p>
      </header>

      <a href="https://zerovector.design/investiture" className="ovl-resources-featured-card">
        <div className="ovl-resources-featured-badge">Zero-Vector Scaffold</div>
        <h3 className="ovl-resources-featured-title">Investiture</h3>
        <p className="ovl-resources-featured-desc">
          Architecture that teaches your AI to write clean code. Clone it. Open Claude Code. Start building.
        </p>
        <span className="ovl-resources-featured-cta">Get the Scaffold &rarr;</span>
      </a>

      <div className="ovl-with-rail">
        <div className="ovl-main">
          <div className="ovl-resources-filters">
            <div className="ovl-resources-filter-row">
              {resourceTypes.map(t => (
                <button
                  key={t.key}
                  className={`ovl-filter-pill ${activeType === t.key ? 'ovl-filter-pill--active' : ''}`}
                  onClick={() => setActiveType(t.key)}
                >
                  {t.label}
                  {t.key !== 'all' && typeCounts[t.key] && (
                    <span className="ovl-filter-pill-count">{typeCounts[t.key]}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="ovl-resources-filter-row">
              {topicFilters.map(t => (
                <button
                  key={t.key}
                  className={`ovl-filter-pill ovl-filter-pill--topic ${activeTopic === t.key ? 'ovl-filter-pill--active' : ''}`}
                  onClick={() => handleTopicChange(t.key)}
                >
                  {t.label}
                  {t.key !== 'all' && topicCounts[t.key] && (
                    <span className="ovl-filter-pill-count">{topicCounts[t.key]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="ovl-resources-count">
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
            {activeType !== 'all' || activeTopic !== 'all' ? ' matching filters' : ''}
          </div>

          <div className="ovl-resources-list">
            {filtered.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ovl-resource-card"
              >
                <div className="ovl-resource-card-top">
                  <span className={`ovl-resource-type ovl-resource-type--${resource.type}`}>
                    {resource.type}
                  </span>
                  <span className="ovl-resource-card-arrow">{'\u2197'}</span>
                </div>
                <h3 className="ovl-resource-card-title">{resource.title}</h3>
                {resource.author && (
                  <div className="ovl-resource-card-author">{resource.author}</div>
                )}
                <p className="ovl-resource-card-desc">{resource.description}</p>
                <div className="ovl-resource-card-topics">
                  {resource.topics.map(topic => (
                    <span key={topic} className="ovl-resource-card-topic">{topic}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="ovl-resources-empty">
              No resources match the current filters.
              <button
                className="ovl-resources-empty-reset"
                onClick={() => { setActiveType('all'); setActiveTopic('all'); }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <RightRail>
          <div className="ovl-rail-section">
            <div className="ovl-rail-section-header">About</div>
            <div className="ovl-rail-about">
              <p>
                Every resource here is referenced in the
                <Link to="/learn/curriculum"> Open Vector curriculum</Link>.
                They are the books we recommend, the tools we use, and the references we come back to.
              </p>
            </div>
          </div>
          <div className="ovl-rail-section">
            <div className="ovl-rail-section-header">By Type</div>
            <div className="ovl-rail-stats">
              {resourceTypes.filter(t => t.key !== 'all').map(t => (
                <div key={t.key} className="ovl-rail-stat">
                  <span className="ovl-rail-stat-count">{typeCounts[t.key] || 0}</span>
                  <span className="ovl-rail-stat-label">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </RightRail>
      </div>
    </div>
  );
}

export default LearnResourcesPage;
