---
slug: writing-a-prd
title: Writing a PRD
subtitle: From a blank document to a complete product requirements document. The plan before the plan.
duration: 25 min
status: available
badge: new
updatedAt: '2026-02-14'
category: planning
prerequisites:
  - 01-foundation/planning
  - 01-foundation/systems-thinking
---

## Why Write a PRD

A Product Requirements Document is a written description of what you are building and why. It is not bureaucracy. It is the single most effective way to turn a vague idea into something you can actually build.

When you sit down with Claude Code and say "build me a portfolio site," you get something generic. When you sit down with a PRD that describes exactly what the site should do, who it is for, and what success looks like — you get something intentional.

The PRD is also your own clarity tool. Writing it forces you to answer the hard questions before you start building, when changing direction is free.

:::step{number="01" title="Start with the Problem"}
Do not start with the solution. Start with the problem. What is the situation that needs to change? Who is experiencing it? Why does it matter?

Write two or three sentences. Be specific. Not "people need a better way to manage tasks" but "I am a freelance designer who tracks projects across Notion, email, and sticky notes, and I regularly miss deadlines because nothing is in one place."
:::

:::step{number="02" title="Define the User"}
Who is this for? Be honest. If it is for you, say so. If it is for a specific audience, describe them in one paragraph. What do they know? What do they not know? What tools do they already use?

This matters because it shapes every decision. A tool for designers looks different from a tool for developers, even if it solves the same problem.
:::

:::step{number="03" title="Describe the Solution"}
Now describe what you want to build. Not how it works internally — what it looks like to the user. What can they do with it? What pages or screens exist? What happens when they click things?

Write this as a series of statements: "The user can...", "The homepage shows...", "When the user clicks X, they see Y."
:::

:::step{number="04" title="List the Features"}
Break your solution into discrete features. Each feature should be one thing the product does. Keep the list short for a first version — five to ten features maximum.

For each feature, write one sentence explaining what it does and one sentence explaining why it matters.
:::

:::step{number="05" title="Define What is NOT Included"}
This is the most underrated section. Explicitly list what you are not building in the first version. This prevents scope creep — both from yourself and from AI tools that love to add features you did not ask for.

Write it as a simple list: "Not in v1: user accounts, payment processing, mobile app, email notifications."
:::

:::step{number="06" title="Write Success Criteria"}
How will you know this is done? Define two to four concrete things that must be true for the project to be "shipped." Not aspirational goals — testable statements.

"A visitor can land on the homepage and understand what the product does within five seconds." "The contact form sends an email to my inbox." "The site loads in under two seconds on a 3G connection."
:::

:::step{number="07" title="Assemble the Document"}
Put it all together using the template below. This does not need to be long. One to two pages is ideal for a personal or small-team project. The goal is clarity, not length.
:::

:::template{title="PRD Template"}
# [Project Name] — Product Requirements Document

## Problem
[2-3 sentences describing the problem and who experiences it]

## User
[1 paragraph describing the target user — who they are, what they know, what they need]

## Solution
[3-5 sentences describing what the product is and what it does from the user's perspective]

## Features (v1)
1. **[Feature Name]** — [What it does]. [Why it matters].
2. **[Feature Name]** — [What it does]. [Why it matters].
3. **[Feature Name]** — [What it does]. [Why it matters].
4. **[Feature Name]** — [What it does]. [Why it matters].
5. **[Feature Name]** — [What it does]. [Why it matters].

## Not in v1
- [Thing you are explicitly not building yet]
- [Another thing]
- [Another thing]

## Success Criteria
- [ ] [Testable statement about what "done" looks like]
- [ ] [Another testable statement]
- [ ] [Another testable statement]

## Technical Notes
- Stack: [Framework, styling, deployment]
- Key constraints: [Performance, accessibility, browser support]
- Dependencies: [External APIs, services, libraries]
:::

> Your PRD is a living document. Update it as you learn things during development. But always update the document first, then change the code. The PRD is the source of truth for what you are building and why.

## Using Your PRD with Claude Code

Once your PRD is written, you can paste it directly into a Claude Code session as context. Or better — save it as a markdown file in your project root and reference it in your CLAUDE.md:

```
## Project Requirements
See PRD.md for full product requirements.
```

Now when you give Claude Code an instruction like "build the homepage," it has the full context of what the homepage should contain, who it is for, and what success looks like. Your instructions become surgical because the context is already loaded.

Next: learn how to break your PRD into concrete use cases that map directly to build tasks.

:::resources{title="Go Deeper"}
- [Planning (Curriculum)](/learn/curriculum/01-foundation/planning) — The art of scoping and shaping work before building.
- [JTBD (Curriculum)](/learn/curriculum/03-the-pipeline/jtbd) — Jobs to Be Done — understanding what users actually need.
- [Shape Up](https://basecamp.com/shapeup) — Basecamp's methodology for scoping and shipping work.
:::
