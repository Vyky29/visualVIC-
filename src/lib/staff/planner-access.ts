/**
 * Staff Planner — library section filter from Portal `staff_profiles` + assignments.
 */

import { DAY_CENTRE_LIBRARY_SECTION_IDS } from "@/lib/cards/day-centre-library-sections";

export type PortalAppRole = "staff" | "lead" | "admin" | "ceo";

export type ParticipantSlug =
  | "ikram"
  | "serine"
  | "ayaan"
  | "emmanuel"
  | "cyrus"
  | "fadi"
  | "timi";

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
  | "dcfolderminigym"
  | "dcfolderbouldering"
  | (typeof DAY_CENTRE_LIBRARY_SECTION_IDS)[number]
  | "dcikram"
  | "dcserine"
  | "dcayaan"
  | "dcemmanuel"
  | "dccyrus"
  | "dcfadi"
  | "dctimi"
  | "physical";

export const PLANNER_STAFF_DAY_CENTRE_SECTIONS: readonly PlannerLibrarySectionId[] = [
  "dcfolderminigym",
  "dcfolderbouldering",
  ...DAY_CENTRE_LIBRARY_SECTION_IDS,
];

/** Climbing coaches (Portal usernames) — Core + Climbing library only. */
export const PLANNER_STAFF_CORE_CLIMB_USERNAMES = new Set([
  "alex",
  "andres",
]);

export const PLANNER_STAFF_CORE_CLIMB_SECTIONS: readonly PlannerLibrarySectionId[] =
  ["core", "climb"];

export function isCoreClimbPlannerUsername(
  username: string | null | undefined,
): boolean {
  const u = username?.trim().toLowerCase();
  return !!u && PLANNER_STAFF_CORE_CLIMB_USERNAMES.has(u);
}

export const PLANNER_FULL_SECTIONS: readonly PlannerLibrarySectionId[] = [
  "bt",
  "shower",
  "dress-on",
  "dress-off",
  "core",
  "airport",
  "hotel",
  "daycentre",
  "dcfolderminigym",
  "dcfolderbouldering",
  ...DAY_CENTRE_LIBRARY_SECTION_IDS,
  "dcikram",
  "dcserine",
  "dcayaan",
  "dcemmanuel",
  "dccyrus",
  "dcfadi",
  "dctimi",
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
  cyrus: "dccyrus",
  fadi: "dcfadi",
  timi: "dctimi",
};

export type StaffProfileRow = {
  id: string;
  full_name: string | null;
  username: string | null;
  app_role: string | null;
  is_active: boolean | null;
};

export function normalizePortalAppRole(
  raw: string | null | undefined,
): PortalAppRole | null {
  const r = raw?.trim().toLowerCase();
  if (r === "staff" || r === "lead" || r === "admin" || r === "ceo") return r;
  return null;
}

export function isPlannerElevatedRole(role: PortalAppRole): boolean {
  return role === "ceo" || role === "admin";
}

export function parseParticipantSlug(raw: string): ParticipantSlug | null {
  const s = raw.trim().toLowerCase();
  if (
    s === "ikram" ||
    s === "serine" ||
    s === "ayaan" ||
    s === "emmanuel" ||
    s === "cyrus" ||
    s === "fadi" ||
    s === "timi"
  ) {
    return s;
  }
  return null;
}

export function participantSlugToLibrarySection(
  slug: ParticipantSlug,
): PlannerLibrarySectionId {
  return PARTICIPANT_TO_SECTION[slug];
}

export function resolvePlannerLibrarySections(
  appRole: PortalAppRole,
  participantSlugs: readonly ParticipantSlug[],
  username?: string | null,
): ReadonlySet<PlannerLibrarySectionId> | null {
  if (isPlannerElevatedRole(appRole)) {
    return null;
  }

  if (isCoreClimbPlannerUsername(username)) {
    return new Set(PLANNER_STAFF_CORE_CLIMB_SECTIONS);
  }

  const tailored = participantSlugs.map((slug) => PARTICIPANT_TO_SECTION[slug]);

  return new Set([...PLANNER_STAFF_DAY_CENTRE_SECTIONS, ...tailored]);
}

export function staffMayUsePlanner(profile: StaffProfileRow | null): boolean {
  if (!profile || profile.is_active === false) return false;
  return normalizePortalAppRole(profile.app_role) !== null;
}

export function staffCanAccessParticipantSlug(
  appRole: PortalAppRole,
  participantSlugs: readonly ParticipantSlug[],
  slug: ParticipantSlug,
): boolean {
  if (isPlannerElevatedRole(appRole)) return true;
  return participantSlugs.includes(slug);
}
