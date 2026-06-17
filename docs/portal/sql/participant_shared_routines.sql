-- Portal Supabase (cklpnwhlqsulpmkipmqb)
-- Shared participant schedules — visible to all staff assigned to that participant.
-- Run in SQL Editor after staff_participant_access exists.

create table if not exists public.participant_shared_routines (
  id text primary key,
  participant_slug text not null check (
    participant_slug in ('ikram', 'serine', 'ayaan', 'emmanuel')
  ),
  routine_json jsonb not null,
  created_by uuid references public.staff_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists participant_shared_routines_slug_idx
  on public.participant_shared_routines (participant_slug);

alter table public.participant_shared_routines enable row level security;

-- Staff with participant assignment (or ceo/admin) can read shared schedules.
drop policy if exists participant_shared_routines_select on public.participant_shared_routines;
create policy participant_shared_routines_select
  on public.participant_shared_routines
  for select
  to authenticated
  using (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
        and sp.is_active = true
        and (
          lower(sp.app_role) in ('ceo', 'admin')
          or exists (
            select 1 from public.staff_participant_access spa
            where spa.staff_id = auth.uid()
              and spa.participant_slug = participant_shared_routines.participant_slug
          )
        )
    )
  );

drop policy if exists participant_shared_routines_insert on public.participant_shared_routines;
create policy participant_shared_routines_insert
  on public.participant_shared_routines
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
        and sp.is_active = true
        and (
          lower(sp.app_role) in ('ceo', 'admin')
          or exists (
            select 1 from public.staff_participant_access spa
            where spa.staff_id = auth.uid()
              and spa.participant_slug = participant_shared_routines.participant_slug
          )
        )
    )
  );

drop policy if exists participant_shared_routines_update on public.participant_shared_routines;
create policy participant_shared_routines_update
  on public.participant_shared_routines
  for update
  to authenticated
  using (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
        and sp.is_active = true
        and (
          lower(sp.app_role) in ('ceo', 'admin')
          or exists (
            select 1 from public.staff_participant_access spa
            where spa.staff_id = auth.uid()
              and spa.participant_slug = participant_shared_routines.participant_slug
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
        and sp.is_active = true
        and (
          lower(sp.app_role) in ('ceo', 'admin')
          or exists (
            select 1 from public.staff_participant_access spa
            where spa.staff_id = auth.uid()
              and spa.participant_slug = participant_shared_routines.participant_slug
          )
        )
    )
  );

drop policy if exists participant_shared_routines_delete on public.participant_shared_routines;
create policy participant_shared_routines_delete
  on public.participant_shared_routines
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
        and sp.is_active = true
        and (
          lower(sp.app_role) in ('ceo', 'admin')
          or exists (
            select 1 from public.staff_participant_access spa
            where spa.staff_id = auth.uid()
              and spa.participant_slug = participant_shared_routines.participant_slug
          )
        )
    )
  );
