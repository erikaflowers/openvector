---
date: "2026-09-28"
title: "Remove the made-up `claude --profile backend` flag from the multiple-agents guide"
kind: update
lessons: ["approach/multiple-agents"]
sources: ["https://code.claude.com/docs/en/cli-reference", "https://git-scm.com/docs/git-worktree"]
---

The multiple-agents guide no longer uses a `--profile` flag, which Claude Code does not have. It now shows how to give your second agent its own folder with `git worktree add`, so each agent reads its own CLAUDE.md.
