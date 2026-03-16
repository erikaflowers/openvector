import { useState, useRef, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

export function SignInButton() {
  const { user, isLoggedIn, loading, signIn, signOut } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  if (loading) {
    return <span className="ovl-signin-loading" />;
  }

  if (isLoggedIn) {
    return (
      <div className="ovl-user-menu" ref={ref}>
        <button className="ovl-user-avatar-btn" onClick={() => setOpen(!open)} aria-label="User menu">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="ovl-user-avatar ovl-user-avatar--img" referrerPolicy="no-referrer" />
          ) : (
            <span className="ovl-user-avatar">{user.name.charAt(0)}</span>
          )}
        </button>
        {open && (
          <>
            <div className="ovl-user-dropdown-backdrop" onClick={() => setOpen(false)} />
            <div className="ovl-user-dropdown">
              <div className="ovl-user-dropdown-name">{user.name}</div>
              <div className="ovl-user-dropdown-email">{user.email}</div>
              <button className="ovl-user-dropdown-signout" onClick={() => { signOut(); setOpen(false); }}>
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button className="ovl-signin-btn" onClick={signIn}>Sign In</button>
  );
}

export function SignInPrompt() {
  const { isLoggedIn, loading, signIn } = useUser();

  if (loading || isLoggedIn) return null;

  return (
    <div className="ovl-signin-prompt">
      <p className="ovl-signin-prompt-text">
        Sign in to track your progress across lessons.
      </p>
      <button className="ovl-signin-prompt-btn" onClick={signIn}>
        Sign in with Google
      </button>
    </div>
  );
}
