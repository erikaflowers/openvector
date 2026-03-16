export default {
  slug: 'prompting',
  title: 'Prompting',
  subtitle: 'How to talk to your agents.',
  duration: '20 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'Prompting Is Direction, Not Magic',
        body: [
          'A prompt is an instruction you give to an AI agent. The quality of the output depends almost entirely on the quality of the input. This is not mystical. It is the same principle behind every creative collaboration: a clear brief produces better work than a vague one.',
          'The prompt engineering industry has overcomplicated this. You do not need special frameworks, secret phrases, or ritualistic formatting. You need clarity. Say what you want, provide context, and be specific about constraints. That is it.',
          'If you did the planning and Nouns & Verbs work in Level 01, you already know how to prompt well. A good plan translates directly into good prompts. Each decomposed task is a prompt waiting to happen.',
        ],
      },
      {
        type: 'callout',
        body: 'The best prompt is a clear description of what you want, why you want it, and what constraints exist. No tricks required.',
      },
      {
        type: 'text',
        heading: 'The Anatomy of a Good Prompt',
        body: [
          'A good prompt has three parts: context, intent, and constraints.',
          'Context: What does the agent need to know? "This is a React app using CSS modules. The existing components use functional components with hooks. The design follows a dark theme with green accents."',
          'Intent: What do you want to happen? "Create a sidebar navigation component that shows a list of lessons organized by level."',
          'Constraints: What are the boundaries? "Use the existing .ovl-sidebar CSS class. Do not use any external libraries. Keep state management local to the component."',
          'You do not need all three every time. Claude Code already has context from reading your files. But the more specific you are about intent and constraints, the fewer iterations you will need.',
        ],
      },
      {
        type: 'code',
        body: '# Weak prompt:\n"Make a sidebar"\n\n# Better prompt:\n"Create a sidebar navigation component"\n\n# Good prompt:\n"Create a sidebar navigation component that displays lesson\ntitles organized by level. Each level should be collapsible.\nThe active lesson should be highlighted. Use the existing\n.ovl-sidebar CSS class and follow the same component\npatterns as LearnNav.jsx."',
      },
      {
        type: 'text',
        heading: 'Specificity Over Length',
        body: [
          'Good prompts are not long. They are specific. "Build a form with three fields: title (text input, required), description (textarea, optional), and priority (dropdown with Low/Medium/High, default Medium). On submit, log the values to the console." That is 35 words, and it is unambiguous.',
          'Compare: "Build a form for adding items. It should have the usual fields and work well." That is vaguer, and the agent will make assumptions about what "usual fields" means and what "work well" means. You will spend more time correcting those assumptions than you saved by writing a shorter prompt.',
          'The paradox: writing a specific prompt takes 30 extra seconds. Debugging a vague prompt takes 10 extra minutes.',
        ],
      },
      {
        type: 'text',
        heading: 'Showing Instead of Telling',
        body: [
          'One of the most effective prompting techniques is pointing to existing code: "Follow the same pattern as UserCard.jsx but for recipes." Claude Code can read that file and replicate the structure, naming conventions, and style patterns automatically.',
          'This is why consistent code matters. If your existing components follow the same pattern, the agent can learn from them. If every component is structured differently, the agent has no clear model to follow.',
          'You can also provide examples inline: "Format the data like this: { id: string, title: string, items: Array<{ name: string, done: boolean }> }." A concrete example eliminates ambiguity faster than any amount of description.',
        ],
      },
      {
        type: 'text',
        heading: 'Iterative Prompting',
        body: [
          'You rarely get exactly what you want on the first prompt. That is fine. Prompting is a conversation, not a single instruction.',
          'Start broad, then refine. "Build the book list component." Review the output. "Add a search filter at the top." Review again. "The search should filter as you type, not on submit." Each prompt narrows in on what you actually want.',
          'This is not failure — it is design iteration. You would not expect a wireframe to be perfect on the first sketch. The same applies here. The advantage of AI is that each iteration takes seconds, not hours.',
          'The key discipline: review before continuing. Do not stack five instructions without looking at the output from the first one. Each review is a chance to catch misunderstandings early.',
        ],
      },
      {
        type: 'text',
        heading: 'Common Prompting Patterns',
        body: [
          'Explain first, then build: "Explain how the current routing works in this project, then add a new route for /settings." This ensures the agent understands the existing system before modifying it.',
          'Constrain the scope: "Only modify the Header component. Do not change any other files." This prevents the agent from making well-intentioned but unwanted changes elsewhere.',
          'Ask for options: "What are three ways we could implement dark mode in this project? Describe the trade-offs of each." Get the agent thinking before it starts coding.',
          'Request explanations: "Add error handling to the API call and explain each choice you made." This teaches you while the agent builds, turning every prompt into a learning opportunity.',
        ],
      },
      {
        type: 'text',
        heading: 'What Not to Do',
        body: [
          'Do not be vague and then blame the agent. "Make it look good" is not an instruction — it is a wish. If the output does not match your vision, the prompt did not describe your vision.',
          'Do not prompt in bulk. "Build the entire checkout flow with cart, payment, confirmation, email receipt, and order history" will produce a tangled mess. Decompose into individual prompts.',
          'Do not skip review. The most dangerous pattern is prompt-approve-prompt-approve without reading the code. You will end up with a codebase nobody understands. Review is not optional.',
          'Do not copy-paste prompts from the internet. Your project has specific context, conventions, and constraints. Generic prompts produce generic code that does not fit your project.',
        ],
      },
      {
        type: 'exercise',
        title: 'Write Three Prompts',
        body: 'Pick a feature you want to build (or use: a reading list with add/remove/mark-as-read). Write three prompts, each building on the last: (1) the data structure and initial component, (2) a specific interaction (adding a book), (3) a visual refinement (styling the list). For each prompt, include context, intent, and at least one constraint. If you have Claude Code installed, run them and compare the output to what you expected. Where did the agent surprise you? Where did your prompt need more specificity?',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', note: 'The official guide from the people who built Claude. Comprehensive and practical.' },
          { title: 'Claude Code Best Practices', url: 'https://docs.anthropic.com/en/docs/claude-code/best-practices', note: 'Specific tips for getting the best results from Claude Code.' },
          { title: 'Prompt Engineering for Developers (DeepLearning.AI)', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', note: 'Free short course on prompting fundamentals. Model-agnostic principles.' },
        ],
      },
    ],
  },
};
