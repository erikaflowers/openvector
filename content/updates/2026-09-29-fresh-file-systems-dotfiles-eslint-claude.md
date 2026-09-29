---
date: "2026-09-29"
title: "Replace removed .eslintrc example and clarify that CLAUDE.md isn't a hidden file"
kind: update
lessons: ["00-orientation/file-systems"]
sources: ["https://eslint.org/docs/latest/use/migrate-to-10.0.0", "https://eslint.org/docs/latest/use/configure/configuration-files", "https://code.claude.com/docs/en/memory"]
---

The File Systems lesson now uses current examples of hidden config. `.eslintrc` is out, because ESLint v10 no longer supports it. The lesson also notes that `CLAUDE.md` and `eslint.config.js` are config files that aren't hidden, since their names don't start with a dot.
