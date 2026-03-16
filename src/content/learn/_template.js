// ============================================
// OPEN VECTOR LESSON TEMPLATE
// ============================================
//
// To contribute a lesson:
// 1. Copy this file into the appropriate level folder
//    (e.g., src/content/learn/00-orientation/my-lesson.js)
// 2. Rename it to match your lesson slug (the URL segment)
// 3. Fill in the content below
// 4. Import it in the level's index.js and add it to the lessons array
// 5. Open a pull request
//
// Content block types:
//   { type: 'text',     heading: 'Section Title', body: ['Paragraph 1', 'Paragraph 2'] }
//   { type: 'callout',  body: 'Highlighted quote or key takeaway.' }
//   { type: 'exercise', title: 'Exercise Name', body: 'Instructions for the reader.' }
//   { type: 'code',     body: 'const x = 1;\nconsole.log(x);' }
//   { type: 'resources', heading: 'Go Deeper', items: [{ title: 'Resource Name', url: 'https://...', note: 'Short description.' }] }
//

export default {
  slug: 'my-lesson-slug',       // URL segment — lowercase, hyphens, no spaces
  title: 'Lesson Title',
  subtitle: 'A one-line description of what this lesson covers.',
  duration: '15 min',           // Estimated reading/doing time
  status: 'coming',             // 'coming' | 'available'
  badge: null,                   // 'new' | 'updated' | null — manual flag for UI badges
  updatedAt: null,               // ISO date string (e.g. '2026-02-14') — for sorting in "Recently Added"
  content: {
    sections: [
      {
        type: 'text',
        heading: 'First Section',
        body: [
          'First paragraph of this section.',
          'Second paragraph. Keep paragraphs focused on one idea.',
        ],
      },
      {
        type: 'callout',
        body: 'A key insight or principle the reader should remember.',
      },
      {
        type: 'exercise',
        title: 'Try It',
        body: 'A hands-on exercise the reader can do right now.',
      },
    ],
  },
  // Optional knowledge check questions — shown as collapsible section after lesson content
  // knowledgeCheck: [
  //   { question: 'What does `cd` stand for?', hint: 'Think about what happens when you type it.' },
  //   { question: 'Why is the terminal important for AI tools?' },
  // ],
};
