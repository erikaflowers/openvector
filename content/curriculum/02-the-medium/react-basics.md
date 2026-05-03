---
slug: react-basics
title: React Basics
subtitle: Components, props, and thinking in UI.
duration: 25 min
status: available
---

## Why React?

React is a JavaScript library for building user interfaces. It is not the only option (Vue, Svelte, and Angular exist) but it is the most widely used, the most documented, and the one your AI agent is best at helping you with.

We are not going to make you a React developer in one lesson. That takes practice. We are going to give you enough understanding to read React code, direct an AI agent writing React code, and know what is happening in your project. That is the Zero Vector approach: enough knowledge to wield the tool with intention.

React was created by Facebook in 2013 to solve a specific problem: building complex UIs that update efficiently when data changes. Its big idea, components, has become the dominant way to think about building interfaces.

> You do not need to memorize React syntax. You need to understand the concepts: components, props, state, and rendering. The AI writes the syntax. You direct the architecture.

## Components: The Building Blocks

A component is a reusable piece of UI. A button is a component. A navigation bar is a component. A page is a component made of other components. Every piece of a React application is a component.

Components are functions that return what should appear on screen. They take input (props) and produce output (rendered UI). That is it. A component that displays a greeting takes a name as input and returns "Hello, Sarah" as output.

The power of components is composition. You build small, focused components and combine them into larger ones. A Card component contains a Title, an Image, and a Description. A CardGrid component contains many Cards. A Page component contains a Header, a CardGrid, and a Footer. Simple pieces, assembled into complex interfaces.

```jsx
// A simple React component:
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Using it (rendering it with a prop):
<Greeting name="Sarah" />
// Renders: <h1>Hello, Sarah!</h1>

// Components compose:
function ProfileCard({ user }) {
  return (
    <div className="card">
      <Greeting name={user.name} />
      <p>{user.bio}</p>
    </div>
  );
}
```

## Props: Passing Data Down

Props (short for properties) are how you pass data from a parent component to a child component. They flow in one direction: down. A parent decides what data a child receives, and the child renders it.

In the code above, name="Sarah" is a prop. The Greeting component receives it and uses it to display the greeting. The component does not know where "Sarah" came from. It just knows it received a name and displays it.

Props make components reusable. The same Greeting component works for any name. The same Card component works for any content. You define the shape of the component once and use it with different data everywhere.

Think of props as the interface of a component. They are the knobs and dials that let you configure what a component displays without changing how it works internally.

## State: Data That Changes

Props are data passed in from outside. State is data managed inside a component that can change over time.

Is a dropdown open or closed? That is state. What has the user typed in the search box? State. How many items are in the cart? State. Any data that changes in response to user action or time is state.

In React, you manage state with the useState hook. It gives you two things: the current value and a function to update it. When you update state, React automatically re-renders the component to reflect the new value.

The core insight: in React, the UI is a function of state. Change the state, and the UI updates automatically. You never manually change what is on screen. You change the data, and React handles the rest.

```jsx
// State example: a counter
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add one
      </button>
    </div>
  );
}

// When the button is clicked:
// 1. setCount updates the state
// 2. React re-renders the component
// 3. The new count appears on screen
// You never touch the DOM directly.
```

## JSX: HTML in JavaScript

The code inside React components looks like HTML but it is actually JSX, a syntax extension that lets you write UI structure inside JavaScript. It gets compiled to regular JavaScript before the browser sees it.

The differences from HTML are small but important: className instead of class (because class is a reserved word in JavaScript), style takes an object instead of a string, and you can embed JavaScript expressions inside curly braces.

JSX is the reason React feels intuitive for designers. If you can read HTML, you can read JSX. The structure is the same, just with JavaScript superpowers embedded in it.

```jsx
// JSX looks like HTML with JavaScript embedded:
function BookList({ books }) {
  return (
    <div className="book-list">
      <h2>My Books ({books.length})</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong>
            <span> by {book.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// {books.map(...)} loops through the array
// and creates a <li> for each book.
```

## File Structure

In a React project, each component typically lives in its own file. The file exports the component, and other files import it. This is separation of concerns at the file level.

A typical structure: `src/components/` for reusable components, `src/pages/` for page-level components (one per route), `src/styles/` for CSS, `src/content/` for data. You have seen this structure in the Open Vector codebase.

The App.jsx file is the root component, and everything else is nested inside it. The router (React Router) decides which page component to show based on the URL. Layout components (headers, sidebars) wrap the page content.

You do not need to set this up from scratch. When you create a project with Vite (npm create vite@latest), the basic structure is already there. Claude Code understands it and works within it.

## Reading React Code

As a designer directing AI agents, reading React code is more important than writing it. Here is what to look for:

The function name is the component name. function Sidebar() means this is the Sidebar component.

The return statement is what gets rendered. Everything inside return (...) is the UI output.

Props are in the function parameter: function Card({ title, image }) means this component expects title and image as inputs.

useState calls are state variables. const [isOpen, setIsOpen] = useState(false) means this component tracks whether something is open.

Import statements at the top tell you what other components and libraries are being used. import Sidebar from './Sidebar' means this file uses the Sidebar component.

:::exercise{title="Read a Real Component"}
- Open the Open Vector codebase (or any React project) and pick a component file.
- Read it without running it.
- Identify: the component name, its props, any state variables, what it renders, and which child components it uses.
- Write a one-sentence description of what the component does.
- Now open the app in a browser and find that component on the page. Does what you see match what you read?
- This reading skill is what lets you direct an AI agent with precision.
:::

:::resources{title="Go Deeper"}
- [React Official Tutorial](https://react.dev/learn): The best introduction to React, written by the React team. Start with "Quick Start."
- [Thinking in React](https://react.dev/learn/thinking-in-react): The most important page in the React docs. How to decompose a UI into components.
- [React for Designers (video)](https://www.youtube.com/results?search_query=react+for+designers+tutorial): Search for beginner React tutorials aimed at designers. Many excellent free options.
- [Vite Getting Started](https://vite.dev/guide/): How to create and run a React project with Vite. The modern way to start.
:::
