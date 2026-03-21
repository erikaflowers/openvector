---
slug: effective-instructions
title: Giving Effective Instructions
subtitle: How to tell AI what to build. Prompt structure, context loading, and the art of specificity.
duration: 25 min
status: available
badge: new
updatedAt: '2026-02-14'
category: working-with-agents
prerequisites:
  - 02-the-medium/claude-code
  - 02-the-medium/prompting
---

## What You Will Learn

The difference between a vague instruction that produces generic output and a precise instruction that produces exactly what you envisioned. By the end of this guide, you will know how to structure any instruction to Claude Code — from a one-liner to a complex multi-step build task.

This is the single most impactful skill in design-led engineering. The quality of what you get out is directly proportional to the clarity of what you put in.

## The Anatomy of a Good Instruction

Every effective instruction to Claude Code has three components: Context (what already exists), Intent (what you want to happen), and Constraints (what you do not want to happen). Most people skip context and constraints, and then wonder why the AI guessed wrong.

Think of it like talking to a contractor. You would never say "build me a room." You would say "I have a two-bedroom house (context). I want to add a home office in the back corner of the living room (intent). Do not move any plumbing, keep the existing hardwood floors, and stay within the existing foundation footprint (constraints)."

> Specificity is not verbosity. A ten-word instruction can be perfectly specific. "Add a dark mode toggle to the nav bar that saves preference to localStorage" — that is 15 words and leaves almost nothing to guess.

:::step{number="01" title="Start with Context"}
Before telling Claude Code what to build, make sure it knows what already exists. If you have a CLAUDE.md (you should), it reads that automatically. But for specific tasks, you often need to add more context.

Point to relevant files: "Look at src/components/Nav.jsx — that is the navigation component." Reference your PRD: "See PRD.md, the contact form feature." Describe the current state: "Right now the homepage has a hero section and a project grid. I want to add a testimonials section between them."

The more context Claude has, the less it guesses. Guessing is where things go wrong.
:::

:::step{number="02" title="State Your Intent Clearly"}
Say what you want to exist when Claude is done. Not what you want Claude to do — what you want to be true about the codebase afterward. There is a subtle but important difference.

"Add a footer component" is a command. "The site should have a footer with three columns: contact info on the left, navigation links in the middle, and social media icons on the right" is an intent. The second version gives Claude everything it needs to make good decisions about implementation.
:::

:::step{number="03" title="Add Constraints"}
Constraints prevent Claude from doing things you did not ask for. This is critical. AI tools love to be helpful, and "helpful" sometimes means adding features, refactoring code you did not mention, or changing your design system.

Common constraints: "Do not modify any existing components." "Use the existing color variables in styles/variables.css." "Do not add any new dependencies." "Keep the component under 100 lines." "Match the style of the existing ProjectCard component."

Think of constraints as guardrails. They do not slow Claude down — they keep it on the road.
:::

:::step{number="04" title="See the Difference: Vague vs. Specific"}
Let us look at the same task written two ways. First, the vague version — what most people type on their first try:
:::

:::template{title="Vague Instruction (Do Not Do This)"}
Add a testimonials section to the homepage.
:::

This will produce something. But what? How many testimonials? What layout? What data? Where on the page? What style? Claude will guess all of these things, and its guesses may not match your vision.

Now the specific version:

:::template{title="Specific Instruction (Do This)"}
Add a testimonials section to the homepage, between the project grid and the contact section.

Requirements:
- Show 3 testimonials in a horizontal row (stacking vertically on mobile)
- Each testimonial has: quote text (2-3 sentences), person's name, their title and company
- Use a card layout with the same border-radius and shadow as the ProjectCard component
- Use placeholder content for now — I will replace it with real quotes later
- Add a section heading: "What People Are Saying"

Constraints:
- Do not modify any existing components
- Use the existing CSS variables for colors and spacing
- Keep this as a single TestimonialSection component in src/components/
:::

Same task. But now Claude knows exactly where it goes, what it contains, how it is laid out, what it looks like, and what not to touch. The output will be dramatically closer to what you actually wanted.

:::step{number="05" title="Use the Instruction Template for Complex Tasks"}
For larger tasks — anything that touches multiple files or involves non-obvious logic — use a structured format. This is not mandatory, but it prevents the most common mistakes.
:::

:::template{title="Complex Instruction Template"}
## Task
[One sentence: what should exist when you are done.]

## Context
- [Relevant file: what it does]
- [Relevant file: what it does]
- [Current state of the feature]

## Requirements
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

## Constraints
- [Do not modify...]
- [Must use existing...]
- [Keep under...]

## Acceptance Criteria
- [I can do X and see Y]
- [When I do A, B happens]
- [This works on mobile at 375px width]
:::

:::step{number="06" title="Load Context from Your Project Documents"}
Remember the PRD, use cases, and project plan you wrote? This is where they pay off. Instead of re-explaining your product every time, reference the documents.

You can paste a section of your PRD directly into the conversation: "Here is the use case for the contact form: [paste use case]. Build this." You can also just tell Claude where to look: "Read use-cases.md and implement the Send a Message use case."

The best practice is to keep these documents updated and referenced in your CLAUDE.md, so the context is always loaded automatically.
:::

:::step{number="07" title="Handle Multi-Step Tasks"}
Sometimes one instruction is not enough. If a task involves five different files and complex logic, break it into a sequence of instructions. Build from the inside out.

For example, building a blog feature: First, "Create the data model for blog posts in src/content/posts.js with title, slug, date, excerpt, body, and tags." Wait for that. Then, "Create a BlogList component that reads from posts.js and displays each post as a card with title, date, and excerpt." Wait for that. Then, "Create a BlogPost page that displays a full post based on the URL slug." Build one piece, verify it, then build the next.

This is not slower — it is faster, because you catch problems early instead of untangling a mess at the end.
:::

:::step{number="08" title="Review Before You Accept"}
After Claude produces code, do not just move on. Look at what it built. Open the file. Read the component. Check that it matches your instruction. This is not about doubting the AI — it is about maintaining your understanding of your own codebase.

If something does not look right, say so: "The testimonial cards should have more padding — increase it to 2rem. Also, the heading should use the h2 style from the design system, not a custom font size." Iterate. The first output is a draft, not a final answer.
:::

> The goal is not to write the perfect instruction on the first try. The goal is to get close enough that the iteration loop is short. One good instruction plus two refinements beats ten minutes trying to write the "perfect" prompt.

:::step{number="09" title="Save Patterns You Reuse"}
If you find yourself giving the same kind of instruction repeatedly — "create a new page component with this layout" or "add a new section to the homepage" — save it as a template. You can put these in your CLAUDE.md under a section called "Common Patterns":
:::

```
## Common Patterns

### New Page
When creating a new page:
- Create the component in src/pages/
- Add the route in App.jsx
- Add the nav link in Nav.jsx
- Use the PageLayout wrapper component
- Include a meta title and description

### New Section
When adding a section to a page:
- Create the section as its own component in src/components/
- Use existing CSS variables for spacing and color
- Include responsive breakpoints at 768px and 1024px
- Follow the naming pattern: [Feature]Section.jsx
```

Now every time you or Claude Code creates a new page, the conventions are already documented. You do not have to repeat them in every instruction.

:::exercise{title="Try It"}
Take a feature you want to build and write two versions of the instruction: first the way you would naturally type it (probably vague), then rewrite it using the Context + Intent + Constraints structure. Compare the two. Which one would produce a better result if you handed it to a human developer who had never seen your project?
:::

:::resources{title="Go Deeper"}
- [Prompting (Curriculum)](/learn/curriculum/02-the-medium/prompting) — The fundamentals of communicating with AI tools effectively.
- [Claude Code (Curriculum)](/learn/curriculum/02-the-medium/claude-code) — How Claude Code works and how to get the most out of it.
- [CLAUDE.md (Curriculum)](/learn/curriculum/04-orchestration/claude-md) — Writing project context files that make every instruction more effective.
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Official guide to structuring prompts for Claude models.
:::
