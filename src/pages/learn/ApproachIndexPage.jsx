import { Link, useOutletContext } from 'react-router-dom';
import { SignInPrompt } from '../../components/learn/SignInPrompt';
import LessonBadge from '../../components/learn/LessonBadge';
import RightRail from '../../components/learn/RightRail';
import useSEO from '../../hooks/useSEO';
// (approach.categories || []) now comes from learn.approach.categories

function ApproachIndexPage() {
  const { learn } = useOutletContext();
  const { approach } = learn;

  useSEO({
    title: 'Approach — The Open Vector',
    description: 'Step-by-step walkthroughs for the Zero Vector workflow. IKEA instructions for design-led engineering.',
    path: '/learn/approach',
  });

  const availableGuides = approach.guides.filter(g => g.status === 'available').length;

  return (
    <div className="ovl-index">
      <header className="ovl-index-header">
        <h1 className="ovl-index-title">{approach.title}</h1>
        <p className="ovl-index-subtitle">{approach.subtitle}</p>
      </header>
      <SignInPrompt />

      {/* Section 00 — What the Approach Is */}
      <div className="ovl-approach-intro">
        <div className="ovl-approach-intro-label">00</div>
        <div className="ovl-approach-intro-body">
          <h2 className="ovl-approach-intro-title">This Is Not Vibe Coding</h2>

          <p className="ovl-approach-intro-text">
            Vibe coding is pointing an AI at a screenshot and saying "make this."
            No architecture. No systems thinking. No intention beyond "it looks right."
            Vibe coding produces trinkets — pretty, fragile, disposable things that break
            the moment you need them to scale, adapt, or survive contact with real users.
          </p>

          <p className="ovl-approach-intro-text">
            The Zero Vector approach is the opposite. It is intentional creation at full
            velocity. You bring the systems thinking, the architecture, the understanding
            of what good looks like. AI extends your reach, not your judgment. You are not
            removed from the process — you are finally, fully in it.
          </p>

          <div className="ovl-approach-intro-callout">
            Speed without intention is just faster failure. Speed with intention is leverage.
          </div>

          <h3 className="ovl-approach-intro-heading">The Mental Model</h3>

          <p className="ovl-approach-intro-text">
            Every project follows the same loop. You understand what you are building and
            why. You describe it precisely. The AI builds it. You verify the result against
            your intent. You refine. The quality of the output is directly proportional to
            the quality of your input — and the curriculum teaches you what quality input
            looks like.
          </p>

          <div className="ovl-approach-model">
            <div className="ovl-approach-model-label">The Zero Vector Loop</div>
            <div className="ovl-approach-model-flow">
              <div className="ovl-approach-model-step">
                <div className="ovl-approach-model-num">1</div>
                <div className="ovl-approach-model-name">Understand</div>
                <div className="ovl-approach-model-desc">Know what you are building and why. PRD, use cases, architecture.</div>
              </div>
              <div className="ovl-approach-model-arrow">&rarr;</div>
              <div className="ovl-approach-model-step">
                <div className="ovl-approach-model-num">2</div>
                <div className="ovl-approach-model-name">Describe</div>
                <div className="ovl-approach-model-desc">Tell the AI precisely what to build. Context, intent, constraints.</div>
              </div>
              <div className="ovl-approach-model-arrow">&rarr;</div>
              <div className="ovl-approach-model-step">
                <div className="ovl-approach-model-num">3</div>
                <div className="ovl-approach-model-name">Build</div>
                <div className="ovl-approach-model-desc">The AI writes the code. You review what it wrote against your intent.</div>
              </div>
              <div className="ovl-approach-model-arrow">&rarr;</div>
              <div className="ovl-approach-model-step">
                <div className="ovl-approach-model-num">4</div>
                <div className="ovl-approach-model-name">Verify</div>
                <div className="ovl-approach-model-desc">Test it. Does it match the plan? Does it work? Commit or refine.</div>
              </div>
            </div>
            <div className="ovl-approach-model-loop">
              <span className="ovl-approach-model-loop-arrow">&larr;</span>
              <span className="ovl-approach-model-loop-text">Refine and repeat. Each cycle produces working software.</span>
              <span className="ovl-approach-model-loop-arrow">&rarr;</span>
            </div>
          </div>

          <h3 className="ovl-approach-intro-heading">What Makes This Different</h3>

          <div className="ovl-approach-contrast">
            <div className="ovl-approach-contrast-col">
              <div className="ovl-approach-contrast-header ovl-approach-contrast-header--bad">Vibe Coding</div>
              <div className="ovl-approach-contrast-item">"Make me a website"</div>
              <div className="ovl-approach-contrast-item">Accept whatever the AI produces</div>
              <div className="ovl-approach-contrast-item">No architecture, no plan</div>
              <div className="ovl-approach-contrast-item">Cannot debug what breaks</div>
              <div className="ovl-approach-contrast-item">Cannot extend or maintain it</div>
              <div className="ovl-approach-contrast-item">The AI is in charge</div>
            </div>
            <div className="ovl-approach-contrast-col">
              <div className="ovl-approach-contrast-header ovl-approach-contrast-header--good">Zero Vector</div>
              <div className="ovl-approach-contrast-item">"Build this component with these specs"</div>
              <div className="ovl-approach-contrast-item">Review every change against intent</div>
              <div className="ovl-approach-contrast-item">PRD, use cases, CLAUDE.md</div>
              <div className="ovl-approach-contrast-item">Systematic debugging workflow</div>
              <div className="ovl-approach-contrast-item">Clean architecture, clear ownership</div>
              <div className="ovl-approach-contrast-item">You are the auteur</div>
            </div>
          </div>

          <h3 className="ovl-approach-intro-heading">The Knowledge Stack</h3>

          <p className="ovl-approach-intro-text">
            The Approach guides assume you have — or are building — the foundational
            knowledge from the{' '}
            <Link to="/learn/curriculum" className="ovl-approach-intro-link">Curriculum</Link>.
            Not because you need to memorize everything before you start, but because
            every instruction you give an AI is only as good as your understanding of
            what you are asking for.
          </p>

          <div className="ovl-approach-stack">
            <div className="ovl-approach-stack-layer ovl-approach-stack-layer--top">
              <div className="ovl-approach-stack-label">Approach</div>
              <div className="ovl-approach-stack-desc">What to do — step-by-step walkthroughs</div>
            </div>
            <div className="ovl-approach-stack-layer ovl-approach-stack-layer--mid">
              <div className="ovl-approach-stack-label">Curriculum</div>
              <div className="ovl-approach-stack-desc">What to know — concepts, patterns, principles</div>
            </div>
            <div className="ovl-approach-stack-layer ovl-approach-stack-layer--base">
              <div className="ovl-approach-stack-label">Intent</div>
              <div className="ovl-approach-stack-desc">What to build — your vision, your standards, your craft</div>
            </div>
          </div>

          <p className="ovl-approach-intro-text">
            When you understand systems thinking, your architecture instructions are
            better. When you understand data modeling, your database prompts are precise.
            When you understand the pipeline, you know which phase you are in and what
            questions to ask. The curriculum is the vocabulary. The approach is the
            conversation.
          </p>

          <div className="ovl-approach-intro-callout">
            The friction was never the point. The handoffs were never inevitable. The
            translation layer between what you imagine and what gets built was a limitation
            of the tools, not a feature of the process.
          </div>
        </div>
      </div>

      {/* Guide Categories */}
      <div className="ovl-with-rail">
        <div className="ovl-main">
          <div className="ovl-approach-guides-header">
            <h2 className="ovl-approach-guides-title">The Guides</h2>
            <p className="ovl-approach-guides-desc">
              Each guide is a standalone walkthrough you can follow on your own machine.
              Start anywhere, but the Getting Started category is designed for day one.
            </p>
          </div>
          {(approach.categories || []).map(cat => {
            const guides = approach.guides.filter(g => g.category === cat.key);
            if (guides.length === 0) return null;
            return (
              <div key={cat.key} className="ovl-approach-category">
                <h2 className="ovl-approach-category-title">{cat.label}</h2>
                <div className="ovl-approach-guides">
                  {guides.map((guide, i) => (
                    <Link
                      key={guide.slug}
                      to={`/learn/approach/${guide.slug}`}
                      className={`ovl-guide-card ${guide.status === 'coming' ? 'ovl-guide-card--coming' : ''}`}
                    >
                      <div className="ovl-guide-card-index">{String(i + 1).padStart(2, '0')}</div>
                      <div className="ovl-guide-card-info">
                        <div className="ovl-guide-card-title">{guide.title}</div>
                        <div className="ovl-guide-card-subtitle">{guide.subtitle}</div>
                        <div className="ovl-guide-card-meta">
                          {guide.duration && <span className="ovl-guide-card-duration">{guide.duration}</span>}
                          <LessonBadge badge={guide.badge} />
                          {guide.status === 'coming' && <span className="ovl-guide-card-status">Coming soon</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <RightRail>
          <div className="ovl-rail-section">
            <div className="ovl-rail-section-header">About</div>
            <div className="ovl-rail-about">
              The curriculum teaches concepts. The Approach shows you what to do with them. Each guide is a step-by-step walkthrough you can follow along with on your own machine.
            </div>
          </div>
          <div className="ovl-rail-section">
            <div className="ovl-rail-section-header">Stats</div>
            <div className="ovl-rail-stats">
              <div className="ovl-rail-stat">
                <span className="ovl-rail-stat-count">{approach.guides.length}</span>
                <span className="ovl-rail-stat-label">Guides</span>
              </div>
              <div className="ovl-rail-stat">
                <span className="ovl-rail-stat-count">{(approach.categories || []).length}</span>
                <span className="ovl-rail-stat-label">Categories</span>
              </div>
              <div className="ovl-rail-stat">
                <span className="ovl-rail-stat-count">{availableGuides}</span>
                <span className="ovl-rail-stat-label">Available</span>
              </div>
            </div>
          </div>
        </RightRail>
      </div>
    </div>
  );
}

export default ApproachIndexPage;
