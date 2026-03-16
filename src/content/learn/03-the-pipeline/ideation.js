export default {
  slug: 'ideation',
  title: 'Ideation',
  subtitle: 'Diverge before you converge.',
  duration: '18 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'What Is Ideation?',
        body: [
          'Ideation is the structured generation of possible solutions. You have researched the problem, synthesized the insights, and defined the jobs. Now you explore the solution space — broadly and deliberately — before narrowing down to what you will actually build.',
          'The key word is "before." Most builders skip ideation entirely. They have an idea, they start building. Ideation asks: is there a better idea? A simpler one? A more elegant one? You cannot evaluate options you never generated.',
          'Ideation is the divergent phase — you want quantity over quality. Wild ideas alongside obvious ones. The goal is not to find the answer. It is to explore enough possibilities that the answer becomes clear.',
        ],
      },
      {
        type: 'callout',
        body: 'The first idea is rarely the best idea. It is the most obvious idea. Ideation gives you the space to discover the second, third, and tenth ideas — where the real breakthroughs live.',
      },
      {
        type: 'text',
        heading: 'How Many Ideas?',
        body: [
          'More than you think. If you are solving the job "When I find a recipe, I want to save it instantly," there are dozens of ways to approach it. A browser extension. A share sheet. A camera that scans cookbooks. A chatbot you text a URL to. A bookmarklet. Copy-paste into a form. Voice capture.',
          'Not all of these are good. That is the point. You need a volume of ideas to find the unexpected good ones. The browser extension is obvious. The voice capture is weird. But maybe "text a URL to a number and it saves automatically" is surprisingly practical.',
          'Aim for at least ten ideas per job. The first five will be obvious. Ideas six through ten are where the interesting ones appear.',
        ],
      },
      {
        type: 'text',
        heading: 'Techniques That Work',
        body: [
          'How Might We: Reframe your job statement as a question. "How might we let users save recipes the moment they find them?" Now answer it ten times. Each answer is an idea.',
          'Worst Possible Idea: Deliberately generate terrible solutions. "Require users to type the entire recipe by hand." "Only work on Tuesdays." This frees your thinking from the pressure of being correct and often surfaces surprisingly useful inversions.',
          'Analogous Inspiration: How does a different domain solve a similar job? How does Shazam solve "I found a song and want to save it instantly"? One tap and done. How does Pinterest solve "I found an image and want to save it"? One click to a board. What can you steal from their patterns?',
          'Constraint Manipulation: What if the user has no internet? What if they have one hand free? What if they are in a hurry? Constraints force creative solutions that often turn out to be better for everyone.',
        ],
      },
      {
        type: 'text',
        heading: 'Evaluating Ideas',
        body: [
          'After diverging, converge. You need criteria for choosing which ideas to pursue.',
          'Impact: How well does this solve the job? A browser extension solves it completely for desktop users. A camera scanner works for cookbooks but not websites.',
          'Feasibility: Can you build this with your current skills and tools? A browser extension is achievable. A computer vision system is a different project entirely.',
          'Delight: Will this feel good to use? Sometimes the feasible, impactful solution is also boring. A form is feasible and functional but not delightful. Can you find the intersection of all three?',
          'Plot your ideas on a 2x2 matrix: Impact vs. Feasibility. The top-right quadrant (high impact, high feasibility) is your sweet spot. Pick one or two ideas from that quadrant.',
        ],
      },
      {
        type: 'text',
        heading: 'Sketching Solutions',
        body: [
          'Once you have narrowed to two or three ideas, sketch them. Not wireframes — sketches. Quick, rough, on paper. The goal is to make the idea concrete enough to evaluate, not pretty enough to present.',
          'Draw the key screens. How does the user start? What do they see? What do they tap or click? What happens next? Six boxes on a napkin showing the flow is worth more than an hour of discussing the idea abstractly.',
          'Sketching reveals problems that words hide. "It is a simple save button" feels easy until you sketch it and realize: where does it appear? What feedback does the user see? Where does the recipe go? What if saving fails? The sketch forces you to think through the experience.',
        ],
      },
      {
        type: 'text',
        heading: 'Ideation with AI',
        body: [
          'AI is an excellent brainstorming partner. "Give me ten different ways a user could save a recipe they found on someone else\'s website. Include at least three unconventional approaches." Claude will generate ideas you would not have thought of.',
          'Use AI for volume, then apply your judgment for selection. The AI does not know your users, your constraints, or your taste. But it is relentlessly generative — it will never say "I cannot think of anything else."',
          'You can also use AI to stress-test ideas: "What are the three biggest problems with the browser extension approach?" or "How would a user with low technical skills experience this?"',
        ],
      },
      {
        type: 'exercise',
        title: 'Ten Ideas in Ten Minutes',
        body: 'Pick one of the job statements from the previous lesson. Set a timer for ten minutes. Write ten different solutions — no filtering, no judging, just generating. Include at least two that sound ridiculous. When the timer goes off, evaluate each idea on impact (1-5) and feasibility (1-5). Multiply the scores. The top two ideas are your candidates for prototyping.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Sprint by Jake Knapp', url: 'https://www.thesprintbook.com/', note: 'Google Ventures\' design sprint process. The chapter on ideation (Sketch) is excellent.' },
          { title: 'Creative Confidence by Tom & David Kelley', url: 'https://www.creativeconfidence.com/', note: 'IDEO founders on building creative capacity. The ideation mindset, explained for non-designers.' },
          { title: 'Gamestorming', url: 'https://gamestorming.com/', note: 'A library of ideation and brainstorming techniques. Searchable by goal.' },
        ],
      },
    ],
  },
};
