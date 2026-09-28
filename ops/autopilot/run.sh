#!/bin/zsh
# Open Vector Autopilot: daily run. Phase 1 = brief only (reads the live site, writes nothing to git).
#   ops/autopilot/run.sh            normal daily run (LaunchAgent)
#   ops/autopilot/run.sh --dry-run  no Telegram, does not mark crawl items as seen
#   ops/autopilot/run.sh --topic-map   also regenerate topic-map.yaml
# Kill switch: touch "$OV_STATE/PAUSED"
set -euo pipefail
export PATH="$HOME/.local/share/fnm/aliases/default/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

HERE="${0:A:h}"
CODE_REPO="${HERE:h:h}"
export OV_STATE="${OV_STATE:-$HOME/Library/Application Support/ov-autopilot}"
MATILDA="$HOME/claude projects/matildacomm"
DRY=0; TOPIC=0
for a in "$@"; do case $a in --dry-run) DRY=1 ;; --topic-map) TOPIC=1 ;; esac; done

mkdir -p "$OV_STATE"
[[ -f "$OV_STATE/PAUSED" ]] && { echo "ov-autopilot paused ($OV_STATE/PAUSED)"; exit 0; }
LOCK="$OV_STATE/lock"
mkdir "$LOCK" 2>/dev/null || { echo "ov-autopilot already running ($LOCK)"; exit 0; }
trap 'rmdir "$LOCK"' EXIT

export OV_RUN_DATE="$(date +%F)"
RUN="$OV_STATE/runs/$OV_RUN_DATE"
mkdir -p "$RUN"
exec > >(tee -a "$RUN/run.log") 2>&1
echo "=== ov-autopilot $(date '+%F %T') phase=1 dry=$DRY ==="

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
node ops/autopilot/stage.mjs brief || echo "brief stage failed; rendering what we have"
node ops/autopilot/render-brief.mjs

if (( ! DRY )) && [[ -d "$MATILDA/venv" ]]; then
  (cd "$MATILDA" && venv/bin/python - "$RUN" <<'PY'
import sys, notify
run = sys.argv[1]
notify.send_text(open(f"{run}/telegram.txt").read())
notify.notify_file(f"{run}/brief.md", caption="Open Vector Updates")
PY
  ) && echo "telegram: sent" || echo "telegram: FAILED"
fi
echo "=== done $(date '+%T') ==="
