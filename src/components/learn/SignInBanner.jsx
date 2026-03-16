import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

const DISMISSED_KEY = 'ovl-banner-dismissed';

function SignInBanner() {
  const { isLoggedIn, loading, signIn } = useUser();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn && !sessionStorage.getItem(DISMISSED_KEY)) {
      setDismissed(false);
    }
  }, [isLoggedIn, loading]);

  if (dismissed || isLoggedIn || loading) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  return (
    <div className="ovl-signin-banner">
      <div className="ovl-signin-banner-inner">
        <span className="ovl-signin-banner-text">
          Sign in to track your progress and pick up where you left off.
        </span>
        <button className="ovl-signin-banner-btn" onClick={signIn}>
          Sign In
        </button>
        <button className="ovl-signin-banner-close" onClick={dismiss} aria-label="Dismiss">
          &times;
        </button>
      </div>
    </div>
  );
}

export default SignInBanner;
