export default {
  slug: 'multiple-agents',
  title: 'Working with Multiple Agents',
  subtitle: 'Crew roles, CLAUDE.md per agent, switching contexts, and coordinating parallel work.',
  category: 'working-with-agents',
  duration: '30 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  prerequisites: ['04-orchestration/multi-agent', '04-orchestration/the-crew-model', '04-orchestration/claude-md'],
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What You Will Learn',
        body: [
          'How to run multiple Claude Code instances as specialized agents — each with its own role, its own knowledge, and its own CLAUDE.md personality. This is the crew model: instead of one general-purpose assistant, you have a team of specialists who each own a domain.',
          'This is not a theoretical exercise. This is how Zero Vector itself was built — by a crew of agents, each with defined responsibilities, coordinated by one human operator. By the end of this guide, you will be able to set up and run your own crew.',
        ],
      },
      {
        type: 'text',
        heading: 'Why Multiple Agents',
        body: [
          'A single Claude Code session has a context window. The more you ask it to hold in its head — frontend code, backend logic, deployment config, marketing copy, database schemas — the more diluted its attention becomes. It starts making mistakes. It forgets conventions. It conflates different parts of the system.',
          'Multiple agents solve this by specialization. Your frontend agent only thinks about components and styling. Your backend agent only thinks about APIs and data. Your content agent only thinks about copy and messaging. Each one is deeply focused on its domain, and you coordinate the handoffs.',
          'This is exactly how real teams work. A designer does not also write the database migrations. Specialization enables depth.',
        ],
      },
      {
        type: 'callout',
        body: 'You are not managing AI. You are directing a team. The skills are the same ones that make a good design director or engineering lead: clear role definitions, explicit boundaries, and clean handoffs.',
      },
      {
        type: 'step',
        number: '01',
        title: 'Define Your Crew Roles',
        body: [
          'Before opening a single terminal, decide what roles you need. Think about the domains of your project — the parts that are distinct enough to warrant separate focus.',
          'For a typical web application, you might have: a Frontend agent (UI components, pages, styling, routing), a Backend agent (API endpoints, database, authentication), and a Content agent (copy, marketing pages, documentation). For a simpler project, you might just have two: a Builder agent and a Polish agent.',
          'Start small. Two agents is enough to learn the pattern. You can add more as you get comfortable coordinating them.',
        ],
      },
      {
        type: 'step',
        number: '02',
        title: 'Create a CLAUDE.md for Each Agent',
        body: [
          'Each agent gets its own CLAUDE.md file that defines its role, its domain, and its constraints. These files live in separate directories — one per agent — or in a shared repo where each agent\'s CLAUDE.md is loaded from a specific path.',
          'The simplest setup: create a folder for each agent\'s worktree, each with its own CLAUDE.md. Or use Claude Code\'s project-level CLAUDE.md structure where different instances read different config files.',
          'The key sections in an agent CLAUDE.md are: Role (who you are), Domain (what you own), Conventions (how you work), and Boundaries (what you do not touch).',
        ],
      },
      {
        type: 'template',
        title: 'Agent CLAUDE.md Template',
        body: '# [Agent Name] — [Role Title]\n\n## Role\nYou are [name], the [role] for [project name]. You own [specific domain].\n\n## Domain\nYour files and responsibilities:\n- src/components/ — All UI components\n- src/pages/ — Page-level components\n- src/styles/ — CSS and design tokens\n- public/ — Static assets\n\n## Conventions\n- Component naming: PascalCase (e.g., ProjectCard.jsx)\n- CSS class prefix: zv-\n- Max component size: 150 lines\n- Use semantic HTML elements\n- All colors from variables.css — never hardcode hex values\n\n## Boundaries\n- Do NOT modify files in api/ or server/\n- Do NOT add npm dependencies without asking\n- Do NOT change the routing structure in App.jsx without approval\n- Do NOT modify other agents\' CLAUDE.md files\n\n## Coordination\nWhen you need something from another agent:\n- Backend data: describe the API shape you need, the operator will relay it\n- Content copy: use placeholder text, content agent will replace it\n- Design tokens: check variables.css first, request new ones if needed\n\n## Current Sprint\n[What you are working on right now — updated each session]',
      },
      {
        type: 'step',
        number: '03',
        title: 'Set Up Your Terminal Layout',
        body: [
          'You need one terminal window per agent. Use your terminal\'s split pane or tab feature. On macOS Terminal, use Command+D to split. On iTerm2, use Command+Shift+D. On VS Code, you can open multiple integrated terminals.',
          'Label each pane or tab with the agent name — "Frontend", "Backend", "Content" — so you always know which agent you are talking to. This sounds small but it prevents the most common coordination mistake: giving a frontend instruction to the backend agent.',
        ],
      },
      {
        type: 'step',
        number: '04',
        title: 'Start Each Agent in Its Context',
        body: [
          'Navigate each terminal to the appropriate directory and start Claude Code. Each instance will read its own CLAUDE.md and load the appropriate context.',
        ],
      },
      {
        type: 'code',
        body: '# Terminal 1: Frontend agent\ncd ~/projects/my-app\nclaude\n\n# Terminal 2: Backend agent (same repo, different CLAUDE.md via worktree or flags)\ncd ~/projects/my-app\nclaude --profile backend\n\n# Or if using separate directories:\ncd ~/projects/my-app-backend\nclaude',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'Verify each agent knows its role. Ask: "What is your role and what files do you own?" If the agent cannot answer correctly, its CLAUDE.md needs more clarity.',
        ],
      },
      {
        type: 'step',
        number: '05',
        title: 'Establish the Coordination Protocol',
        body: [
          'Multiple agents create a coordination problem: what happens when the frontend agent needs data from the backend agent? What if two agents try to modify the same file?',
          'The rule is simple: agents do not talk to each other. You are the coordinator. You relay information between them. If the frontend agent needs a new API endpoint, it tells you what shape the data should be. You tell the backend agent to build it. When it is done, you tell the frontend agent the endpoint is ready.',
          'This sounds like overhead, but it is actually faster than letting agents coordinate themselves (which they cannot do) or having one agent try to handle everything (which it will do poorly).',
        ],
      },
      {
        type: 'step',
        number: '06',
        title: 'Define Interface Contracts',
        body: [
          'Before agents start building, define the interfaces between their domains. For a web app, this usually means the API contract — what endpoints exist, what data they accept, and what they return.',
          'Write these contracts in a shared document that both agents can reference:',
        ],
      },
      {
        type: 'template',
        title: 'API Contract Example',
        body: '## API Contracts\n\n### GET /api/projects\nReturns a list of all projects.\n```json\n[\n  {\n    "id": "string",\n    "title": "string",\n    "slug": "string",\n    "excerpt": "string",\n    "tags": ["string"],\n    "coverImage": "string (URL)",\n    "date": "string (ISO 8601)"\n  }\n]\n```\n\n### GET /api/projects/:slug\nReturns a single project by slug.\n```json\n{\n  "id": "string",\n  "title": "string",\n  "slug": "string",\n  "body": "string (markdown)",\n  "tags": ["string"],\n  "coverImage": "string (URL)",\n  "date": "string (ISO 8601)",\n  "relatedProjects": ["string (slug)"]\n}\n```\n\n### POST /api/contact\nSends a contact form message.\nBody: { "name": "string", "email": "string", "message": "string" }\nResponse: { "success": true }',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'The frontend agent builds components that expect this data shape. The backend agent builds endpoints that return this data shape. They never need to look at each other\'s code. The contract is the interface.',
        ],
      },
      {
        type: 'step',
        number: '07',
        title: 'Work in Parallel Without Conflicts',
        body: [
          'The simplest rule for avoiding conflicts: agents own files, not features. The frontend agent never touches files in api/. The backend agent never touches files in src/components/. If both need to modify a shared file (like a config or a type definition), you do it yourself or designate one agent as the owner of that file.',
          'Use git branches if you want to be extra safe. Each agent works on its own branch, and you merge them. But for most solo projects, the file ownership rule is enough.',
        ],
      },
      {
        type: 'step',
        number: '08',
        title: 'Handle Handoffs',
        body: [
          'When one agent finishes work that another agent needs, the handoff looks like this:',
          'Backend agent finishes the /api/projects endpoint. You switch to the frontend terminal. You say: "The projects API is ready at /api/projects. It returns an array of objects with these fields: id, title, slug, excerpt, tags, coverImage, date. Build the ProjectList page that fetches from this endpoint and displays the data."',
          'You are translating between domains. The frontend agent does not need to know how the database query works. It just needs to know the shape of the data. That is the handoff.',
        ],
      },
      {
        type: 'step',
        number: '09',
        title: 'Keep a Session Log',
        body: [
          'At the end of each work session, update each agent\'s CLAUDE.md with what was accomplished. Add a "Current Sprint" or "Context Catchup" section that summarizes: what was done, what is in progress, and what is next.',
          'This is critical because Claude Code sessions do not persist across restarts. When you open the terminal tomorrow, the agent has no memory of yesterday. The CLAUDE.md is its memory. Keep it updated and the agent can pick up right where it left off.',
        ],
      },
      {
        type: 'callout',
        body: 'The crew model is not about managing AI complexity. It is about applying the oldest principle in engineering: separation of concerns. Each agent has a clear domain, clear boundaries, and a clear interface to the rest of the system. That is just good architecture.',
      },
      {
        type: 'exercise',
        title: 'Try It',
        body: 'Set up a two-agent crew for your project. Define a Frontend agent and a Backend (or Content) agent. Write a CLAUDE.md for each one. Open two terminal windows, start Claude Code in each, and verify that each agent knows its role. Then give them one task each and practice the handoff: the backend agent creates an API endpoint, and you relay the data shape to the frontend agent to build the UI.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Multi-Agent Orchestration (Curriculum)', url: '/learn/curriculum/04-orchestration/multi-agent', note: 'The conceptual foundation for running multiple AI agents.' },
          { title: 'The Crew Model (Curriculum)', url: '/learn/curriculum/04-orchestration/the-crew-model', note: 'How the Zero Vector crew is structured — roles, boundaries, and coordination.' },
          { title: 'CLAUDE.md (Curriculum)', url: '/learn/curriculum/04-orchestration/claude-md', note: 'Writing effective context files that give each agent its identity.' },
          { title: 'Quality Gates (Curriculum)', url: '/learn/curriculum/04-orchestration/quality-gates', note: 'How to verify each agent\'s output before integration.' },
        ],
      },
    ],
  },
};
