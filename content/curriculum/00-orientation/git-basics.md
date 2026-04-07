---
slug: git-basics
title: Git Basics
subtitle: Version control is not Google Drive.
duration: 20 min
status: available
badge: new
updatedAt: '2026-02-14'
knowledgeCheck:
  - question: A commit is often described as a "snapshot." What makes it different from an auto-save, and why does that distinction matter for understanding your project history?
  - question: Git and GitHub are often confused. If GitHub went offline tomorrow, would you lose your local Git history? Why or why not?
    hint: Think about what "distributed" means in "distributed version control."
  - question: Why does Git make you stage changes before committing, instead of just saving everything at once? What advantage does that intermediate step give you?
    hint: Imagine you fixed a bug and also reformatted a file. Would you want both changes in the same snapshot?
  - question: The lesson says "commit early, commit often." What is the risk of waiting too long between commits, and why is a frequent small commit better than a rare large one?
---

## What Is Version Control?

Imagine writing a novel and being able to rewind to any paragraph you ever wrote, on any day, and see exactly what changed, who changed it, and why. That is version control.

It is not Google Drive auto-save. Auto-save captures everything indiscriminately: every typo, every half-finished thought. Version control is intentional. You decide when to take a snapshot. You write a message explaining what that snapshot means. And every snapshot is permanent, reachable, and diffable against any other snapshot.

The tool that does this is called Git. It was created in 2005 by Linus Torvalds, the person who built the Linux kernel, because he needed something fast, distributed, and impossible to corrupt. He built it in about two weeks. It won. Virtually every software project on Earth uses Git now.

> Git is not a backup system. It is a time machine you control. Every commit is a deliberate checkpoint that you chose to create, with a message explaining why.

## The Three States

Git tracks your files in three states, and understanding these three states is the key to everything:

Working directory: this is your project folder right now. The files as they currently exist on disk. When you edit a file, the change lives here first.

Staging area: a holding zone where you prepare your next snapshot. You choose which changes to include. Maybe you edited five files but only want to commit three, so you stage those three.

Repository: the permanent history. When you commit, everything in the staging area becomes a new snapshot in the repository. This snapshot is immutable. It exists forever (or until you explicitly tell Git to remove it, which is hard to do by accident).

The mental model is simple: you edit files (working directory) → you choose which changes to save (staging) → you save them with a message (commit to repository). Edit, stage, commit. That is the rhythm.

```
# The rhythm of Git:
# 1. Edit your files (working directory)
# 2. Stage the changes you want to save
git add index.html styles.css
# 3. Commit with a message explaining why
git commit -m "Add landing page layout and base styles"
```

## The Core Commands

`git init` starts tracking a project. Run this once in a project folder and Git begins watching. It creates a hidden .git folder where all the history lives.

`git status` is your best friend. Shows what has changed, what is staged, what is not. Run this constantly. When in doubt, run `git status`.

`git add` stages changes. `git add filename.js` stages one file. `git add .` stages everything that changed. Be intentional about what you stage.

`git commit -m "message"` saves a snapshot. The `-m` flag lets you write the message inline. Everything in the staging area becomes a permanent part of history.

`git log` shows the history. Shows every commit, who made it, when, and the message. Press q to exit the log view.

`git diff` shows what changed. Shows the exact lines that were added, removed, or modified since your last commit. Invaluable for reviewing your work before committing.

```
git init                          # Start tracking this folder
git status                        # What has changed?
git add .                         # Stage all changes
git commit -m "Initial commit"    # Save the snapshot
git log                           # See the history
git diff                          # See uncommitted changes
```

## Commit Messages

A commit message is a note to your future self (and anyone else who reads the history). The difference between a good message and a bad one is enormous.

Bad: "updated stuff." What stuff? Why? This tells you nothing six months from now.

Bad: "changed line 42 in App.jsx." This describes what Git already shows you in the diff. You are duplicating information.

Good: "Fix login timeout that logged users out after 30 seconds." This tells you what was wrong and what the fix accomplishes. Your future self can search for "login timeout" and find this commit instantly.

Good: "Add dark mode toggle to settings page." Clear, specific, describes intent.

The convention: start with a verb in imperative mood (Add, Fix, Update, Remove, Refactor). Keep it under 72 characters. If you need more detail, leave a blank line after the first line and write a longer description.

## When Things Feel Scary

Here is the most important thing about Git: you almost cannot lose work. If you committed it, it is saved. Even if you make a mess, the history is still there.

If you are unsure what state things are in, run `git status`. It always tells you the truth.

If you made changes you want to undo before committing, `git checkout -- filename` restores a file to its last committed state.

If you committed something you did not mean to, `git revert` creates a new commit that undoes the previous one without erasing history.

The only way to truly lose work is to delete uncommitted changes. So the rule is simple: commit early, commit often. A commit costs nothing. Losing an hour of work costs a lot.

> When in doubt, commit. You can always reorganize history later. But you cannot recover work you never committed.

::::exercise{title="Your First Repository"}

:::prereq
Confirm Git is installed: run `git --version` in your terminal. If you see a version number, you are ready. If not:

- **Mac:** Run `xcode-select --install` in your terminal. When it finishes, Git will be available. Alternatively, download the installer from [git-scm.com](https://git-scm.com/download/mac).
- **Windows:** Download Git for Windows from [git-scm.com](https://git-scm.com/download/win) and run the installer with default settings. It includes Git Bash, a terminal that works with the commands in this lesson.
:::

- Open your terminal
- Create a project folder: `mkdir git-practice && cd git-practice`
- Initialize Git: `git init`
- You should see "Initialized empty Git repository." 
- Create a file: `touch README.md`
- Run `git status`; it shows README.md as untracked 
- Stage it: `git add README.md`
- Run `git status` again; it is now staged 
- Commit: `git commit -m "Initial commit with README"`
- Run `git log` to see your first commit
- Now open README.md in any text editor, add a line of text, save it
- Run `git diff`, and you can see exactly what changed
- Stage and commit: `git add . && git commit -m "Add description to README"`
- Run `git log`, and you now have two commits

You have a time machine.
::::

:::resources{title="Go Deeper"}
- [Pro Git (free book)](https://git-scm.com/book/en/v2). The definitive Git reference. Chapters 1-3 cover everything a beginner needs.
- [Oh Shit, Git!?!](https://ohshitgit.com/). A brilliant, profanity-laced guide to getting out of common Git messes. Bookmark this.
- [GitHub Git Handbook](https://docs.github.com/en/get-started/using-git/about-git). GitHub's concise introduction to Git concepts.
- [Learn Git Branching](https://learngitbranching.js.org/). Interactive visual tutorial. Teaches branching with animated diagrams.
:::
