export default {
  slug: 'scaffold-project',
  title: 'Setting Up a Project',
  subtitle: 'Folder structure, version control, CLAUDE.md, and your first commit. The project launch checklist.',
  category: 'getting-started',
  duration: '25 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  prerequisites: ['00-orientation/terminal', '00-orientation/git-basics', '00-orientation/repos'],
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What You Will Build',
        body: [
          'A properly structured project with version control, a clear folder layout, and a CLAUDE.md file that tells your AI tools exactly how this project works. This is the foundation every project starts from.',
          'Skipping this step is how projects become unmaintainable. Spending twenty minutes here saves twenty hours later.',
        ],
      },
      {
        type: 'step',
        number: '01',
        title: 'Create and Enter Your Project Folder',
        body: [
          'Choose a meaningful name. Not "test" or "project1" — something that describes what this is.',
        ],
      },
      {
        type: 'code',
        body: 'mkdir my-portfolio-site\ncd my-portfolio-site',
      },
      {
        type: 'step',
        number: '02',
        title: 'Initialize Git',
        body: [
          'Git tracks every change you make. It is your unlimited undo button and your collaboration layer. Initialize it immediately — before you write any code.',
        ],
      },
      {
        type: 'code',
        body: 'git init',
      },
      {
        type: 'step',
        number: '03',
        title: 'Create Your CLAUDE.md',
        body: [
          'This is the most important file in your project. It tells Claude Code (and any other AI tool) about your project: what it is, how it is structured, what conventions you follow, and what it should never do.',
          'Create the file and open it in your editor:',
        ],
      },
      {
        type: 'code',
        body: 'touch CLAUDE.md',
      },
      {
        type: 'template',
        title: 'Starter CLAUDE.md',
        body: '# Project Name\n\nOne-sentence description of what this project is.\n\n## Stack\n\n- Framework: [React/Vue/Svelte/vanilla HTML]\n- Styling: [CSS/Tailwind/styled-components]\n- Build tool: [Vite/Next.js/none]\n- Deployment: [Netlify/Vercel/GitHub Pages]\n\n## Structure\n\n```\nsrc/\n  pages/       — One file per page\n  components/  — Reusable UI components\n  styles/      — CSS files\n  content/     — Text content, data files\npublic/        — Static assets (images, fonts)\n```\n\n## Conventions\n\n- CSS class prefix: [your-prefix]-\n- Component naming: PascalCase\n- File naming: kebab-case\n\n## Rules\n\n- Do not add dependencies without asking\n- Do not modify files outside src/ without asking\n- Keep components under 150 lines\n- Use semantic HTML',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Fill this in with your actual project details. The more specific you are, the better Claude Code will understand your project. This file is read automatically every time Claude Code starts in this directory.',
        ],
      },
      {
        type: 'step',
        number: '04',
        title: 'Create Your Folder Structure',
        body: [
          'Set up the skeleton before writing any code. This is information architecture — deciding where things live before they exist.',
        ],
      },
      {
        type: 'code',
        body: 'mkdir -p src/pages src/components src/styles src/content public',
      },
      {
        type: 'step',
        number: '05',
        title: 'Initialize Your Package Manager',
        body: [
          'If you are building a JavaScript project (React, Vue, or any modern framework), initialize npm. This creates a package.json that tracks your project dependencies.',
        ],
      },
      {
        type: 'code',
        body: 'npm init -y',
      },
      {
        type: 'step',
        number: '06',
        title: 'Create a .gitignore',
        body: [
          'Tell Git which files to ignore — things like installed packages, build output, and environment files with secrets.',
        ],
      },
      {
        type: 'template',
        title: 'Standard .gitignore',
        body: 'node_modules/\ndist/\n.env\n.DS_Store\n*.log',
      },
      {
        type: 'step',
        number: '07',
        title: 'Make Your First Commit',
        body: [
          'You now have a project structure, a CLAUDE.md, and a .gitignore. Commit this foundation before building anything.',
        ],
      },
      {
        type: 'code',
        body: 'git add .\ngit commit -m "Initial project structure and CLAUDE.md"',
      },
      {
        type: 'callout',
        body: 'Commit early, commit often. Every meaningful change gets a commit. This is not optional — it is how you build a safety net. If something breaks, you can always go back to the last commit that worked.',
      },
      {
        type: 'step',
        number: '08',
        title: 'Start Claude Code and Verify',
        body: [
          'Now start Claude Code in your project directory:',
        ],
      },
      {
        type: 'code',
        body: 'claude',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Ask Claude to describe the project. If it reads your CLAUDE.md correctly, it will know what the project is, what stack you are using, and what conventions to follow. That is the test — if the AI understands your project structure, you set it up correctly.',
        ],
      },
      {
        type: 'text',
        heading: 'Your Project is Ready',
        body: [
          'You now have: a clean folder structure, version control tracking every change, a CLAUDE.md that communicates your intentions to AI tools, and a first commit to anchor everything.',
          'This takes fifteen minutes and saves you from the number one mistake people make with AI coding tools: starting without structure. Without this foundation, your project becomes a tangle of files that nobody — including the AI — can navigate.',
          'Next: write a PRD that describes what you are actually building, so your instructions to Claude Code are grounded in a clear plan.',
        ],
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'CLAUDE.md (Curriculum)', url: '/learn/curriculum/04-orchestration/claude-md', note: 'The full lesson on writing effective CLAUDE.md files.' },
          { title: 'Git Basics (Curriculum)', url: '/learn/curriculum/00-orientation/git-basics', note: 'How version control works and why it matters.' },
          { title: 'Architecture (Curriculum)', url: '/learn/curriculum/01-foundation/architecture', note: 'How to see the structure behind applications.' },
        ],
      },
    ],
  },
};
