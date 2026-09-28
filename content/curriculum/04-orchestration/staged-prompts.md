---
slug: staged-prompts
title: Staged Prompts
subtitle: Complex work in deliberate phases.
duration: 18 min
status: available
---

## The Problem with One Big Prompt

You have a complex task. You write a long, detailed prompt: "Build a recipe app with user authentication, a database, search functionality, responsive design, and deploy it to Netlify." You hit enter. The agent produces... something. Parts of it work. Parts are wrong. The authentication is half-baked. The search is broken. The responsive design is an afterthought.

This is not the agent's fault. You asked it to hold ten things in its head at once and execute them all perfectly. Humans cannot do this either. When you try to do everything at once, everything suffers.

Staged prompts solve this by breaking complex work into deliberate phases. Each phase has a clear goal, a clear input, and a clear output. The agent focuses on one thing, does it well, and then moves to the next.

> A staged prompt is not a slower prompt. It is a more reliable prompt. Five focused prompts that each succeed are faster than one ambitious prompt that partially fails and requires debugging.

## The Staging Pattern

Every complex task has a natural decomposition into stages. The pattern is:

Stage 1: Foundation. Get the basic structure in place. No features yet, just the skeleton. A React app with routing, a file structure, a working dev server. Verify this works before moving on.

Stage 2: Core feature. Build the single most important thing. For a recipe app, that is adding and viewing recipes. Nothing else. Get this working completely: add a recipe, see it in the list, click to view details.

Stage 3: Supporting features. Add the things that make the core feature useful. Search. Categories. Edit and delete. Each one is its own prompt, and you verify each one before moving to the next.

Stage 4: Polish. Responsive design, error handling, loading states, edge cases. These are the details that make the difference between a prototype and a product.

Stage 5: Deploy. Get it live. This is its own stage because deployment has its own concerns (build configuration, environment variables, DNS) that are unrelated to feature development.

## Verification Between Stages

The critical discipline of staged prompts is verification. After each stage, stop. Look at what was built. Test it. Make sure it actually works before moving forward.

This feels slow. It is not. The alternative is building five stages on top of a broken foundation and then spending hours figuring out which stage introduced the bug. Verification after each stage means every stage starts from a known-good state.

What verification looks like: Run the app. Click through every feature. Try to break it. Check the console for errors. Look at the code and make sure you understand it. If something is wrong, fix it now, not three stages later.

A good rule: if you cannot explain what the code does at this stage, you are not ready for the next stage. Understanding compounds. Confusion compounds too, but in the wrong direction.

## Writing Effective Stage Prompts

Each stage prompt should include three things:

Context: What exists right now. "We have a React app with routing. The recipe list component displays recipes from local storage. Adding recipes works." This grounds the agent in the current state.

Goal: What this stage should accomplish. "Add search functionality. Users should be able to type in a search box and see recipes filtered in real time by title and ingredients." This defines success.

Constraints: What not to do. "Do not modify the existing recipe data structure. Do not add new dependencies. Keep the search client-side." This prevents the agent from making decisions you should be making.

The combination of context + goal + constraints gives the agent everything it needs to succeed, and nothing that would distract it.

```
Stage 1 prompt:
"Create a new React app with Vite. Set up React Router
with three routes: Home (/), Add Recipe (/add), and
Recipe Detail (/recipe/:id). Use a simple nav component.
No styling yet — just get routing working."

Stage 2 prompt:
"Routing works. Now add the core recipe feature.
Create a form on /add with fields: title, URL, notes.
Save to localStorage. Display all recipes on the home
page as a list. Each item links to /recipe/:id which
shows the full recipe. No search, no categories —
just add and view."

Stage 3 prompt:
"Adding and viewing recipes works. Now add search.
Add a text input at the top of the home page.
As the user types, filter the recipe list to show
only recipes where the title or notes contain
the search text. Case-insensitive. Keep it simple —
no debouncing, no search icon, just a text input
that filters."
```

## When to Combine Stages

Not everything needs five stages. Simple features can be one prompt. The rule of thumb: if the task has more than three independent concerns, stage it.

"Add a delete button to each recipe" is one concern, one prompt. "Add user authentication with signup, login, password reset, and protected routes" is four concerns, at least two stages (auth infrastructure, then protected routes).

Over-staging is also a problem. If each prompt produces only three lines of code, you are staging too finely. Each stage should produce a meaningful, testable increment. Think in terms of features, not functions.

## Staged Prompts and Git

Staged prompts pair naturally with version control. Each stage is a commit. If stage three breaks something, you can revert to the commit after stage two and try again.

This is not just safety; it is freedom. When you know you can always go back, you can be bolder in each stage. Try the ambitious approach. If it fails, revert and try the simpler one. The cost of experimentation drops to nearly zero.

The workflow: complete a stage → verify it works → commit with a descriptive message → move to the next stage. Your git log becomes a readable story of how the project was built.

:::exercise{title="Stage a Complex Feature"}
- Think of a feature that feels too complex for a single prompt — for example, a user profile page with avatar upload, editable fields, and password change; or a dashboard with charts, filters, and data export.
- Write it out as three to five staged prompts, each with context, goal, and constraints.
- Do not build it yet. Just plan the stages.
- Notice how the complex, intimidating feature becomes a series of manageable steps.
:::

:::resources{title="Go Deeper"}
- [Shape Up: Scoping](https://basecamp.com/shapeup/3.2-chapter-10). Basecamp's approach to scoping work into stages. The same principles apply to prompts.
- [Working Backwards (Amazon Method)](https://www.allthingsdistributed.com/2006/11/working_backwards.html). Amazon's approach to starting from the desired outcome and working backwards. Useful for deciding what stages you need.
- [The Pomodoro Technique](https://francescocirillo.com/products/the-pomodoro-technique). Not about AI, but about the power of focused, time-boxed work sessions. Same principle as staged prompts.
:::
