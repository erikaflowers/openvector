// Changelog entries — newest first
// Each entry: { date: 'YYYY-MM-DD', title: 'Short title', items: ['Change 1', 'Change 2'] }

export default [
  {
    date: '2026-02-15',
    title: 'Contributions, Support & Platform Hardening',
    items: [
      'Added Contribute page — code contributions via GitHub + financial support via Ko-fi and GitHub Sponsors',
      'Added Ko-fi floating support button across all pages',
      'Added FAQ page with 12 questions covering prerequisites, tools, philosophy, and more',
      'Added this Changelog page',
      'Added Error Boundary for graceful crash recovery',
      'Added Support links to main site nav and learn nav',
      'Created reusable button system (ovl-btn-primary, ovl-btn-outline)',
      'Fixed button text color specificity issue across all pages',
    ],
  },
  {
    date: '2026-02-14',
    title: 'Authentication, Progress Sync & AI Chat',
    items: [
      'Google Sign-In via Supabase Auth — works on both main site and Open Vector',
      'Progress syncs to Supabase database — persists across devices',
      'AI Chat tutor powered by Claude — curriculum-aware, rate-limited, with markdown rendering',
      'Chat page with suggested prompts, thinking indicator, and link parsing',
      'Fixed chat scroll overflow and input area visibility',
      'Tagged beta-1 release',
    ],
  },
  {
    date: '2026-02-13',
    title: 'Open Vector Launch',
    items: [
      'The Open Vector learning platform launched at open.zerovector.design/learn',
      'Full curriculum: 6 levels, 37 lessons covering Orientation through Auteur',
      'Approach section: 10 step-by-step guides across 4 categories',
      'Go Further resources page with curated external links',
      'Hub homepage with progress tracking, section cards, and stats',
      'Lesson completion tracking with localStorage persistence',
      'Google Analytics GA4 integration with SPA page view tracking',
      'Shareable quiz results with URL parameters',
    ],
  },
  {
    date: '2026-02-12',
    title: 'Zero Vector Site Launch',
    items: [
      'zerovector.design launched — the Zero Vector design manifesto',
      'Seven pages: Manifesto, Philosophy, Approach, For Builders, For Leaders, Media, Origin',
      'Ask the Manifesto AI chat (Claude-powered)',
      'Am I Vibe Coding? interactive assessment quiz',
      'Boot sequence overlay, decrypt text animations, console effects',
      'Email notification signup via Buttondown',
      '27K email blast for re-opt-in from legacy Mailchimp list',
    ],
  },
];
