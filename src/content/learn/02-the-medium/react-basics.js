export default {
  slug: 'react-basics',
  title: 'React Basics',
  subtitle: 'Components, props, and thinking in UI.',
  duration: '25 min',
  status: 'available',
  content: {
    sections: [
      {
        type: 'text',
        heading: 'Why React?',
        body: [
          'React is a JavaScript library for building user interfaces. It is not the only option — Vue, Svelte, and Angular exist — but it is the most widely used, the most documented, and the one your AI agent is best at helping you with.',
          'We are not going to make you a React developer in one lesson. That takes practice. We are going to give you enough understanding to read React code, direct an AI agent writing React code, and know what is happening in your project. That is the Zero Vector approach: enough knowledge to wield the tool with intention.',
          'React was created by Facebook in 2013 to solve a specific problem: building complex UIs that update efficiently when data changes. Its big idea — components — has become the dominant way to think about building interfaces.',
        ],
      },
      {
        type: 'callout',
        body: 'You do not need to memorize React syntax. You need to understand the concepts: components, props, state, and rendering. The AI writes the syntax. You direct the architecture.',
      },
      {
        type: 'text',
        heading: 'Components: The Building Blocks',
        body: [
          'A component is a reusable piece of UI. A button is a component. A navigation bar is a component. A page is a component made of other components. Every piece of a React application is a component.',
          'Components are functions that return what should appear on screen. They take input (props) and produce output (rendered UI). That is it. A component that displays a greeting takes a name as input and returns "Hello, Sarah" as output.',
          'The power of components is composition. You build small, focused components and combine them into larger ones. A Card component contains a Title, an Image, and a Description. A CardGrid component contains many Cards. A Page component contains a Header, a CardGrid, and a Footer. Simple pieces, assembled into complex interfaces.',
        ],
      },
      {
        type: 'code',
        body: '// A simple React component:\nfunction Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// Using it (rendering it with a prop):\n<Greeting name="Sarah" />\n// Renders: <h1>Hello, Sarah!</h1>\n\n// Components compose:\nfunction ProfileCard({ user }) {\n  return (\n    <div className="card">\n      <Greeting name={user.name} />\n      <p>{user.bio}</p>\n    </div>\n  );\n}',
      },
      {
        type: 'text',
        heading: 'Props: Passing Data Down',
        body: [
          'Props (short for properties) are how you pass data from a parent component to a child component. They flow in one direction: down. A parent decides what data a child receives, and the child renders it.',
          'In the code above, name="Sarah" is a prop. The Greeting component receives it and uses it to display the greeting. The component does not know where "Sarah" came from — it just knows it received a name and displays it.',
          'Props make components reusable. The same Greeting component works for any name. The same Card component works for any content. You define the shape of the component once and use it with different data everywhere.',
          'Think of props as the interface of a component. They are the knobs and dials that let you configure what a component displays without changing how it works internally.',
        ],
      },
      {
        type: 'text',
        heading: 'State: Data That Changes',
        body: [
          'Props are data passed in from outside. State is data managed inside a component that can change over time.',
          'Is a dropdown open or closed? That is state. What has the user typed in the search box? State. How many items are in the cart? State. Any data that changes in response to user action or time is state.',
          'In React, you manage state with the useState hook. It gives you two things: the current value and a function to update it. When you update state, React automatically re-renders the component to reflect the new value.',
          'The core insight: in React, the UI is a function of state. Change the state, and the UI updates automatically. You never manually change what is on screen — you change the data, and React handles the rest.',
        ],
      },
      {
        type: 'code',
        body: '// State example: a counter\nimport { useState } from \'react\';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Add one\n      </button>\n    </div>\n  );\n}\n\n// When the button is clicked:\n// 1. setCount updates the state\n// 2. React re-renders the component\n// 3. The new count appears on screen\n// You never touch the DOM directly.',
      },
      {
        type: 'text',
        heading: 'JSX: HTML in JavaScript',
        body: [
          'The code inside React components looks like HTML but it is actually JSX — a syntax extension that lets you write UI structure inside JavaScript. It gets compiled to regular JavaScript before the browser sees it.',
          'The differences from HTML are small but important: className instead of class (because class is a reserved word in JavaScript), style takes an object instead of a string, and you can embed JavaScript expressions inside curly braces.',
          'JSX is the reason React feels intuitive for designers. If you can read HTML, you can read JSX. The structure is the same — just with JavaScript superpowers embedded in it.',
        ],
      },
      {
        type: 'code',
        body: '// JSX looks like HTML with JavaScript embedded:\nfunction BookList({ books }) {\n  return (\n    <div className="book-list">\n      <h2>My Books ({books.length})</h2>\n      <ul>\n        {books.map(book => (\n          <li key={book.id}>\n            <strong>{book.title}</strong>\n            <span> by {book.author}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\n// {books.map(...)} loops through the array\n// and creates a <li> for each book.',
      },
      {
        type: 'text',
        heading: 'File Structure',
        body: [
          'In a React project, each component typically lives in its own file. The file exports the component, and other files import it. This is separation of concerns at the file level.',
          'A typical structure: src/components/ for reusable components, src/pages/ for page-level components (one per route), src/styles/ for CSS, src/content/ for data. You have seen this structure in the Open Vector codebase.',
          'The App.jsx file is the root component — everything else is nested inside it. The router (React Router) decides which page component to show based on the URL. Layout components (headers, sidebars) wrap the page content.',
          'You do not need to set this up from scratch. When you create a project with Vite (npm create vite@latest), the basic structure is already there. Claude Code understands it and works within it.',
        ],
      },
      {
        type: 'text',
        heading: 'Reading React Code',
        body: [
          'As a designer directing AI agents, reading React code is more important than writing it. Here is what to look for:',
          'The function name is the component name. function Sidebar() means this is the Sidebar component.',
          'The return statement is what gets rendered. Everything inside return (...) is the UI output.',
          'Props are in the function parameter: function Card({ title, image }) means this component expects title and image as inputs.',
          'useState calls are state variables. const [isOpen, setIsOpen] = useState(false) means this component tracks whether something is open.',
          'Import statements at the top tell you what other components and libraries are being used. import Sidebar from \'./Sidebar\' means this file uses the Sidebar component.',
        ],
      },
      {
        type: 'exercise',
        title: 'Read a Real Component',
        body: 'Open the Open Vector codebase (or any React project) and pick a component file. Read it without running it. Identify: the component name, its props, any state variables, what it renders, and which child components it uses. Write a one-sentence description of what the component does. Now open the app in a browser and find that component on the page. Does what you see match what you read? This reading skill is what lets you direct an AI agent with precision.',
      },
      {
        type: 'resources',
        heading: 'Go Deeper',
        items: [
          { title: 'React Official Tutorial', url: 'https://react.dev/learn', note: 'The best introduction to React, written by the React team. Start with "Quick Start."' },
          { title: 'Thinking in React', url: 'https://react.dev/learn/thinking-in-react', note: 'The most important page in the React docs. How to decompose a UI into components.' },
          { title: 'React for Designers (video)', url: 'https://www.youtube.com/results?search_query=react+for+designers+tutorial', note: 'Search for beginner React tutorials aimed at designers. Many excellent free options.' },
          { title: 'Vite Getting Started', url: 'https://vite.dev/guide/', note: 'How to create and run a React project with Vite. The modern way to start.' },
        ],
      },
    ],
  },
};
