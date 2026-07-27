# Routines + Staff Portal — kickoff brief

Shared coordination between **visualVIC** (Routines / Planner) and **PORTALVIC** (Staff Portal).

## Architecture

| App | Repo | Prod URL (today) | Role |
|-----|------|------------------|------|
| Staff Portal | PORTALVIC → `working_ui/` | https://portalvic.vercel.app | Login, dashboards, roster |
| Routines | visualVIC (Next.js) | https://visual-vic.vercel.app | Library, player, Focus, **Planner** |

**Same Supabase project (Portal)** — not Onboarding (`aptbbkmvkjybjgrrwxpr`).

| Field | Value |
|-------|--------|
| Project ref | `cklpnwhlqsulpmkipmqb` |
| URL | `https://cklpnwhlqsulpmkipmqb.supabase.co` |
| Dashboard | https://supabase.com/dashboard/project/cklpnwhlqsulpmkipmqb |

Anon key: set in Vercel env for **both** apps — do not commit to git.

## Scope v1 (confirmed)

**Include:** core, shower, dress-on, dress-off, tailored (Ikram, Serine, Ayaan, Emmanuel).

**Exclude v1:** brushing teeth.

## Planner permissions

Uses `staff_profiles.app_role` (lowercase): `staff` | `lead` | `admin` | `ceo`.

| Role | Planner library |
|------|-----------------|
| `ceo`, `admin` | Full library |
| Full-access usernames (e.g. Michelle) | Full library (same as ceo/admin) |
| `lead`, `staff` | Universal packs + tailored packs listed in `staff_participant_access` |

Inactive profiles (`is_active = false`) → no access.

### Participant assignments (seed)

| Person | app_role | participant_slug(s) |
|--------|----------|------------------------|
| Luliya | staff | ikram, emmanuel |
| Youssef | staff | ikram, emmanuel |
| Michelle | lead | *(full access via username override)* |
| Sandra | staff | serine, ayaan |
| Victor, Raul, Javi | ceo | *(none — full access)* |

## Portal tasks (this repo does not implement HTML dashboards)

1. Run SQL migration: [`docs/portal/sql/staff_participant_access.sql`](./portal/sql/staff_participant_access.sql)
2. Seed rows for staff above (match `staff_profiles.id` after auth exists)
3. Add **Planner** link on staff / lead dashboards:

   ```text
   https://visual-vic.vercel.app/planner
   ```

   Snippet: [`docs/portal/planner-link-snippet.html`](./portal/planner-link-snippet.html)

4. Optional: add Routines env vars to Portal Vercel only if Portal JS needs Supabase client calls (already has bootstrap).

## Routines tasks (visualVIC — this repo)

1. `/planner` — filtered library + build routine
2. `/planner/login` — Supabase email/password (same Portal project)
3. Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Optional: `NEXT_PUBLIC_STAFF_PORTAL_URL=https://portalvic.vercel.app`

## Auth note (cross-domain)

Portal (`portalvic.vercel.app`) and Routines (`visual-vic.vercel.app`) are **different origins**. Browser cookies are not shared.

**v1 handoff (no second login):** Portal **Plan** button must open:

```text
https://visual-vic.vercel.app/planner/auth/handoff#access_token=…&refresh_token=…
```

Tokens come from `supabase.auth.getSession()` on Portal (hash fragment — not logged server-side). visualVIC calls `setSession` and opens `/planner`.

Snippet: [`docs/portal/planner-link-snippet.html`](./portal/planner-link-snippet.html)

**Fallback:** `/planner/login` (email/password) when staff open Planner directly from Home or bookmark.

## Roster

**Not v1.** Assignments use `staff_participant_access.participant_slug`. Linking to `portal_roster_rows.client_name` is phase 2.

## URLs (confirmed)

| Surface | URL |
|---------|-----|
| Routines prod | https://visual-vic.vercel.app |
| Planner | https://visual-vic.vercel.app/planner |
| Planner login | https://visual-vic.vercel.app/planner/login |
| Staff Portal login | https://portalvic.vercel.app/login.html |

Login Planner uses the same Supabase project and email/password as Portal; cookies are **not** shared across domains.

## Go-live checklist

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Vercel **visualVIC** Production env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STAFF_PORTAL_URL=https://portalvic.vercel.app` — then **redeploy** | visualVIC | ☐ confirm |
| 2 | Supabase `staff_participant_access` table + seeds | Portal | ✅ done |
| 3 | Supabase `participant_shared_routines` table + RLS — [`docs/portal/sql/participant_shared_routines.sql`](./portal/sql/participant_shared_routines.sql) | Portal | ☐ run SQL |
| 4 | Portal dashboards — **Plan** button → `/planner` | Portal | ✅ done |

After item 1: Sandra/Youssef sign in at `/planner/login`, library filtered by role + assignments.

### Shared participant schedules

Custom schedules saved from a participant folder (`/tailored/ikram`, etc.) sync to Supabase (`participant_shared_routines`). Any staff with access to that participant (or ceo/admin) sees the same list on any device once signed in. Stock schedules (e.g. `ikram-day-centre`) and First & Then packs remain bundled in the app.
