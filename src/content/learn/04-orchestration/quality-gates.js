export default {
  slug: 'quality-gates',
  title: 'Quality Gates',
  subtitle: 'When to stop and verify.',
  duration: '18 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What Is a Quality Gate?',
        body: [
          'A quality gate is a deliberate pause in your workflow where you stop building and start verifying. It is a checkpoint that work must pass through before continuing. Does the feature work? Does the code make sense? Did the agent follow the conventions? Is anything broken?',
          'Without quality gates, errors accumulate. The agent makes a small mistake in stage two. You do not notice. Stage three builds on top of it. Stage four compounds it. By stage five, you have a bug that is deeply embedded in the architecture and expensive to fix.',
          'Quality gates catch problems when they are cheap. A bug found immediately after it is introduced takes seconds to fix. The same bug found three stages later takes hours.',
        ],
      },
      {
        type: 'callout',
        body: 'AI agents are confident. They rarely say "I am not sure this is right." Quality gates are how you impose uncertainty on a process that lacks it. Trust the agent to build. Trust yourself to verify.',
      },
      {
        type: 'text',
        heading: 'Types of Quality Gates',
        body: [
          'Build gate: Does the code compile? Does the dev server start? Are there any errors in the console? This is the minimum — if the build is broken, nothing else matters. Run this after every stage.',
          'Functional gate: Does the feature work as intended? Can you complete the user task? Does clicking the button do the right thing? This requires actually using the application, not just reading the code.',
          'Integration gate: Does the new code work with everything else? Did adding search break the recipe list? Did the new component conflict with existing styles? This requires testing the whole app, not just the new feature.',
          'Code quality gate: Is the code readable? Does it follow the project conventions? Would you understand it in a month? This is where you read the code the agent wrote and make sure you are comfortable maintaining it.',
          'Not every change needs every gate. A CSS tweak needs the build gate and a visual check. A new API endpoint needs all four.',
        ],
      },
      {
        type: 'text',
        heading: 'The Five-Minute Review',
        body: [
          'After an agent completes a task, spend five minutes on a structured review. This is not optional — it is the habit that separates clean projects from messy ones.',
          'Minute one: Read the summary. What did the agent do? Does it match what you asked for? If the agent made decisions you did not expect, understand why before proceeding.',
          'Minute two: Run the app. Click through the feature. Try the happy path. Does it work?',
          'Minute three: Try to break it. Enter garbage data. Click things out of order. Resize the window. Check mobile. Hit the back button.',
          'Minute four: Read the code. Scan the changes. Do you understand what was written? Are there any red flags — hardcoded values, missing error handling, overly complex logic?',
          'Minute five: Check the surroundings. Did the change affect anything else? Are there console warnings? Did the bundle size jump unexpectedly?',
          'Five minutes. That is all it takes to catch 90% of issues before they become expensive.',
        ],
      },
      {
        type: 'text',
        heading: 'Automated Gates',
        body: [
          'Some quality gates can be automated. A linter checks code style. A type checker catches type errors. A test suite verifies behavior. A build script confirms the project compiles.',
          'Set up automated gates early. Even a basic setup — a linter and a build check — catches a surprising number of issues. The agent writes code that works but uses double quotes when your project uses single quotes. The linter catches it. The agent forgets to import a component. The build fails and reports exactly what is missing.',
          'Automated gates are fast, consistent, and never skip steps. Human gates are flexible, contextual, and can catch things automation misses. Use both. Automate what can be automated. Manually review what requires judgment.',
        ],
      },
      {
        type: 'text',
        heading: 'When the Agent Pushes Back',
        body: [
          'Sometimes you tell the agent to change something and it resists — not literally, but through its response. "I would not recommend that approach because..." or "That could cause issues with..."',
          'This is a quality signal. The agent has identified a concern. It might be wrong — it often is. But it might be right, and dismissing it without consideration is a missed quality gate.',
          'Treat agent pushback as a code review comment. Read it. Consider it. If you disagree, explain why and proceed. If you are unsure, ask the agent to elaborate. The conversation itself is a quality gate — it surfaces considerations you might have missed.',
          'The worst response to pushback is "just do it" without understanding the concern. You lose the information the agent was trying to give you. Even if the concern is wrong, understanding why the agent raised it tells you something about how it interpreted your instructions.',
        ],
      },
      {
        type: 'text',
        heading: 'The Review Agent Pattern',
        body: [
          'A dedicated reviewer agent is one of the most effective quality gates. After a builder agent completes work, a separate agent reviews it. This works because the reviewer has fresh context — no sunk cost in the code, no memory of why a questionable decision seemed reasonable at the time.',
          'The reviewer\'s CLAUDE.md should focus on what to look for: "Check for bugs, edge cases, accessibility issues, convention violations, and security concerns. Do not rewrite anything. Report what you find and rank it by severity."',
          'A reviewer agent typically finds issues that the builder would not catch in its own work. It spots the missing null check, the accessibility violation, the CSS that breaks on mobile. It is an extra pair of eyes that never gets tired and has no ego about the code it reviews.',
        ],
      },
      {
        type: 'text',
        heading: 'Recovery When Gates Fail',
        body: [
          'Quality gates will catch problems. That is their purpose. The question is: what do you do when something fails?',
          'If the build is broken: fix the immediate error. Do not add more features on top of a broken build. This is the most important rule in staged development.',
          'If a feature does not work: decide whether to fix or revert. If the fix is obvious (a typo, a missing import), fix it. If the issue is fundamental (wrong approach, bad architecture), revert to the last good commit and try a different approach.',
          'If code quality is poor: refactor before continuing. Bad code that works is tempting to keep, but it becomes the foundation for everything that follows. Take twenty minutes to clean it up now instead of fighting it for the rest of the project.',
          'Git makes recovery safe. You committed after each stage, right? Then reverting is one command. This is why verification and version control work together.',
        ],
      },
      {
        type: 'exercise',
        title: 'Build a Quality Checklist',
        body: 'Create a quality gate checklist for your project. Write five to seven items you will check after every agent task. Include at least one from each category: build (does it compile), functional (does it work), integration (does it play nice), and code quality (can you maintain it). Print it out or pin it next to your screen. Use it for your next five agent sessions. After five sessions, revise it — which checks caught real issues? Which were unnecessary? Refine the list.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'The Checklist Manifesto by Atul Gawande', url: 'https://atulgawande.com/book/the-checklist-manifesto/', note: 'How simple checklists prevent complex failures. Originally about surgery, directly applicable to software.' },
          { title: 'Accelerate by Forsgren, Humble & Kim', url: 'https://itrevolution.com/product/accelerate/', note: 'Research-backed evidence that quality gates (continuous integration, testing) accelerate delivery instead of slowing it down.' },
          { title: 'Code Review Best Practices (Google)', url: 'https://google.github.io/eng-practices/review/', note: 'Google\'s internal code review guidelines. The gold standard for what to look for in code review.' },
        ],
      },
    ],
  },
};
