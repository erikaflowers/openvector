---
slug: repos
title: Repositories
subtitle: A home for your code.
duration: 15 min
status: available
badge: new
updatedAt: '2026-02-14'
knowledgeCheck:
  - question: A repository contains much more than just code. What other files live in a typical repo, and why are they important for someone encountering the project for the first time?
    hint: Think about README.md, .gitignore, package.json, CLAUDE.md. What role does each one play?
  - question: Why does a good README matter? What happens to a project, even a great one, if it has no README or a confusing one?
  - question: What is the difference between a local repository and a remote repository, and why do you need both?
    hint: Consider what happens if your laptop breaks, or if a teammate needs to see your work.
  - question: The lesson compares Git to email (the protocol) and GitHub to Gmail (a provider). Why is understanding this distinction important when someone says "push to GitHub"?
---

## Local vs Remote

In the Git Basics lesson, you created a repository on your computer. That is a local repository, or repo. It lives on your machine, tracks your changes, and nobody else can see it.

A remote repo is a version of the repository that lives on a server somewhere on the internet. This is where collaboration happens, where backups live, and where deployment starts. When you "push" your code, you are sending your commits from local to remote. When you "pull," you are bringing changes from remote to local.

You can work entirely offline with a local repo. The remote is for sharing, backing up, and deploying. Most developers push to a remote at least once a day, often much more. There is no reason not to.

## Cloning

When you want to work on an existing project that lives only in a remote repo, you clone it. `git clone <url>` downloads the entire repository (every file, every commit, the complete history) to your computer.

This is how you get started with other people's code. Found an interesting open source project? Clone it. Your team started a new repo? Clone it. You want to explore how a tool was built? Clone it.

After cloning, you have a fully independent copy. You can edit files, make commits, and experiment without affecting the original. If the repo is yours or you have been given access, you can push changes back to the remote. If it is someone else's public repo, you can create your own remote on GitHub and push there instead, making the project your own. You will do exactly this later in the curriculum.

```
# Clone a repository from GitHub
git clone https://github.com/username/project-name.git

# This creates a folder called "project-name" with everything inside
cd project-name
ls -la              # See all the files
git log --oneline   # See the commit history
```

## GitHub Is Not Git

This trips up a lot of people. Git is the version control tool, the software that tracks changes on your computer. GitHub is a website that hosts Git repositories and adds collaboration features on top.

Git was created in 2005. GitHub launched in 2008. Git existed for three years before GitHub was a thing. You can use Git without GitHub. You cannot use GitHub without Git.

GitHub is the most popular host, but it is not the only one. GitLab and Bitbucket do the same thing. Think of Git as email (the protocol) and GitHub as Gmail (one provider). The distinction matters because when someone says "push to GitHub," they mean "use Git to send your commits to a remote repository that happens to be hosted on github.com."

> A repository is a project with memory. It knows every version of every file that was ever committed, who changed it, and why.

## The README

Every repository should have a README.md file. This is the front door of the project. It tells visitors what it is, how to set it up, and how to use it.

When you visit a repo on GitHub, the README renders automatically below the file list. A good README makes the difference between a project people use and a project people skip.

The `.md` extension means Markdown, a lightweight formatting language. Headings use `#`, bold uses `**text**`, code uses `` `backticks` ``. You will learn Markdown naturally because it is everywhere: READMEs, documentation, chat apps, and this very curriculum.

## Key Files You Will See

Open any well-maintained repository and you will see the same cast of characters:

`package.json` is the project's identity card. It lists the name, version, dependencies (libraries the project uses), and scripts (commands like `npm run dev` or `npm run build`). If the project runs on Node.js (and most web projects do), this file is the starting point.

`.gitignore` is a list of files and folders Git should not track. `node_modules/` (too large, auto-generated), `.env` (contains secrets), `dist/` (build output). This file keeps your repository clean and safe.

`CLAUDE.md` provides instructions for AI coding agents. This is a newer convention; it tells tools like Claude Code how the project works, what patterns to follow, and what to avoid. Think of it as onboarding documentation for your AI collaborator.

`LICENSE` defines the legal terms for using the code. `MIT` means "do whatever you want." `GPL` means "share your changes too." No license means "technically you cannot use this." For your own projects, MIT is a safe default.

## Pushing and Pulling

Once your local repo is connected to a remote (which happens automatically when you clone), two commands keep them in sync:

`git push` sends your local commits to the remote. "Here are my changes." If you are working alone, you can push whenever you want. On a team, you push when your work is ready to share.

`git pull` fetches changes from the remote and merges them into your local copy. "Give me the latest." Always pull before you start working if others might have pushed changes. This prevents conflicts.

If you created a repo locally (`git init`) instead of cloning, you need to connect it to a remote first. GitHub walks you through this when you create a new repository and gives you the exact commands to run.

In these commands, `origin` is the default name Git gives your remote connection, and `main` is the primary branch where your work lives.

```
# Push your commits to the remote
git push origin main

# Pull the latest changes from the remote
git pull origin main

# Connect a local repo to a new remote
git remote add origin https://github.com/username/my-project.git
git push -u origin main
```

::::exercise{title="Clone and Explore"}

:::prereq
If you do not have a GitHub account yet, go to [github.com](https://github.com) and create one. You will need it for this exercise and for the rest of the curriculum.
:::

- Go to github.com and find any public repository that interests you (or use the Search option in the Github header to search for "awesome lists", curated collections of tools and resources)
- Copy the clone URL (the green "Code" button → HTTPS URL)
- Open your terminal, navigate to where you keep projects (`cd ~/Desktop` or similar), and run `git clone <paste-url-here>`
- Enter the folder with `cd <project-name>`
- Run `ls -la` to see the file structure
- Run `cat README.md` to read the project description right in your terminal
- Run `git log --oneline` to see the commit history

You are now inside someone else's project, reading their work, and seeing their history.
::::

:::resources{title="Go Deeper"}
- [GitHub Hello World Guide](https://docs.github.com/en/get-started/start-your-journey/hello-world). GitHub's official walkthrough for creating your first repository.
- [GitHub Skills](https://skills.github.com/). Free interactive courses that teach GitHub workflows step by step.
- [The Missing Semester: Version Control](https://missing.csail.mit.edu/2020/version-control/). MIT's deep dive into Git internals. Goes further than you need right now, so bookmark it for later.
- [Awesome README](https://github.com/matiassingers/awesome-readme). A curated list of excellent README files for inspiration when writing your own.
:::
