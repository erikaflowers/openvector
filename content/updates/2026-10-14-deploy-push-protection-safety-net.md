---
date: "2026-10-14"
title: "Mention GitHub push protection as a safety net in the deploy checklist's \"No secrets in the code\" step"
kind: update
lessons: ["02-the-medium/deploy"]
sources: ["https://github.blog/changelog/2026-10-13-secret-scanning-blocks-anthropic-keys-by-default-adds-salesforce"]
---

The Deployment lesson now explains that GitHub blocks pushes containing Anthropic API keys on public repositories, and what to do if your push is blocked: take the key out of the commit and rotate it. Keeping .env in your .gitignore is still the first line of defence.
