---
date: "2026-10-03"
title: "Fix the binary-search revert commands (they lose work) and use Vite's real import error"
kind: update
lessons: ["approach/debugging-with-ai"]
sources: ["https://git-scm.com/docs/git-checkout", "https://git-scm.com/docs/git-stash", "https://raw.githubusercontent.com/vitejs/vite/main/packages/vite/src/node/plugins/importAnalysis.ts"]
---

The binary-search steps in Debugging with AI now use `git stash push` and `git stash pop`, so you can set a file's changes aside and get them back. The old commands threw those changes away. The terminal error example is now the one Vite actually prints when an import can't be found.
