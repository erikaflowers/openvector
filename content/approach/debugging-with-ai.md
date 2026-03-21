---
slug: debugging-with-ai
title: Debugging with AI
subtitle: 'When something breaks: how to describe the problem, share context, and find the fix.'
duration: 20 min
status: available
badge: new
updatedAt: '2026-02-14'
category: build-workflow
prerequisites:
  - 02-the-medium/claude-code
  - 01-foundation/systems-thinking
---

## What You Will Learn

How to debug effectively when AI-written code breaks. This guide covers how to describe bugs so Claude can actually help, how to share the right context, when to revert instead of fix, and the systematic approaches that find root causes instead of patching symptoms.

Things will break. That is normal. What separates a frustrating experience from a productive one is knowing how to respond when it happens.

## The First Rule: Do Not Panic, Diagnose

When something breaks after an AI change, the instinct is to immediately tell Claude "it is broken, fix it." Resist that instinct. Telling an AI "fix it" without context is like calling a mechanic and saying "my car is broken" without describing the symptom. You will get a guess, not a diagnosis.

Instead, pause. Look at the screen. Read the error message. Open the browser console. Identify what is actually happening versus what should be happening. Then communicate that clearly.

> The quality of the fix is directly proportional to the quality of the bug report. Spend sixty seconds describing the problem well, and save twenty minutes of back-and-forth guessing.

:::step{number="01" title="Capture the Error"}
Before you type anything to Claude, collect the evidence. There are three places errors show up in web development, and you should check all three:

The browser screen: What do you see? A blank page? A partially rendered page? An error message? A component that looks wrong? Screenshot it or describe it precisely.

The browser console: Open Developer Tools (F12 or Command+Option+I on Mac). Click the Console tab. Look for red error messages. Copy the full error text, including the stack trace.

The terminal: Look at the terminal where your dev server is running. Are there compilation errors? Runtime errors? Warning messages? Copy the relevant lines.
:::

```
# Common places to look for errors:

# 1. Browser console (open Dev Tools → Console tab)
# Look for red error messages like:
# Uncaught TypeError: Cannot read properties of undefined (reading 'map')
# at ProjectList (ProjectList.jsx:14)

# 2. Terminal (where your dev server runs)
# Look for compilation errors like:
# ERROR in src/components/ProjectList.jsx
# Module not found: Can't resolve './ProjectCard'

# 3. Network tab (Dev Tools → Network tab)
# Look for failed requests (red, status 400/404/500)
```

:::step{number="02" title="Describe the Bug: Observed vs. Expected"}
The most effective bug description format is two sentences: what you expected to happen, and what actually happened. This gives Claude the gap between intent and reality — which is where the bug lives.
:::

:::template{title="Bug Report Template"}
## Bug Report

**Expected:** [What should happen when I do X]
**Observed:** [What actually happens when I do X]

**Steps to reproduce:**
1. [First action I take]
2. [Second action I take]
3. [This is where it breaks]

**Error message:**
```
[Paste the full error message and stack trace here]
```

**What changed recently:**
[The last thing Claude modified, or the last commit message]

**Files likely involved:**
- [file 1]
- [file 2]
:::

:::step{number="03" title="Give Claude the Full Picture"}
Now tell Claude about the bug. Include everything you collected: the observed-vs-expected description, the error message with stack trace, and what changed recently. Here is what an effective debugging prompt looks like:
:::

:::template{title="Debugging Prompt Example"}
The project list page is broken. When I navigate to /projects, I see a blank white page.

Expected: The page should show a grid of project cards with titles and thumbnails.
Observed: Blank white page. No errors visible on screen.

Browser console error:
Uncaught TypeError: Cannot read properties of undefined (reading 'map')
  at ProjectList (ProjectList.jsx:14)

The last change was adding a category filter to the project data. The projects.js data file was modified to add a category field to each project.

Please look at src/pages/ProjectList.jsx and src/content/projects.js and find the issue.
:::

Notice how specific this is. Claude does not have to guess what "broken" means. It knows the symptom (blank page), the error (TypeError on line 14), the likely cause (recent data model change), and exactly which files to look at.

:::step{number="04" title="Use the Binary Search Method"}
Sometimes you do not have a clear error message. The page just looks wrong, or a feature silently stopped working. When the cause is not obvious, use the binary search debugging method.

The idea: isolate the problem by eliminating half the possible causes at a time. If the bug appeared after a Claude Code session where ten files were modified, check if the first five changes work without the last five. If they do, the bug is in the last five. Check if the first three of those five work. Narrow it down until you find the single change that caused the break.

In practice, this means reverting changes file by file. Start by reverting the most recently changed file and see if the bug persists:
:::

```
# See which files changed
git diff --stat

# Revert one file at a time and test
git checkout -- src/content/projects.js
# Test in browser — is the bug gone?

# If yes: the bug was in projects.js. Restore it and fix it.
git checkout HEAD -- src/content/projects.js

# If no: restore that file and try the next one
git checkout HEAD -- src/content/projects.js
git checkout -- src/pages/ProjectList.jsx
# Test again...
```

:::step{number="05" title="Check the Obvious Things First"}
Before going deep, check the dumb things. Most bugs in AI-assisted development come from a short list of common causes:

Import errors: Claude created a file but did not import it, or imported from the wrong path. Check that all import statements point to files that actually exist.

Mismatched data shapes: Claude changed a data model but did not update all the components that consume it. If a component expects an array and gets undefined, it crashes.

Case sensitivity: File is named ProjectCard.jsx but the import says projectCard.jsx. Works on Mac (case-insensitive filesystem), fails in production (case-sensitive Linux).

Missing dependencies: Claude used a library it assumed was installed. Check package.json and run npm install if needed.

Port conflicts: Dev server did not restart cleanly. Kill the process and restart it.
:::

:::step{number="06" title="Know When to Revert Instead of Fix"}
Sometimes the fastest fix is no fix at all. If Claude made a change that broke things and you cannot figure out why within ten minutes, revert to your last checkpoint commit and try again with a different approach.

This is not admitting defeat. This is efficiency. If you spent ten minutes trying to understand why a refactor broke your routing, and the refactor was supposed to take five minutes, you are already underwater. Revert, rethink, retry.
:::

```
# Revert everything back to the last checkpoint commit
git checkout .

# Or if you already committed the broken code:
git log --oneline -5    # find the last good commit
git reset --hard abc1234 # go back to it
```

> The decision framework: if you can describe the bug clearly and it seems like a small fix, fix it. If you cannot figure out what is wrong after ten minutes of investigation, revert and rebuild. Rebuilding with a better instruction is almost always faster than debugging a tangled mess.

:::step{number="07" title="Use Console Logging Strategically"}
When Claude cannot find the bug from the error message alone, add logging to trace what is actually happening at runtime. Tell Claude where you want visibility:
:::

:::template{title="Logging Request"}
I cannot figure out why the project list is empty. Add console.log statements to help debug:

1. In ProjectList.jsx, log the projects data right after it loads from the import
2. In the filter function, log what goes in and what comes out
3. In the render, log how many items are being mapped

Do not change any logic — just add the logging so I can see what is happening in the console.
:::

Check the browser console. The logs will tell you exactly where the data disappears or transforms into something unexpected. Once you find the issue, remove the logging and fix the actual problem.

:::step{number="08" title="Fix the Bug, Then Write a Regression Test"}
After you find and fix a bug, take one extra step: add a check so the same bug cannot come back. This can be as simple as a comment in the code:
:::

```
// IMPORTANT: projects is loaded from ../content/projects.js
// It must be an array. If the data model changes, update the
// default value below to prevent the .map() crash.
const projects = data?.projects || [];
```

For more critical bugs, add a proper test or a defensive check. The point is: every bug you find teaches you something about where your system is fragile. Encode that lesson in the code so it protects you next time.

:::step{number="09" title="Prevent the Most Common AI Bugs"}
After enough debugging sessions, patterns emerge. Most AI-generated bugs fall into a few categories, and you can prevent them by adding rules to your CLAUDE.md:
:::

:::template{title="Preventive CLAUDE.md Rules"}
## Rules (Bug Prevention)

- Always check that imported files exist before referencing them
- Use optional chaining (?.) when accessing nested object properties
- Always provide a default value for data that might be undefined
- Do not change the shape of data models without updating all consumers
- Test that all routes resolve to a component before committing
- Do not remove existing error handling when refactoring
:::

These rules are born from bugs. Every time you find a category of bug that keeps happening, add a preventive rule. Over time, your CLAUDE.md becomes a codified set of hard-won lessons.

:::exercise{title="Try It"}
Intentionally introduce a bug into your project: rename a data field in one file but not in the component that uses it. Then practice the debugging workflow. Look at the browser. Check the console. Write a bug report using the observed-vs-expected template. Give it to Claude. See how much faster it finds the fix when you describe the problem well versus just saying "it is broken."
:::

:::resources{title="Go Deeper"}
- [Systems Thinking (Curriculum)](/learn/curriculum/01-foundation/systems-thinking) — Understanding how parts of a system interact — which is really what debugging is about.
- [Claude Code (Curriculum)](/learn/curriculum/02-the-medium/claude-code) — Getting the most out of Claude Code, including debugging workflows.
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/) — The official guide to Chrome's debugging tools — Console, Network, Elements, and more.
- [Managing Revision History (Approach)](/learn/approach/revision-history) — The git workflow that gives you safe revert points when debugging gets tough.
:::
