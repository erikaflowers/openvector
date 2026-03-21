---
slug: scaffold-project
title: Setting Up a Project
subtitle: Folder structure, version control, CLAUDE.md, and your first commit. The project launch checklist.
duration: 25 min
status: available
badge: new
updatedAt: '2026-02-14'
category: getting-started
prerequisites:
  - 00-orientation/terminal
  - 00-orientation/git-basics
  - 00-orientation/repos
---

## What You Will Build

A properly structured project with version control, a clear folder layout, and a CLAUDE.md file that tells your AI tools exactly how this project works. This is the foundation every project starts from.

Skipping this step is how projects become unmaintainable. Spending twenty minutes here saves twenty hours later.

:::step{number="01" title="Create and Enter Your Project Folder"}
Choose a meaningful name. Not "test" or "project1" — something that describes what this is.
:::

```
mkdir my-portfolio-site
cd my-portfolio-site
```

:::step{number="02" title="Initialize Git"}
Git tracks every change you make. It is your unlimited undo button and your collaboration layer. Initialize it immediately — before you write any code.
:::

```
git init
```

:::step{number="03" title="Create Your CLAUDE.md"}
This is the most important file in your project. It tells Claude Code (and any other AI tool) about your project: what it is, how it is structured, what conventions you follow, and what it should never do.

Create the file and open it in your editor:
:::

```
touch CLAUDE.md
```

:::template{title="Starter CLAUDE.md"}
# Project Name

One-sentence description of what this project is.

## Stack

- Framework: [React/Vue/Svelte/vanilla HTML]
- Styling: [CSS/Tailwind/styled-components]
- Build tool: [Vite/Next.js/none]
- Deployment: [Netlify/Vercel/GitHub Pages]

## Structure

```
src/
  pages/       — One file per page
  components/  — Reusable UI components
  styles/      — CSS files
  content/     — Text content, data files
public/        — Static assets (images, fonts)
```

## Conventions

- CSS class prefix: [your-prefix]-
- Component naming: PascalCase
- File naming: kebab-case

## Rules

- Do not add dependencies without asking
- Do not modify files outside src/ without asking
- Keep components under 150 lines
- Use semantic HTML
:::

Fill this in with your actual project details. The more specific you are, the better Claude Code will understand your project. This file is read automatically every time Claude Code starts in this directory.

:::step{number="04" title="Create Your Folder Structure"}
Set up the skeleton before writing any code. This is information architecture — deciding where things live before they exist.
:::

```
mkdir -p src/pages src/components src/styles src/content public
```

:::step{number="05" title="Initialize Your Package Manager"}
If you are building a JavaScript project (React, Vue, or any modern framework), initialize npm. This creates a package.json that tracks your project dependencies.
:::

```
npm init -y
```

:::step{number="06" title="Create a .gitignore"}
Tell Git which files to ignore — things like installed packages, build output, and environment files with secrets.
:::

:::template{title="Standard .gitignore"}
node_modules/
dist/
.env
.DS_Store
*.log
:::

:::step{number="07" title="Make Your First Commit"}
You now have a project structure, a CLAUDE.md, and a .gitignore. Commit this foundation before building anything.
:::

```
git add .
git commit -m "Initial project structure and CLAUDE.md"
```

> Commit early, commit often. Every meaningful change gets a commit. This is not optional — it is how you build a safety net. If something breaks, you can always go back to the last commit that worked.

:::step{number="08" title="Start Claude Code and Verify"}
Now start Claude Code in your project directory:
:::

```
claude
```

Ask Claude to describe the project. If it reads your CLAUDE.md correctly, it will know what the project is, what stack you are using, and what conventions to follow. That is the test — if the AI understands your project structure, you set it up correctly.

## Your Project is Ready

You now have: a clean folder structure, version control tracking every change, a CLAUDE.md that communicates your intentions to AI tools, and a first commit to anchor everything.

This takes fifteen minutes and saves you from the number one mistake people make with AI coding tools: starting without structure. Without this foundation, your project becomes a tangle of files that nobody — including the AI — can navigate.

Next: write a PRD that describes what you are actually building, so your instructions to Claude Code are grounded in a clear plan.

:::resources{title="Go Deeper"}
- [CLAUDE.md (Curriculum)](/learn/curriculum/04-orchestration/claude-md) — The full lesson on writing effective CLAUDE.md files.
- [Git Basics (Curriculum)](/learn/curriculum/00-orientation/git-basics) — How version control works and why it matters.
- [Architecture (Curriculum)](/learn/curriculum/01-foundation/architecture) — How to see the structure behind applications.
:::
