import type { SupabaseClient } from "@supabase/supabase-js";
import {
  normalizePortalAppRole,
  parseParticipantSlug,
  resolvePlannerLibrarySections,
  type ParticipantSlug,
  type PlannerLibrarySectionId,
  type StaffProfileRow,
} from "@/lib/staff/planner-access";

export type StaffPlannerAccess = {
  profile: StaffProfileRow;
  appRole: NonNullable<ReturnType<typeof normalizePortalAppRole>>;
  participantSlugs: ParticipantSlug[];
  allowedSections: ReadonlySet<PlannerLibrarySectionId> | null;
};

export type StaffPlannerAccessResult =
  | { ok: true; access: StaffPlannerAccess }
  | { ok: false; reason: "no_session" | "no_profile" | "inactive" | "forbidden" | "db_error" };

export async function fetchStaffPlannerAccess(
  supabase: SupabaseClient,
  userId: string,
): Promise<StaffPlannerAccessResult> {
  const { data: profile, error: profileError } = await supabase
    .from("staff_profiles")
    .select("id, full_name, username, app_role, is_active")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    return { ok: false, reason: "db_error" };
  }

  if (!profile) {
    return { ok: false, reason: "no_profile" };
  }

  if (profile.is_active === false) {
    return { ok: false, reason: "inactive" };
  }

  const appRole = normalizePortalAppRole(profile.app_role);
  if (!appRole) {
    return { ok: false, reason: "forbidden" };
  }

  let participantSlugs: ParticipantSlug[] = [];

  if (appRole !== "ceo" && appRole !== "admin") {
    const { data: rows, error: accessError } = await supabase
      .from("staff_participant_access")
      .select("participant_slug")
      .eq("staff_id", userId);

    if (accessError) {
      return { ok: false, reason: "db_error" };
    }

    participantSlugs = (rows ?? [])
      .map((r) => parseParticipantSlug(String(r.participant_slug ?? "")))
      .filter((s): s is ParticipantSlug => s !== null);
  }

  const allowedSections = resolvePlannerLibrarySections(appRole, participantSlugs);

  return {
    ok: true,
    access: {
      profile,
      appRole,
      participantSlugs,
      allowedSections,
    },
  };
}
