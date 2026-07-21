import type { Routine } from "@/lib/types/routine";
import {
  isCoreClimbPlannerUsername,
  isPlannerElevatedRole,
  type ParticipantSlug,
  type PortalAppRole,
  type PlannerLibrarySectionId,
  staffCanAccessParticipantSlug,
} from "@/lib/staff/planner-access";
import type { StaffPlannerAccess } from "@/lib/staff/fetch-staff-planner-access";
import {
  detectTailoredParticipantFromRoutine,
  type TailoredParticipantId,
} from "@/lib/routines/tailored-participants";

export function isRestrictedStaffAccess(
  access: StaffPlannerAccess | null | undefined,
): boolean {
  if (!access) return false;
  return !isPlannerElevatedRole(access.appRole);
}

/** Alex / Andres — Home + Library limited to Core and Climbing. */
export function isCoreClimbOnlyStaffAccess(
  access: StaffPlannerAccess | null | undefined,
): boolean {
  if (!access || isPlannerElevatedRole(access.appRole)) return false;
  return isCoreClimbPlannerUsername(access.profile.username);
}

export function staffCanAccessTailoredParticipant(
  access: StaffPlannerAccess | null | undefined,
  participantId: TailoredParticipantId,
): boolean {
  if (!access) return true;
  return staffCanAccessParticipantSlug(
    access.appRole,
    access.participantSlugs,
    participantId,
  );
}

export function staffAllowedLibrarySections(
  access: StaffPlannerAccess | null | undefined,
): ReadonlySet<PlannerLibrarySectionId> | undefined {
  if (!access || isPlannerElevatedRole(access.appRole)) return undefined;
  return access.allowedSections ?? undefined;
}

export function staffPlayerBackHref(
  access: StaffPlannerAccess | null | undefined,
): string {
  return isRestrictedStaffAccess(access) ? "/dashboard" : "/player";
}

export function staffMayOpenRoutine(
  access: StaffPlannerAccess | null | undefined,
  routine: Routine,
): boolean {
  if (!isRestrictedStaffAccess(access)) return true;

  if (isCoreClimbOnlyStaffAccess(access)) {
    if (routine.id === "core-everyday") return true;
    if (routine.id.startsWith("climbing-")) return true;
    // Device-saved routines built from Core / Climbing library cards.
    if (routine.id.startsWith("custom-") || routine.tags?.includes("custom")) {
      return true;
    }
    return false;
  }

  const participant = detectTailoredParticipantFromRoutine(routine);
  if (participant) {
    return staffCanAccessTailoredParticipant(access, participant);
  }

  if (routine.id === "at-the-day-centre" || routine.id.startsWith("dc-")) {
    return true;
  }

  return false;
}

export function filterParticipantSlugsForStaff(
  access: StaffPlannerAccess | null | undefined,
  slugs: readonly ParticipantSlug[],
): ParticipantSlug[] {
  if (!isRestrictedStaffAccess(access)) return [...slugs];
  return slugs.filter((slug) =>
    staffCanAccessParticipantSlug(
      access!.appRole,
      access!.participantSlugs,
      slug,
    ),
  );
}
