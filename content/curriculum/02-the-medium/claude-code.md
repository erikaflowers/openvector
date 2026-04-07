---
slug: claude-code
title: Claude Code
subtitle: Your AI crew starts here.
duration: 22 min
status: available
knowledgeCheck:
  - question: Why does Claude Code run in the terminal rather than as a graphical application? What capabilities does the terminal give an AI agent that a chat window alone would not?
    hint: Think about what Claude Code actually does, like reading files, running commands, and editing code. Where do those actions happen?
  - question: What is the purpose of a CLAUDE.md file, and how does it change the quality of what the AI agent produces?
    hint: Think about onboarding a new team member. What happens when they have no context about how the project works?
  - question: The lesson says Claude Code replaces typing, not thinking. What is the risk of accepting AI-generated code you do not understand, and how does that relate to the concept of "vibe coding"?
  - question: Context windows have a limited size. How does this constraint affect the way you should structure your prompts and your project when working with an AI agent?
    hint: Consider what happens when the conversation gets very long. What might the agent start to forget or miss?
---

## What Is Claude Code?

Claude Code is an AI coding agent that lives in your terminal. You describe what you want to build, and it writes code, creates files, runs commands, and iterates alongside you. It is not autocomplete. It is not a chatbot. It is an agent that takes action.

You installed a terminal in Level 00. You learned about architecture and planning in Level 01. Now you are going to use both. Claude Code is the tool that connects your design thinking to running software. You think. It builds. You review. It refines.

This is not about replacing your skills. It is about amplifying them. A designer who can direct an AI agent has the output of a small engineering team with the taste of a single creative vision.

> Claude Code does not replace thinking. It replaces typing. You still need to know what to build, why, and whether it is right. The agent handles the how.

## Installing Claude Code

Claude Code runs in your terminal. You need Node.js installed (which you will need for web development anyway) and an Anthropic account.

The recommended way to install is with the official installer. Run the command below in your terminal. It handles permissions correctly and does not require sudo or admin access.

```
# Install Claude Code (recommended)
curl -fsSL https://claude.ai/install.sh | bash

# Open a new terminal window, then verify it worked
claude --version
```

Once installed, navigate to any project folder in your terminal and type claude to start a session. That is it. No IDE plugins. No complex setup. Just your terminal, your project folder, and a conversation.

You may see older guides suggest npm install -g @anthropic-ai/claude-code. That still works, but on macOS it often fails with a permissions error because the global npm directory requires admin access. If you hit that, do not use sudo. Use the installer above instead. It avoids the permissions issue entirely and will not cause problems later.

```
# Navigate to your project
cd ~/my-project

# Start a session
claude

# You are now in a conversation with an AI agent
# that can read, write, and run code in your project.
```

## How It Works

When you start Claude Code in a project folder, it can see your files, read your code, and understand your project structure. You talk to it in natural language. It responds with explanations, code changes, and terminal commands.

The key concept: Claude Code uses tools. It does not just generate text; it takes actions. It reads files (Read tool), edits them (Edit tool), creates new ones (Write tool), searches your codebase (Grep, Glob), and runs terminal commands (Bash). Each action requires your approval, so nothing happens without your consent.

Think of it as pair programming where your partner has read the documentation for every library you are using, remembers every file in your project, and types at the speed of light. But you are still the driver. You set the direction.

## The CLAUDE.md File

Every project can have a CLAUDE.md file in its root directory. This is your instruction manual for the AI. It tells Claude Code how your project works, what conventions to follow, what patterns to use, and what to avoid.

Think of CLAUDE.md as onboarding documentation. When a new developer joins a team, you give them context: "We use React, our styles are in CSS modules, our API lives in /api, never push directly to main." CLAUDE.md is the same thing, for your AI collaborator.

A good CLAUDE.md includes: the tech stack, project structure, naming conventions, how to run the dev server, how to build, and any patterns or anti-patterns specific to your project. The more specific you are, the better the agent performs.

You will learn to write comprehensive CLAUDE.md files in Level 04. For now, know that it exists and that it is the foundation of effective AI collaboration.

## Your First Session

A typical first session looks like this: you navigate to your project, start Claude Code, and describe what you want. "Create a React component that shows a list of books with title and author. Add some sample data."

Claude Code will read your existing files to understand the project, then propose creating the component. It shows you what it plans to do before doing it. You approve, it writes the file, and you can immediately see the result in your browser.

The conversation continues. "Add a delete button to each book." "Make the list sortable by title." "Style it to match the rest of the site." Each instruction builds on the previous one. The agent remembers the full context of what you have built together.

When you are done, exit the session. Your changes are saved to your files. You can commit them to Git, push to GitHub, and deploy, just like any code.

## What It Is Good At

Claude Code excels at: generating boilerplate code, implementing well-defined features, finding and fixing bugs, refactoring existing code, explaining how code works, writing tests, and handling the tedious parts of development (configuration, setup, repetitive patterns).

It is particularly powerful when you give it clear instructions derived from your planning work. "Build the header component with the logo on the left and three navigation links on the right" gets better results than "make the site look good."

It is also excellent at working within existing codebases. Point it at your code and ask questions: "How does the routing work?" "What happens when a user clicks submit?" "Why is this component re-rendering?" It reads the code and explains.

## What It Is Not Good At

Claude Code is not good at making design decisions for you. It can implement any design you describe, but it cannot tell you which design is right for your users. That is your job.

It struggles with ambiguity. "Make it better" is a bad instruction. Better how? Faster? More readable? More accessible? More visually appealing? The more specific you are, the better the output.

It can produce code you do not understand. This is the most important risk. If you accept code without understanding it, you are vibe coding, letting the AI drive while you sit in the back seat. The Zero Vector approach: always understand what the agent built and why. If you do not understand it, ask the agent to explain before moving on.

:::exercise{title="Start Your First Session"}
- Create a new folder: `mkdir claude-practice && cd claude-practice`
- Initialize a project: `npm create vite@latest . -- --template react` (accept the defaults)
- Install dependencies: `npm install`
- Start Claude Code: `claude`
- Your first instruction: "Read the project structure and explain what each file does."
- Let it explore and explain.
- Then: "Create a simple component called Greeting that takes a name prop and displays 'Hello, {name}' and update App.jsx to use the Greeting component."
- Review the code it writes. Does it match the existing patterns?
- Approve it, if requested
- Run the app: `npm run dev`
:::

:::resources{title="Go Deeper"}
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/overview): The official docs. Start with the overview, then read the tutorials section.
- [Claude Code Tutorials](https://docs.anthropic.com/en/docs/claude-code/tutorials): Step-by-step guides for common workflows: creating projects, debugging, refactoring.
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook): Example projects and patterns for working with Claude. Practical, code-heavy.
:::
