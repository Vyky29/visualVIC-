-- Portal Supabase (cklpnwhlqsulpmkipmqb)
-- Run in SQL Editor. Seed participant_slug rows after staff auth users exist.

create table if not exists public.staff_participant_access (
  staff_id uuid not null references public.staff_profiles(id) on delete cascade,
  participant_slug text not null check (
    participant_slug in (
      'ikram',
      'serine',
      'ayaan',
      'emmanuel',
      'cyrus',
      'fadi',
      'timi',
      'tinashe'
    )
  ),
  created_at timestamptz not null default now(),
  primary key (staff_id, participant_slug)
);

create index if not exists staff_participant_access_staff_id_idx
  on public.staff_participant_access (staff_id);

alter table public.staff_participant_access enable row level security;

-- Staff read own rows; ceo/admin read all (adjust if your RLS pattern differs)
drop policy if exists staff_participant_access_select_own on public.staff_participant_access;
create policy staff_participant_access_select_own
  on public.staff_participant_access
  for select
  to authenticated
  using (
    staff_id = auth.uid()
    or exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
        and sp.is_active = true
        and lower(sp.app_role) in ('ceo', 'admin')
    )
  );

-- Example seed (replace UUIDs with real auth.users / staff_profiles.id):
-- insert into public.staff_participant_access (staff_id, participant_slug) values
--   ('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'serine'),
--   ('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'ayaan');
--
-- Roberto (username `roberto`) also gets fadi + emmanuel via app override
-- PLANNER_USERNAME_PARTICIPANT_SLUGS; optional DB seed:
-- insert into public.staff_participant_access (staff_id, participant_slug) values
--   ('<roberto-uuid>', 'fadi'),
--   ('<roberto-uuid>', 'emmanuel');

-- If the table already exists with the old 4-slug check, widen it:
-- alter table public.staff_participant_access
--   drop constraint if exists staff_participant_access_participant_slug_check;
-- alter table public.staff_participant_access
--   add constraint staff_participant_access_participant_slug_check
--   check (participant_slug in (
--     'ikram', 'serine', 'ayaan', 'emmanuel', 'cyrus', 'fadi', 'timi', 'tinashe'
--   ));
