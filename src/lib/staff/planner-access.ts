/**
 * Staff Planner — library section filter from Portal `staff_profiles` + assignments.
 */

export type PortalAppRole = "staff" | "lead" | "admin" | "ceo";

export type ParticipantSlug = "ikram" | "serine" | "ayaan" | "emmanuel";

export type PlannerLibrarySectionId =
  | "bt"
  | "shower"
  | "dress-on"
  | "dress-off"
  | "core"
  | "climb"
  | "swim"
  | "airport"
  | "hotel"
  | "daycentre"
  | "dcikram"
  | "dcserine"
  | "dcayaan"
  | "dcemmanuel"
  | "physical";

export const PLANNER_UNIVERSAL_SECTIONS: readonly PlannerLibrarySectionId[] = [
  "core",
  "shower",
  "dress-on",
  "dress-off",
];

export const PLANNER_FULL_SECTIONS: readonly PlannerLibrarySectionId[] = [
  ...PLANNER_UNIVERSAL_SECTIONS,
  "bt",
  "airport",
  "hotel",
  "daycentre",
  "dcikram",
  "dcserine",
  "dcayaan",
  "dcemmanuel",
  "climb",
  "swim",
  "physical",
];

const PARTICIPANT_TO_SECTION: Record<
  ParticipantSlug,
  PlannerLibrarySectionId
> = {
  ikram: "dcikram",
  serine: "dcserine",
  ayaan: "dcayaan",
  emmanuel: "dcemmanuel",
};

export type StaffProfileRow = {
  id: string;
  full_name: string | null;
  username: string | null;
  app_role: string | null;
  is_active: boolean | null;
};

export function normalizePortalAppRole(raw: string | null | undefined): PortalAppRole | null {
  const r = raw?.trim().toLowerCase();
  if (r === "staff" || r === "lead" || r === "admin" || r === "ceo") return r;
  return null;
}

export function isPlannerElevatedRole(role: PortalAppRole): boolean {
  return role === "ceo" || role === "admin";
}

export function parseParticipantSlug(raw: string): ParticipantSlug | null {
  const s = raw.trim().toLowerCase();
  if (s === "ikram" || s === "serine" || s === "ayaan" || s === "emmanuel") {
    return s;
  }
  return null;
}

export function resolvePlannerLibrarySections(
  appRole: PortalAppRole,
  participantSlugs: readonly ParticipantSlug[],
): ReadonlySet<PlannerLibrarySectionId> {
  if (isPlannerElevatedRole(appRole)) {
    return new Set(PLANNER_FULL_SECTIONS);
  }

  const tailored = participantSlugs
    .map((slug) => PARTICIPANT_TO_SECTION[slug])
    .filter(Boolean);

  return new Set([...PLANNER_UNIVERSAL_SECTIONS, ...tailored]);
}

export function staffMayUsePlanner(profile: StaffProfileRow | null): boolean {
  if (!profile || profile.is_active === false) return false;
  return normalizePortalAppRole(profile.app_role) !== null;
}
