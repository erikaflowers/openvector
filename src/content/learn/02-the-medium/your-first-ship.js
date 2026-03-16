export default {
  slug: 'your-first-ship',
  title: 'Your First Ship',
  subtitle: 'Something real. On the internet. Yours.',
  duration: '20 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'The Capstone',
        body: [
          'This is the culmination of Level 02. You have learned the tools (Claude Code), the communication (prompting), the rhythm (iteration), the framework (React), and the deployment pipeline. Now you put it all together.',
          'Your assignment: build something real and ship it. Not a tutorial exercise. Not a code-along. Something you choose, something you care about, something that lives on the internet at a real URL that you can send to someone.',
          'It does not need to be big. It does not need to be perfect. It needs to exist. A personal portfolio page. A reading list tracker. A recipe collection. A fan page for something you love. A tool that solves a small problem in your life. The scope does not matter. The shipping does.',
        ],
      },
      {
        type: 'callout',
        body: 'The gap between "I could build that" and "I built that" is bridged by shipping. Everything before this was preparation. This is the thing.',
      },
      {
        type: 'text',
        heading: 'Choose Your Project',
        body: [
          'Pick something that meets three criteria:',
          'You care about it. If you are not interested in the subject, you will not finish it. Build something you actually want to exist in the world.',
          'It is scope-appropriate. One to three pages. No login system. No database (use local data or static content). No complex animations. You can always add those later.',
          'It can be finished in a few hours. This is not a weeks-long project. It is a sprint. Get to "deployed" as fast as possible, then iterate from there.',
        ],
      },
      {
        type: 'text',
        heading: 'The Process',
        body: [
          'Step 1: Plan. Write down what you are building in three sentences. List the pages. List the components. Sketch the layout on paper. Do the Nouns & Verbs exercise if the project has data.',
          'Step 2: Set up. Create the project with Vite, initialize Git, push to GitHub, connect to Netlify. Get the deploy pipeline working before you write a single line of real code. Deploy the default Vite template. Confirm it is live.',
          'Step 3: Build. Work with Claude Code, one component at a time. Build the layout first. Then the navigation. Then the content for each page. Review after every change. Commit after every working increment.',
          'Step 4: Polish. Responsive layout. Consistent spacing. Good typography. Real content (not lorem ipsum). A favicon. A page title. The small things that make the difference between "a project" and "my project."',
          'Step 5: Ship. Push to main. Verify the deploy. Send the URL to someone. That last step — sending the URL — is when it becomes real.',
        ],
      },
      {
        type: 'text',
        heading: 'Project Ideas',
        body: [
          'If you need inspiration, here are ten projects that fit the criteria:',
          'A personal portfolio with three case studies (even if the case studies are short — they can grow over time).',
          'A reading list: books you have read this year, with covers and one-sentence reviews.',
          'A link collection: your favorite resources on a topic, organized by category.',
          'A recipe page: five of your favorite recipes, beautifully presented.',
          'A fan page for a book, movie, game, or artist — curated information with your commentary.',
          'A local guide: your favorite restaurants, parks, and spots in your city.',
          'A glossary or reference card for a topic you are learning (CSS properties, design principles, etc.).',
          'A single-page resume or CV with better design than a PDF.',
          'A project timeline showing what you have built and when.',
          'A manifesto: your beliefs about design, craft, technology, or your industry.',
        ],
      },
      {
        type: 'text',
        heading: 'Common Pitfalls',
        body: [
          'Scope creep: You start with a reading list and end up designing a full social network for book lovers. Resist. Ship the list. Add features later.',
          'Perfection paralysis: The font is not quite right. The spacing feels slightly off. The hero section needs one more iteration. Ship it. Fix it later. The live version is always better than the local version because it is real.',
          'Skipping the plan: "I will just start coding and figure it out." This leads to three hours of wandering. Spend 15 minutes planning. It is an investment that pays back immediately.',
          'Not committing: You build for an hour, the code is working, and then you make one change that breaks everything. Without commits, you cannot go back. Commit after every working state.',
          'Building for someone else: Do not build what you think will impress people. Build what you actually want. Authentic projects are always more compelling than performative ones.',
        ],
      },
      {
        type: 'text',
        heading: 'After You Ship',
        body: [
          'Once your project is live, take a moment. You just built a thing on the internet using AI-assisted development. You planned it, directed an AI agent to build it, reviewed every piece, and deployed it. That is the Zero Vector workflow.',
          'Now iterate. Look at it on your phone. Show it to a friend. Notice what you want to change. Open Claude Code and make those changes. Push. The site updates.',
          'Add it to your portfolio. Write a post about what you built. Share the URL. The project is not just a learning exercise — it is proof of capability. You can look at a problem, plan a solution, direct an AI to build it, and ship it. That is a skill employers and clients are desperate for.',
        ],
      },
      {
        type: 'exercise',
        title: 'Ship It',
        body: 'Right now. Pick a project from the ideas list (or use your own). Set a timer for three hours. Follow the five-step process: plan (15 min), set up and deploy the empty project (15 min), build with Claude Code (2 hours), polish (20 min), ship and send the URL to someone (10 min). At the end of three hours, whatever state it is in, it ships. Done is better than perfect. Live is better than local. Ship it.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Ship It! by Jared Richardson and Will Gwaltney', url: 'https://pragprog.com/titles/prj/ship-it/', note: 'A classic on the practice of shipping software. Short, opinionated, and practical.' },
          { title: 'Netlify Drop', url: 'https://app.netlify.com/drop', note: 'Drag and drop a folder to deploy instantly. The fastest path from files to live site.' },
          { title: 'Zero Vector — The Manifesto', url: 'https://zerovector.design/', note: 'Read (or re-read) the manifesto. You are now practicing what it preaches.' },
        ],
      },
    ],
  },
};
