import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

const PROMPTED_KEY = 'ovl-anon-prompted';

function AnonWelcomeModal() {
  const { isLoggedIn, loading, signIn } = useUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn && !sessionStorage.getItem(PROMPTED_KEY)) {
      setShow(true);
    }
  }, [isLoggedIn, loading]);

  const dismiss = () => {
    sessionStorage.setItem(PROMPTED_KEY, 'true');
    setShow(false);
  };

  const handleSignIn = () => {
    sessionStorage.setItem(PROMPTED_KEY, 'true');
    signIn();
  };

  if (!show) return null;

  return (
    <div className="ovl-welcome-overlay" onClick={dismiss}>
      <div className="ovl-welcome-card" onClick={(e) => e.stopPropagation()}>
        <div className="ovl-welcome-header">
          <div className="ovl-welcome-badge">Welcome</div>
          <h2 className="ovl-welcome-title">The Open Vector is free and open.</h2>
          <p className="ovl-welcome-desc">
            Every lesson, guide, and resource is yours to explore without an account.
            But if you sign in, your progress is tracked across sessions and devices —
            pick up where you left off and build your learning record.
          </p>
        </div>

        <div className="ovl-anon-actions">
          <button className="ovl-anon-signin" onClick={handleSignIn}>
            Sign in with Google
          </button>
          <button className="ovl-welcome-dismiss" onClick={dismiss}>
            Browse without signing in
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnonWelcomeModal;
