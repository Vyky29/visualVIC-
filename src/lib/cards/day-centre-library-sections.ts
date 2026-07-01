/**
 * Library accordion sections for Day centre illustrated cards (`daycentre::*`).
 * Replaces the old cooking / community / mixed folder split.
 */

import {
  DAY_CENTRE_LIBRARY_GROUP_ORDER,
  type DayCentreLibraryGroup,
  dayCentreLibraryGroupForSlug,
} from "@/lib/cards/day-centre-library-groups";
import { dayCentreGeneralImageUrl } from "@/lib/cards/day-centre-shared";

export type DayCentreLibrarySectionGroup = Exclude<
  DayCentreLibraryGroup,
  "fitness-held"
>;

/** Visible library sections — excludes held fitness cards (not shown yet). */
export const DAY_CENTRE_LIBRARY_SECTION_GROUP_ORDER: readonly DayCentreLibrarySectionGroup[] =
  DAY_CENTRE_LIBRARY_GROUP_ORDER.filter(
    (g): g is DayCentreLibrarySectionGroup => g !== "fitness-held",
  );

export type DayCentreLibrarySectionId =
  `dcg-${DayCentreLibrarySectionGroup}`;

export function dayCentreLibrarySectionIdForGroup(
  group: DayCentreLibrarySectionGroup,
): DayCentreLibrarySectionId {
  return `dcg-${group}`;
}

export function dayCentreLibraryGroupFromSectionId(
  section: string,
): DayCentreLibrarySectionGroup | undefined {
  if (!section.startsWith("dcg-")) return undefined;
  const group = section.slice(4) as DayCentreLibraryGroup;
  if (group === "fitness-held") return undefined;
  return group as DayCentreLibrarySectionGroup;
}

export function dayCentreLibrarySectionIdForSlug(
  slug: string,
): DayCentreLibrarySectionId | null {
  const group = dayCentreLibraryGroupForSlug(slug);
  if (group === "fitness-held") return null;
  return dayCentreLibrarySectionIdForGroup(group);
}

const GROUP_REPRESENTATIVE_SLUG: Record<DayCentreLibrarySectionGroup, string> =
  {
    "mini-gym": "therapy-ball",
    "materials-kitchen": "apron",
    "materials-art": "paintbrush",
    technology: "ipad",
    "activities-cognitive": "jigsaw-puzzle",
    "activities-cooking": "cooking",
    "personal-care": "wash-hands",
    community: "bus",
    "activities-leisure": "park",
    shopping: "shopping",
    "food-drink": "snack",
    "places-extras": "home",
  };

export function dayCentreLibrarySectionIconUrl(
  group: DayCentreLibrarySectionGroup,
): string {
  return dayCentreGeneralImageUrl(GROUP_REPRESENTATIVE_SLUG[group]);
}

export const DAY_CENTRE_LIBRARY_SECTION_IDS: readonly DayCentreLibrarySectionId[] =
  DAY_CENTRE_LIBRARY_SECTION_GROUP_ORDER.map(dayCentreLibrarySectionIdForGroup);
