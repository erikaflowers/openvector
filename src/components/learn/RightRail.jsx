import { useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function bugReportUrl(pathname) {
  const pageUrl = `https://learn.zerovector.design${pathname}`;
  const title = encodeURIComponent(`Bug report: ${pathname}`);
  const body = encodeURIComponent(`**Page:** ${pageUrl}\n\n**What happened:**\n\n`);
  return `https://github.com/erikaflowers/openvector/issues/new?title=${title}&body=${body}&labels=bug`;
}

function RightRail({ children }) {
  const { isLoggedIn, signIn } = useUser();
  const { pathname } = useLocation();

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
        <a
          href={bugReportUrl(pathname)}
          target="_blank"
          rel="noopener noreferrer"
          className="ovl-rail-bug-link"
        >
          Report a bug on this page
        </a>
      </div>
    </aside>
  );
}

export default RightRail;
