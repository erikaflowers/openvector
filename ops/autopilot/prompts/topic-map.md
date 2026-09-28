You are building the topic map for **Open Vector** (open.zerovector.design), a free learning site that teaches designers and non-engineers agentic AI coding and the whole stack: terminal, git, deployment, React, Claude Code, CLAUDE.md, multi-agent orchestration.

The site will be maintained by a daily agent. That agent sees news (Claude Code releases, Anthropic/OpenAI/Google announcements, React/Vite/Node/Supabase/Netlify releases, community posts) and must decide which lessons each item affects. Your topic map is how it decides. Precision matters more than volume.

Read every one of these lesson files (use Read; they are markdown with YAML frontmatter):

{{lessonList}}

For each file produce:
- `summary`: one sentence.
- `tools`: every named product, CLI, library or service the lesson relies on. Lowercase, hyphenated, consistent across lessons (always `claude-code`, never `Claude Code` in one place and `claude` in another).
- `topics`: concepts a news item could touch.
- `facts`: every **time-sensitive** claim: install commands, CLI flags and commands, version numbers, model names, prices, UI descriptions ("click X in the dashboard"), feature claims ("Claude Code cannot do Y"), and official doc URLs. Mark `volatility` high for anything about AI tools, medium for web frameworks and hosting, low for git/terminal/DNS fundamentals. Include `verifyAt` when there is an obvious official page. Do not list timeless ideas (systems thinking, JTBD) as facts.

Return every file in the list, in the same order.
