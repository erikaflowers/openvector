#!/bin/zsh
# Read-only status for the supervisor loop. One command, no pipes needed by the caller, and it never
# prints a job's environment (launchctl print can include it). Safe to run anytime.
export PATH="$HOME/.local/share/fnm/aliases/default/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/bin:/bin"
S="$HOME/Library/Application Support/ov-autopilot"
UID_=$(id -u)
TODAY=$(date +%F)
agent() { launchctl print "gui/$UID_/$1" 2>/dev/null | grep -E '^\s*(state|runs|last exit code|pid) =' | sed 's/^[[:space:]]*/  /' || echo "  (not loaded)"; }

echo "now: $(date '+%F %T')"
echo "paused: $([[ -f "$S/PAUSED" ]] && echo YES || echo no)"
echo "engine com.macmini.ov-autopilot:"; agent com.macmini.ov-autopilot
echo "desk com.macmini.ov-desk:"; agent com.macmini.ov-desk
echo "desk http: $(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://127.0.0.1:7811/api/days)"
R="$S/runs/$TODAY"
if [[ -f "$R/run.log" ]]; then
  echo "today's run: $(grep -q '=== done' "$R/run.log" && echo finished || echo 'NOT finished')"
  echo "run.log (last 12 lines):"; tail -12 "$R/run.log" | sed 's/^/  /'
else
  echo "today's run: none yet (engine runs at 05:00)"
fi
echo "signup probe: $(curl -s -o /dev/null -w '%{http_code}' --max-time 10 -X POST https://open.zerovector.design/.netlify/functions/subscribe -H 'content-type: application/json' -d '{"email":"not-an-email","tag":"zerovector"}') (400 = working)"
echo "open autopilot PRs:"; gh pr list -R erikaflowers/openvector --label ov-autopilot --state open --json number,title,createdAt,isDraft -q '.[] | "  #\(.number) \(.createdAt[0:10]) \(if .isDraft then "[draft] " else "" end)\(.title)"'
echo "merged autopilot PRs (last 3 days):"; gh pr list -R erikaflowers/openvector --label ov-autopilot --state merged --search "merged:>=$(date -v-3d +%F)" --json number,title,mergedAt,files -q '.[] | "  #\(.number) \(.mergedAt) \(.title) :: \([.files[].path | select(startswith("content/curriculum") or startswith("content/approach"))] | join(","))"'
echo "feedback entries: $([[ -f "$S/feedback.jsonl" ]] && wc -l < "$S/feedback.jsonl" | tr -d ' ' || echo 0)"
