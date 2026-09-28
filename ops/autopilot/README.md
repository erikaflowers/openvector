# Open Vector Autopilot

A daily agent that keeps Open Vector current. It crawls the sources that matter, checks the site's health, works out which lessons the news affects, and writes Samantha a private **Open Vector Updates** brief: a changelog written before anything ships, reviewed item by item.

Runs on the Mac Mini. Not part of the site build (nothing in `src/` imports it).

## Phases

| Phase | What it does | Status |
|---|---|---|
| 0 | Baseline: topic map, link check, staleness | done |
| 1 | Daily brief only. Reads `origin/main`, writes nothing to git | **current** (`config.yaml: phase: 1`) |
| 2 | Tiered edits: T0 auto-merge, T1 PRs approved on the private Desk | next |
| 3 | T2 new-lesson drafts, auto public changelog, generated chat prompt | later |

## Pipeline

```
run.sh
  collect.mjs      feeds, pages, HN → new items since last run            (no LLM)
  health.mjs       links, manifest/frontmatter lint, staleness, model IDs  (no LLM)
  stage.mjs topic-map   lesson → tools/topics/facts (only if missing or --topic-map)
  stage.mjs brief       triage + tiers + sources → brief.json          (claude -p, read-only tools)
  render-brief.mjs brief.md + telegram.txt
  Telegram via ~/claude projects/matildacomm/notify.py
```

Each LLM stage runs headless `claude -p` with a JSON schema (`schemas/`), a tool allowlist (`config.yaml → stages`), Bash/Edit/Write denied, and a dollar cap.

## Files

| File | Purpose |
|---|---|
| `sources.yaml` | What to crawl. Add a source here; nothing else changes. |
| `config.yaml` | Phase, limits, auto-merge allowlist, link-check ignore list, stage settings. |
| `topic-map.yaml` | Generated. Lesson → tools, topics, time-sensitive facts. Edit freely. |
| `prompts/`, `schemas/` | The agents' instructions and output contracts. |

## State (outside the repo)

`~/Library/Application Support/ov-autopilot/` (override with `OV_STATE`):

- `runs/YYYY-MM-DD/`: `collected.json`, `health.json`, `brief.json`, `brief.md`, `telegram.txt`, `cost.jsonl`, `run.log`
- `seen.json`: crawl items already reported. `pages/`: snapshots of watched pages.
- `feedback.jsonl`: Samantha's Go/No-go decisions and notes, read by the next brief.
- `site/`: detached worktree of `origin/main`. The run inspects this, never your working checkout.
- `PAUSED`: kill switch. `touch` it to stop runs; delete it to resume.

## Running by hand

```sh
ops/autopilot/run.sh --dry-run      # full run, no Telegram, crawl items not marked seen
ops/autopilot/run.sh                # what the LaunchAgent runs at 05:00
ops/autopilot/run.sh --topic-map    # also regenerate topic-map.yaml
```

Needs: Node (repo `node_modules`), `claude` logged in on the Mini, `gh` for Phase 2.
