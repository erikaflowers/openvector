#!/bin/zsh
# The supervisor's only two actions: kick.sh engine (re-run today's autopilot) | kick.sh desk (restart the Desk).
case "${1:-}" in
  engine) launchctl kickstart "gui/$(id -u)/com.macmini.ov-autopilot" && echo "engine run started" ;;
  desk)   launchctl kickstart -k "gui/$(id -u)/com.macmini.ov-desk" && echo "desk restarted" ;;
  *) echo "usage: kick.sh engine|desk"; exit 2 ;;
esac
