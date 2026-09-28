---
slug: orchestration
title: Orchestration
subtitle: Conducting the symphony.
duration: 22 min
status: available
---

## What Is Orchestration?

You have agents. You have staged prompts. You have CLAUDE.md files defining each agent's role. Now the question becomes: how do you coordinate all of this? How do you decide which agent works on what, in what order, and how their outputs connect?

That is orchestration. You are the conductor. The agents are the musicians. Each one is skilled at their instrument, but without a conductor, you get noise instead of music. Orchestration is the discipline of directing multiple agents and processes toward a coherent outcome.

This is the skill that separates someone who uses AI from someone who builds with AI. Using AI is asking one agent to do one thing. Building with AI is coordinating a system of agents, prompts, and processes to produce something no single agent could build alone.

> The conductor does not play an instrument. The conductor sees the whole score, knows what comes next, and makes sure every section enters at the right time. That is your job now.

## The Orchestration Loop

All orchestration follows the same loop: plan, delegate, verify, integrate.

Plan: Decide what needs to happen next. Look at the project state, the goals, and the current blockers. Determine which agent should work on which piece.

Delegate: Give the agent its task with clear context, goal, and constraints. This is a staged prompt aimed at a specific agent. "Siddig, add the search endpoint to the API. Here is the schema. Return results sorted by relevance."

Verify: When the agent delivers, check the work. Does it meet the goal? Does it break anything else? Does it follow the conventions? This is where quality gates (next lesson) come in.

Integrate: Merge the work into the main codebase. Make sure it works with everything else. Update the project status. Then loop back to plan.

This loop is fractal. It works at every scale. A single feature takes one loop. A full project takes many loops, nested inside each other.

## Sequential vs. Parallel Work

Some tasks must happen in order. You cannot build the UI for an API endpoint that does not exist yet. You cannot deploy a feature that has not been tested. Sequential work has dependencies; each step needs the output of the previous step.

Other tasks are independent. The frontend and backend of a feature can be built simultaneously if they agree on a contract (the API shape). Documentation can be written while tests are being created. CSS styling can happen while business logic is being debugged.

Good orchestration maximizes parallel work. While one agent builds the API endpoint, another agent builds the UI component that will consume it. They agreed on the contract upfront: "The endpoint returns { recipes: [{ id, title, url }] }." Both agents work independently toward the same interface.

The skill is identifying which tasks are truly independent and which have hidden dependencies. When in doubt, go sequential. A parallel task that depends on something unfinished will produce code that has to be rewritten.

## Contracts and Interfaces

The key to parallel work is contracts. A contract is an agreement between two agents (or two parts of the system) about how they will communicate. It defines the shape of the data, the names of the functions, the structure of the API response.

Before starting parallel work, define the contract explicitly. Write it down in a shared document or a type definition file. Both agents reference this contract. Neither agent deviates from it.

A simple contract for a recipe search feature: `GET /api/recipes/search?q=pasta` returns `{ results: [{ id: string, title: string, matchScore: number }], total: number }`. The backend agent builds to this spec. The frontend agent builds against this spec. When both are done, they connect seamlessly.

Without a contract, two agents working in parallel will make different assumptions. The backend returns `"items"` while the frontend expects `"results"`. The backend returns nested objects while the frontend expects flat ones. These mismatches are expensive to debug.

## Session Management

AI agents have context windows, a limit on how much they can remember in a single session. Long sessions accumulate context: previous code, past decisions, error messages, tangents. Eventually, the agent starts losing track of earlier details.

Good orchestration manages sessions deliberately. Start a fresh session for each major task. Carry forward only what the agent needs. The CLAUDE.md provides the persistent context, and your prompt provides the immediate context.

When a session gets long and the agent starts making mistakes or forgetting earlier decisions, that is your signal to start fresh. Commit what you have, open a new session, and give it a focused brief: "Here is what exists. Here is what to build next."

Think of sessions as working memory. The CLAUDE.md is long-term memory. Your prompts are short-term instructions. Managing the balance between these is a core orchestration skill.

## The Daily Workflow

A practical orchestration workflow for a solo builder with multiple agents:

Morning: Review the project state. What was accomplished yesterday? What is the priority today? Write a brief plan: three to five things to accomplish.

Work blocks: For each task, identify the right agent. Open a session with focused context. Execute the task in stages. Verify after each stage. Commit when complete.

Integration points: After two or three tasks are complete, step back and verify everything works together. Run the full app. Click through the flows. This is where you catch integration issues early.

End of day: Commit everything. Update any status documents. Write a brief note about where you left off. This is your context for tomorrow morning.

This rhythm turns orchestration from an abstract concept into a daily practice.

## Orchestration Anti-Patterns

Micromanaging: Giving the agent instructions so detailed that you might as well write the code yourself. Trust the agent with the "how" after you define the "what" and "why."

Context overload: Pasting the entire codebase into a prompt. The agent cannot process everything. Give it the relevant files and a clear scope.

Skipping verification: Moving to the next task before confirming the current one works. This is the fastest way to build a house of cards.

Single-session marathons: Running one agent session for eight hours. Context degrades. Fresh sessions with clear briefs produce better results than exhausted sessions.

No contracts: Running parallel agents without agreeing on interfaces first. The integration will be painful.

:::exercise{title="Orchestrate a Two-Agent Build"}
- Pick a small feature with a frontend and backend component (a contact form with a submission endpoint, a search page with search API, etc.).
- Write the contract first: define the exact API endpoint, request format, and response format.
- Give the backend task to one Claude Code session and the frontend task to another. Both sessions get the contract as part of their prompt.
- Build both sides, then integrate.
- Note where the contract saved you and where you wish you had specified more.
:::

:::resources{title="Go Deeper"}
- [Designing Data-Intensive Applications by Martin Kleppmann](https://dataintensive.net/). The definitive book on distributed systems. Orchestration at the infrastructure level.
- [A Philosophy of Software Design by John Ousterhout](https://web.stanford.edu/~ouster/cgi-bin/book.php). On managing complexity through interface design. Directly applicable to agent contracts.
- [Staff Engineer by Will Larson](https://staffeng.com/book). On the skill of technical leadership: seeing the whole system and directing the pieces.
:::
