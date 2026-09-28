# Open Vector Autopilot

A daily agent that keeps Open Vector current. It crawls the sources that matter, checks the site's health, works out which lessons the news affects, and writes Samantha a private **Open Vector Updates** brief: a changelog written before anything ships, reviewed item by item.

Runs on the Mac Mini. Not part of the site build (nothing in `src/` imports it).

## Phases

| Phase | What it does | Status |
|---|---|---|
| 0 | Baseline: topic map, link check, staleness | done |
| 1 | Daily brief only. Reads `origin/main`, writes nothing to git | done |
| 2 | Tiered edits: T0 auto-merge, T1 PRs approved on the private Desk, learner signal, weekly digest draft | **current** (`config.yaml: phase: 2`) |
| 3 | T2 new-lesson drafts (from Desk "Write it"), generated chat prompt | later |

## Pipeline

```
run.sh (LaunchAgent com.macmini.ov-autopilot, daily 05:00)
  collect.mjs            feeds, pages, HN → new items since last run            (no LLM)
  health.mjs             links, manifest/frontmatter lint, staleness, model IDs  (no LLM)
  learners.mjs           aggregate progress + signups + list size (needs .env)   (no LLM)
  publish.mjs pending    open PRs, so the brief never re-proposes pending work
  stage.mjs brief        triage + tiers + sources → brief.json                   (claude -p, read-only)
  publish.mjs            per change: worktree → draft agent (edits only the listed files)
                         → scope check → updatedAt + content/updates note → npm run build
                         → audit agent → PR. T0 + audit pass: squash-merge. T1: waits for the Desk.
  digest.mjs             Fridays: Buttondown DRAFT of the week's update notes (never sends)
  render-brief.mjs       brief.md + Telegram ping with the Desk link
```

Guardrails enforced in code, not prompts: T0 may only touch `config.yaml → allowlist` (otherwise promoted to T1);
the draft agent gets `Edit(/<file>)` only for the change's files and any other touched file aborts the change;
lessons with an open human PR are deferred; `limits.maxPrsPerDay`; a dollar cap per stage.

## The Desk

`https://julians-mac-mini.taila3dc77.ts.net:7810`, tailnet only (LaunchAgent `com.macmini.ov-desk`, node on
127.0.0.1:7811, `tailscale serve --bg --https=7810 7811`, never Funnel). One card per change: files, diff,
sources, audit, the learner-facing note. **Go** merges the PR (or queues a change that had no PR), **No-go**
closes it, **Note** records feedback. Every decision lands in `feedback.jsonl`, which the next brief reads.
Proposals: **Write it** queues them for Phase 3. The header pill is the kill switch.

## The supervisor loop

The LaunchAgent is the **engine**: it runs at 05:00 whether or not any Claude session is alive.
The **supervisor** is a Claude Code session in tmux `ov-loop` running `/loop 2h Follow ops/autopilot/LOOP.md`:
it checks that the engine ran (and re-runs it once on a transient failure), keeps the Desk up, confirms merged
changes went live, probes the signup function, and messages Samantha only when something changed.
Start it with `ops/autopilot/loop.sh` (optional interval: `loop.sh 4h`). It runs in `dontAsk` permission mode
with a narrow allowlist (read files, curl, `gh pr list/view`, `launchctl print/kickstart`, `health.mjs`,
`notify.sh`); anything else is refused, never left waiting. If it dies, the site still updates.

## On the site

Each change ships a `content/updates/<date>-<id>.md` note. The content plugin turns these into `learn.updates`:
the changelog page lists them, the hub shows "Since your last visit" (per browser), lessons show a
"Recently updated / Updated since you completed this" box, and lessons edited in the last 30 days get an
automatic "Updated" badge.

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
- `feedback.jsonl`: Samantha's Go/No-go decisions and notes, read by the next brief. `queue.jsonl`: Go'd items waiting for a run.
- `.env`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `BUTTONDOWN_API_KEY`. Samantha writes it off camera; never printed.
- `work/`: temporary worktrees for drafts (removed after each change).
- `site/`: detached worktree of `origin/main`. The run inspects this, never your working checkout.
- `PAUSED`: kill switch. `touch` it to stop runs; delete it to resume.

## Running by hand

```sh
ops/autopilot/run.sh --dry-run      # full run, no Telegram, crawl items not marked seen
ops/autopilot/run.sh                # what the LaunchAgent runs at 05:00
ops/autopilot/run.sh --topic-map    # also regenerate topic-map.yaml
```

Needs: Node (repo `node_modules`), `claude` logged in on the Mini, `gh` with write access.

Test one change without pushing: `OV_DRY=1 OV_ONLY=<change-id> node ops/autopilot/publish.mjs`.
