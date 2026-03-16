import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div className="ovl-theme-switcher" ref={ref}>
      <button
        className="ovl-theme-btn"
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        title="Change theme"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 1.5A6.5 6.5 0 0 0 8 14.5" fill="currentColor" opacity="0.4" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="ovl-theme-menu">
          <div className="ovl-theme-menu-label">Theme</div>
          {Object.entries(themes).map(([key, t]) => (
            <button
              key={key}
              className={`ovl-theme-option ${theme === key ? 'ovl-theme-option--active' : ''}`}
              onClick={() => { setTheme(key); setOpen(false); }}
              type="button"
            >
              <span
                className="ovl-theme-dot"
                style={{ background: t.colors.accent }}
              />
              <span className="ovl-theme-option-label">{t.label}</span>
              {theme === key && <span className="ovl-theme-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
