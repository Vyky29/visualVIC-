#!/usr/bin/env bash
# Apply participant_shared_routines migration to Portal Supabase.
#
# Option B (recommended):
#   npx supabase login
#   npx supabase link --project-ref cklpnwhlqsulpmkipmqb
#   ./scripts/run-participant-shared-routines-sql.sh
#
# Alternative: SUPABASE_DB_PASSWORD='…' ./scripts/run-participant-shared-routines-sql.sh
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
  npx supabase db query --db-url "$DB_URL" --file "$SQL_FILE"
  echo "Done (supabase db query --db-url)."
  exit 0
fi

npx supabase db query --linked --file "$SQL_FILE"

echo "Done (supabase db query --linked)."
