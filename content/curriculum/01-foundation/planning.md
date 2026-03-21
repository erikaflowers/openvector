---
slug: planning
title: Planning
subtitle: How to think about a problem before you touch a tool.
duration: 18 min
status: available
badge: new
updatedAt: '2026-02-14'
---

## Why Planning Matters More with AI

There is a paradox with AI coding tools: the faster you can build, the more important it is to plan. When building was slow, bad decisions were small — you would lose an afternoon. When an AI agent can generate an entire feature in minutes, a bad decision can produce hundreds of lines of code you do not understand, heading in a direction you did not choose.

Planning is not about predicting the future. It is about defining the present clearly enough that your next action is obvious. What are you building? For whom? What does "done" look like? What do you build first?

You do not need a project management tool for this. You need a piece of paper, 15 minutes, and the willingness to think before you move.

> A plan is not a promise. It is a snapshot of your current understanding. The plan will change — that is fine. The act of making it forces clarity that no amount of improvisation can replace.

## Start with the Problem

Every project begins with a problem. Not a solution — a problem. "I want to build a website" is a solution. "My portfolio is not getting me interviews" is a problem. The problem tells you what success looks like. The solution is just one way to get there.

Write the problem down in one sentence. Be specific. "Users cannot find the information they need on our site" is better than "the site needs to be better." "I want to track my reading habits and see patterns over time" is better than "I want to build an app."

If you cannot articulate the problem in one sentence, you are not ready to build. You are ready to research. And that is a legitimate first step.

## Define Done

Before building anything, write down what "done" looks like. Not perfectly done. Not version 10 done. Version 1 done. The smallest version that solves the problem.

For a portfolio site: "Done means five pages — home, about, three case studies — deployed on a custom domain, with responsive layout and working navigation."

For a reading tracker: "Done means I can add a book, mark it as reading/finished, and see a list of what I have read this year. No login, no social features, no recommendations."

This is your scope. Everything inside the fence gets built. Everything outside it does not — not yet. The fence is not permanent. You can move it later. But you cannot make progress without knowing where you are going.

## Decomposition

Decomposition is breaking a large problem into smaller problems until each piece is small enough to build in one sitting.

"Build a portfolio site" is not actionable — it is a project. But decompose it: set up the repo, build the layout shell, create the navigation, write the home page content, build the case study template, fill in case study 1, fill in case study 2, fill in case study 3, add responsive styles, deploy. Now you have ten tasks, each completable in 30-60 minutes.

The technique is simple: keep asking "what does this require?" until the answer is something you can do right now. "Build the layout shell" requires what? A header component, a main content area, a footer. Can you build a header component right now? Yes. Start there.

Decomposition turns overwhelming projects into to-do lists. And to-do lists, unlike ambitions, get done.

```
# Decomposition example: "Build a reading tracker"

# Phase 1: Foundation
- Set up project (Vite + React)
- Create data model (Book: title, author, status, dateAdded)
- Build basic layout (header, main area)

# Phase 2: Core Features
- Add Book form (title, author inputs + submit)
- Book list display (show all books)
- Status toggle (reading → finished)
- Local storage persistence

# Phase 3: Polish
- Filter by status (reading / finished / all)
- Year-in-review count
- Responsive layout
- Deploy to Netlify

# Each item is completable in one sitting.
# Each phase is usable on its own.
```

## Working Backwards

When you are not sure where to start, work backwards from the end. Imagine the finished product. What is the last thing that needs to happen before it is done? What needs to happen before that? And before that?

For deployment: the site needs to be deployed (last step). Before that, it needs to build without errors. Before that, all pages need to exist. Before that, the components need to be built. Before that, the project needs to be set up. Now reverse the list — that is your build order.

Working backwards is particularly useful when you are building something you have never built before. You may not know how to start, but you usually know what the end looks like.

## Scope Creep and the Art of "Later"

As you build, you will have ideas. "What if users could also share their lists?" "What if there was a dark mode?" "What if it sent email reminders?" These are good ideas. Write them down. Then write "Later" next to each one.

Scope creep is when features multiply during development. Every feature you add before the core works makes the core take longer. Every "quick addition" introduces complexity that compounds.

The discipline is not saying no. It is saying "not now." Keep a "Later" list. Everything interesting goes on it. After version 1 ships, look at the list and pick the best ideas for version 2. Most of the ideas will no longer seem important. That is the list doing its job.

Ship the smallest thing that works. Then improve it. This is not laziness. It is the most reliable way to build something that matters.

## Planning for AI Collaboration

When you work with an AI coding agent, your plan becomes your prompt strategy. Each decomposed task becomes a clear instruction. "Build the header component with a logo on the left and navigation links on the right, using the existing .nav-header CSS class" is a plan-derived prompt that gets excellent results.

Without a plan, AI collaboration drifts. You ask for a feature, the AI builds it one way, you realize you wanted something different, you ask again, the AI refactors, and three iterations later you have code that works but that nobody fully understands. A plan prevents this by front-loading the decisions.

The best AI collaborators are not the best prompt engineers. They are the best planners.

## Planning in Zero Vector

Your planning artifact in Zero Vector becomes your VECTOR.md. This is the document that gives your AI agents the context they need to build what you actually envisioned, not what they hallucinated from a vague prompt.

Everything you plan in this lesson feeds directly into that artifact: the sequence of work, the dependencies between components, the milestones you are targeting. When you update your VECTOR.md's Current State section after each sprint, you are keeping your AI agents oriented. They read it at the start of every session and know exactly where the project stands, what has been built, and what is next. Planning without a written artifact is just daydreaming with a deadline.

:::exercise{title="Plan a Real Project"}
Pick a project you actually want to build (or use the reading tracker from this lesson). Write the problem in one sentence. Write what "done" looks like in three sentences. Decompose it into phases, with 3-5 tasks per phase. For each task, make sure it is small enough to complete in one sitting. Write a "Later" list with at least three ideas you deliberately exclude from version 1. You now have a plan. Tape it to your wall. Start at the top.
:::

:::resources{title="Go Deeper"}
- [Shape Up by Basecamp](https://basecamp.com/shapeup) — A free book on how to scope and plan projects. "Shaping" is professional decomposition. Brilliant and practical.
- [The Mythical Man-Month (essays)](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) — Classic software engineering wisdom. The chapter on conceptual integrity is about planning.
- [Getting Real by Basecamp](https://basecamp.com/gettingreal) — A manifesto on building less and shipping faster. The chapter on scope is gold.
- [CLAUDE.md: Writing Instructions for AI](https://docs.anthropic.com/en/docs/claude-code/tutorials#create-a-claude-md-file) — How to write a CLAUDE.md file — your plan for AI collaboration.
:::
