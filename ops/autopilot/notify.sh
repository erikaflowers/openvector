#!/bin/zsh
# Send one Telegram message through Matilda's notifier: ops/autopilot/notify.sh "OV loop: ..."
cd "$HOME/claude projects/matildacomm" && venv/bin/python -c 'import notify, sys; notify.send_text(sys.argv[1])' "$1"
