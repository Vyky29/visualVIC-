import type { SupabaseClient } from "@supabase/supabase-js";
import { parseTailoredParticipantTag } from "@/lib/routines/tailored-routine-meta";
import type { TailoredParticipantId } from "@/lib/routines/tailored-participants";
import { isValidRoutine } from "@/lib/routines/validate-routine";
import type { Routine } from "@/lib/types/routine";
import type { StaffPlannerAccess } from "@/lib/staff/fetch-staff-planner-access";
import { isPlannerElevatedRole } from "@/lib/staff/planner-access";

type SharedRoutineRow = {
  routine_json: unknown;
};

export function participantIdFromRoutine(
  routine: Routine,
): TailoredParticipantId | undefined {
  return parseTailoredParticipantTag(routine.tags);
}

export async function fetchParticipantSharedRoutines(
  supabase: SupabaseClient,
  access: StaffPlannerAccess,
): Promise<Routine[]> {
  let query = supabase.from("participant_shared_routines").select("routine_json");

  if (!isPlannerElevatedRole(access.appRole)) {
    if (access.participantSlugs.length === 0) return [];
    query = query.in("participant_slug", access.participantSlugs);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  return (data as SharedRoutineRow[])
    .map((row) => row.routine_json)
    .filter(isValidRoutine);
}

export async function upsertParticipantSharedRoutine(
  supabase: SupabaseClient,
  routine: Routine,
  participantId: TailoredParticipantId,
  createdBy?: string,
): Promise<boolean> {
  const { error } = await supabase.from("participant_shared_routines").upsert(
    {
      id: routine.id,
      participant_slug: participantId,
      routine_json: routine,
      created_by: createdBy ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  return !error;
}

export async function deleteParticipantSharedRoutine(
  supabase: SupabaseClient,
  routineId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from("participant_shared_routines")
    .delete()
    .eq("id", routineId);
  return !error;
}

export async function migrateLocalParticipantRoutinesToShared(
  supabase: SupabaseClient,
  access: StaffPlannerAccess,
  routines: readonly Routine[],
  userId: string,
): Promise<Routine[]> {
  const migrated: Routine[] = [];

  for (const routine of routines) {
    const participantId = participantIdFromRoutine(routine);
    if (!participantId) continue;

    const canWrite =
      isPlannerElevatedRole(access.appRole) ||
      access.participantSlugs.includes(participantId);
    if (!canWrite) continue;

    const ok = await upsertParticipantSharedRoutine(
      supabase,
      routine,
      participantId,
      userId,
    );
    if (ok) migrated.push(routine);
  }

  return migrated;
}
