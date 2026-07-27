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
  | "timi"
  | "tinashe";

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
  | "dctinashe"
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

/** Staff with full Planner / library access regardless of app_role assignments. */
export const PLANNER_FULL_ACCESS_USERNAMES = new Set(["michelle"]);

/**
 * Extra tailored packs by Portal username (merged with `staff_participant_access`).
 * Use when DB seeds lag or the table check constraint still lacks newer slugs.
 */
export const PLANNER_USERNAME_PARTICIPANT_SLUGS: Readonly<
  Record<string, readonly ParticipantSlug[]>
> = {
  roberto: ["fadi", "emmanuel"],
};

export const PLANNER_STAFF_CORE_CLIMB_SECTIONS: readonly PlannerLibrarySectionId[] =
  ["core", "climb"];

export function isCoreClimbPlannerUsername(
  username: string | null | undefined,
): boolean {
  const u = username?.trim().toLowerCase();
  return !!u && PLANNER_STAFF_CORE_CLIMB_USERNAMES.has(u);
}

export function isFullAccessPlannerUsername(
  username: string | null | undefined,
): boolean {
  const u = username?.trim().toLowerCase();
  return !!u && PLANNER_FULL_ACCESS_USERNAMES.has(u);
}

/** Extra participant packs assigned by username (in addition to DB rows). */
export function plannerParticipantSlugsForUsername(
  username: string | null | undefined,
): readonly ParticipantSlug[] {
  const u = username?.trim().toLowerCase();
  if (!u) return [];
  return PLANNER_USERNAME_PARTICIPANT_SLUGS[u] ?? [];
}

export function mergePlannerParticipantSlugs(
  fromDb: readonly ParticipantSlug[],
  username?: string | null,
): ParticipantSlug[] {
  const merged = new Set<ParticipantSlug>(fromDb);
  for (const slug of plannerParticipantSlugsForUsername(username)) {
    merged.add(slug);
  }
  return [...merged];
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
  "dctinashe",
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
  tinashe: "dctinashe",
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

/** Full library + all tailored packs (ceo/admin, or named full-access staff). */
export function hasFullPlannerAccess(
  appRole: PortalAppRole,
  username?: string | null,
): boolean {
  return isPlannerElevatedRole(appRole) || isFullAccessPlannerUsername(username);
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
    s === "timi" ||
    s === "tinashe"
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
  if (hasFullPlannerAccess(appRole, username)) {
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
  username?: string | null,
): boolean {
  if (hasFullPlannerAccess(appRole, username)) return true;
  return participantSlugs.includes(slug);
}
