import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import '../styles/site.css';
import en from '../content/en';

const { open } = en;

function OpenVectorPage() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useSEO({
    title: 'The Open Vector',
    description: 'A free, open curriculum for learning to build with AI. Six levels from orientation to auteur. Start now.',
    path: '/',
    ogImage: 'https://open.zerovector.design/og/open-vector.png',
  });

  useEffect(() => {
    document.body.style.background = '#ffffff';
    document.body.style.color = '#0a0a0a';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
      document.body.style.minHeight = '';
    };
  }, []);

  return (
    <div className="ov-page">
      {/* Custom Nav */}
      <nav className="ov-nav">
        <div className="ov-nav-inner">
          <button
            className="ov-nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`ov-hamburger ${menuOpen ? 'ov-hamburger--open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
          <a href="https://zerovector.design" className="ov-nav-brand">{open.nav.brand}</a>
          <div className="ov-nav-links">
            <Link to="/learn" className="ov-nav-link">Learn</Link>
            <a href="https://zerovector.design/investiture" className="ov-nav-link">Investiture</a>
          </div>
          <div className="ov-nav-badge">{open.nav.badge}</div>
        </div>
      </nav>
      {menuOpen && (
        <div className="ov-mobile-menu">
          <Link to="/learn" className="ov-mobile-menu-link" onClick={() => setMenuOpen(false)}>Learn</Link>
          <a href="https://zerovector.design/investiture" className="ov-mobile-menu-link" onClick={() => setMenuOpen(false)}>Investiture</a>
          <a href="https://zerovector.design" className="ov-mobile-menu-link" onClick={() => setMenuOpen(false)}>Zero Vector</a>
          <div className="ov-mobile-menu-badge">{open.nav.badge}</div>
        </div>
      )}

      {/* Hero */}
      <section className="ov-section ov-hero">
        <div className="ov-container">
          <div className="ov-label">{open.hero.label}</div>
          <h1 className="ov-hero-title">
            <span className="ov-hero-light">{open.hero.title[0]}</span>
            <span className="ov-hero-heavy">{open.hero.title[1]}</span>
            <span className="ov-hero-heavy">{open.hero.title[2]}</span>
          </h1>
          <div className="ov-launch-banner ov-launch-banner--live">
            <div className="ov-launch-beacon ov-launch-beacon--live" aria-hidden="true" />
            <div className="ov-launch-content">
              <div className="ov-launch-label">Now Live</div>
              <div className="ov-launch-date">The Open Vector is here. Free. Always free.</div>
              <div className="ov-launch-cta">
                <Link to="/learn" className="ov-btn ov-btn-primary">Start Learning</Link>
              </div>
            </div>
          </div>

          <p className="ov-body">
            {open.hero.body1} <strong>{open.hero.body1Bold}</strong>
          </p>
          <p className="ov-body ov-body-bold">{open.hero.body2}</p>
          <blockquote className="ov-declaration">{open.hero.declaration}</blockquote>
          <div className="ov-free-indicator">
            <span className="ov-free-dot" />
            <span className="ov-free-text">{open.hero.freeIndicator}</span>
          </div>
        </div>
      </section>

      {/* Pledge */}
      <section className="ov-section">
        <div className="ov-container">
          <hr className="ov-rule" />
          <Animate>
            <div className="ov-label">{open.pledge.label}</div>
          </Animate>
          <div className="ov-pledge">
            {open.pledge.items.map((item, i) => (
              <Animate key={i}>
                <div className="ov-pledge-item">
                  <div className="ov-pledge-icon">&sect;</div>
                  <p className="ov-body">
                    <strong>{item.lead}</strong> {item.body}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="ov-section">
        <div className="ov-container">
          <hr className="ov-rule" />
          <Animate>
            <div className="ov-label">{open.curriculum.label}</div>
          </Animate>
          <Animate delay={1}>
            <div className="ov-curriculum-split">
              <div className="ov-curriculum-split-left">
                <p className="ov-body">{open.curriculum.intro}</p>
                <p className="ov-body">
                  Six levels. Sixty-plus lessons. From the basics everyone skipped to shipping
                  your own vision with AI agents as crew. No prerequisites. No paywalls. Just start.
                </p>
                <div className="ov-curriculum-cta">
                  <Link to="/learn" className="ov-btn ov-btn-primary">Start Learning</Link>
                </div>
              </div>
              <div className="ov-curriculum-split-right">
                {open.curriculum.levels.map((level, i) => (
                  <div key={i} className="ov-curriculum-overview-item">
                    <span className="ov-curriculum-overview-num">{level.number}</span>
                    <span className="ov-curriculum-overview-title">{level.title}</span>
                    <span className="ov-curriculum-overview-sub">{level.subtitle}</span>
                  </div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Contrast */}
      <section className="ov-section">
        <div className="ov-container">
          <hr className="ov-rule" />
          <Animate>
            <div className="ov-label">{open.contrast.label}</div>
          </Animate>
          <Animate>
            <div className="ov-contrast-table">
              <div className="ov-contrast-col ov-contrast-them">
                <div className="ov-contrast-col-label">{open.contrast.them.label}</div>
                {open.contrast.them.lines.map((line, i) => (
                  <div key={i} className="ov-contrast-line">{line}</div>
                ))}
              </div>
              <div className="ov-contrast-col ov-contrast-us">
                <div className="ov-contrast-col-label">{open.contrast.us.label}</div>
                {open.contrast.us.lines.map((line, i) => (
                  <div key={i} className="ov-contrast-line">{line}</div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Investiture */}
      <section className="ov-section">
        <div className="ov-container">
          <hr className="ov-rule" />
          <Animate>
            <div className="ov-label">Build</div>
            <a href="https://zerovector.design/investiture" className="ov-investiture-card">
              <div className="ov-investiture-badge">Free &amp; Open Source</div>
              <h3 className="ov-investiture-title">Investiture</h3>
              <p className="ov-investiture-desc">
                Ready to build? Get the Zero-Vector starter scaffold. Architecture that teaches
                your AI to write clean code. Clone it. Open Claude Code. Start shipping.
              </p>
              <span className="ov-investiture-cta">Get the Scaffold &rarr;</span>
            </a>
          </Animate>
        </div>
      </section>

      {/* Support + CTA side by side */}
      <section className="ov-section">
        <div className="ov-container">
          <hr className="ov-rule" />
          <Animate>
            <div className="ov-twin-cards">
              <div className="ov-twin-card">
                <div className="ov-label">Support</div>
                <h2 className="ov-twin-card-title">Keep the Open Vector Free</h2>
                <p className="ov-body">
                  The Open Vector is free. Always. No paywalls, no premium tiers, no upsells.
                  But hosting, AI, and infrastructure cost real money. If this project has
                  helped you, consider chipping in to keep it going.
                </p>
                <div className="ov-twin-card-actions">
                  <a
                    href="https://ko-fi.com/erikaflowers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ov-btn ov-btn-primary"
                  >
                    Support on Ko-fi
                  </a>
                </div>
              </div>
              <div className="ov-twin-card">
                <div className="ov-label">Contribute</div>
                <h2 className="ov-twin-card-title">{open.cta.title}</h2>
                <p className="ov-body">{open.cta.body}</p>
                <div className="ov-twin-card-actions">
                  <a href="https://github.com/erikaflowers/openvector" className="ov-btn ov-btn-primary">{open.cta.secondaryCta}</a>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Saint-Exupéry */}
      <section className="ov-section ov-exupery">
        <div className="ov-container">
          <hr className="ov-rule" />
          <Animate>
            <blockquote className="ov-quote">{open.exupery.quote}</blockquote>
            <cite className="ov-cite">{open.exupery.cite}</cite>
          </Animate>
          <Animate delay={1}>
            <p className="ov-punch">{open.exupery.punch}</p>
          </Animate>
          <Animate delay={2}>
            <p className="ov-close">{open.exupery.close}</p>
          </Animate>
        </div>
      </section>

      {/* Footer */}
      <footer className="ov-footer">
        <div className="ov-container">
          <div className="ov-footer-links">
            <a href="https://zerovector.design" className="ov-footer-link">Zero Vector</a>
            <a href="https://helloerikaflowers.com" className="ov-footer-link" target="_blank" rel="noopener noreferrer">Erika Flowers</a>
            <a href="https://github.com/erikaflowers/openvector" className="ov-footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OpenVectorPage;
