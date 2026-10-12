---
date: "2026-10-11"
title: "Teach `git restore` instead of `git checkout --` for undoing uncommitted changes"
kind: update
lessons: ["approach/revision-history", "00-orientation/git-basics"]
sources: ["https://git-scm.com/docs/git-restore", "https://git-scm.com/docs/git-checkout", "https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things"]
---

Git Basics and Managing Revision History now teach `git restore` for throwing away changes you haven't committed. It's the same command `git status` suggests. Git Basics also explains that older guides use `git checkout -- filename`, which does the same thing.
