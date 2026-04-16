---
slug: file-systems
title: File Systems
subtitle: Where your stuff lives, and why it matters.
duration: 15 min
status: available
badge: new
updatedAt: '2026-02-14'
knowledgeCheck:
  - question: What is the difference between an absolute path and a relative path, and when would you use each one?
    hint: Think about what happens when you move a project to a different computer. Which type of path would break?
  - question: The tilde (~) is a shortcut for your home directory. Why is this useful instead of always typing the full path like /Users/yourname?
  - question: Why does folder structure matter for projects? Could you just put every file in a single folder and let the build tool sort it out?
    hint: Consider what happens when a project grows to hundreds of files, or when another person (or an AI agent) needs to navigate your code.
  - question: The .env file is hidden (starts with a dot) and should never be committed to Git. Why is it hidden by default, and what could go wrong if you accidentally shared it publicly?
---

## What Is a File System?

Everything on your computer is a file inside a folder. A photo is a file. A Word document is a file. The application you used to open that document? Also files, hundreds of them, living inside a folder.

Folders can contain other folders, which can contain other folders, forming a tree. Your operating system shows you a visual representation of this tree (Finder on Mac, File Explorer on Windows), but underneath the interface, it is all paths. Every file has an address, and learning to read that address is like learning to read a map.

> Every file on your computer has an address. When you can read that address, you can find anything, reference anything, and fix almost any "file not found" error you will ever encounter.

## Paths

A path is the full address of a file or folder. On Mac and Linux, paths use forward slashes:

`/Users/yourname/Desktop/project/index.html`

On Windows, it is backslashes:

`C:\Users\yourname\Desktop\project\index.html`

The concept is the same.

There are two kinds of paths. An absolute path starts from the very top of the tree (the root) and spells out the full address: 
`/Users/yourname/Desktop/project`. A relative path starts from wherever you currently are: `./src/App.jsx` This means "from here, go into src, find App.jsx."

Why does this matter? Every import statement in code uses paths. Every file reference in a config file uses paths. Every terminal command that targets a file uses a path. If you understand paths, you understand how code finds things.

```
# Absolute paths — full address from root
/Users/yourname/Desktop/project/index.html
C:\Users\yourname\Desktop\project\index.html

# Relative paths — from wherever you are right now
./src/App.jsx          # Current folder → src → App.jsx
../images/logo.png     # Up one folder → images → logo.png
../../package.json     # Up two folders → package.json
```

## Your Home Directory

Every user on a computer has a home directory. This is your personal space, where your Desktop, Documents, Downloads, and project folders live.

On Mac: `/Users/yourname`. On Linux: `/home/yourname`. On Windows: `C:\Users\yourname`. In the terminal, the tilde symbol (`~`) is a shortcut for your home directory. So `~/Desktop` means `/Users/yourname/Desktop`. You will see the tilde everywhere.

```
# Home directories by OS
/Users/yourname          # Mac
/home/yourname           # Linux
C:\Users\yourname        # Windows
```

The root directory (just `/`) is the very top of the entire file system. Everything branches down from there: system files, applications, user directories, all of it. You will rarely need to go to root, but knowing it exists helps you read absolute paths.

## Hidden Files and Dotfiles

Files and folders that start with a dot (.) are hidden by default. You will not see them in Finder or File Explorer unless you ask. But they are there, and they matter enormously.

`.gitignore` tells Git which files to ignore. `.env` stores secret keys and passwords. `.eslintrc` configures your code linter. `CLAUDE.md` gives instructions to AI agents. These "dotfiles" are configuration. They control how your tools behave.

To see hidden files in the terminal: `ls -a`. To see them in Mac Finder: press `Cmd+Shift+Period`. To see them in Windows Explorer: `View → Show → Hidden items`.

A word of caution: `.env` files often contain passwords and API keys. Never commit them to Git. Never share them publicly. The `.gitignore` file exists specifically to prevent this.

## Project Structure

When you work on a web project, you will see a common pattern in how files are organized. Understanding this pattern means you can open any project and quickly find what you need.

`src/` is your source code. Your components, pages, styles, and logic live here. This is where you do your work.

`public/` is for static assets served as-is. Images, fonts, favicon. These do not get processed by the build tool.

`node_modules/` contains every library your project depends on. This folder is enormous and auto-generated. Never edit it. Never commit it to Git.

`package.json` is your project's identity card. Lists its name, dependencies, and scripts (commands like `npm run dev`).

`dist/` or `build/` is the compiled output. When you build your project for production, the optimized files land here. This is what gets deployed.

You do not need to memorize this. You need to recognize it. When you see `src/`, you know where the real code is. When you see `node_modules/`, you know to leave it alone.

```
my-project/
├── src/                # Your source code
│   ├── components/     # Reusable UI pieces
│   ├── pages/          # Page-level components
│   ├── styles/         # CSS files
│   └── App.jsx         # Main application file
├── public/             # Static assets (images, fonts)
├── node_modules/       # Dependencies (auto-generated)
├── package.json        # Project identity card
├── .gitignore          # Files Git should ignore
├── .env                # Secret keys (never commit!)
└── README.md           # Project documentation
```

:::exercise{title="Explore Your File System"}
Open your terminal. 
- Run `pwd` to see where you are
- Run `ls -la` to see everything in your current directory, including hidden files
- Count the dotfiles; you will probably see more than you expected
- Now navigate to your Desktop: `cd ~/Desktop`
- Create a practice project structure: `mkdir -p my-project/src my-project/public`
- Run `ls my-project` to see the folders you created
- Navigate inside: `cd my-project`
- Run `touch package.json .gitignore README.md` to create the key files
- Run `ls -a` to see everything, including the hidden `.gitignore`

You just built a project skeleton by hand.
:::

:::resources{title="Go Deeper"}
- [The Missing Semester: Files and Directories](https://missing.csail.mit.edu/2020/course-shell/). The shell lecture covers navigating and manipulating files in depth.
- [MDN: Dealing with Files](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files). Mozilla's guide to file structure for web projects. Clear and beginner-friendly.
- [How to Organize Your Project](https://vite.dev/guide/). Vite's getting started guide shows the standard project layout you will see in modern web apps.
:::
