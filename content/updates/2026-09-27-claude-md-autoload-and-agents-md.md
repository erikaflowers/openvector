---
date: "2026-09-27"
title: "Fix the 'both are read automatically' claim in the CLAUDE.md lesson and mention @imports and AGENTS.md"
kind: update
lessons: ["04-orchestration/claude-md"]
sources: ["https://code.claude.com/docs/en/memory", "https://github.com/anthropics/claude-code/releases/tag/v2.1.277"]
---

The CLAUDE.md lesson now explains that Claude Code only reads VECTOR.md if your CLAUDE.md imports it with an @ reference. It also explains that Claude Code reads a repo's AGENTS.md when there is no CLAUDE.md.
