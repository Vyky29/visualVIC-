import type { StaffPlannerAccess } from "@/lib/staff/fetch-staff-planner-access";
import type { PlannerLibrarySectionId } from "@/lib/staff/planner-access";

const STORAGE_KEY = "pixtolearn.staffAccessCache.v1";

type CachedStaffAccess = {
  profile: StaffPlannerAccess["profile"];
  appRole: StaffPlannerAccess["appRole"];
  participantSlugs: StaffPlannerAccess["participantSlugs"];
  allowedSections: PlannerLibrarySectionId[] | null;
};

export function saveOfflineStaffAccess(access: StaffPlannerAccess): void {
  if (typeof window === "undefined") return;
  const payload: CachedStaffAccess = {
    profile: access.profile,
    appRole: access.appRole,
    participantSlugs: access.participantSlugs,
    allowedSections: access.allowedSections ? [...access.allowedSections] : null,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota */
  }
}

export function loadOfflineStaffAccess(): StaffPlannerAccess | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedStaffAccess;
    if (!parsed?.profile?.id) return null;
    return {
      profile: parsed.profile,
      appRole: parsed.appRole,
      participantSlugs: parsed.participantSlugs ?? [],
      allowedSections: parsed.allowedSections
        ? new Set(parsed.allowedSections)
        : null,
    };
  } catch {
    return null;
  }
}
