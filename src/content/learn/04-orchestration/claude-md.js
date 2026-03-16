export default {
  slug: 'claude-md',
  title: 'CLAUDE.md',
  subtitle: 'Teaching your agents who they are.',
  duration: '20 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'The Instruction File',
        body: [
          'A CLAUDE.md file is a plain text file that sits at the root of your project. When an AI agent like Claude Code opens your project, it reads this file first — before looking at any code. It is the briefing document. The mission parameters. The "read this before you do anything" note you leave for every agent that will ever touch your codebase.',
          'Without a CLAUDE.md, every conversation with an AI agent starts from zero. You explain the project. You explain the conventions. You explain what not to touch. You answer the same questions session after session. A CLAUDE.md eliminates that repetition by encoding your project knowledge into a persistent document that the agent reads automatically.',
          'Think of it as the difference between hiring someone new every day and having a team member who remembers everything. The CLAUDE.md is the memory.',
        ],
      },
      {
        type: 'callout',
        body: 'A CLAUDE.md is not documentation for humans. It is documentation for agents. Write it the way you would brief a new team member on their first day: what matters, what to avoid, and how things work around here.',
      },
      {
        type: 'text',
        heading: 'What Goes in a CLAUDE.md',
        body: [
          'A good CLAUDE.md answers the questions an agent would ask if it were smart enough to ask them. Start with the essentials:',
          'Project identity. What is this project? What does it do? Who is it for? A two-sentence summary saves the agent from guessing.',
          'Tech stack. What framework, what language, what build tools. "React 19, Vite 7, custom CSS, deployed on Netlify." The agent needs this to write compatible code.',
          'Conventions. How do you name files? Where do components go? Do you use semicolons? Tabs or spaces? What CSS methodology? These seem small, but an agent that violates your conventions creates work for you.',
          'Architecture. How is the project structured? What are the key directories? Where does data flow? A brief map of the codebase prevents the agent from putting files in the wrong place.',
          'Rules. What should the agent never do? "Never modify the database schema without asking." "Do not add dependencies without approval." "Never commit directly to main." These guardrails prevent expensive mistakes.',
        ],
      },
      {
        type: 'code',
        language: 'markdown',
        body: '# Project: Recipe Organizer\n\nA web app for saving and organizing recipes from around the web.\nBuilt for home cooks who want one place for everything they cook.\n\n## Stack\n- React 19 + Vite 7\n- Custom CSS (no frameworks)\n- Local storage for data persistence\n- Deployed on Netlify\n\n## Conventions\n- Components in src/components/, one per file\n- CSS in src/styles/site.css (single file, sectioned)\n- camelCase for variables, PascalCase for components\n- No semicolons, single quotes\n\n## Architecture\nsrc/\n  components/   — React components\n  content/      — Static data and content\n  styles/       — CSS\n  App.jsx       — Root component and routing\n  main.jsx      — Entry point\n\n## Rules\n- Do not add npm dependencies without asking\n- Do not modify the data schema in storage.js\n- Keep components under 150 lines\n- Test in Chrome and Safari before committing',
      },
      {
        type: 'text',
        heading: 'Voice and Personality',
        body: [
          'Here is where CLAUDE.md becomes powerful beyond simple configuration. You can define how the agent communicates. Not just what it builds — how it thinks and speaks.',
          'This is not frivolous. If you are working with an agent for hours, its communication style affects your workflow. An agent that is terse when you need explanation, or verbose when you need action, creates friction. Defining the voice eliminates that friction.',
          'You can go further: give the agent a role. "You are the frontend specialist. You own the component library and the CSS system. You care about accessibility and performance." A role focuses the agent. It makes decisions through a lens. It has opinions. This is not roleplay — it is specialization.',
          'The Zero Vector crew model (which you will learn in the final lesson of this level) takes this to its logical conclusion: multiple agents, each with their own CLAUDE.md, each with a distinct role, working on the same codebase.',
        ],
      },
      {
        type: 'text',
        heading: 'Layered Instructions',
        body: [
          'CLAUDE.md files can be layered. A root CLAUDE.md covers the whole project. A CLAUDE.md inside a subdirectory adds rules specific to that area. The agent reads all of them, with more specific files taking priority.',
          'This is useful for large projects. The root file says "this is a React app, use these conventions." The api/ subdirectory file says "this is the backend, use Python, follow these API patterns." The tests/ file says "always use this test framework, mock external services."',
          'Layering prevents your root CLAUDE.md from becoming a massive document. Each area of the project carries its own context. When the agent works in that area, it gets the relevant briefing automatically.',
        ],
      },
      {
        type: 'text',
        heading: 'The Living Document',
        body: [
          'A CLAUDE.md is not something you write once. It evolves with your project. When you discover that the agent keeps making the same mistake, add a rule. When you establish a new convention, document it. When something changes, update the file.',
          'The best CLAUDE.md files are written collaboratively with the agent itself. After a session, ask: "What would have been helpful to know at the start?" The agent will often identify gaps in the briefing that you, as someone deeply familiar with the project, would never notice.',
          'Version control your CLAUDE.md alongside your code. It is part of the project. When someone (or some agent) clones the repo, the instructions come with it.',
        ],
      },
      {
        type: 'text',
        heading: 'Common Mistakes',
        body: [
          'Too vague. "Write good code" tells the agent nothing. "Use functional components, keep state minimal, prefer composition over inheritance" gives it something to work with.',
          'Too long. If your CLAUDE.md is 2,000 lines, the agent will lose focus on what matters. Keep it under 200 lines. Link to external docs for deep dives.',
          'Too restrictive. If every line is a "never" rule, the agent cannot do anything. Balance constraints with freedom. Tell it what to do, not just what to avoid.',
          'Outdated. A CLAUDE.md that describes the project as it was three months ago is worse than no CLAUDE.md at all. It creates confident wrongness — the agent follows outdated instructions precisely.',
          'Missing the "why." Rules without reasons get broken. "Do not use CSS frameworks" is weaker than "Do not use CSS frameworks — we maintain a custom design system for brand consistency and performance." The agent understands the intent, not just the rule.',
        ],
      },
      {
        type: 'text',
        heading: 'The Full Context Stack: CLAUDE.md + VECTOR.md',
        body: [
          'CLAUDE.md tells your agent how to behave in this project. But it does not tell your agent why the project exists. That is what VECTOR.md is for.',
          'Together, they form the full Zero Vector context stack. VECTOR.md is the project brief — the vision, the audience, the success criteria, the decisions that shaped the product. CLAUDE.md is the agent\'s job description — the conventions, the guardrails, the tone, the workflow rules. The brief tells the agent what you are building and why. The job description tells the agent how to build it and what to watch out for.',
          'This pairing is what separates Zero Vector from ad hoc prompting. Without VECTOR.md, your agent knows the rules but not the reasons. Without CLAUDE.md, your agent knows the vision but not the method. Both documents live at the root of your project, both are read automatically, and both should exist before the first line of code is written.',
        ],
      },
      {
        type: 'exercise',
        title: 'Write Your First CLAUDE.md',
        body: 'Create a CLAUDE.md for a project you are working on (or the practice project from earlier levels). Include: a two-sentence project description, the tech stack, three conventions you follow, a brief architecture map, and at least two rules. Keep it under 50 lines. Then open the project with Claude Code and ask it to describe the project back to you — if it gets it right, your CLAUDE.md works.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Claude Code Documentation', url: 'https://docs.anthropic.com/en/docs/claude-code', note: 'Official docs on CLAUDE.md files and how Claude Code reads project instructions.' },
          { title: 'Anthropic Cookbook — CLAUDE.md Examples', url: 'https://github.com/anthropics/anthropic-cookbook', note: 'Real-world examples of instruction files for various project types.' },
          { title: 'The Twelve-Factor App', url: 'https://12factor.net/', note: 'Not about AI, but the same principle: encode configuration so every environment gets the right setup automatically.' },
        ],
      },
    ],
  },
};
