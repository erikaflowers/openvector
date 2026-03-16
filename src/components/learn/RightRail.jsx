import { useUser } from '../../contexts/UserContext';

function RightRail({ children }) {
  const { isLoggedIn, signIn } = useUser();

  return (
    <aside className="ovl-rail">
      {children}
      <div className="ovl-rail-global">
        {!isLoggedIn && (
          <div className="ovl-rail-section ovl-rail-signin">
            <div className="ovl-rail-section-header">Track Progress</div>
            <p className="ovl-rail-signin-text">
              Sign in to mark lessons complete and track your progress.
            </p>
            <button className="ovl-rail-signin-btn" onClick={signIn}>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default RightRail;
