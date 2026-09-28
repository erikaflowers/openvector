#!/bin/zsh
# Starts the Open Vector supervisor: Claude Code in tmux session `ov-loop`, running
#   /loop 2h Follow ops/autopilot/LOOP.md
# Permission mode dontAsk: anything not on the allowlist below is refused, never left waiting for a human.
# Attach: tmux attach -t ov-loop   Stop: tmux kill-session -t ov-loop
set -euo pipefail
export PATH="$HOME/.local/share/fnm/aliases/default/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/bin:/bin"
SESSION=ov-loop
REPO="${0:A:h:h:h}"
STATE="$HOME/Library/Application Support/ov-autopilot"
INTERVAL="${1:-2h}"

tmux has-session -t "$SESSION" 2>/dev/null && { echo "already running: tmux attach -t $SESSION"; exit 0; }

ALLOW=(
  Read Grep Glob
  "Write(//$STATE/loop-notes.md)" "Edit(//$STATE/loop-notes.md)"
  "Bash(curl:*)" "Bash(date:*)" "Bash(tail:*)" "Bash(ls:*)" "Bash(grep:*)" "Bash(wc:*)"
  "Bash(gh pr list:*)" "Bash(gh pr view:*)"
  "Bash(launchctl print:*)" "Bash(launchctl kickstart:*)"
  "Bash(node ops/autopilot/health.mjs)"
  "Bash(ops/autopilot/notify.sh:*)"
)
tmux new-session -d -s "$SESSION" -c "$REPO" \
  claude --permission-mode dontAsk --add-dir "$STATE" --allowedTools "${ALLOW[@]}" --name ov-loop
sleep 8
tmux send-keys -t "$SESSION" "/loop $INTERVAL Follow ops/autopilot/LOOP.md" Enter
echo "started: tmux attach -t $SESSION"
