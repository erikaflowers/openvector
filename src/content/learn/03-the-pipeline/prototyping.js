export default {
  slug: 'prototyping',
  title: 'Prototyping',
  subtitle: 'The prototype is the product.',
  duration: '20 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'Prototypes Are Arguments',
        body: [
          'A prototype is a tangible representation of an idea, built to test whether the idea works. It is not a polished product. It is an argument: "I think this approach solves the problem. Let me show you and find out."',
          'In traditional design, prototypes were expensive — weeks of wireframing, mockups, and clickable demos before a single line of code. With AI-assisted development, the prototype and the product can be the same thing. You can build a working version faster than you can build a realistic mockup.',
          'This changes the game. Instead of testing a picture of your idea, you test the actual idea. Instead of imagining how users will interact with it, you watch them interact with it. The prototype is the product — just an early version of it.',
        ],
      },
      {
        type: 'callout',
        body: 'With AI tools, the cost of building a real prototype has dropped below the cost of faking one. Build the thing, not a picture of the thing.',
      },
      {
        type: 'text',
        heading: 'Fidelity Levels',
        body: [
          'Prototypes exist on a spectrum of fidelity — how closely they resemble the final product.',
          'Low fidelity: paper sketches, whiteboard drawings, sticky notes arranged as screens. Fast to create, easy to change, great for testing structure and flow. Takes minutes.',
          'Medium fidelity: basic HTML/CSS, a React app with placeholder data, wireframes in Figma. Tests layout, interaction patterns, and basic usability. Takes hours.',
          'High fidelity: a working application with real data, styled to near-final quality. Tests the complete experience. Takes a day or two with AI assistance.',
          'The right fidelity depends on what you are testing. Testing a navigation structure? Paper is fine. Testing whether an interaction feels intuitive? You need something clickable. Testing whether people will actually use your product? You need the real thing.',
        ],
      },
      {
        type: 'text',
        heading: 'The AI-First Prototype',
        body: [
          'Here is the Zero Vector approach to prototyping: skip the mockup, build the thing.',
          'Start with your plan from the Ideation lesson. Open Claude Code. "Build a simple recipe collection app with a form to add recipes (title, URL, notes) and a list view showing all saved recipes. Use local storage for persistence. Keep it minimal — no categories, no search, just add and view."',
          'In 20 minutes, you have a working prototype. It is ugly. It has no edge case handling. It probably has a bug or two. But it works — you can actually add recipes and see them. You can show it to someone and get real feedback.',
          'Compare this to spending two days in Figma creating beautiful screens that someone clicks through while imagining how it would feel to use. The working prototype tells you more in 20 minutes than the mockup tells you in two days.',
        ],
      },
      {
        type: 'text',
        heading: 'What to Test',
        body: [
          'A prototype should test one thing. Not everything — one thing. If you test too many things at once, you will not know which part succeeded or failed.',
          'Test the core interaction: Can the user accomplish the primary job? "Can they save a recipe in under 10 seconds?" If the answer is no, nothing else matters.',
          'Test the value proposition: Does the user want this? "After using this for five minutes, would you use it again?" If the answer is no, the features do not matter.',
          'Test the mental model: Does the user understand how it works? "Where would you go to find a recipe you saved yesterday?" If they guess wrong, the information architecture needs work.',
          'Pick one. Build the minimum needed to test it. Test it. Then iterate or pivot based on what you learn.',
        ],
      },
      {
        type: 'text',
        heading: 'Throwaway vs. Incremental',
        body: [
          'Some prototypes are meant to be thrown away. They exist to answer a question, and once answered, the code is discarded. This is fine. Not all code deserves to survive.',
          'Other prototypes are meant to evolve into the product. You build the foundation right, test the concept, and then iterate toward a production-quality version. This is the more common approach with AI-assisted development because the initial code quality is often good enough to build on.',
          'The decision: if you are testing a wild idea that might not work, make it throwaway. If you are testing the obvious solution and just need to validate the details, make it incremental. Do not try to build production-quality code for an idea you have not validated yet.',
        ],
      },
      {
        type: 'text',
        heading: 'The One-Day Prototype',
        body: [
          'Challenge yourself to build and test a prototype in a single day. Morning: plan what you are testing and what "success" looks like. Late morning: build the prototype with Claude Code. Afternoon: show it to three people and watch them use it. End of day: write down what you learned.',
          'This is not rushing. This is being disciplined about scope. You are not building the product. You are building the minimum needed to test the riskiest assumption. If your riskiest assumption is "people want to organize recipes by mood," build a prototype that has mood-based organization and nothing else.',
          'One day of prototyping and testing teaches you more than two weeks of planning.',
        ],
      },
      {
        type: 'exercise',
        title: 'Build a Prototype',
        body: 'Take the winning idea from the Ideation lesson. Identify the one thing you want to test — the riskiest assumption. Build the minimum prototype that tests it. If you have Claude Code, spend 30 minutes building a working version. If not, sketch six screens on paper showing the key flow. Then show it to one person and ask: "Does this make sense? Would you use this? What is missing?" Write down their answers. You just completed one cycle of prototype-and-test.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'Sprint by Jake Knapp', url: 'https://www.thesprintbook.com/', note: 'The complete design sprint process, including a detailed prototyping day.' },
          { title: 'The Lean Startup by Eric Ries', url: 'http://theleanstartup.com/', note: 'The MVP concept and build-measure-learn loop. The theoretical foundation for rapid prototyping.' },
          { title: 'Rapid Prototyping (Nielsen Norman Group)', url: 'https://www.nngroup.com/articles/rapid-prototyping/', note: 'Research-backed guidance on prototyping speed and fidelity decisions.' },
        ],
      },
    ],
  },
};
