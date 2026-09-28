#!/bin/zsh
# Open Vector Autopilot: daily run. Phase is set in config.yaml (1 = brief only, 2 = tiered PRs).
#   ops/autopilot/run.sh            normal daily run (LaunchAgent)
#   ops/autopilot/run.sh --dry-run  no Telegram, does not mark crawl items as seen
#   ops/autopilot/run.sh --topic-map   also regenerate topic-map.yaml
#   ops/autopilot/run.sh --force       run even if today's run already completed
# The LaunchAgent fires every 30 minutes; this script runs the day's work once, after 05:00, and only
# until a run completes (marker runs/<date>/.complete). launchd's single 05:00 calendar trigger proved
# unreliable on this headless Mini (2026-09-28: skipped 05:00, fired at 08:00).
# Kill switch: touch "$OV_STATE/PAUSED"
set -euo pipefail
export PATH="$HOME/.local/share/fnm/aliases/default/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

HERE="${0:A:h}"
CODE_REPO="${HERE:h:h}"
export OV_STATE="${OV_STATE:-$HOME/Library/Application Support/ov-autopilot}"
MATILDA="$HOME/claude projects/matildacomm"
DRY=0; TOPIC=0; FORCE=0
for a in "$@"; do case $a in --dry-run) DRY=1 ;; --topic-map) TOPIC=1 ;; --force) FORCE=1 ;; esac; done

mkdir -p "$OV_STATE"
[[ -f "$OV_STATE/PAUSED" ]] && { echo "ov-autopilot paused ($OV_STATE/PAUSED)"; exit 0; }
LOCK="$OV_STATE/lock"
mkdir "$LOCK" 2>/dev/null || { echo "ov-autopilot already running ($LOCK)"; exit 0; }
trap 'rmdir "$LOCK"' EXIT

export OV_RUN_DATE="$(date +%F)"
RUN="$OV_STATE/runs/$OV_RUN_DATE"
if (( ! FORCE && ! DRY )); then
  [[ -f "$RUN/.complete" ]] && exit 0                          # already ran today
  (( 10#$(date +%H) < ${OV_START_HOUR:-5} )) && exit 0          # too early
fi
mkdir -p "$RUN"
exec > >(tee -a "$RUN/run.log") 2>&1
echo "=== ov-autopilot $(date '+%F %T') dry=$DRY ==="

# Inspect the live site: a detached worktree of origin/main, separate from any working checkout.
SITE="$OV_STATE/site"
git -C "$CODE_REPO" fetch --quiet origin main
if [[ -d "$SITE/.git" || -f "$SITE/.git" ]]; then
  git -C "$SITE" checkout --quiet --detach origin/main
else
  git -C "$CODE_REPO" worktree add --quiet --detach "$SITE" origin/main
fi
export OV_REPO="$SITE"
echo "site: origin/main @ $(git -C "$SITE" rev-parse --short HEAD)"

[[ -d "$CODE_REPO/node_modules" ]] || (cd "$CODE_REPO" && npm ci --no-audit --no-fund --silent)
cd "$CODE_REPO"

(( DRY )) && export OV_NO_SEEN=1
node ops/autopilot/collect.mjs
node ops/autopilot/health.mjs
if (( TOPIC )) || [[ ! -f ops/autopilot/topic-map.yaml ]]; then node ops/autopilot/stage.mjs topic-map; fi
[[ -f "$OV_STATE/.env" ]] && node ops/autopilot/learners.mjs || echo "learners: skipped (no $OV_STATE/.env)"
node ops/autopilot/publish.mjs pending || echo "pending: could not list open PRs"
BRIEF_OK=1
node ops/autopilot/stage.mjs brief || { BRIEF_OK=0; echo "brief stage failed; rendering what we have"; }
(( BRIEF_OK )) && { node ops/autopilot/sweep.mjs || echo "sweep failed"; }
PHASE=$(awk '/^phase:/{print $2}' ops/autopilot/config.yaml)
if (( BRIEF_OK )) && (( PHASE >= 2 )); then
  if (( DRY )); then OV_DRY=1 node ops/autopilot/publish.mjs || echo "publish (dry) failed"
  else node ops/autopilot/publish.mjs || echo "publish failed"; fi
fi
[[ -f "$OV_STATE/.env" ]] && [[ "$(date +%u)" == "${DIGEST_WEEKDAY:-5}" ]] && { node ops/autopilot/digest.mjs || echo "digest failed"; }
node ops/autopilot/render-brief.mjs

if (( ! DRY )) && [[ -d "$MATILDA/venv" ]]; then
  (cd "$MATILDA" && venv/bin/python - "$RUN" <<'PY'
import sys, notify
run = sys.argv[1]
notify.send_text(open(f"{run}/telegram.txt").read())
PY
  ) && echo "telegram: sent" || echo "telegram: FAILED"
fi
(( BRIEF_OK && ! DRY )) && date '+%F %T' > "$RUN/.complete"
echo "=== done $(date '+%T') ==="
