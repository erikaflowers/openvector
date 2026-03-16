export default {
  slug: 'vector-md',
  title: 'What Is VECTOR.md?',
  subtitle: 'The single artifact that holds your project\'s intent, architecture, and constraints.',
  duration: '15 min',
  status: 'available',
  badge: 'new',
  updatedAt: '2026-03-03',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'The Missing Artifact',
        body: [
          'You have spent the first four lessons of this level learning to think in systems, understand architecture, break problems into nouns and verbs, and plan before you build. All of that thinking is valuable. But where does it go?',
          'In traditional software development, this thinking lives in Confluence pages nobody reads, in Figma files that drift from reality, in Slack threads that disappear into the void. The thinking happens, and then it evaporates.',
          'VECTOR.md is where it lives instead.',
          'A VECTOR.md file is a single markdown document that captures your project\'s intent, architecture, and constraints in a format that both humans and AI agents can read. It is the written artifact of all the systems thinking and planning work you have been doing. One file. One source of truth. Always in the repo, always up to date, always informing every decision.',
        ],
      },
      {
        type: 'text',
        heading: 'The Context Problem',
        body: [
          'AI agents have no memory between sessions. Every time you start a conversation with an AI assistant, it knows nothing about your project, your users, your architecture decisions, or why you chose React over Svelte. You have to re-explain everything. Every. Single. Time.',
          'This is the fundamental problem VECTOR.md solves.',
          'When an AI agent reads your VECTOR.md at the start of a session, it instantly has the context it needs: who the users are, what problem you are solving, what architecture decisions have been made, what constraints exist, what has already been built. The agent goes from blank slate to informed collaborator in seconds.',
          'But VECTOR.md is not just for AI agents. It is for you. It forces you to articulate your thinking clearly enough that a machine can understand it. And if a machine can understand it, that means your thinking is precise. Vague ideas hiding in your head become concrete decisions on the page.',
        ],
      },
      {
        type: 'text',
        heading: 'What Goes in a VECTOR.md?',
        body: [
          'A VECTOR.md typically contains these sections (though every project adapts the format to its needs):',
          'Project Overview captures what you are building and why. Not a marketing pitch. A clear, honest description of the problem you are solving and the approach you are taking.',
          'Users describes who will use this thing. Not personas with stock photos. Real descriptions of real people with real needs. What are they trying to accomplish? What do they know? What frustrates them?',
          'Jobs to Be Done lists the core tasks your product enables. You will learn this framework in depth in Level 03, but the idea is simple: people do not buy products, they hire them to do a job. What jobs does your product do?',
          'Architecture Decisions records the technical choices you have made and why. "We chose Supabase because we need real-time subscriptions and row-level security without managing our own database" is useful. "We chose Supabase" is not.',
          'Data Model outlines the core entities and their relationships. The nouns and verbs from Lesson 3, made concrete.',
          'Constraints captures what you cannot or will not do. Budget limits, timeline, technical limitations, intentional scope cuts. Constraints are not failures. They are design decisions.',
          'Current State describes what exists right now. What is built, what is broken, what is next. This section changes frequently and keeps everyone (including AI agents) oriented.',
        ],
      },
      {
        type: 'callout',
        body: 'CLAUDE.md tells agents how to behave. VECTOR.md tells agents what they\'re building. Together, these two files form the complete context stack for AI-assisted development. The agent knows its role, its constraints, and its communication style (CLAUDE.md). And it knows the project, the users, and the architecture (VECTOR.md). You will learn about CLAUDE.md in Level 04.',
      },
      {
        type: 'code',
        body: '# VECTOR.md — Recipe Keeper\n\n## Project Overview\n\nRecipe Keeper is a personal recipe management app for home cooks\nwho are tired of scrolling through blog posts to find the actual\nrecipe. Users paste a URL, the app extracts the recipe, and stores\nit in a clean, searchable format.\n\n## Users\n\n**Primary:** Home cooks (25-55) who cook 3-5 times per week and\ncollect recipes from multiple sources. They are not technical. They\nwant simplicity, not features.\n\n**Secondary:** Meal planners who batch-cook on weekends and need to\nscale recipes and generate shopping lists.\n\n## Jobs to Be Done\n\n- Save a recipe from any URL without the life story\n- Find a recipe I saved last month by ingredient or cuisine\n- Scale a recipe up or down and get adjusted measurements\n- Generate a shopping list from selected recipes\n\n## Architecture\n\n- **Frontend:** React + Vite, deployed to Netlify\n- **Backend:** FastAPI, deployed to Railway\n- **Database:** Supabase (PostgreSQL), RLS enabled\n- **AI:** Claude API for recipe extraction from URLs\n\n**Why these choices:** Supabase gives us auth, database, and\nreal-time without managing infrastructure. Railway handles Python\nbackend with zero config. Netlify for static frontend is free tier\nfriendly.\n\n## Data Model\n\n- **Recipe** — title, source_url, ingredients[], steps[], tags[],\n  servings, prep_time, cook_time\n- **Ingredient** — name, amount, unit, recipe_id\n- **Collection** — name, recipe_ids[]\n- **ShoppingList** — generated from selected recipes, grouped by\n  ingredient\n\n## Constraints\n\n- No mobile app (web-only for v1)\n- No social features (this is personal, not a platform)\n- Must work offline after initial load (PWA)\n- Budget: $0/month infrastructure (free tiers only)\n\n## Current State\n\n- Recipe extraction API: working\n- Frontend scaffold: deployed, basic routing\n- Auth: Supabase Google OAuth, functional\n- Search: not started\n- Shopping list: not started',
      },
      {
        type: 'text',
        heading: 'How This Connects to What You\'ve Learned',
        body: [
          'Look at that example VECTOR.md again. Every section maps to something you have already studied in this level:',
          'Systems Thinking (Lesson 1) taught you to see the whole system before zooming into parts. The Project Overview and Architecture sections capture that systems-level view.',
          'Architecture (Lesson 2) taught you how to make structural decisions. The Architecture section records those decisions with reasoning attached.',
          'Nouns & Verbs (Lesson 3) taught you to identify the core entities and actions. The Data Model section is literally the nouns and verbs, formalized.',
          'Planning (Lesson 4) taught you to sequence work and identify dependencies. The Current State section keeps that plan honest by tracking reality.',
          'VECTOR.md is not a separate concept. It is the container for all the thinking you have been learning to do. The artifact that holds the architecture, the plan, and the intent in one place.',
        ],
      },
      {
        type: 'exercise',
        title: 'Read a VECTOR.md',
        body: 'Go to the Investiture scaffold repository at github.com/erikaflowers/investiture and find the VECTOR.md file. Open it and answer these questions: (1) What problem is the project solving? (2) Who are the users? (3) What architecture decisions were made, and what reasons are given? (4) What constraints are listed? (5) How does the Current State section help an AI agent who is reading this for the first time? You do not need to understand every technical term. Focus on the structure: how the document is organized, what information it prioritizes, and how it would help someone (or something) get up to speed quickly.',
      },
      {
        type: 'resources',
        heading: 'Links',
        items: [
          { title: 'Investiture Scaffold Repository', url: 'https://github.com/erikaflowers/investiture', note: 'A real VECTOR.md in a real project.' },
          { title: 'Investiture Framework', url: 'https://zerovector.design/investiture', note: 'The Investiture framework page on Zero Vector.' },
          { title: 'Zero Vector Substack', url: 'https://eflowers.substack.com', note: 'Articles on the methodology.' },
        ],
      },
    ],
  },
  knowledgeCheck: [
    { question: 'What problem does VECTOR.md solve?', hint: 'Think about what AI agents know (or do not know) at the start of every session.' },
    { question: 'What is the difference between CLAUDE.md and VECTOR.md?', hint: 'One is about behavior, the other is about context.' },
    { question: 'Why should VECTOR.md exist before you start building?', hint: 'Think about what happens to vague ideas that never get written down.' },
  ],
};
