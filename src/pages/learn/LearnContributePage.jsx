import NotifyForm from '../../components/NotifyForm';
import useSEO from '../../hooks/useSEO';

function LearnContributePage() {
  useSEO({
    title: 'Contribute — The Open Vector',
    description: 'Join the Open Vector as a Founding Contributor. Help build the free curriculum for design-led engineering in the age of AI.',
    path: '/learn/contribute',
  });

  return (
    <div className="ovl-contribute">
      <header className="ovl-contribute-header">
        <h1 className="ovl-contribute-title">Contribute</h1>
        <p className="ovl-contribute-subtitle">
          The Open Vector is free because people like you help keep it that way.
          There are two ways to contribute: your skills, or your support.
        </p>
      </header>

      {/* Founding Contributors — Call to Arms */}
      <section className="ovl-contribute-section ovl-contribute-founding">
        <div className="ovl-contribute-founding-banner">
          <div className="ovl-contribute-founding-badge">Founding Contributor Program</div>
          <h2 className="ovl-contribute-founding-title">Build This With Us</h2>
          <p className="ovl-contribute-founding-body">
            The Open Vector is in its founding phase. The curriculum is live, the platform
            is growing, and we are looking for people who want to shape what this becomes.
            Every person who contributes now gets their name on the wall, permanently.
            Not as an afterthought. As a founder.
          </p>
          <p className="ovl-contribute-founding-body">
            This is not "submit a PR and we will think about it." This is: join us at
            the beginning. Help write the lessons. Review the guides. Translate the
            curriculum. Make the platform more accessible. Your name. Your mark. Permanently
            part of the project's history.
          </p>
        </div>

        <h3 className="ovl-contribute-roles-title">What We Need</h3>
        <div className="ovl-contribute-roles">
          <div className="ovl-contribute-role">
            <div className="ovl-contribute-role-icon">&sect;</div>
            <div className="ovl-contribute-role-content">
              <h4>Content Editors</h4>
              <p>
                Review and improve existing lessons for clarity, accuracy, and flow.
                You read what is there and make it better, fixing explanations that
                do not land, tightening prose, catching gaps in logic.
              </p>
            </div>
          </div>
          <div className="ovl-contribute-role">
            <div className="ovl-contribute-role-icon">&dagger;</div>
            <div className="ovl-contribute-role-content">
              <h4>Lesson Authors</h4>
              <p>
                Write new lessons from real experience. The best curriculum comes from
                people who have done the thing and want to teach others how. If you have
                built with AI agents, you have something to teach.
              </p>
            </div>
          </div>
          <div className="ovl-contribute-role">
            <div className="ovl-contribute-role-icon">&para;</div>
            <div className="ovl-contribute-role-content">
              <h4>Guide Writers</h4>
              <p>
                Create Approach guides from field experience. Practical, opinionated
                walkthroughs of real workflows, prompting strategies, debugging patterns,
                project scaffolding, team coordination.
              </p>
            </div>
          </div>
          <div className="ovl-contribute-role">
            <div className="ovl-contribute-role-icon">&oplus;</div>
            <div className="ovl-contribute-role-content">
              <h4>Translators</h4>
              <p>
                Help bring the Open Vector to other languages. The content system is
                built for internationalization. If you are fluent in another language
                and passionate about design education, we need you.
              </p>
            </div>
          </div>
          <div className="ovl-contribute-role">
            <div className="ovl-contribute-role-icon">&loz;</div>
            <div className="ovl-contribute-role-content">
              <h4>Accessibility Reviewers</h4>
              <p>
                Audit the platform for accessibility. Screen reader compatibility,
                keyboard navigation, color contrast, motion sensitivity, if you have
                expertise in a11y, the Open Vector needs your eyes.
              </p>
            </div>
          </div>
          <div className="ovl-contribute-role">
            <div className="ovl-contribute-role-icon">&hearts;</div>
            <div className="ovl-contribute-role-content">
              <h4>Community Ambassadors</h4>
              <p>
                Share the Open Vector, gather feedback, represent the project in your
                communities. Write about it, talk about it, bring back what people need.
                The best products are shaped by the people who use them.
              </p>
            </div>
          </div>
        </div>

        {/* Founding Contributors Wall */}
        <div className="ovl-contribute-wall">
          <div className="ovl-contribute-wall-header">Founding Contributors</div>
          <div className="ovl-contribute-wall-grid">
            <div className="ovl-contribute-wall-placeholder">
              Be among the first. Your name goes here.
            </div>
          </div>
        </div>

        {/* Sign Up */}
        <div className="ovl-contribute-founding-cta">
          <a
            href="https://github.com/erikaflowers/zerovector/issues/new?template=founding-contributor.md&title=Founding+Contributor+Application"
            target="_blank"
            rel="noopener noreferrer"
            className="ovl-btn ovl-btn-primary"
          >
            Apply on GitHub
          </a>
          <a
            href="https://github.com/erikaflowers/zerovector/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="ovl-btn ovl-btn-outline"
          >
            Browse Open Issues
          </a>
        </div>
        <div className="ovl-contribute-founding-email">
          <p className="ovl-contribute-founding-email-label">
            Not ready to apply? Get notified about founding contributor opportunities.
          </p>
          <NotifyForm variant="learn" tag="founding-contributor" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="ovl-contribute-section">
        <h2 className="ovl-contribute-heading">Standing on Open Shoulders</h2>
        <div className="ovl-contribute-body">
          <p>
            Everything you use as a technologist, designer, or creator today was
            built on a foundation of openly shared work. Linux powers most of the
            internet. Git, the tool you use to manage every project, was built by
            Linus Torvalds and given away. React, Node, VS Code, Python, PostgreSQL,
            the entire modern web stack, open source, all of it.
          </p>
          <p>
            Richard Stallman argued decades ago that software should be free, not
            free as in "no cost," but free as in freedom. The freedom to study it, modify
            it, share it. That philosophy became the Free and Open Source Software
            movement. It changed everything. Not because corporations decided to be
            generous, but because individuals contributed what they could. A patch here,
            a bug report there, documentation, testing, funding.
          </p>
          <p>
            The Open Vector exists in that tradition. This is not a product. It is a
            shared resource, built openly, improved collectively. The curriculum, the
            guides, the tools, they belong to the community that uses them. Like the
            projects that inspired it, the Open Vector runs on contributions from the
            people it serves.
          </p>
        </div>
      </section>

      {/* Contribute Code & Content */}
      <section className="ovl-contribute-section">
        <h2 className="ovl-contribute-heading">Contribute Code & Content</h2>
        <div className="ovl-contribute-body">
          <p>
            The Open Vector is a GitHub project. The entire site, curriculum, approach
            guides, resources, this page, is open source. If you see something that
            could be better, you can fix it yourself and submit a pull request.
          </p>
          <div className="ovl-contribute-ways">
            <div className="ovl-contribute-way">
              <div className="ovl-contribute-way-icon">&sect;</div>
              <div className="ovl-contribute-way-content">
                <h3>Fix or Improve Content</h3>
                <p>
                  Found a typo? A broken link? An explanation that could be clearer?
                  Open a PR. Every lesson and guide is a file in the repo. You do not
                  need permission to make something better.
                </p>
              </div>
            </div>
            <div className="ovl-contribute-way">
              <div className="ovl-contribute-way-icon">&dagger;</div>
              <div className="ovl-contribute-way-content">
                <h3>Propose New Lessons or Guides</h3>
                <p>
                  Have expertise in an area the curriculum does not cover yet? Open an
                  issue describing what you would write. If it fits, write it. The best
                  contributions come from people who have done the thing and want to
                  teach others how.
                </p>
              </div>
            </div>
            <div className="ovl-contribute-way">
              <div className="ovl-contribute-way-icon">&para;</div>
              <div className="ovl-contribute-way-content">
                <h3>Improve the Platform</h3>
                <p>
                  The site itself is React, Vite, and Netlify. If you are a developer
                  and you see a performance issue, an accessibility gap, or a feature
                  that would help learners, build it. This is how open source works.
                </p>
              </div>
            </div>
            <div className="ovl-contribute-way">
              <div className="ovl-contribute-way-icon">&loz;</div>
              <div className="ovl-contribute-way-content">
                <h3>Report Issues</h3>
                <p>
                  Not a coder? That is fine. If something is confusing, broken, or
                  missing, open a GitHub issue. Bug reports and feedback are
                  contributions too. Every issue filed makes the platform better for
                  the next person.
                </p>
              </div>
            </div>
          </div>
          <div className="ovl-contribute-cta-row">
            <a
              href="https://github.com/erikaflowers/zerovector"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-primary"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/erikaflowers/zerovector/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-outline"
            >
              Open an Issue
            </a>
          </div>
        </div>
      </section>

      {/* Financial Support */}
      <section className="ovl-contribute-section">
        <h2 className="ovl-contribute-heading">Donations & Support</h2>
        <div className="ovl-contribute-body">
          <p>
            The Open Vector is a non-profit project. There is no company behind this,
            no venture funding, no ad revenue. It is one person building a free learning
            platform because it should exist.
          </p>
          <p>
            The real costs (Supabase, Netlify, domain registration, the Claude API
            that powers the chat) come out of my pocket. In the grand scheme of things,
            it is not a life-altering expense. But these projects can quietly run a few
            hundred dollars a month. There are no sponsors, no ads, no monetization. Along with the time, the
            stewardship, and the effort to build and maintain all of this.
          </p>
          <p>
            I am not going to pretend anyone is "buying me a coffee." But if you have
            ever gotten something useful out of the Open Vector, a concept that clicked,
            a guide that saved you hours, a conversation with the AI tutor that pointed
            you in the right direction, you could donate $5, $10, the amount of a lunch. That is genuinely what we are
            talking about here. A few dollars offsets the hosting. A few more covers the
            API. It adds up.
          </p>

          <div className="ovl-contribute-costs">
            <div className="ovl-contribute-cost-group">
              <h3>What donations cover</h3>
              <ul>
                <li>Supabase (database + authentication)</li>
                <li>Netlify (hosting + deployment)</li>
                <li>Domain registration</li>
                <li>Claude API costs (the AI chat is not free to run)</li>
                <li>Any future infrastructure as the platform grows</li>
              </ul>
            </div>
            <div className="ovl-contribute-cost-group">
              <h3>What donations do not cover</h3>
              <ul>
                <li>My time. That is already given freely.</li>
                <li>Content. The curriculum will always be free, for everyone, no paywalls.</li>
              </ul>
            </div>
          </div>

          <p>
            If you can chip in, amazing. If you cannot, use the platform, that is what
            it is here for.
          </p>

          <div className="ovl-contribute-cta-row">
            <a
              href="https://ko-fi.com/erikaflowers"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-primary"
            >
              Support on Ko-fi
            </a>
            <a
              href="https://github.com/sponsors/erikaflowers"
              target="_blank"
              rel="noopener noreferrer"
              className="ovl-btn ovl-btn-outline"
            >
              Sponsor on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="ovl-contribute-section ovl-contribute-closing">
        <blockquote className="ovl-contribute-quote">
          "In real open source, you have the right to control your own destiny."
        </blockquote>
        <cite className="ovl-contribute-cite">— Linus Torvalds</cite>
        <p className="ovl-contribute-close">
          The Open Vector is yours. Use it, improve it, share it, sustain it.
          That is how open source has always worked, and it is how we will keep
          building, together.
        </p>
      </section>
    </div>
  );
}

export default LearnContributePage;
