// ============================================
// OPEN VECTOR APPROACH GUIDE TEMPLATE
// ============================================
//
// Approach guides are step-by-step walkthroughs — IKEA instructions
// for the Zero Vector workflow. Unlike curriculum lessons (conceptual),
// these are procedural: do this, then this, then this.
//
// To contribute a guide:
// 1. Copy this file into src/content/learn/approach/
// 2. Rename it to match your guide slug (the URL segment)
// 3. Fill in the content below
// 4. Import it in approach/index.js and add it to the guides array
//
// Content block types (inherited from lessons):
//   { type: 'text',     heading: 'Section Title', body: ['Paragraph 1', 'Paragraph 2'] }
//   { type: 'callout',  body: 'Highlighted quote or key takeaway.' }
//   { type: 'exercise', title: 'Exercise Name', body: 'Instructions for the reader.' }
//   { type: 'code',     body: 'const x = 1;\nconsole.log(x);' }
//   { type: 'resources', heading: 'Go Deeper', items: [{ title: 'Resource Name', url: 'https://...', note: 'Short description.' }] }
//
// NEW — Approach-specific block types:
//   { type: 'step',     number: '01', title: 'Step Title', body: ['Paragraph 1', 'Paragraph 2'] }
//   { type: 'template', title: 'Template Name', body: 'The template text...\nWith multiple lines.' }
//

export default {
  slug: 'my-guide-slug',           // URL segment — lowercase, hyphens, no spaces
  title: 'Guide Title',
  subtitle: 'A one-line description of what this guide walks you through.',
  category: 'getting-started',     // 'getting-started' | 'planning' | 'working-with-agents' | 'build-workflow'
  duration: '20 min',              // Estimated time to follow along
  status: 'coming',                // 'coming' | 'available'
  badge: null,                      // 'new' | 'updated' | null
  updatedAt: null,                  // ISO date string (e.g. '2026-02-14')
  prerequisites: [],                // Array of curriculum lesson paths: ['01-foundation/systems-thinking']
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What You Will Build',
        body: [
          'Describe what the reader will have by the end of this guide.',
        ],
      },
      {
        type: 'step',
        number: '01',
        title: 'First Step',
        body: [
          'What to do in this step.',
          'Be specific. Include what they should see on screen.',
        ],
      },
      {
        type: 'step',
        number: '02',
        title: 'Second Step',
        body: [
          'Next instruction.',
        ],
      },
      {
        type: 'template',
        title: 'Example Template',
        body: '# Project Title\n\n## Problem\nDescribe the problem.\n\n## Solution\nDescribe the solution.',
      },
      {
        type: 'callout',
        body: 'A key insight the reader should remember.',
      },
    ],
  },
};
