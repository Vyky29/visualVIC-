/**
 * Library sub-sections for Tailored schedules · Ikram.
 */

import {
  DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE,
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE,
} from "@/lib/cards/day-centre-ikram-cards";

export type IkramLibraryGroup =
  | "scene-cards"
  | "saturday-schedule"
  | "photo-cards";

export const IKRAM_LIBRARY_GROUP_ORDER: readonly IkramLibraryGroup[] = [
  "scene-cards",
  "saturday-schedule",
  "photo-cards",
] as const;

const PECS_SLUGS = new Set(
  DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE.map((s) => s.slug),
);

const SCHEDULE_SLUGS = new Set(
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

/** Scene art under `ikram/scenes/` — PECS grid cards. */
export function ikramLibraryGroupForSlug(slug: string): IkramLibraryGroup {
  if (SCHEDULE_SLUGS.has(slug) && !PECS_SLUGS.has(slug)) {
    return "saturday-schedule";
  }
  if (PECS_SLUGS.has(slug)) {
    return "scene-cards";
  }
  return "photo-cards";
}
