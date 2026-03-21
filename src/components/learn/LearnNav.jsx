import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignInButton } from './SignInPrompt';
import LearnSearch from './LearnSearch';
import ThemeSwitcher from './ThemeSwitcher';
import learn from 'virtual:learn-content';

const networkItems = [
  { href: 'https://zerovector.design', label: 'Zero Vector' },
  { href: 'https://zerovector.design/investiture', label: 'Investiture' },
];

function NavDropdown({ label, items, active, className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div
      className={`ovl-nav-group ${open ? 'ovl-nav-group--open' : ''} ${className || ''}`}
      ref={ref}
      onMouseEnter={() => { clearTimeout(timeout.current); setOpen(true); }}
      onMouseLeave={() => { timeout.current = setTimeout(() => setOpen(false), 150); }}
    >
      <button
        className={`ovl-nav-group-trigger ${active ? 'ovl-nav-group-trigger--active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <span className="ovl-nav-group-chevron" aria-hidden="true" />
      </button>
      {open && (
        <div className="ovl-nav-group-panel">
          {items.map(item => (
            item.href ? (
              <a
                key={item.href}
                href={item.href}
                className="ovl-nav-group-item"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="ovl-nav-group-item"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
}

function LearnNav({ sidebarOpen, onToggle }) {
  const { pathname } = useLocation();
  const isApproach = pathname.includes('/approach') && pathname.includes('/learn');
  const isCurriculum = pathname.includes('/curriculum');
  const isChat = pathname.includes('/chat');
  const isMoreActive = pathname.includes('/resources') || pathname.includes('/contribute') || pathname.includes('/about');

  return (
    <nav className="ovl-nav">
      <div className="ovl-nav-inner">
        <button
          className="ovl-nav-toggle"
          onClick={onToggle}
          aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={sidebarOpen}
        >
          <span className={`ovl-hamburger ${sidebarOpen ? 'ovl-hamburger--open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
        <Link to="/" className="ovl-nav-brand">{learn.nav.brand}</Link>
        <div className="ovl-nav-primary">
          <Link
            to="/learn"
            className={`ovl-nav-tab ${pathname === '/learn' ? 'ovl-nav-tab--active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/learn/curriculum"
            className={`ovl-nav-tab ${isCurriculum ? 'ovl-nav-tab--active' : ''}`}
          >
            Curriculum
          </Link>
          <Link
            to="/learn/approach"
            className={`ovl-nav-tab ${isApproach ? 'ovl-nav-tab--active' : ''}`}
          >
            Approach
          </Link>
          <Link
            to="/learn/chat"
            className={`ovl-nav-tab ${isChat ? 'ovl-nav-tab--active' : ''}`}
          >
            Chat
          </Link>
          <NavDropdown
            label="More"
            active={isMoreActive}
            className="ovl-nav-more"
            items={[
              { to: '/learn/resources', label: 'Go Further' },
              { to: '/learn/contribute', label: 'Contribute' },
              { to: '/learn/about', label: 'About' },
            ]}
          />
        </div>
        <div className="ovl-nav-right">
          <LearnSearch />
          <ThemeSwitcher />
          <a
            href="https://ko-fi.com/erikaflowers"
            target="_blank"
            rel="noopener noreferrer"
            className="ovl-nav-support"
            title="Support the Open Vector"
          >
            <span className="ovl-nav-support-heart">&hearts;</span>
          </a>
          <NavDropdown label="ZV Network" items={networkItems} />
          <SignInButton />
        </div>
      </div>
    </nav>
  );
}

export default LearnNav;
