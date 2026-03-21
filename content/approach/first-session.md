---
slug: first-session
title: Your First Session with Claude Code
subtitle: From zero to a working project in one sitting. No prior coding experience required.
duration: 30 min
status: available
badge: new
updatedAt: '2026-02-14'
category: getting-started
prerequisites:
  - 00-orientation/terminal
  - 00-orientation/file-systems
---

## What You Will Build

By the end of this guide, you will have opened a terminal, started Claude Code, given it an instruction, and watched it build something real. You will have a folder on your computer with a working project inside it.

This is not a demo. You are going to do this yourself, on your own machine, right now.

## What You Need

A computer running macOS, Windows, or Linux. An internet connection. A Claude account with Claude Code access. That is it. If you do not have Claude Code installed yet, visit docs.anthropic.com and follow the installation instructions. It takes about five minutes.

:::step{number="01" title="Open Your Terminal"}
On macOS, press Command + Space, type "Terminal", and hit Enter. On Windows, search for "Terminal" or "PowerShell" in the Start menu. On Linux, you already know.

You should see a dark window with a blinking cursor. This is your command line. Everything you build starts here.
:::

:::step{number="02" title="Create a Project Folder"}
Type the following commands one at a time, pressing Enter after each:
:::

```
mkdir my-first-project
cd my-first-project
```

You just created a new folder called "my-first-project" and moved into it. This is where your project will live.

:::step{number="03" title="Start Claude Code"}
Type the following and press Enter:
:::

```
claude
```

Claude Code will start up. You will see a prompt where you can type instructions. This is your interface — you tell Claude what to build, and it builds it.

:::step{number="04" title="Give Your First Instruction"}
Now comes the important part. Do not just say "make me a website." Be specific about what you want. Describe the thing you want to exist. Here is an example:
:::

:::template{title="Your First Prompt"}
Create a simple personal homepage with my name, a short bio, and three links to my favorite websites. Use a clean, minimal design with a dark background and light text. Make it a single HTML file that I can open in a browser.
:::

Replace the details with your own — your name, your bio, your links. The point is to describe something specific. Not "make a website" but "make THIS website with THESE things on it."

Press Enter and watch. Claude will create files, write code, and explain what it is doing. Let it work.

:::step{number="05" title="Open Your Creation"}
When Claude finishes, it will have created an HTML file in your project folder. Open it:
:::

```
open index.html
```

Your browser will open with a real webpage that you described and Claude built. This is yours. You can edit the prompt, ask Claude to change things, add features, or start over with a different idea.

:::step{number="06" title="Ask for a Change"}
Now give a follow-up instruction. This is where the conversation model matters — Claude remembers what it just built:
:::

:::template{title="A Follow-Up Prompt"}
Add a section below the bio that shows three recent projects with titles and one-sentence descriptions. Make each one a card with a subtle border.
:::

Claude will modify the existing file. Refresh your browser to see the change. This is the conversation loop: describe what you want, watch it get built, refine, repeat.

> This is not vibe coding. You described exactly what you wanted. You knew what a card layout was, what a bio section looks like, what a minimal design means. The curriculum teaches you these concepts. The approach shows you how to express them as instructions.

## What Just Happened

You created a project folder. You started an AI coding tool. You gave it a specific, intentional instruction. You saw the result. You iterated on it.

This is the entire Zero Vector workflow in miniature. Every project you build — no matter how complex — follows this same loop. The only things that change are the specificity of your instructions and the sophistication of what you ask for.

Next: set up a proper project with version control, a package manager, and a CLAUDE.md file that tells Claude Code about your project conventions.

:::resources{title="Go Deeper"}
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/overview) — Official docs for Claude Code setup and usage.
- [The Terminal (Curriculum)](/learn/curriculum/00-orientation/terminal) — Understand what a terminal actually is and how it works.
- [File Systems (Curriculum)](/learn/curriculum/00-orientation/file-systems) — How files and folders work on your computer.
:::
