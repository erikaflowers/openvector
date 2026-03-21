import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import learn from 'virtual:learn-content';

function buildIndex() {
  const items = [];

  // Extract searchable text from markdown body
  function extractSearchText(lesson) {
    const headings = (lesson.headings || []).map(h => h.text).join(' ');
    // Strip markdown syntax for search body
    const body = (lesson.markdownBody || '')
      .replace(/^#{1,6}\s+/gm, '')     // headings
      .replace(/```[\s\S]*?```/g, '')   // code blocks
      .replace(/:::\w+.*$/gm, '')       // directive markers
      .replace(/^>/gm, '')             // blockquotes
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
      .replace(/\n+/g, ' ')
      .trim();
    return { headings, body };
  }

  // Add all lessons
  learn.levels.forEach(level => {
    level.lessons.forEach(lesson => {
      const { headings, body } = extractSearchText(lesson);
      items.push({
        type: 'lesson',
        title: lesson.title,
        subtitle: lesson.subtitle,
        headings,
        body,
        level: `${level.number} ${level.title}`,
        path: `/learn/curriculum/${level.slug}/${lesson.slug}`,
        duration: lesson.duration,
      });
    });
  });

  // Add approach guides
  (learn.approach?.guides || []).forEach(guide => {
    const { headings, body } = extractSearchText(guide);
    items.push({
      type: 'guide',
      title: guide.title,
      subtitle: guide.subtitle,
      headings,
      body,
      level: 'Approach',
      path: `/learn/approach/${guide.slug}`,
      duration: guide.duration,
    });
  });

  return items;
}

function LearnSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const { items, fuse } = useMemo(() => {
    const items = buildIndex();
    const fuse = new Fuse(items, {
      keys: [
        { name: 'title', weight: 0.35 },
        { name: 'subtitle', weight: 0.25 },
        { name: 'headings', weight: 0.15 },
        { name: 'body', weight: 0.15 },
        { name: 'level', weight: 0.1 },
      ],
      threshold: 0.2,
      ignoreLocation: true,
      includeScore: true,
    });
    return { items, fuse };
  }, []);

  const results = query.length >= 2 ? fuse.search(query).slice(0, 8) : [];
  const showDropdown = focused && results.length > 0;

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // Scroll active result into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('.ovl-search-result');
      items[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    function handleKey(e) {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setFocused(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  function handleSelect(path) {
    setQuery('');
    setFocused(false);
    setActiveIndex(-1);
    navigate(path);
  }

  function handleKeyDown(e) {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex].item.path);
    }
  }

  return (
    <div className="ovl-search" ref={wrapperRef}>
      <div className="ovl-search-input-wrap">
        <span className="ovl-search-icon">&#x2315;</span>
        <input
          ref={inputRef}
          type="text"
          className="ovl-search-input"
          placeholder="Search lessons..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search lessons and guides"
          aria-activedescendant={activeIndex >= 0 ? `ovl-search-result-${activeIndex}` : undefined}
        />
        {!focused && <kbd className="ovl-search-kbd">/</kbd>}
        {query && (
          <button
            className="ovl-search-clear"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="ovl-search-dropdown" ref={listRef} role="listbox">
          {results.map(({ item }, i) => (
            <button
              key={item.path}
              id={`ovl-search-result-${i}`}
              className={`ovl-search-result ${i === activeIndex ? 'ovl-search-result--active' : ''}`}
              onClick={() => handleSelect(item.path)}
              onMouseEnter={() => setActiveIndex(i)}
              role="option"
              aria-selected={i === activeIndex}
            >
              <div className="ovl-search-result-title">{item.title}</div>
              <div className="ovl-search-result-meta">
                <span className="ovl-search-result-level">{item.level}</span>
                {item.duration && <span className="ovl-search-result-duration">{item.duration}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LearnSearch;
