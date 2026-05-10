#!/usr/bin/env bash
# Uso: ./scripts/push-main.sh "mensaje del commit"
# Luego en Vercel: abre el último deployment (o Redeploy si hace falta).

set -euo pipefail
cd "$(dirname "$0")/.."

MSG="${1:-chore: update}"
git restore tsconfig.tsbuildinfo 2>/dev/null || true
git add -A
git status -sb
git commit -m "$MSG" || { echo "Nothing to commit (ok)."; }
git push origin main
echo "Listo: git push origin main. Revisa Vercel → último deployment."
