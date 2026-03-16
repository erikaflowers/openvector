/**
 * Zero Vector Learn — Glossary
 *
 * Alphabetically sorted terms covering the full curriculum:
 * design-led engineering, AI agents, systems thinking,
 * terminal/git basics, React, deployment, and ZV philosophy.
 */

const glossary = [
  {
    term: 'AI Agent',
    definition: 'A software system that uses a large language model to autonomously perform tasks, make decisions, and interact with tools on behalf of a human operator. Agents go beyond simple chat — they read files, write code, run commands, and iterate toward a goal.',
    related: '/learn/curriculum/04-orchestration/multi-agent',
  },
  {
    term: 'API',
    definition: 'Application Programming Interface. A defined contract that lets two systems talk to each other — one sends a request, the other sends a response. APIs are how your frontend gets data from your backend, and how services communicate across the internet.',
    related: '/learn/curriculum/01-foundation/nouns-and-verbs',
  },
  {
    term: 'Boundaryless',
    definition: 'The Zero Vector principle that traditional role boundaries between design and engineering are artificial constraints. A Systems Auteur works across the full stack — research, design, architecture, code, deployment — because the medium demands fluency, not fragmentation.',
    related: '/learn/curriculum/05-auteur/personal-methodology',
  },
  {
    term: 'Branch',
    definition: 'A parallel line of development in Git. Branches let you work on features or experiments without affecting the main codebase. When the work is ready, you merge it back. Think of it as a safe sandbox for changes.',
    related: '/learn/curriculum/00-orientation/git-basics',
  },
  {
    term: 'Build Step',
    definition: 'The process that transforms your source code into production-ready files. For a React app, this typically means bundling JavaScript, optimizing assets, and outputting static files a server can host. If the build fails, nothing deploys.',
    related: '/learn/curriculum/00-orientation/deployment',
  },
  {
    term: 'CLAUDE.md',
    definition: 'A markdown file placed at the root of a repository that gives Claude Code project-specific instructions, context, and rules. It is the primary mechanism for shaping agent behavior per-codebase — personality, workflow constraints, architecture notes, and domain knowledge all live here.',
    related: '/learn/curriculum/04-orchestration/claude-md',
  },
  {
    term: 'CLI',
    definition: 'Command Line Interface. A text-based way to interact with your computer by typing commands instead of clicking buttons. The terminal runs a CLI shell. Mastering the CLI is foundational — it is how developers and agents operate.',
    related: '/learn/curriculum/00-orientation/terminal',
  },
  {
    term: 'Commit',
    definition: 'A snapshot of your project at a specific point in time, saved in Git. Each commit has a message describing what changed and why. Commits are the atoms of version history — small, intentional, and reversible.',
    related: '/learn/curriculum/00-orientation/git-basics',
  },
  {
    term: 'Component',
    definition: 'A self-contained, reusable piece of UI in React. Components accept data (props), manage their own state, and return markup. Good components are small, focused, and composable — like LEGO bricks for interfaces.',
    related: '/learn/curriculum/02-the-medium/react-basics',
  },
  {
    term: 'Context Window',
    definition: 'The total amount of text (measured in tokens) that a language model can process in a single interaction. Everything the model reads and generates must fit within this window. Managing context is a core skill — what you include shapes what the model can do.',
    related: '/learn/curriculum/02-the-medium/prompting',
  },
  {
    term: 'CRUD',
    definition: 'Create, Read, Update, Delete — the four fundamental operations for persistent data. Nearly every application is, at its core, a CRUD system with a specific user experience layered on top. Understanding CRUD clarifies what your system actually does.',
    related: '/learn/curriculum/01-foundation/nouns-and-verbs',
  },
  {
    term: 'CSS',
    definition: 'Cascading Style Sheets. The language that controls how HTML elements look — layout, color, typography, spacing, animation. CSS is where design intent meets the browser. Writing good CSS means understanding the cascade, specificity, and the box model.',
    related: '/learn/curriculum/02-the-medium/react-basics',
  },
  {
    term: 'Data Modeling',
    definition: 'The practice of defining what your system knows — its nouns, their attributes, and the relationships between them. A data model is the skeleton of your application. Get it right and everything else flows; get it wrong and you fight the structure forever.',
    related: '/learn/curriculum/01-foundation/data-modeling',
  },
  {
    term: 'Deployment',
    definition: 'The process of making your application available on the internet. This typically involves pushing code to a hosting platform that runs a build step and serves the output. Deployment is where your work becomes real — from localhost to the world.',
    related: '/learn/curriculum/00-orientation/deployment',
  },
  {
    term: 'Design-Led Engineering',
    definition: 'An approach where design thinking drives technical decisions, not the other way around. The designer does not hand off mockups to be interpreted — they work in the medium, shaping code with the same intentionality they bring to wireframes. Engineering serves the design vision.',
    related: '/learn/curriculum/01-foundation/systems-thinking',
  },
  {
    term: 'DNS',
    definition: 'Domain Name System. The internet\'s phone book — it translates human-readable domain names (like zerovector.design) into IP addresses that servers understand. Configuring DNS is the bridge between buying a domain and your site actually appearing at that address.',
    related: '/learn/curriculum/00-orientation/dns',
  },
  {
    term: 'Environment Variables',
    definition: 'Key-value pairs stored outside your codebase that configure how your application behaves. API keys, database URLs, and feature flags are common examples. They keep secrets out of your code and let the same codebase run differently in development vs. production.',
    related: '/learn/curriculum/00-orientation/deployment',
  },
  {
    term: 'Feedback Loop',
    definition: 'A cycle where the output of a system feeds back as input, reinforcing or correcting behavior. In design, fast feedback loops (deploy, observe, adjust) produce better outcomes than long planning cycles. Tighten your loops — ship, learn, iterate.',
    related: '/learn/curriculum/03-the-pipeline/validation',
  },
  {
    term: 'Git',
    definition: 'A distributed version control system that tracks changes to files over time. Git lets you save snapshots (commits), work in parallel (branches), and collaborate without overwriting each other\'s work. It is the foundation of modern software development.',
    related: '/learn/curriculum/00-orientation/git-basics',
  },
  {
    term: 'Information Architecture',
    definition: 'The structural design of shared information environments. IA defines how content is organized, labeled, and connected so that people can find what they need and understand where they are. It is the blueprint that precedes any visual design.',
    related: '/learn/curriculum/01-foundation/information-architecture',
  },
  {
    term: 'Investiture',
    definition: 'In Brandon Sanderson\'s Cosmere, Investiture is the fundamental energy that powers magic systems. In Zero Vector, it is a metaphor for design mastery — the deep, practiced knowledge that lets a designer channel powerful tools (like AI) with precision and intent, rather than flailing with raw power.',
    related: '/learn/curriculum/05-auteur/framework-design',
  },
  {
    term: 'Jobs to Be Done (JTBD)',
    definition: 'A framework for understanding what users actually hire a product to do. Instead of asking "what features do they want," you ask "what progress are they trying to make?" JTBD shifts focus from demographics to motivation — the why behind the action.',
    related: '/learn/curriculum/03-the-pipeline/jtbd',
  },
  {
    term: 'localhost',
    definition: 'Your own computer acting as a web server. When you run a development server, it serves your application at localhost (usually http://localhost:3000 or similar). It is your private preview — only you can see it until you deploy.',
    related: '/learn/curriculum/00-orientation/deployment',
  },
  {
    term: 'Multi-Agent System',
    definition: 'An architecture where multiple AI agents collaborate on a shared goal, each with a defined role and domain. Instead of one agent doing everything, specialized agents handle backend, frontend, marketing, and operations — coordinated through shared context and clear contracts.',
    related: '/learn/curriculum/04-orchestration/multi-agent',
  },
  {
    term: 'Nouns and Verbs',
    definition: 'A systems thinking shorthand: nouns are the things in your system (users, posts, projects), and verbs are what can be done to them (create, edit, archive). Defining nouns and verbs early forces clarity about what your application actually is.',
    related: '/learn/curriculum/01-foundation/nouns-and-verbs',
  },
  {
    term: 'Orchestration',
    definition: 'The practice of coordinating multiple agents, tools, or processes toward a unified outcome. Orchestration defines who does what, in what order, with what inputs. It is the difference between a group of agents and a functioning team.',
    related: '/learn/curriculum/04-orchestration/orchestration',
  },
  {
    term: 'Prompt Engineering',
    definition: 'The craft of writing instructions that reliably produce desired behavior from a language model. Good prompts are specific, structured, and context-rich. Great prompts encode intent so clearly that the model feels like a collaborator, not a slot machine.',
    related: '/learn/curriculum/02-the-medium/prompting',
  },
  {
    term: 'Quality Gates',
    definition: 'Defined checkpoints in a workflow where output must meet specific criteria before proceeding. In an agentic pipeline, quality gates prevent compounding errors — each agent\'s work is validated before the next agent builds on it. Ship with confidence, not hope.',
    related: '/learn/curriculum/04-orchestration/quality-gates',
  },
  {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'A pattern where a language model is given relevant documents retrieved from a knowledge base before generating a response. Instead of relying on training data alone, the model answers grounded in your specific content. RAG is how you make AI an expert on your domain.',
    related: '/learn/curriculum/04-orchestration/staged-prompts',
  },
  {
    term: 'React',
    definition: 'A JavaScript library for building user interfaces through composable components. React uses a declarative model — you describe what the UI should look like for a given state, and React figures out how to update the DOM efficiently. It is the dominant paradigm for modern web frontends.',
    related: '/learn/curriculum/02-the-medium/react-basics',
  },
  {
    term: 'Repository',
    definition: 'A Git-tracked project directory containing your code, history, and configuration. A repo is the canonical home for a codebase. It holds every commit ever made, every branch, and (when pushed to GitHub) becomes the collaboration hub for a team.',
    related: '/learn/curriculum/00-orientation/repos',
  },
  {
    term: 'Semantic HTML',
    definition: 'HTML that uses elements according to their meaning, not just their appearance. A <nav> is navigation, an <article> is content, a <button> triggers an action. Semantic HTML improves accessibility, SEO, and code clarity — it tells the browser (and the developer) what things are.',
    related: '/learn/curriculum/02-the-medium/react-basics',
  },
  {
    term: 'SPA (Single Page Application)',
    definition: 'A web application that loads once and dynamically updates content without full page reloads. Navigation happens client-side — the browser swaps components in and out while the URL updates. SPAs feel fast and app-like but require careful handling of routing, SEO, and initial load.',
    related: '/learn/curriculum/02-the-medium/deploy',
  },
  {
    term: 'Systems Auteur',
    definition: 'The Zero Vector ideal: a practitioner with deep design fluency who wields AI agents to operate across the entire product lifecycle — research, architecture, code, deployment, and marketing. Not a generalist who does everything poorly, but a design mind with system-wide reach through agentic amplification.',
    related: '/learn/curriculum/05-auteur/auteur-practice',
  },
  {
    term: 'Systems Thinking',
    definition: 'The practice of understanding how parts of a system interrelate and influence each other over time. Instead of solving problems in isolation, systems thinking reveals feedback loops, dependencies, and emergent behavior. It is the foundation of good architecture and good design.',
    related: '/learn/curriculum/01-foundation/systems-thinking',
  },
  {
    term: 'Terminal',
    definition: 'The application that provides access to your computer\'s command line interface. Through the terminal, you run shell commands, navigate the file system, execute scripts, manage Git, and operate AI agents like Claude Code. It is the cockpit.',
    related: '/learn/curriculum/00-orientation/terminal',
  },
  {
    term: 'The Crew Model',
    definition: 'A multi-agent organizational pattern where each AI agent has a defined persona, domain, and responsibilities — like a film crew. Instead of one monolithic assistant, you run a team: an architect, a frontend specialist, a backend engineer, a marketer, each with their own CLAUDE.md and voice.',
    related: '/learn/curriculum/04-orchestration/the-crew-model',
  },
  {
    term: 'Vibe Coding',
    definition: 'The practice of generating code through AI prompts without understanding what the code does, how it works, or why it is structured that way. Vibe coding produces output without comprehension. It is the opposite of working in the medium — it is letting the tool work you.',
    related: '/learn/curriculum/05-auteur/personal-methodology',
  },
  {
    term: 'Work in the Medium',
    definition: 'The Zero Vector principle that designers must engage directly with the material of their craft — code, not just mockups. Working in the medium means understanding the constraints, affordances, and grain of the technology you are designing for. You cannot design what you do not touch.',
    related: '/learn/curriculum/02-the-medium/claude-code',
  },
  {
    term: 'Zero-Vector Design',
    definition: 'A design philosophy and manifesto arguing that AI is the most powerful design tool ever created — if wielded with intention, craft, and systems thinking. Zero Vector rejects vibe coding and reclaims agency: designers should lead the engineering, not be replaced by it. The name invokes a vector with magnitude but no predefined direction — pure potential, awaiting intent.',
    related: '/learn/curriculum/01-foundation/architecture',
  },
];

export default glossary;
