import { useState } from 'react';
import { Link } from 'react-router-dom';
import glossary from '../../content/learn/glossary';
import useSEO from '../../hooks/useSEO';

function LearnGlossaryPage() {
  const [filter, setFilter] = useState('');

  useSEO({
    title: 'Glossary — The Open Vector',
    description: 'Key terms and definitions for design-led engineering, AI agents, and the Zero Vector curriculum.',
    path: '/learn/glossary',
  });

  const filtered = filter
    ? glossary.filter(item =>
        item.term.toLowerCase().includes(filter.toLowerCase()) ||
        item.definition.toLowerCase().includes(filter.toLowerCase())
      )
    : glossary;

  // Group by first letter
  const grouped = {};
  filtered.forEach(item => {
    const letter = item.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(item);
  });
  const letters = Object.keys(grouped).sort();

  return (
    <div className="ovl-glossary">
      <header className="ovl-glossary-header">
        <h1 className="ovl-glossary-title">Glossary</h1>
        <p className="ovl-glossary-subtitle">
          Key terms and definitions from the Open Vector curriculum.
        </p>
        <input
          type="text"
          className="ovl-glossary-filter"
          placeholder="Filter terms..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label="Filter glossary terms"
        />
      </header>

      {/* Letter jump nav */}
      <div className="ovl-glossary-letters">
        {letters.map(letter => (
          <a key={letter} href={`#glossary-${letter}`} className="ovl-glossary-letter">
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="ovl-glossary-list">
        {letters.map(letter => (
          <div key={letter} className="ovl-glossary-group" id={`glossary-${letter}`}>
            <div className="ovl-glossary-group-letter">{letter}</div>
            {grouped[letter].map(item => (
              <div key={item.term} className="ovl-glossary-item">
                <dt className="ovl-glossary-term">{item.term}</dt>
                <dd className="ovl-glossary-def">
                  {item.definition}
                  {item.related && (
                    <Link to={item.related} className="ovl-glossary-link">
                      Related lesson &rarr;
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="ovl-glossary-empty">
            No terms match "{filter}"
          </div>
        )}
      </div>
    </div>
  );
}

export default LearnGlossaryPage;
