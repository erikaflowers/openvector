import { Link } from 'react-router-dom';
import NotifyForm from '../../components/NotifyForm';
import useSEO from '../../hooks/useSEO';

function LearnEnterprisePage() {
  useSEO({
    title: 'In the Enterprise — The Open Vector',
    description: 'Zero-Vector Design at scale. Enterprise content coming soon — scaling agent-first workflows, governance, and transformation for large organizations.',
    path: '/learn/enterprise',
  });

  return (
    <div className="ovl-enterprise">
      <header className="ovl-enterprise-header">
        <div className="ovl-enterprise-badge">Coming Soon</div>
        <h1 className="ovl-enterprise-title">In the Enterprise</h1>
        <p className="ovl-enterprise-subtitle">
          Zero-Vector Design at the scale of teams, departments, and organizations.
          This section is being built with practitioners who are living it.
        </p>
      </header>

      <div className="ovl-enterprise-intro">
        <p>
          The Open Vector curriculum teaches individual practice — from orientation through auteur.
          But what happens when Zero-Vector scales across an enterprise? When dozens of practitioners
          direct agents simultaneously? When governance, compliance, and organizational culture all
          need to adapt?
        </p>
        <p>
          We are building this section to answer those questions — and we need people with real
          enterprise experience to help shape it.
        </p>
      </div>

      <div className="ovl-enterprise-coming">
        <h2 className="ovl-enterprise-section-title">What We Are Building</h2>
        <div className="ovl-enterprise-topics">
          <div className="ovl-enterprise-topic">
            <div className="ovl-enterprise-topic-number">01</div>
            <div className="ovl-enterprise-topic-content">
              <h3>Introducing Zero-Vector to an Existing Org</h3>
              <p>How to pilot agent-first workflows, identify champions, and build internal momentum without disrupting what already works.</p>
            </div>
          </div>
          <div className="ovl-enterprise-topic">
            <div className="ovl-enterprise-topic-number">02</div>
            <div className="ovl-enterprise-topic-content">
              <h3>Agent Governance and Review Workflows</h3>
              <p>Compliance, security, IP, and audit trails. Practical guardrails that enable velocity without creating risk.</p>
            </div>
          </div>
          <div className="ovl-enterprise-topic">
            <div className="ovl-enterprise-topic-number">03</div>
            <div className="ovl-enterprise-topic-content">
              <h3>Team Composition: Who Does What</h3>
              <p>When agents are crew, team structures change. How to redefine roles, responsibilities, and collaboration patterns.</p>
            </div>
          </div>
          <div className="ovl-enterprise-topic">
            <div className="ovl-enterprise-topic-number">04</div>
            <div className="ovl-enterprise-topic-content">
              <h3>Case Studies from Real Transformations</h3>
              <p>Stories from practitioners who have scaled agent-first workflows in large organizations. What worked, what did not, what they learned.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ovl-enterprise-contribute">
        <h2 className="ovl-enterprise-section-title">Help Build This Section</h2>
        <p>
          This content cannot be written from theory. It needs practitioners who have navigated
          enterprise adoption of AI-assisted workflows — the politics, the compliance reviews,
          the culture shifts, and the wins.
        </p>
        <p className="ovl-enterprise-contribute-cta">
          If you have introduced agent-first workflows in a large organization, your experience
          is exactly what this section needs.
        </p>
        <div className="ovl-enterprise-contribute-actions">
          <Link to="/learn/contribute" className="ovl-btn ovl-btn-primary">
            Become a Contributor
          </Link>
          <a href="/for-enterprise" className="ovl-btn ovl-btn-outline">
            Read the Full Vision
          </a>
        </div>
        <div className="ovl-enterprise-notify">
          <p className="ovl-enterprise-notify-label">Get notified when enterprise content launches.</p>
          <NotifyForm variant="learn" tag="enterprise" />
        </div>
      </div>
    </div>
  );
}

export default LearnEnterprisePage;
