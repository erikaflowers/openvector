import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';

const faqs = [
  {
    question: 'Is the Open Vector really free?',
    answer: 'Yes. Always. No paywalls, no premium tiers, no upsells. Every lesson, guide, and tool is free for everyone. The project is sustained by voluntary donations from people who find it useful.',
  },
  {
    question: 'Who is this for?',
    answer: 'Designers, design leaders, and creative professionals who want to build software with AI agents — not by becoming traditional developers, but by applying design thinking to engineering. If you have ever felt frustrated that you can see the product in your head but cannot build it yourself, this is for you.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'No. The curriculum starts at Level 00 — Orientation — which covers the terminal, file systems, and Git from scratch. The whole point is that AI agents handle the code generation. You need to understand systems, architecture, and how to direct them. That is what we teach.',
  },
  {
    question: 'How long does the curriculum take?',
    answer: 'Each lesson is 15-30 minutes of reading. The full curriculum across 6 levels can be completed at your own pace — there is no schedule, no cohort, no deadline. Some people move through a level in a week. Others take a month. Both are fine.',
  },
  {
    question: 'What is "design-led engineering"?',
    answer: 'It means applying the rigor, intentionality, and craft of design practice to the act of building software. Instead of writing code line by line, you think in systems, plan architectures, model data, and direct AI agents to implement your vision. The designer is the engineer — but the thinking stays design thinking.',
  },
  {
    question: 'What is "vibe coding"?',
    answer: 'Vibe coding is when someone uses AI to generate code without understanding what it does, why it works, or how it fits together. It produces output without comprehension. The Open Vector teaches the opposite — building with intention, where every decision is deliberate and every system is understood.',
  },
  {
    question: 'What tools do I need?',
    answer: 'A computer (Mac, Windows, or Linux), a terminal, a text editor, and access to an AI coding tool like Claude Code. The curriculum walks you through setting everything up. You do not need to buy anything to start learning.',
  },
  {
    question: 'Can I get a certificate?',
    answer: 'Not yet, but we are working on it. Level completion certificates that you can share on LinkedIn are on the roadmap. For now, the knowledge is the credential — and what you build with it is the proof.',
  },
  {
    question: 'How is this different from freeCodeCamp or The Odin Project?',
    answer: 'Those are excellent resources for learning traditional web development. The Open Vector is specifically for designers and creative professionals learning to build with AI agents. We do not teach you to hand-write JavaScript. We teach you to think in systems, plan architectures, and direct AI to build what you envision. Different audience, different philosophy, complementary skills.',
  },
  {
    question: 'Who built this?',
    answer: 'Erika Flowers — a designer with 31 years in UX and service design, currently a Principal Service Designer at NASA. She builds with AI agents daily and created the Open Vector to teach other designers the same approach. This is practiced, not preached.',
  },
  {
    question: 'Can I contribute?',
    answer: 'Yes. The Open Vector is open source on GitHub. You can fix content, propose new lessons, improve the platform, or report issues. You can also support the project financially through Ko-fi or GitHub Sponsors. See the Contribute page for details.',
    link: { text: 'Contribute page', to: '/learn/contribute' },
  },
  {
    question: 'I have a question that is not here.',
    answer: 'Ask the Open Vector AI tutor — it knows the entire curriculum and can answer questions about design, building, and anything covered in the lessons.',
    link: { text: 'Chat with the AI tutor', to: '/learn/chat' },
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`ovl-faq-item ${open ? 'ovl-faq-item--open' : ''}`}>
      <button
        className="ovl-faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="ovl-faq-question-text">{faq.question}</span>
        <span className="ovl-faq-toggle">{open ? '\u2212' : '+'}</span>
      </button>
      {open && (
        <div className="ovl-faq-answer">
          <p>{faq.answer}</p>
          {faq.link && (
            <Link to={faq.link.to} className="ovl-faq-link">
              {faq.link.text} &rarr;
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function LearnFAQPage() {
  useSEO({
    title: 'FAQ — The Open Vector',
    description: 'Frequently asked questions about the Open Vector learning platform.',
    path: '/learn/faq',
  });

  return (
    <div className="ovl-faq">
      <header className="ovl-faq-header">
        <h1 className="ovl-faq-title">Frequently Asked Questions</h1>
        <p className="ovl-faq-subtitle">
          Everything you need to know before you start — and a few things you will wonder along the way.
        </p>
      </header>

      <div className="ovl-faq-list">
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} />
        ))}
      </div>
    </div>
  );
}

export default LearnFAQPage;
