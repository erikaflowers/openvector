#!/bin/zsh
# Starts the Open Vector supervisor: Claude Code in tmux session `ov-loop`, running
#   /loop <interval> Follow ops/autopilot/LOOP.md
# Permission mode dontAsk: anything not on the allowlist below is refused, never left waiting for a human.
#   ops/autopilot/loop.sh [interval]   start (default 2h)
#   tmux attach -t ov-loop             watch      tmux kill-session -t ov-loop   stop
# tmux runs this same script with --inner, which execs Claude with a real argument array
# (tmux would otherwise re-parse one command string, and the rules contain parentheses and spaces).
set -euo pipefail
export PATH="$HOME/.local/share/fnm/aliases/default/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/bin:/bin"
SESSION=ov-loop
SELF="${0:A}"
REPO="${SELF:h:h:h}"
STATE="$HOME/Library/Application Support/ov-autopilot"

if [[ "${1:-}" == "--inner" ]]; then
  cd "$REPO"
  ALLOW=(
    Read Grep Glob
    "Edit(/$STATE/loop-notes.md)"
    "Bash(ops/autopilot/status.sh)"
    "Bash(ops/autopilot/kick.sh engine)" "Bash(ops/autopilot/kick.sh desk)"
    "Bash(ops/autopilot/notify.sh:*)"
    "Bash(node ops/autopilot/health.mjs)"
    "Bash(curl:*)"
  )
  exec claude --permission-mode dontAsk --add-dir "$STATE" --allowedTools "${ALLOW[@]}" --name ov-loop
fi

INTERVAL="${1:-2h}"
tmux has-session -t "$SESSION" 2>/dev/null && { echo "already running: tmux attach -t $SESSION"; exit 0; }
tmux new-session -d -s "$SESSION" -c "$REPO" "/bin/zsh '$SELF' --inner"
sleep 10
tmux has-session -t "$SESSION" 2>/dev/null || { echo "ov-loop exited during startup"; exit 1; }
# First launch in this folder shows Claude's "trust this folder" prompt, whose default is "No, exit".
# Never type into it blindly: stop and let a human answer it once.
if tmux capture-pane -p -t "$SESSION" | grep -q "trust this folder"; then
  echo "Claude is asking whether to trust $REPO. Answer it once:  tmux attach -t $SESSION"
  echo "then run:  tmux send-keys -t $SESSION '/loop $INTERVAL Follow ops/autopilot/LOOP.md' Enter"
  exit 2
fi
tmux send-keys -t "$SESSION" "/loop $INTERVAL Follow ops/autopilot/LOOP.md" Enter
echo "started: tmux attach -t $SESSION"
