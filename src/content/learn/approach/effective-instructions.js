export default {
  slug: 'effective-instructions',
  title: 'Giving Effective Instructions',
  subtitle: 'How to tell AI what to build. Prompt structure, context loading, and the art of specificity.',
  category: 'working-with-agents',
  duration: '25 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  prerequisites: ['02-the-medium/claude-code', '02-the-medium/prompting'],
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What You Will Learn',
        body: [
          'The difference between a vague instruction that produces generic output and a precise instruction that produces exactly what you envisioned. By the end of this guide, you will know how to structure any instruction to Claude Code — from a one-liner to a complex multi-step build task.',
          'This is the single most impactful skill in design-led engineering. The quality of what you get out is directly proportional to the clarity of what you put in.',
        ],
      },
      {
        type: 'text',
        heading: 'The Anatomy of a Good Instruction',
        body: [
          'Every effective instruction to Claude Code has three components: Context (what already exists), Intent (what you want to happen), and Constraints (what you do not want to happen). Most people skip context and constraints, and then wonder why the AI guessed wrong.',
          'Think of it like talking to a contractor. You would never say "build me a room." You would say "I have a two-bedroom house (context). I want to add a home office in the back corner of the living room (intent). Do not move any plumbing, keep the existing hardwood floors, and stay within the existing foundation footprint (constraints)."',
        ],
      },
      {
        type: 'callout',
        body: 'Specificity is not verbosity. A ten-word instruction can be perfectly specific. "Add a dark mode toggle to the nav bar that saves preference to localStorage" — that is 15 words and leaves almost nothing to guess.',
      },
      {
        type: 'step',
        number: '01',
        title: 'Start with Context',
        body: [
          'Before telling Claude Code what to build, make sure it knows what already exists. If you have a CLAUDE.md (you should), it reads that automatically. But for specific tasks, you often need to add more context.',
          'Point to relevant files: "Look at src/components/Nav.jsx — that is the navigation component." Reference your PRD: "See PRD.md, the contact form feature." Describe the current state: "Right now the homepage has a hero section and a project grid. I want to add a testimonials section between them."',
          'The more context Claude has, the less it guesses. Guessing is where things go wrong.',
        ],
      },
      {
        type: 'step',
        number: '02',
        title: 'State Your Intent Clearly',
        body: [
          'Say what you want to exist when Claude is done. Not what you want Claude to do — what you want to be true about the codebase afterward. There is a subtle but important difference.',
          '"Add a footer component" is a command. "The site should have a footer with three columns: contact info on the left, navigation links in the middle, and social media icons on the right" is an intent. The second version gives Claude everything it needs to make good decisions about implementation.',
        ],
      },
      {
        type: 'step',
        number: '03',
        title: 'Add Constraints',
        body: [
          'Constraints prevent Claude from doing things you did not ask for. This is critical. AI tools love to be helpful, and "helpful" sometimes means adding features, refactoring code you did not mention, or changing your design system.',
          'Common constraints: "Do not modify any existing components." "Use the existing color variables in styles/variables.css." "Do not add any new dependencies." "Keep the component under 100 lines." "Match the style of the existing ProjectCard component."',
          'Think of constraints as guardrails. They do not slow Claude down — they keep it on the road.',
        ],
      },
      {
        type: 'step',
        number: '04',
        title: 'See the Difference: Vague vs. Specific',
        body: [
          'Let us look at the same task written two ways. First, the vague version — what most people type on their first try:',
        ],
      },
      {
        type: 'template',
        title: 'Vague Instruction (Do Not Do This)',
        body: 'Add a testimonials section to the homepage.',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'This will produce something. But what? How many testimonials? What layout? What data? Where on the page? What style? Claude will guess all of these things, and its guesses may not match your vision.',
          'Now the specific version:',
        ],
      },
      {
        type: 'template',
        title: 'Specific Instruction (Do This)',
        body: 'Add a testimonials section to the homepage, between the project grid and the contact section.\n\nRequirements:\n- Show 3 testimonials in a horizontal row (stacking vertically on mobile)\n- Each testimonial has: quote text (2-3 sentences), person\'s name, their title and company\n- Use a card layout with the same border-radius and shadow as the ProjectCard component\n- Use placeholder content for now — I will replace it with real quotes later\n- Add a section heading: "What People Are Saying"\n\nConstraints:\n- Do not modify any existing components\n- Use the existing CSS variables for colors and spacing\n- Keep this as a single TestimonialSection component in src/components/',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Same task. But now Claude knows exactly where it goes, what it contains, how it is laid out, what it looks like, and what not to touch. The output will be dramatically closer to what you actually wanted.',
        ],
      },
      {
        type: 'step',
        number: '05',
        title: 'Use the Instruction Template for Complex Tasks',
        body: [
          'For larger tasks — anything that touches multiple files or involves non-obvious logic — use a structured format. This is not mandatory, but it prevents the most common mistakes.',
        ],
      },
      {
        type: 'template',
        title: 'Complex Instruction Template',
        body: '## Task\n[One sentence: what should exist when you are done.]\n\n## Context\n- [Relevant file: what it does]\n- [Relevant file: what it does]\n- [Current state of the feature]\n\n## Requirements\n- [Specific requirement 1]\n- [Specific requirement 2]\n- [Specific requirement 3]\n\n## Constraints\n- [Do not modify...]\n- [Must use existing...]\n- [Keep under...]\n\n## Acceptance Criteria\n- [I can do X and see Y]\n- [When I do A, B happens]\n- [This works on mobile at 375px width]',
      },
      {
        type: 'step',
        number: '06',
        title: 'Load Context from Your Project Documents',
        body: [
          'Remember the PRD, use cases, and project plan you wrote? This is where they pay off. Instead of re-explaining your product every time, reference the documents.',
          'You can paste a section of your PRD directly into the conversation: "Here is the use case for the contact form: [paste use case]. Build this." You can also just tell Claude where to look: "Read use-cases.md and implement the Send a Message use case."',
          'The best practice is to keep these documents updated and referenced in your CLAUDE.md, so the context is always loaded automatically.',
        ],
      },
      {
        type: 'step',
        number: '07',
        title: 'Handle Multi-Step Tasks',
        body: [
          'Sometimes one instruction is not enough. If a task involves five different files and complex logic, break it into a sequence of instructions. Build from the inside out.',
          'For example, building a blog feature: First, "Create the data model for blog posts in src/content/posts.js with title, slug, date, excerpt, body, and tags." Wait for that. Then, "Create a BlogList component that reads from posts.js and displays each post as a card with title, date, and excerpt." Wait for that. Then, "Create a BlogPost page that displays a full post based on the URL slug." Build one piece, verify it, then build the next.',
          'This is not slower — it is faster, because you catch problems early instead of untangling a mess at the end.',
        ],
      },
      {
        type: 'step',
        number: '08',
        title: 'Review Before You Accept',
        body: [
          'After Claude produces code, do not just move on. Look at what it built. Open the file. Read the component. Check that it matches your instruction. This is not about doubting the AI — it is about maintaining your understanding of your own codebase.',
          'If something does not look right, say so: "The testimonial cards should have more padding — increase it to 2rem. Also, the heading should use the h2 style from the design system, not a custom font size." Iterate. The first output is a draft, not a final answer.',
        ],
      },
      {
        type: 'callout',
        body: 'The goal is not to write the perfect instruction on the first try. The goal is to get close enough that the iteration loop is short. One good instruction plus two refinements beats ten minutes trying to write the "perfect" prompt.',
      },
      {
        type: 'step',
        number: '09',
        title: 'Save Patterns You Reuse',
        body: [
          'If you find yourself giving the same kind of instruction repeatedly — "create a new page component with this layout" or "add a new section to the homepage" — save it as a template. You can put these in your CLAUDE.md under a section called "Common Patterns":',
        ],
      },
      {
        type: 'code',
        body: '## Common Patterns\n\n### New Page\nWhen creating a new page:\n- Create the component in src/pages/\n- Add the route in App.jsx\n- Add the nav link in Nav.jsx\n- Use the PageLayout wrapper component\n- Include a meta title and description\n\n### New Section\nWhen adding a section to a page:\n- Create the section as its own component in src/components/\n- Use existing CSS variables for spacing and color\n- Include responsive breakpoints at 768px and 1024px\n- Follow the naming pattern: [Feature]Section.jsx',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Now every time you or Claude Code creates a new page, the conventions are already documented. You do not have to repeat them in every instruction.',
        ],
      },
      {
        type: 'exercise',
        title: 'Try It',
        body: 'Take a feature you want to build and write two versions of the instruction: first the way you would naturally type it (probably vague), then rewrite it using the Context + Intent + Constraints structure. Compare the two. Which one would produce a better result if you handed it to a human developer who had never seen your project?',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Prompting (Curriculum)', url: '/learn/curriculum/02-the-medium/prompting', note: 'The fundamentals of communicating with AI tools effectively.' },
          { title: 'Claude Code (Curriculum)', url: '/learn/curriculum/02-the-medium/claude-code', note: 'How Claude Code works and how to get the most out of it.' },
          { title: 'CLAUDE.md (Curriculum)', url: '/learn/curriculum/04-orchestration/claude-md', note: 'Writing project context files that make every instruction more effective.' },
          { title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', note: 'Official guide to structuring prompts for Claude models.' },
        ],
      },
    ],
  },
};
