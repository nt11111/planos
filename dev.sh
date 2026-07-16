#!/bin/zsh
# Dev server launcher — no system-wide Node exists on this machine, and the
# preview launcher starts processes with a minimal environment, so normalize
# everything Turbopack's worker pool needs (PATH, HOME, TMPDIR) before exec.
export HOME="${HOME:-/Users/neiltodkar}"
export PATH="$HOME/.local/node24/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
if [ -z "$TMPDIR" ] || [ ! -d "$TMPDIR" ]; then
  export TMPDIR=/tmp
fi
cd "$(dirname "$0")"
exec node node_modules/next/dist/bin/next dev
