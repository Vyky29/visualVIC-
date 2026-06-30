/**
 * Library sub-sections for Tailored schedules · Ikram.
 */

import {
  DAY_CENTRE_IKRAM_MON_WED_FRI_SCHEDULE_SEQUENCE,
  DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE,
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE,
} from "@/lib/cards/day-centre-ikram-cards";

export type IkramLibraryGroup =
  | "items"
  | "scene-cards"
  | "saturday-schedule"
  | "mon-wed-fri-schedule"
  | "photo-cards";

export const IKRAM_LIBRARY_GROUP_ORDER: readonly IkramLibraryGroup[] = [
  "items",
  "scene-cards",
  "mon-wed-fri-schedule",
  "saturday-schedule",
  "photo-cards",
] as const;

const PECS_SLUGS = new Set(
  DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE.map((s) => s.slug),
);

const SCHEDULE_SLUGS = new Set(
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

const MON_WED_FRI_SCHEDULE_SLUGS = new Set(
  DAY_CENTRE_IKRAM_MON_WED_FRI_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

/** Library picker subgroup — object-only cards use `items-{slug}` pick ids. */
export function ikramLibraryGroupForPickId(pickId: string): IkramLibraryGroup {
  const slug = pickId.split("::")[1] ?? "";
  if (slug.startsWith("items-")) return "items";
  return ikramLibraryGroupForSlug(slug);
}

/** Scene art under `ikram/scenes/` — PECS grid cards. */
export function ikramLibraryGroupForSlug(slug: string): IkramLibraryGroup {
  if (MON_WED_FRI_SCHEDULE_SLUGS.has(slug) && !PECS_SLUGS.has(slug)) {
    return "mon-wed-fri-schedule";
  }
  if (SCHEDULE_SLUGS.has(slug) && !PECS_SLUGS.has(slug)) {
    return "saturday-schedule";
  }
  if (PECS_SLUGS.has(slug)) {
    return "scene-cards";
  }
  return "photo-cards";
}
