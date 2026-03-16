import { useState } from 'react';

function KnowledgeCheck({ questions }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState({});

  if (!questions?.length) return null;

  return (
    <div className="ovl-knowledge-check">
      <button
        className="ovl-knowledge-check-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="ovl-knowledge-check-icon">{open ? '−' : '+'}</span>
        <span className="ovl-knowledge-check-label">Knowledge Check</span>
        <span className="ovl-knowledge-check-count">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
      </button>
      {open && (
        <div className="ovl-knowledge-check-list">
          {questions.map((q, i) => (
            <div key={i} className="ovl-knowledge-check-item">
              <div className="ovl-knowledge-check-q">
                <span className="ovl-knowledge-check-num">{i + 1}.</span>
                {q.question}
                {q.hint && (
                  <div className="ovl-knowledge-check-hint-wrap">
                    {revealed[i] ? (
                      <div className="ovl-knowledge-check-hint">{q.hint}</div>
                    ) : (
                      <button
                        className="ovl-knowledge-check-hint-btn"
                        onClick={() => setRevealed(prev => ({ ...prev, [i]: true }))}
                      >
                        Show hint
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KnowledgeCheck;
