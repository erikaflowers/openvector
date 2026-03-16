export default {
  slug: 'multi-agent',
  title: 'Multi-Agent Systems',
  subtitle: 'More than one mind on the problem.',
  duration: '22 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'Why More Than One Agent?',
        body: [
          'A single AI agent is powerful. It can write code, answer questions, debug problems, and build features. But a single agent has limits — the same limits any single worker has. It can only focus on one thing at a time. It carries all the context for every aspect of the project. It switches between frontend and backend, between writing code and reviewing it, between creating and critiquing.',
          'Multiple agents solve this the same way a team solves it: specialization. One agent owns the frontend. Another owns the API. A third handles testing. Each agent carries only the context it needs and develops deep expertise in its domain.',
          'This is not science fiction. This is how Zero Vector itself was built. Not one agent doing everything, but a crew of specialized agents, each with their own CLAUDE.md, their own focus, and their own way of thinking about the problem.',
        ],
      },
      {
        type: 'callout',
        body: 'One agent is an assistant. Multiple agents are a team. The shift is not just in capability — it is in how you think about the work. You stop being a developer with a helper and start being a director with a crew.',
      },
      {
        type: 'text',
        heading: 'Specialization vs. Generalization',
        body: [
          'A generalist agent knows a little about everything. It can write React and Python and SQL and CSS. It gives reasonable answers across all domains. But "reasonable" is the ceiling — it rarely gives expert answers because it is spreading its attention across too many concerns.',
          'A specialist agent knows a lot about one thing. Its CLAUDE.md says: "You are the frontend engineer. You own components, styling, accessibility, and performance. You do not touch the API or database." This constraint is liberating. The agent makes better decisions because it is thinking through one lens, not five.',
          'Specialization also prevents a subtle problem: context pollution. When one agent handles everything, a backend debugging session fills its context with database queries and error logs. When you then ask it to style a component, it is carrying all that irrelevant context. Separate agents have clean context for their domain.',
        ],
      },
      {
        type: 'text',
        heading: 'The Simplest Multi-Agent Setup',
        body: [
          'You do not need fancy tooling to run multiple agents. The simplest setup is two terminal windows, each running Claude Code, each with a different CLAUDE.md.',
          'Window one: the builder. Its CLAUDE.md says to create features, write code, and follow the project conventions. Window two: the reviewer. Its CLAUDE.md says to review code, find bugs, check for edge cases, and never write code itself — only critique.',
          'This separation is powerful because the same AI that writes code is not great at critiquing it. The builder is optimistic — it just created something and believes it works. The reviewer is skeptical — it looks for what could go wrong. These two perspectives, when separated into distinct agents, produce better results than one agent trying to do both.',
        ],
      },
      {
        type: 'text',
        heading: 'Agent Boundaries',
        body: [
          'The hardest part of multi-agent work is defining boundaries. Which agent owns what? What happens when responsibilities overlap?',
          'Define ownership by files. "Agent A owns everything in src/components/. Agent B owns everything in api/." File-based boundaries are clean — there is no ambiguity about who should modify what.',
          'Define ownership by capability. "Agent A writes code. Agent B writes tests. Agent C writes documentation." Capability-based boundaries work well when multiple agents need to read the same files but produce different outputs.',
          'Define ownership by phase. "Agent A builds the feature. When done, Agent B reviews it. When approved, Agent C deploys it." Phase-based boundaries create a pipeline where each agent has a clear trigger for when to act.',
          'The key rule: no two agents should be modifying the same file at the same time. That is how you get conflicts, overwrites, and chaos. Clear boundaries prevent this.',
        ],
      },
      {
        type: 'text',
        heading: 'Communication Between Agents',
        body: [
          'Agents in a multi-agent system do not talk to each other directly. They communicate through artifacts — files, documents, and commit messages that one agent creates and another reads.',
          'The simplest communication channel is the filesystem. Agent A writes a file. Agent B reads it. A CLAUDE.md can specify: "Check the docs/decisions/ folder for architectural decisions before building features." Agent A (the architect) writes decision documents. Agent B (the builder) reads them before coding.',
          'Git commit messages are another channel. A builder agent commits with a descriptive message. A reviewer agent reads the git log to understand what changed and why. Good commit messages become the connective tissue between agents.',
          'For real-time coordination, a shared status file works well. Each agent updates a STATUS.md with what it is working on and what it needs. Other agents check this file before starting work. It is low-tech, but it works.',
        ],
      },
      {
        type: 'text',
        heading: 'Common Multi-Agent Patterns',
        body: [
          'Builder + Reviewer: One builds, one critiques. The builder creates features. The reviewer reads the code and files issues. The builder addresses the issues. This is the most common and most immediately useful pattern.',
          'Frontend + Backend: One agent owns the UI, another owns the API. They agree on a contract (the API endpoints and response shapes) and build independently. This mirrors how human teams work on web applications.',
          'Planner + Executor: One agent designs the approach (reads requirements, outlines the implementation plan). Another agent follows the plan and writes the code. The planner can review the result and adjust the plan for the next iteration.',
          'Writer + Editor: For content projects. One agent drafts, another edits for tone, accuracy, and consistency. The writer focuses on ideas and structure. The editor focuses on craft and correctness.',
        ],
      },
      {
        type: 'text',
        heading: 'Scaling Gradually',
        body: [
          'Do not start with six agents. Start with one. When you notice yourself constantly switching contexts — "now do the API, now do the CSS, now write the tests" — that is your signal to split.',
          'Add a second agent for the thing that is most different from your primary work. If you are mostly building UI, add a testing agent. If you are building full-stack, split frontend and backend. Each split should reduce context switching and improve quality in that domain.',
          'The ceiling for most individual projects is three to five agents. Beyond that, the coordination overhead exceeds the specialization benefit. Save larger crews for larger projects with clear architectural boundaries.',
        ],
      },
      {
        type: 'exercise',
        title: 'The Builder-Reviewer Split',
        body: 'Open two terminal sessions with Claude Code in the same project. In the first, set the context: "You are the builder. Your job is to create a simple to-do list component with add, complete, and delete functionality." Let it build. Then in the second session, set the context: "You are the reviewer. Read the to-do list component that was just created. List every bug, edge case, accessibility issue, and code quality concern you can find. Do not fix anything — only report." Compare what the reviewer finds to what the builder thought was complete.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Claude Code Documentation — Multi-file Projects', url: 'https://docs.anthropic.com/en/docs/claude-code', note: 'How Claude Code handles project context and multiple sessions.' },
          { title: 'The Mythical Man-Month by Fred Brooks', url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month', note: 'The classic on why adding people to a project is not linear. The same principles apply to agents.' },
          { title: 'Team Topologies by Skelton & Pais', url: 'https://teamtopologies.com/', note: 'Modern thinking on team structure and boundaries. Directly applicable to agent architecture.' },
        ],
      },
    ],
  },
};
