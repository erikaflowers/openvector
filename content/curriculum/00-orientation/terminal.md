---
slug: terminal
title: The Terminal
subtitle: Your first interface was a command line. It still is.
duration: 20 min
status: available
badge: new
updatedAt: '2026-02-14'
knowledgeCheck:
  - question: What does "cd" stand for, and why is it one of the most-used commands in any terminal workflow?
    hint: Think about what you do constantly when working on projects, like moving between folders.
  - question: Why do most AI coding tools (Claude Code, Cursor, Copilot) run in a terminal rather than a purely graphical interface? What does the terminal give them that a GUI does not?
  - question: Ctrl+C cancels a running process. Why is it important to know this before you start experimenting with commands? What would happen if you did not have an emergency stop?
    hint: Consider what happens when a command runs longer than expected, or when you accidentally start something you did not intend.
  - question: The rm command deletes files with no Trash and no undo. Why do you think the designers of Unix made it work this way, and how does that philosophy differ from how graphical operating systems handle deletion?
---

## What Is a Terminal?

A terminal is a text interface to your computer. Before there were windows, icons, and mice, there was this: a blinking cursor waiting for you to type a command. Every graphical interface you have ever used is a layer on top of this.

When you open a terminal, you are talking directly to your operating system. No menus. No buttons. Just you and the machine, having a conversation in plain text. This is not a step backwards. It is a step closer.

> The terminal is not scary. It is direct. You are not clicking through menus hoping to find the right option. You are telling the computer exactly what to do.

## Why Designers Need This

It is true that AI coding tools are increasingly available through graphical interfaces. Claude has a Code tab in its desktop app. Cursor and Copilot work inside visual editors. You can build real things without ever opening a terminal.

But those GUI tools are wrappers around the command line, not replacements for it. When something breaks, when you need to debug a build, when the GUI does not expose the option you need, you end up in the terminal. The developers who are most effective with AI tools are the ones who understand what is happening underneath.

More importantly: the terminal teaches you how computers actually think. Not how GUI designers want you to think computers think. The real thing. And understanding the real thing is what separates intentional creation from vibe coding. Throughout this curriculum, we work in the command line, because that is where the deepest understanding lives.

## Opening Your Terminal

On Mac: press Cmd+Space, type "Terminal", press Enter. You will see a window with a blinking cursor. That is it. You are in.

```
Last login: Mon Apr 6 15:32:22 on console
user@mac ~ % █
```

On Windows: press the Windows key, type "PowerShell", press Enter. Same idea, different name.

```
PS C:\Users\you> █
```

On Linux: you already know where it is.

```
user@linux:~$ █
```

## The Basics

Every terminal command follows the same pattern: a verb, optionally followed by a target. `ls` means "list." `cd` means "change directory." `mkdir` means "make directory." The commands are short because the people who invented them were typing on slow connections and every keystroke mattered.

You will learn these naturally as you build. For now, the only thing that matters is that you opened a terminal, typed a command, and something happened. That is the foundation everything else builds on.

## Essential Commands

You do not need to memorize a hundred commands. You need about ten. Here are the ones you will use constantly:

`pwd` (Print Working Directory). Shows where you are right now. Think of it as "What folder am I in?"

`ls` (List). Shows what is in the current folder. Files, folders, everything visible.

`cd` (Change Directory). Moves you into a different folder. `cd Documents` takes you into Documents. `cd ..` takes you up one level. `cd ~` takes you home.

`mkdir` (Make Directory). Creates a new folder. `mkdir my-project` creates a folder called my-project.

`touch` creates an empty file. `touch index.html` makes a blank HTML file. On Windows, use `New-Item index.html` instead.

`cp` (Copy). `cp file.txt backup.txt` copies a file. Add `-r` to copy entire folders.

`mv` (Move, or rename). `mv old.txt new.txt` renames a file. `mv file.txt ~/Desktop/` moves it.

`rm` (Remove). Deletes a file. `rm file.txt` is gone, with no Trash and no undo. Add `-r` for folders. Treat this command with respect.

`cat` (Concatenate). Displays the contents of a file in the terminal. `cat readme.txt` shows you what is inside.

`clear` clears your screen. Does not delete anything. Just tidies up.

```
pwd                     # Where am I?
ls                      # What is here?
cd my-project           # Go into my-project
ls -la                  # Show everything, including hidden files
mkdir src               # Create a src folder
touch src/index.js      # Create a file inside it
cat src/index.js        # Show its contents (empty)
cd ..                   # Go back up one level
```

## Flags and Options

Most commands accept flags, which are modifiers that change their behavior. Flags start with a dash. `ls -l` shows a detailed list. `ls -a` shows hidden files. `ls -la` does both.

The pattern is always: `command -flags target`. That is it. If you ever want to know what flags a command supports, type the command followed by `--help`. For example: `ls --help`. This works for almost everything.

Single-letter flags use one dash: `-l`, `-a`, `-r`. Full-word flags use two dashes: `--help`, `--version`, `--recursive`. Some commands support both: `-r` and `--recursive` do the same thing.

## Tab Completion and History

Two features that make the terminal feel fast:

Tab completion: Start typing a file or folder name and press Tab. The terminal will finish it for you. If there are multiple matches, press Tab twice to see all options. This alone saves an enormous amount of typing and typos.

Command history: Press the Up arrow to cycle through previous commands. You ran a long command five minutes ago? Up arrow until you find it. You can also type history to see a list of everything you have run.

Between Tab and Up Arrow, experienced terminal users barely type anything. The terminal remembers and completes for you.

## When Things Go Wrong

You will type something wrong. The terminal will give you an error. This is fine. Nothing is broken. Read the error. It usually tells you exactly what happened.

"command not found" means you misspelled something or the program is not installed. Check the spelling.

"No such file or directory" means the path is wrong. Run `pwd` to check where you are, and `ls` to see what is actually there.

"Permission denied" means the system is protecting something. You will learn about permissions later. For now, do not force it.

If a command seems stuck and nothing is happening, press Ctrl+C. This cancels the current operation. It is your emergency stop button. Use it freely.

If your terminal looks completely broken (weird characters, no prompt, nothing makes sense), type reset and press Enter. It resets the display without losing anything.

Remember: you cannot break your computer by typing commands in a terminal. The only dangerous command is `rm` (delete), and even then, you have to actively tell it what to delete. Relax. Experiment.

:::exercise{title="Navigate, Create, Explore"}
Open your terminal. 

- Run `pwd` to see where you are 
- Run `cd ~/Desktop` to navigate to your Desktop (or `cd $HOME/Desktop` on some systems) 
- Run `mkdir terminal-practice` to create a folder 
- Run `cd terminal-practice` to go inside it
- Run `touch hello.txt` to create a file
- Run `ls` to confirm it is there
- Run `cat hello.txt`; it is empty, that is fine
- Run `cd ..` to go back up

You just navigated, created, and explored. That is 90% of terminal use.
:::

:::resources{title="Go Deeper"}
- [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/). MIT course covering the tools nobody teaches you. Start with Lecture 1: The Shell.
- [Command Line Power User](https://commandlinepoweruser.com/). Free video series by Wes Bos. Quick, practical, well-produced.
- [explainshell.com](https://explainshell.com/). Paste any command and it breaks down every part. Brilliant learning tool.
- [Linux Command Library](https://linuxcommandlibrary.com/). Searchable reference for every command. Works for Mac too (they share most commands).
:::
