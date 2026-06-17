#!/usr/bin/env bash
# Apply participant_shared_routines migration to Portal Supabase.
# Requires one of:
#   - supabase login (npx supabase login)
#   - SUPABASE_ACCESS_TOKEN in env
#   - SUPABASE_DB_PASSWORD in env (direct postgres)
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT_REF="cklpnwhlqsulpmkipmqb"
SQL_FILE="docs/portal/sql/participant_shared_routines.sql"

if [[ ! -f "$SQL_FILE" ]]; then
  echo "Missing $SQL_FILE"
  exit 1
fi

echo "Applying $SQL_FILE to Supabase project $PROJECT_REF …"

if [[ -n "${SUPABASE_DB_PASSWORD:-}" ]]; then
  DB_URL="postgresql://postgres.${PROJECT_REF}:${SUPABASE_DB_PASSWORD}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
  if command -v psql >/dev/null 2>&1; then
    psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$SQL_FILE"
    echo "Done (psql)."
    exit 0
  fi
fi

npx supabase db execute \
  --project-ref "$PROJECT_REF" \
  --file "$SQL_FILE"

echo "Done (supabase CLI)."
