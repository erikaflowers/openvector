---
slug: framework-design
title: Framework Design
subtitle: Building tools for others to build with.
duration: 20 min
status: available
---

## What Is a Framework?

A framework is a reusable structure that makes a category of work easier. React is a framework for building user interfaces. JTBD is a framework for understanding what people need. The pipeline you learned in Level 03 is a framework for product development.

You have been using frameworks throughout this curriculum. Now you learn to build them. Not because the world needs another JavaScript library — but because the act of creating a framework forces you to understand a domain deeply enough to simplify it for others.

Framework design is the highest form of design thinking. You are not solving one problem. You are solving a class of problems. You are not building one thing. You are building the thing that lets other people build things.

> A framework is an opinion about how work should be done, encoded into a reusable structure. The opinion is the hard part. The structure is just the packaging.

## When to Build a Framework

You should build a framework when you notice yourself solving the same problem three or more times. The first time, you solve it. The second time, you notice the pattern. The third time, you extract the pattern into something reusable.

Do not build a framework the first time. You do not understand the problem well enough yet. Your abstraction will be wrong — it will be shaped around the specifics of the first case rather than the general pattern.

The three-time rule prevents premature abstraction, which is one of the most expensive mistakes in software and design. A framework built too early locks in assumptions that turn out to be wrong. A framework built after three experiences is grounded in reality.

## The Anatomy of a Good Framework

Every effective framework has three layers:

Principles: The beliefs that drive the framework. "Components should be independent." "Content should be separated from presentation." "Defaults should be sensible." Principles are the why.

Patterns: The recurring solutions the framework provides. "Use props to pass data down." "Use events to communicate up." "Use context for cross-cutting concerns." Patterns are the how.

Primitives: The building blocks that make the patterns concrete. Components, functions, templates, structures. Primitives are the what — the actual things people use.

A framework missing principles is just a collection of tools. A framework missing patterns is just a philosophy. A framework missing primitives is just an idea. You need all three.

## Design Frameworks vs. Code Frameworks

Not every framework is code. A design system is a framework. A project template is a framework. A decision matrix is a framework. An onboarding checklist is a framework.

The Zero Vector methodology itself is a framework: a set of principles (design-led engineering, craft over convenience), patterns (research-to-ship pipeline, staged prompts, crew model), and primitives (CLAUDE.md files, quality gates, specific agent configurations).

When you create your personal methodology and make it teachable, you are designing a framework. When you create a project starter template that encodes your conventions, you are designing a framework. The skill transfers across domains.

## The Opinionated Default

The best frameworks are opinionated. They do not try to support every possible use case. They make decisions so the user does not have to.

An unopinionated framework says: "Here are twelve ways to manage state. Choose the one that fits." An opinionated framework says: "Use this pattern for state management. Here is why. If you outgrow it, here is the escape hatch."

Opinions reduce cognitive load. A designer using your framework should not have to make dozens of decisions before they start working. Your framework should encode the good defaults — the choices that are right 80% of the time — and let users override when they need to.

Having opinions requires courage. You are saying: "I have thought about this enough to have a position." Some people will disagree. That is fine. A framework that tries to please everyone helps no one.

## Simplicity as a Feature

The hardest part of framework design is deciding what to leave out. Every feature you add is a feature someone has to learn. Every option is a decision someone has to make. Every configuration is a place where things can go wrong.

The best frameworks feel small. They do one thing well and compose with other tools for everything else. They have a short learning curve and a long mastery curve — easy to start, deep to explore.

When you are tempted to add a feature, ask: can the user accomplish this with the existing primitives? If yes, do not add it. Let them compose. If no, add the minimum needed. You can always add later. You can never subtract without breaking things.

## Testing Your Framework

A framework is tested by having someone else use it. Not by reading documentation — by actually building something with it. Watch them. Where do they get stuck? What do they misunderstand? What is missing?

The first user of your framework should not be you. You have too much implicit knowledge. You know the workarounds, the conventions, the intent behind the design. A new user has none of that. Their confusion is the most valuable feedback you will ever receive.

The second test is time. Use your own framework for a month. The excitement of creation fades. Daily use reveals the friction: the naming that seemed clever is actually confusing, the default that seemed sensible is actually wrong, the pattern that seemed elegant is actually cumbersome.

:::exercise{title="Extract a Framework"}
Look at your last three projects. Find one thing you did in all three: a project structure, a naming convention, a way of organizing components, a checklist you followed. Extract it into a reusable template or document. Give it a name. Write a one-paragraph description of what it does and when to use it. Then start your next project using it. Note where it helps and where it needs adjustment.
:::

:::resources{title="Go Deeper"}
- [A Philosophy of Software Design by John Ousterhout](https://web.stanford.edu/~ouster/cgi-bin/book.php) — The best book on designing interfaces and managing complexity. Essential reading for framework designers.
- [Design Systems by Alla Kholmatova](https://www.smashingmagazine.com/design-systems-book/) — How to build a design system — which is a framework for design. Practical and well-structured.
- [The Pragmatic Programmer by Hunt & Thomas](https://pragprog.com/titles/tpp20/) — The chapter on "Don't Repeat Yourself" and "Orthogonality" are the philosophical foundation of framework design.
:::
