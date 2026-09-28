---
slug: iteration
title: Iteration
subtitle: Build, look, adjust, build again.
duration: 18 min
status: available
---

## The Build-Look-Adjust Loop

Iteration is the heartbeat of creative work. You build something, you look at it, you adjust, and you build again. Painters do it. Writers do it. Musicians do it. Software development is no different, except with AI tools, each loop takes minutes instead of days.

This speed changes the game. When iteration was expensive (code by hand, compile, test, deploy), you front-loaded planning to avoid rework. When iteration is cheap (describe to an AI, review, refine), you can explore more options, discard bad ones faster, and converge on good solutions through rapid experimentation.

But cheap iteration has a trap: building without looking. If you never pause to evaluate what you have, you spiral into a codebase shaped by accumulated improvisations rather than deliberate decisions. The discipline is not "iterate faster." It is "look more carefully between each iteration."

> Speed without judgment is just faster wandering. The power of iteration is not in how quickly you build. It is in how clearly you see what you have built.

## The Review Step

After every change the AI agent makes, stop. Look. Ask yourself three questions:

Does this do what I asked? Open the browser, click the thing, check the behavior. Do not trust the code. Trust the output.

Do I understand how it works? Read the code the agent wrote. If something is unclear, ask the agent to explain it before moving on. Code you do not understand is debt you will pay later.

Does it fit the existing codebase? Is the naming consistent? Does it follow the same patterns? If your other components use functional components with hooks, the new one should too. Consistency is not aesthetics; it is maintainability.

If all three answers are yes, move to the next task. If any answer is no, that is your next prompt.

## Small Increments, Big Progress

The most reliable way to build software is in small, verifiable steps. Each step should change one thing, and you should be able to confirm that thing works before moving to the next.

Build the layout. Verify it renders. Add navigation. Verify the links work. Add content. Verify it displays. Add interactivity. Verify it responds. Each step is a ratchet. Once it works, you do not go backwards.

The temptation with AI agents is to ask for everything at once: "Build the whole page with navigation, content, sidebar, pagination, and animations." The agent might produce something that looks right but hides five bugs in the interactions between components. Small steps surface bugs early, when they are cheap to fix.

## When to Scrap and Restart

Sometimes iteration is not the answer. Sometimes you are polishing in the wrong direction. Recognizing this moment is a skill.

Signs you should scrap: you have gone through five iterations and the fundamental approach feels wrong. The code is getting more complex with each change instead of cleaner. You are working around the architecture instead of with it. The thing you are building does not match what you planned.

Scrapping is not failure. It is information. You now know one approach that does not work, and you understand the problem better than when you started. Your next attempt will be faster and better informed.

In practice: git stash or git checkout to revert, then start a fresh prompt with what you learned. "Last time I tried X and it got complicated because of Y. Let us try Z instead." This prompt is infinitely better than the first attempt because it encodes what you learned.

## Version Control as Safety Net

This is where Git becomes essential. Commit after every successful increment. This is not optional. It is your undo button.

The pattern: make a change → verify it works → commit with a descriptive message → move to the next change. If the next change breaks something, you can always revert to the last good commit. Without commits, your only option is "hope the AI can fix it."

Think of commits as save points in a game. You would not play for three hours without saving. Do not build for three hours without committing.

## The Two-Screen Setup

The most effective iteration workflow uses two things side by side: your terminal (where Claude Code runs) and your browser (where the result appears).

Make a change in the terminal. Switch to the browser. See the result immediately (with npm run dev and hot reload, changes appear in under a second). Decide what to adjust. Switch back to the terminal. Prompt the next change.

This tight loop, terminal to browser and back, is the rhythm of AI-assisted development. The shorter the loop, the faster you converge on the right solution. If you are not looking at the browser between prompts, you are flying blind.

## Convergent vs. Divergent Iteration

Designers know this distinction. Divergent iteration is about exploring options: try this layout, try that layout, try a completely different approach. You are expanding the possibility space.

Convergent iteration is about refining: this layout, but with more spacing. Now less padding on the cards. Now adjust the font size. You are narrowing toward a final solution.

With AI agents, divergent iteration is fast: "Show me three different approaches to this navigation." Convergent iteration is faster: "Reduce the spacing by 4px and change the hover color to blue."

Know which mode you are in. Divergent iteration should feel exploratory and open. Convergent iteration should feel like polishing. If you are polishing too early (before the structure is right) or exploring too late (when you should be shipping), adjust.

:::exercise{title="Build in Five Steps"}
- Pick a small component (a profile card, a pricing table, a testimonial block).
- Build it in exactly five prompts, committing after each one:
  - The basic structure and data.
  - The layout and spacing.
  - Responsive behavior.
  - One interactive feature (hover state, expand/collapse, link).
  - Final polish.
- After each prompt, check the browser and commit before continuing.
- Notice how each step builds cleanly on the last. This is the rhythm.
:::

:::resources{title="Go Deeper"}
- [The Design of Everyday Things by Don Norman](https://www.nngroup.com/books/design-everyday-things-revised/): The classic on iterative design. Chapters on feedback and the action cycle apply directly to code iteration.
- [Refactoring UI](https://www.refactoringui.com/): Visual design iteration techniques by the Tailwind CSS creators. Focused on making things look right through small, specific adjustments.
- [Git Stash Documentation](https://git-scm.com/docs/git-stash): How to temporarily shelve changes when you want to try a different approach without losing your current work.
:::
