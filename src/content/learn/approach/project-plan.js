export default {
  slug: 'project-plan',
  title: 'Creating a Project Plan',
  subtitle: 'From PRD to task breakdown. How to scope sprints, sequence work, and define milestones.',
  category: 'planning',
  duration: '20 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-02-14',
  prerequisites: ['01-foundation/planning', '01-foundation/systems-thinking'],
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What You Will Build',
        body: [
          'A phased project plan that turns your PRD and use cases into a concrete sequence of work. You will know what to build first, what depends on what, and what "done" looks like at each stage.',
          'This is not a Gantt chart. This is a thinking tool — a way to see the shape of the project before you start typing commands. The plan keeps you from building the roof before the foundation.',
        ],
      },
      {
        type: 'text',
        heading: 'Vertical Slicing vs. Horizontal Slicing',
        body: [
          'There are two ways to break a project into phases. Horizontal slicing means building by layer: first all the data models, then all the API endpoints, then all the pages. Vertical slicing means building by feature: one complete feature at a time, from data to UI.',
          'For AI-assisted projects, vertical slicing is almost always better. Here is why: when you tell Claude Code to build a complete contact form — the component, the validation, the submission endpoint, the success message — it can see the whole picture. It makes better decisions about structure because it understands the full flow.',
          'Horizontal slicing creates a problem: you build a bunch of data models, then weeks later try to build UI on top of them, and discover the models do not match what the UI needs. Vertical slicing catches these mismatches immediately because you are building and testing the full stack at once.',
        ],
      },
      {
        type: 'callout',
        body: 'Build one complete thing at a time, not all of one layer at a time. A working contact form is more valuable than five half-built pages.',
      },
      {
        type: 'step',
        number: '01',
        title: 'Gather Your Inputs',
        body: [
          'You need two documents in front of you: your PRD (what you are building) and your use cases (how each feature works). If you do not have these, go write them first. Planning without requirements is just guessing.',
          'Open both documents. You are going to reference them throughout this process.',
        ],
      },
      {
        type: 'step',
        number: '02',
        title: 'Define Your Phases',
        body: [
          'Every project has natural phases. Do not invent phases for the sake of process — look for the real ones. Most projects follow this pattern:',
          'Phase 1: Foundation. Project setup, folder structure, CLAUDE.md, core data models. The skeleton that everything hangs on. This is usually one work session.',
          'Phase 2: Core features. The Must Have use cases from your prioritization. The things that, if they did not work, the product would be pointless. This is one to three work sessions.',
          'Phase 3: Supporting features. The Should Have use cases. Things users expect but that are not the core value proposition. Another one to three sessions.',
          'Phase 4: Polish. Performance, edge cases, responsive design, accessibility, copy editing. This is where good becomes great. One to two sessions.',
          'Phase 5: Launch. Deployment, DNS, analytics, final testing in production. One session.',
        ],
      },
      {
        type: 'step',
        number: '03',
        title: 'Assign Use Cases to Phases',
        body: [
          'Take your prioritized use cases and drop them into phases. Must Have use cases go into Phase 2. Should Have goes into Phase 3. Nice to Have either goes into Phase 3 or gets cut from v1 entirely.',
          'If you have too many Must Have use cases for a single phase, split Phase 2 into 2a and 2b. The rule: each phase should be completable in one to three focused work sessions. If it is bigger than that, break it down further.',
        ],
      },
      {
        type: 'step',
        number: '04',
        title: 'Identify Dependencies',
        body: [
          'Some things must be built before other things. A project gallery page depends on having individual project data to display. A search feature depends on having content to search through. A user profile page depends on having authentication.',
          'Draw arrows between your use cases: "this one requires that one to exist first." That gives you the build order within each phase. Start with the use cases that have no dependencies, then build the ones that depend on them.',
        ],
      },
      {
        type: 'step',
        number: '05',
        title: 'Define Milestones',
        body: [
          'A milestone is a point where you can step back and say "this works." It is not a task completion — it is a state of the product. Good milestones are demonstrable: you can show someone the product at that point and they can see real value.',
          'For a portfolio site: Milestone 1 might be "the homepage loads with real content and navigation works." Milestone 2 might be "all project pages are viewable with real content." Milestone 3 might be "contact form works end-to-end." Milestone 4 might be "site is live at my domain."',
          'Milestones are your checkpoints. After each one, commit, test, and celebrate. Then move to the next one.',
        ],
      },
      {
        type: 'step',
        number: '06',
        title: 'Break Phases into Tasks',
        body: [
          'Now zoom into each phase and list the specific tasks. These are the instructions you will give to Claude Code. Each task should be small enough to complete in one Claude Code conversation — typically 15 to 45 minutes of work.',
          'Good task size: "Create the ContactForm component with name, email, and message fields, client-side validation, and a submit handler that posts to Formspree." Bad task size: "Build the entire contact system." Also bad: "Add a label to the email field." Too big means Claude loses context. Too small means you spend all your time managing instead of building.',
        ],
      },
      {
        type: 'step',
        number: '07',
        title: 'Assemble the Plan',
        body: [
          'Put it all together using the template below. Save it as project-plan.md in your project root. This is your roadmap — you will reference it at the start of every work session to know what comes next.',
        ],
      },
      {
        type: 'template',
        title: 'Project Plan Template',
        body: '# [Project Name] — Project Plan\n\n## Phase 1: Foundation\n**Milestone:** Project skeleton is set up, repo is initialized, CLAUDE.md is written.\n**Tasks:**\n- [ ] Create project folder and initialize git\n- [ ] Write CLAUDE.md with stack, structure, and conventions\n- [ ] Set up framework (Vite + React, or whatever your stack is)\n- [ ] Create folder structure (pages, components, styles, content)\n- [ ] First commit\n\n## Phase 2: Core Features\n**Milestone:** [What is true when the core works? e.g., "A visitor can browse projects and read about each one."]\n**Tasks:**\n- [ ] [Task from Use Case 1 — be specific about what to build]\n- [ ] [Task from Use Case 1 — next piece]\n- [ ] [Task from Use Case 2]\n- [ ] [Task from Use Case 2]\n- [ ] Integration test: walk through Use Cases 1 and 2 end-to-end\n\n## Phase 3: Supporting Features\n**Milestone:** [What is true? e.g., "Contact form works, resume downloads, site has analytics."]\n**Tasks:**\n- [ ] [Tasks from Should Have use cases]\n- [ ] [More tasks]\n- [ ] Integration test: all features work together\n\n## Phase 4: Polish\n**Milestone:** [What is true? e.g., "Site is responsive, accessible, fast, and copy is final."]\n**Tasks:**\n- [ ] Responsive design pass (test at 320px, 768px, 1024px, 1440px)\n- [ ] Accessibility audit (keyboard nav, screen reader, color contrast)\n- [ ] Performance check (Lighthouse score > 90)\n- [ ] Final copy editing\n- [ ] Edge case handling from use case notes\n\n## Phase 5: Launch\n**Milestone:** Site is live at [domain] and working in production.\n**Tasks:**\n- [ ] Deploy to hosting provider\n- [ ] Configure custom domain and DNS\n- [ ] Set up analytics (Plausible, GA4, or similar)\n- [ ] Test all features in production\n- [ ] Share the URL — it is live',
      },
      {
        type: 'step',
        number: '08',
        title: 'Estimate Time (Honestly)',
        body: [
          'For each phase, estimate how many focused work sessions it will take. A work session is two to four hours of uninterrupted building. Be honest — things always take longer than you think, especially the first time.',
          'A simple portfolio site with five pages and a contact form: Phase 1 takes one session. Phase 2 takes two sessions. Phase 3 takes one session. Phase 4 takes one session. Phase 5 takes half a session. Total: about five to six sessions, or roughly 15-20 hours of focused work. That is a realistic estimate for someone learning.',
        ],
      },
      {
        type: 'step',
        number: '09',
        title: 'Reference Your Plan in CLAUDE.md',
        body: [
          'Add a line to your CLAUDE.md so Claude Code knows the plan exists:',
        ],
      },
      {
        type: 'code',
        body: '## Documentation\nSee PRD.md for product requirements.\nSee use-cases.md for detailed user scenarios.\nSee project-plan.md for the phased build plan and current progress.',
      },
      {
        type: 'text',
        heading: '',
        body: [
          'At the start of each work session, tell Claude Code: "I am working on Phase 2. The next task is [task]. See project-plan.md for context." This grounds the conversation in your plan instead of starting from scratch every time.',
        ],
      },
      {
        type: 'exercise',
        title: 'Try It',
        body: 'Take your PRD and use cases and create a project plan with at least three phases. For each phase, define a milestone and list three to five tasks. Save it as project-plan.md in your project root.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Planning (Curriculum)', url: '/learn/curriculum/01-foundation/planning', note: 'The foundational lesson on scoping and shaping work.' },
          { title: 'Systems Thinking (Curriculum)', url: '/learn/curriculum/01-foundation/systems-thinking', note: 'How to see the interconnected structure of what you are building.' },
          { title: 'Building Use Cases (Approach)', url: '/learn/approach/building-use-cases', note: 'How to create the use cases that feed into your project plan.' },
          { title: 'Shape Up — Basecamp', url: 'https://basecamp.com/shapeup', note: 'A methodology for shaping, scoping, and shipping work in cycles.' },
        ],
      },
    ],
  },
};
