---
slug: revision-history
title: Managing Revision History
subtitle: Git workflow for AI-assisted projects. Commit strategy, branch management, and reviewing changes.
duration: 20 min
status: available
badge: new
updatedAt: '2026-02-14'
category: working-with-agents
prerequisites:
  - 00-orientation/git-basics
  - 00-orientation/repos
---

## What You Will Learn

How to use git as a safety net when AI is writing code. When to commit, how to review AI-generated changes, how to branch for experiments, and how to revert when something goes wrong. This is not a git tutorial — it is a workflow guide for the specific challenges of AI-assisted development.

AI agents write code fast. That is both the power and the danger. Without disciplined version control, you can find yourself three hundred lines deep in changes you do not understand, with no way back to the version that worked.

> The checkpoint commit is the most important habit in AI-assisted development. Before you tell Claude Code to make a change, commit what you have. If the change goes wrong, you can always get back to the last checkpoint.

:::step{number="01" title="The Checkpoint Commit Pattern"}
Before every significant Claude Code instruction, make a commit. Not after — before. This gives you a known-good state to return to if the AI produces something you do not want.

The workflow is: commit what works, then ask Claude to change something, then review the changes, then commit again if they are good. If they are not good, revert to the checkpoint.
:::

```
# Before asking Claude to make a change:
git add .
git commit -m "checkpoint: contact form working, before adding validation"

# Now give Claude the instruction to add validation
# ...

# After reviewing the changes:
git add .
git commit -m "add client-side validation to contact form"
```

:::step{number="02" title="Review Every AI-Generated Change"}
After Claude Code modifies files, look at what changed before you commit. Use git diff to see exactly what was added, removed, or modified:
:::

```
# See what changed (unstaged)
git diff

# See a summary of which files changed
git diff --stat

# See changes in a specific file
git diff src/components/ContactForm.jsx
```

You do not need to understand every line of code. But you should understand the shape of the changes. Did Claude only touch the files you expected? Did it add files you did not ask for? Did it modify something in a completely different part of the project? These are red flags.

Look for: unexpected file modifications (especially package.json, config files, or unrelated components), large amounts of deleted code, new dependencies you did not request, and hardcoded values where variables should be.

:::step{number="03" title="Write Meaningful Commit Messages"}
When AI is writing the code, your commit messages become even more important. They are the narrative thread that explains why changes were made, since the code itself might not be in your personal style.

Good commit messages describe intent, not action. Not "update ContactForm.jsx" but "add email validation to contact form." Not "modify styles" but "increase card padding for readability on mobile." Your future self will thank you.
:::

:::template{title="Commit Message Patterns"}
# Good commit messages for AI-assisted projects:

add testimonials section to homepage
fix contact form not submitting on Safari
refactor nav to support mobile hamburger menu
checkpoint: project gallery working, before adding filters
revert: undo search feature, broke existing routing
polish: adjust spacing and typography on about page
wip: blog list renders, individual posts not yet linked
:::

:::step{number="04" title="Branch for Experiments"}
When you want Claude Code to try something risky — a major refactor, a new approach to a component, or a feature you are not sure about — create a branch first. This is your experimental sandbox.
:::

```
# Create a branch for the experiment
git checkout -b experiment/search-feature

# Work with Claude Code on the experiment...
# Make commits as you go...

# If it works: merge it back
git checkout main
git merge experiment/search-feature

# If it does not work: abandon it
git checkout main
git branch -D experiment/search-feature
```

The branch is free insurance. It takes five seconds to create and saves you from the nightmare of trying to manually undo a failed experiment across fifteen files.

:::step{number="05" title="Revert When Things Go Wrong"}
Things will go wrong. Claude will produce code that breaks something else, or it will refactor your entire file structure when you asked for a small change. Knowing how to revert is not optional.

There are three levels of reverting, from gentle to nuclear:
:::

```
# Level 1: Undo changes to a specific file (discard all uncommitted changes)
git checkout -- src/components/ContactForm.jsx

# Level 2: Undo all uncommitted changes (back to last commit)
git checkout .

# Level 3: Go back to a specific commit (the nuclear option)
git log --oneline   # find the commit hash you want to go back to
git reset --hard abc1234   # replace abc1234 with the actual hash
```

> Level 3 destroys everything after that commit. Only use it when you are sure. This is why checkpoint commits matter — they give you a recent, safe point to reset to instead of going all the way back to the beginning.

:::step{number="06" title="Use Git Log to Understand Your History"}
Your git log tells the story of your project. When you need to understand when something broke or what changed last Tuesday, the log is your timeline.
:::

```
# See recent commits (compact)
git log --oneline -20

# See what changed in a specific commit
git show abc1234

# See what changed between two commits
git diff abc1234..def5678

# Find the commit that introduced a specific file
git log --follow src/components/ContactForm.jsx
```

:::step{number="07" title="The Daily Workflow"}
Here is the complete git workflow for an AI-assisted development session. This becomes second nature after a few days:
:::

:::template{title="Daily Git Workflow"}
1. START OF SESSION
   git status              (see where you left off)
   git log --oneline -5    (remember what you did last time)

2. BEFORE EACH CLAUDE CODE TASK
   git add .
   git commit -m "checkpoint: [what currently works]"

3. AFTER EACH CLAUDE CODE TASK
   git diff --stat          (see what files changed)
   git diff                 (review the actual changes)
   # If good:
   git add .
   git commit -m "[what this change does]"
   # If bad:
   git checkout .           (undo everything back to checkpoint)

4. END OF SESSION
   git add .
   git commit -m "end of session: [summary of what got done]"
   git push                 (back up to remote)
:::

:::step{number="08" title="Stage Selectively"}
Claude sometimes modifies files you did not intend. Instead of committing everything with git add ., stage only the files you reviewed and approved:
:::

```
# Stage specific files only
git add src/components/ContactForm.jsx src/styles/contact.css

# See what is staged vs what is not
git status

# Commit only the staged files
git commit -m "add contact form component and styles"

# Discard the changes you did not want
git checkout -- src/pages/Home.jsx
```

Selective staging is a superpower. It lets you accept the changes you want and reject the ones you did not ask for, all in one step.

:::step{number="09" title="Push to Remote Regularly"}
Your local git history only exists on your machine. If your laptop dies, your project dies with it. Push to a remote repository (GitHub, GitLab, or similar) at least once per work session.

If you have not set up a remote yet, this is a two-minute task:
:::

```
# Create a repo on GitHub, then:
git remote add origin https://github.com/yourusername/your-project.git
git push -u origin main

# After that, just:
git push
```

:::exercise{title="Try It"}
Start a Claude Code session with a project that has at least a few files. Make a checkpoint commit. Ask Claude to make a visible change (add a section, modify a component). Before committing, run git diff and review every line. Then practice: commit the good changes, revert one file you did not want changed, and check git log to see your history.
:::

:::resources{title="Go Deeper"}
- [Git Basics (Curriculum)](/learn/curriculum/00-orientation/git-basics) — The foundational lesson on how version control works.
- [Repos (Curriculum)](/learn/curriculum/00-orientation/repos) — Understanding repositories, remotes, and collaboration.
- [Oh Shit, Git!?!](https://ohshitgit.com/) — A practical guide to getting out of git messes, in plain language.
- [Git Documentation](https://git-scm.com/doc) — The official git reference — dense but comprehensive.
:::
