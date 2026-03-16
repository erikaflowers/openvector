import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const WELCOMED_KEY = 'ovl-welcomed';

function WelcomeModal() {
  const { isLoggedIn, user, loading } = useUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (isLoggedIn && !localStorage.getItem(WELCOMED_KEY)) {
      setShow(true);
    }
  }, [isLoggedIn, loading]);

  const dismiss = () => {
    localStorage.setItem(WELCOMED_KEY, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="ovl-welcome-overlay" onClick={dismiss}>
      <div className="ovl-welcome-card" onClick={(e) => e.stopPropagation()}>
        <div className="ovl-welcome-header">
          <div className="ovl-welcome-badge">Welcome</div>
          <h2 className="ovl-welcome-title">
            Hey{user?.name ? `, ${user.name.split(' ')[0]}` : ''}. You're in.
          </h2>
          <p className="ovl-welcome-desc">
            Your progress is now tracked across lessons. Complete them, track your journey, and pick up where you left off.
          </p>
        </div>

        <div className="ovl-welcome-paths">
          <Link to="/learn/curriculum/00-orientation" className="ovl-welcome-path" onClick={dismiss}>
            <span className="ovl-welcome-path-label">Start from the beginning</span>
            <span className="ovl-welcome-path-desc">Level 00 — Orientation</span>
          </Link>
          <Link to="/learn" className="ovl-welcome-path" onClick={dismiss}>
            <span className="ovl-welcome-path-label">Browse the curriculum</span>
            <span className="ovl-welcome-path-desc">All levels and lessons</span>
          </Link>
          <Link to="/learn/approach" className="ovl-welcome-path" onClick={dismiss}>
            <span className="ovl-welcome-path-label">Explore approach guides</span>
            <span className="ovl-welcome-path-desc">Real-world workflows</span>
          </Link>
        </div>

        <button className="ovl-welcome-dismiss" onClick={dismiss}>
          I'll explore on my own
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
