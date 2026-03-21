---
slug: jtbd
title: Jobs to Be Done
subtitle: Nobody wants a drill. They want a hole.
duration: 18 min
status: available
---

## The Core Idea

People do not buy products. They hire them to do a job. Nobody wants a quarter-inch drill. They want a quarter-inch hole. Nobody wants a recipe app. They want to cook something delicious tonight without having to think too hard about what.

Jobs to Be Done (JTBD) is a framework for understanding why people use products. Instead of asking "what features should we build?" it asks "what job is the user trying to accomplish, and how can we help them do it better?"

This shift in perspective is transformative. Features are solutions. Jobs are needs. If you start with the job, you often discover that the right solution is different from what you assumed.

> When you define the job before the solution, you stop building features nobody asked for and start solving problems people actually have.

## Anatomy of a Job

A job statement follows a specific format: "When [situation], I want to [motivation], so I can [expected outcome]."

"When I find an interesting recipe while browsing Instagram, I want to save it instantly, so I can cook it later without having to find the post again."

"When I am planning meals for the week, I want to see what ingredients I already have, so I can minimize my grocery list."

"When I am learning to use an AI coding tool, I want to understand the fundamentals first, so I can direct the tool with intention instead of guessing."

Each job has three parts: a trigger (the situation that creates the need), a motivation (what the person wants), and a desired outcome (why they want it). All three matter. Skip the situation and you miss the context. Skip the outcome and you miss the purpose.

## Functional, Emotional, and Social Jobs

Jobs are not only practical. They have emotional and social dimensions too.

Functional job: "Help me organize my recipes so I can find them when I need them." This is the task — the practical thing to accomplish.

Emotional job: "Make me feel like I have my cooking life together." This is how the person wants to feel. Calm, organized, in control, creative.

Social job: "Let me share a beautiful meal plan with my family." This is how the person wants to appear to others. Capable, thoughtful, generous.

Most product decisions optimize for the functional job and ignore the other two. But people choose products based on how those products make them feel. A recipe app that is functionally perfect but ugly will lose to one that is functionally decent but makes users feel like skilled home chefs.

## Competing with Non-Consumption

Your biggest competitor is usually not another product. It is doing nothing. Or using a spreadsheet. Or writing on a sticky note. Or keeping it in their head.

This is non-consumption — the existing way people handle the job, however imperfect. Understanding what people currently do (and why it kind of works) tells you what your product must beat. Not on features. On convenience, reliability, and outcome.

If people currently save recipes by screenshotting Instagram posts and dumping them in their camera roll — that is your real competitor. It is messy, unsearchable, and unreliable. But it is also instant, zero friction, and requires no new app. Your solution has to be at least as easy as a screenshot, or people will not switch.

## From Jobs to Features

Once you have a list of jobs, prioritization becomes straightforward:

Which jobs are most frequent? "Save a recipe I found" happens daily. "Export my meal plan as a PDF" happens never.

Which jobs are most underserved? "Find the recipe I saved three weeks ago" is a job that current solutions handle poorly.

Which jobs align with your vision? You cannot serve every job. Pick the ones that define your product's identity.

Each prioritized job maps directly to a feature. "When I find a recipe, I want to save it instantly" → a browser extension or share sheet integration. "When I am planning meals, I want to see my pantry" → a pantry inventory feature. The job tells you what to build and why.

## JTBD and AI Prompting

Jobs to Be Done translate beautifully into AI prompts. Instead of "build a save button," you can say: "The user has found a recipe on another website and wants to capture it with one click. Build a component that takes a URL, extracts the recipe data, and saves it to the user's collection. The experience should feel as instant as taking a screenshot."

That prompt encodes the situation (found a recipe elsewhere), the motivation (capture it with one click), and the outcome (as instant as a screenshot). The AI now understands not just what to build, but why — and it will make better implementation decisions because of it.

:::exercise{title="Write Five Job Statements"}
Take the project you have been developing through this pipeline (or pick a product you use daily). Write five job statements in the format: "When [situation], I want to [motivation], so I can [expected outcome]." For each job, label it as primarily functional, emotional, or social. Now rank them: which job is the most frequent? Which is the most underserved? Which one, if solved perfectly, would make users love the product? That top-ranked job is your primary design target.
:::

:::resources{title="Go Deeper"}
- [Competing Against Luck by Clayton Christensen](https://www.hbs.edu/faculty/Pages/item.aspx?num=51207) — The definitive book on JTBD by the framework's originator. Accessible and full of examples.
- [JTBD.info](https://jtbd.info/) — A comprehensive resource with templates, examples, and interview guides for JTBD practice.
- [Intercom on Jobs to Be Done](https://www.intercom.com/resources/books/intercom-jobs-to-be-done) — A free, practical guide to applying JTBD in product development.
- [Know Your Customers' Jobs to Be Done (HBR)](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done) — Clayton Christensen's Harvard Business Review article. A concise introduction to the theory.
:::
