import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';

function LearnAboutPage() {
  useSEO({
    title: 'About — The Open Vector',
    description: 'Who builds the Open Vector, how to get in touch, and how you can contribute to the free curriculum for design-led engineering.',
    path: '/learn/about',
  });

  return (
    <div className="ovl-about">
      <header className="ovl-about-header">
        <h1 className="ovl-about-title">About</h1>
        <p className="ovl-about-subtitle">
          Who builds this, why it exists, and how to reach us.
        </p>
      </header>

      {/* Origin */}
      <section className="ovl-about-section">
        <h2 className="ovl-about-heading">The Short Version</h2>
        <div className="ovl-about-body">
          <p>
            The Open Vector is built and maintained by{' '}
            <a href="https://helloerikaflowers.com" target="_blank" rel="noopener noreferrer">
              Erika Flowers
            </a>
            , a designer and engineer with 28 years in the field. She recently served
            as IT Specialist and Digital Service Expert at NASA, where she led an AI Research and Innovation Team.
            She is also a published science fiction author, with previous work experience at Intuit, Mural, and with Meta Reality Labs.
          </p>
          <p>
            The Open Vector grew out of{' '}
            <a href="https://zerovector.design" target="_blank" rel="noopener noreferrer">
              Zero-Vector Design
            </a>
            , a methodology for building real products directly with AI agents instead of
            handing designs off to engineers. The manifesto laid out the philosophy. The
            Open Vector is the practice: a free, structured curriculum for anyone who
            wants to learn it.
          </p>
          <p>
            There is no company behind this. No venture funding. No team of twelve.
            It is one person who believes this knowledge should be free, building a
            platform to make that real.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="ovl-about-section">
        <h2 className="ovl-about-heading">Get in Touch</h2>
        <div className="ovl-about-body">
          <p>
            The best way to reach us is through GitHub. Whether you have a question, found
            a bug, want to suggest a lesson, or just want to say hello, open an issue.
            That way the conversation is public and others can benefit from it too.
          </p>
          <div className="ovl-about-contact-links">
            <a
              href="https://github.com/erikaflowers/zerovector/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-primary"
            >
              Open a GitHub Issue
            </a>
            <a
              href="https://github.com/erikaflowers/zerovector"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-outline"
            >
              View the Repository
            </a>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="ovl-about-section">
        <h2 className="ovl-about-heading">Elsewhere</h2>
        <div className="ovl-about-links">
          <a
            href="https://zerovector.design"
            target="_blank"
            rel="noopener noreferrer"
            className="ovl-about-link-card"
          >
            <span className="ovl-about-link-title">Zero-Vector Design</span>
            <span className="ovl-about-link-desc">The manifesto. The philosophy behind the curriculum.</span>
          </a>
          <a
            href="https://helloerikaflowers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ovl-about-link-card"
          >
            <span className="ovl-about-link-title">Erika Flowers</span>
            <span className="ovl-about-link-desc">Portfolio, case studies, and professional background.</span>
          </a>
          <a
            href="https://eflowers.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ovl-about-link-card"
          >
            <span className="ovl-about-link-title">Substack</span>
            <span className="ovl-about-link-desc">Writing on design, AI, and building things that matter.</span>
          </a>
          <a
            href="https://www.linkedin.com/in/helloeflowers/"
            target="_blank"
            rel="noopener noreferrer"
            className="ovl-about-link-card"
          >
            <span className="ovl-about-link-title">LinkedIn</span>
            <span className="ovl-about-link-desc">Follow for updates and discussion.</span>
          </a>
        </div>
      </section>

      {/* Contribute nudge */}
      <section className="ovl-about-section ovl-about-contribute">
        <h2 className="ovl-about-heading">This Could Be Your Page Too</h2>
        <div className="ovl-about-body">
          <p>
            The Open Vector is one person right now, but it does not have to stay that
            way. If you want to write lessons, create guides, review content, translate
            the curriculum, or improve the platform, your name goes on the wall. Permanently.
            Not as an afterthought. As a builder.
          </p>
          <p>
            You could be on this page next.
          </p>
          <div className="ovl-about-contact-links">
            <Link to="/learn/contribute" className="ovl-btn ovl-btn-primary">
              See How to Contribute
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LearnAboutPage;
