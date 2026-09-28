---
slug: architecture
title: Architecture
subtitle: Structure before code. Always.
duration: 20 min
status: available
badge: new
updatedAt: '2026-02-14'
---

## What Is Software Architecture?

Architecture is how the parts of a system are organized and how they communicate with each other. It is the blueprint that exists before the first line of code and remains after the last line is written.

Think of a building. Before any bricks are laid, an architect decides: where do the load-bearing walls go? Where does plumbing run? How do people move between floors? These decisions constrain and enable everything built on top of them. Software architecture works the same way.

In a web application, architecture means: where does data live? How does the frontend talk to the backend? Which pieces are separate and which are bundled together? How do you add a new feature without breaking existing ones?

> Architecture is not about making things complicated. It is about deciding what goes where so that adding, changing, and fixing things stays manageable as the project grows.

## Why Architecture Before Code

The most expensive changes in software are structural changes. Moving a column in a database, splitting a monolith into services, changing how authentication works. These are orders of magnitude harder than changing a button color or rewording an error message.

When you start coding without thinking about structure, you are making architectural decisions by default. The decisions get made, but you do not realize you are making them. And default decisions tend to be bad ones, because they optimize for "what is easiest right now" rather than "what will make sense next month."

This does not mean you need a 50-page architecture document before writing hello world. It means spending 15 minutes thinking about structure before spending 3 hours building on top of a structure you did not choose.

## Separation of Concerns

The single most important principle in architecture is separation of concerns: each piece of the system should do one thing and do it well.

In a web app, this looks like: the database stores data (it does not know about the UI). The API serves data to whoever asks (it does not know about React or buttons). The frontend renders data for humans (it does not know how the database is structured). Each layer has a job and a boundary.

Why does this matter? Because when concerns are separated, you can change one piece without breaking another. You can redesign the entire UI without touching the API. You can switch databases without rewriting the frontend. You can replace your AI model without rebuilding the data layer.

When concerns are mixed (when your React component makes direct database calls, or your API generates HTML), changes cascade unpredictably. Touch one thing, break three others. That is not complexity. That is architecture debt.

```
# A well-separated web application:

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│    API      │────▶│  Database   │
│  (React)    │◀────│  (Server)   │◀────│ (Postgres)  │
└─────────────┘     └─────────────┘     └─────────────┘
     UI only         Logic only          Data only

# Each layer has one job.
# Each layer talks only to its neighbors.
# You can replace any layer without rewriting the others.
```

## Components and Composition

Modern software is built from components: small, reusable pieces that combine to form larger structures. A button is a component. A form is a component made of other components (inputs, labels, buttons). A page is a component made of even more components.

This is composition: building complex things by assembling simple things. It is the same principle as LEGO. Individual bricks are useless. Combine them according to a plan and you get a castle.

The architectural question is: what should be a component? The answer: anything you might use more than once, or anything complex enough that thinking about it in isolation is easier than thinking about it in context. A navigation bar is a component because it appears on every page. A checkout flow is a component because it has enough internal logic to warrant its own boundary.

When your components are well-defined, adding a new feature means assembling existing pieces in a new way, not building everything from scratch.

## State and Data Flow

State is the current condition of your application. Is the user logged in? What items are in the cart? Which tab is active? Has the form been submitted? All of this is state.

The hardest architectural problem in frontend development is deciding where state lives and how it flows. If every component manages its own state, they cannot share information. If all state lives in one place, the application becomes a tangled mess of global variables.

The principle: state should live as close to where it is used as possible, and flow downward. A form field owns its own input value. A page owns the data it displays. The application owns the current user session. When two siblings need to share state, lift it to their parent.

This sounds abstract until you build something with state in the wrong place. Then it becomes very, very concrete.

## The Architecture of a Real Project

Let us trace the architecture of a real application, a site like Zero Vector:

The source code lives in `src/`. Inside, `pages/` contains one file per route. `components/` contains reusable pieces. `styles/` contains CSS. `content/` contains the text and data. This is separation of concerns at the file level.

The router maps URLs to pages: `/learn/curriculum/00-orientation/terminal` shows the `LessonPage` component with data from the terminal lesson file. The URL is the single source of truth; no hidden state decides what you see.

The layout components (navigation, sidebar) wrap the content. They do not know what content is inside them. The content components do not know what layout surrounds them. They communicate through well-defined props and context.

This is architecture: predictable structure, clear boundaries, data flowing in one direction. Not complicated. Deliberate.

## Architecture in Zero Vector

Zero Vector practitioners design the architecture before the first prompt. This is the single biggest differentiator between intentional creation and vibe coding. You know the shape of the thing before you ask the AI to build it.

Why does this matter so much with AI agents? Because an agent will happily build whatever you ask for, even if it contradicts what you asked for yesterday. Without architecture, you end up with a codebase that is a patchwork of disconnected decisions. With architecture, every piece the agent builds fits into a coherent whole. The architecture is your blueprint. The agent is the builder. Builders without blueprints make sheds, not houses.

:::exercise{title="Sketch Before You Build"}
- Think of a simple app (a to-do list, a recipe collection, a bookmark manager)
- Before writing any code, sketch its architecture on paper
- Draw three boxes: frontend, backend, database. In each box, list what it is responsible for
- Draw arrows showing what data flows between them
- Now zoom into the frontend: draw the main components (layout, navigation, list, form, detail view)
- Draw arrows showing how data flows between them. Where does state live?
- This 10-minute sketch will save you hours of refactoring.
:::

:::resources{title="Go Deeper"}
- [Patterns.dev](https://www.patterns.dev/): Free book on design and rendering patterns for modern web apps. Visual, practical, and current.
- [The Twelve-Factor App](https://12factor.net/): Twelve principles for building modern, maintainable software. Written by Heroku's co-founder.
- [A Philosophy of Software Design by John Ousterhout](https://web.stanford.edu/~ouster/cgi-bin/book.php): Stanford CS professor on managing complexity. One of the best books on software architecture.
- [React: Thinking in React](https://react.dev/learn/thinking-in-react): The official guide to decomposing a UI into components. The best starting point for component architecture.
:::
