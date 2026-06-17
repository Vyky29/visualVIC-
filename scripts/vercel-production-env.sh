#!/usr/bin/env bash
# Set visualVIC Production env on Vercel (requires: npm i -g vercel && vercel login).
# Run from repo root: ./scripts/vercel-production-env.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v vercel >/dev/null 2>&1; then
  echo "Install Vercel CLI: npm i -g vercel && vercel login"
  exit 1
fi

add_env() {
  local name="$1"
  local value="$2"
  printf '%s' "$value" | vercel env add "$name" production --force
}

add_env NEXT_PUBLIC_SUPABASE_URL "https://cklpnwhlqsulpmkipmqb.supabase.co"
add_env NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrbHBud2hscXN1bHBta2lwbXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMDg4NzIsImV4cCI6MjA5MTc4NDg3Mn0.-T7rVyDHQbzMqEKOVz6fi3OlZdB_gPH2i5p-ZPveopE"
add_env NEXT_PUBLIC_STAFF_PORTAL_URL "https://portalvic.vercel.app"

echo "Done. Redeploy: vercel --prod"
