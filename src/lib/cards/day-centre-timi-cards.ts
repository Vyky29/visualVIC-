/**
 * Timi · Day centre — personalised photo pack.
 * Timi's cards live in `public/cards/day centre/timi/{slug}.png`.
 */

import {
  dayCentreTimiAvatarUrl,
  dayCentreTimiImageUrl,
  dayCentreTimiItemsImageUrl,
  dayCentreTimiPackMarkUrl,
  dayCentreTimiSceneFocusUrl,
  dayCentreTimiSceneUrl,
  dayCentreTimiTailoredHomeAvatarUrl,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import { swimmingImageUrl } from "@/lib/cards/swimming-cards";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";

export type DayCentreTimiArtSource =
  | "general"
  | "timi-photo"
  | "timi-scene"
  | "timi-item"
  | "shower"
  | "swimming";

/** Amber — Timi tailored schedules (distinct from pink, navy, teal, and day centre red). */
export const DAY_CENTRE_TIMI_CATEGORY_COLOUR = "#C8741C" as const;

export {
  dayCentreTimiPackMarkUrl,
  dayCentreTimiAvatarUrl,
  dayCentreTimiTailoredHomeAvatarUrl,
};

export type DayCentreTimiStep = {
  id: string;
  slug: string;
  title: string;
  source?: DayCentreTimiArtSource;
};

export const DAY_CENTRE_TIMI_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_TIMI_PARTICIPANT_LABEL = "Timi" as const;

export const DAY_CENTRE_TIMI_AVATAR_ROUTINE_NAME =
  "Timi · Day centre (avatar)" as const;

export const DAY_CENTRE_TIMI_ITEMS_ROUTINE_NAME =
  "Timi · Day centre (items)" as const;

/** @deprecated Use {@link DAY_CENTRE_TIMI_AVATAR_ROUTINE_NAME}. */
export const DAY_CENTRE_TIMI_ROUTINE_NAME = DAY_CENTRE_TIMI_AVATAR_ROUTINE_NAME;

export const DAY_CENTRE_TIMI_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_TIMI_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Library — Timi's personalised day-centre photos. */
export const DAY_CENTRE_TIMI_LIBRARY_SEQUENCE: readonly DayCentreTimiStep[] = [
  { id: "dct-fitness", slug: "timi-fitness", title: "Fitness" },
  { id: "dct-motor-skills", slug: "timi-motor-skills", title: "Motor skills" },
  {
    id: "dct-motor-skills-with-raul",
    slug: "timi-motor-skills-with-raul",
    title: "Motor skills with Raul",
  },
  { id: "dct-puzzles", slug: "timi-puzzle-2", title: "Puzzles" },
  {
    id: "dct-puzzles-with-raul",
    slug: "timi-puzzles-with-raul",
    title: "Puzzles with Raul",
  },
  {
    id: "dct-stacking-cubes",
    slug: "timi-stacking-cubes",
    title: "Stacking cubes",
  },
  {
    id: "dct-vocational-activity",
    slug: "timi-vocational-activity",
    title: "Vocational activity",
  },
  { id: "dct-foam", slug: "timi-foam", title: "Foam" },
  { id: "dct-screwdriver", slug: "timi-screwdriver", title: "Screwdriver" },
  {
    id: "dct-timis-car",
    slug: "timis-car",
    title: "Timi's Car",
    source: "timi-item",
  },
  {
    id: "dct-shower",
    slug: "timi-shower",
    title: "Shower",
    source: "timi-scene",
  },
] as const;

/** Avatar routine — Timi appears in personalised photos where available. */
export const DAY_CENTRE_TIMI_AVATAR_SCHEDULE_SEQUENCE: readonly DayCentreTimiStep[] =
  [
    { id: "dcts-sensory-room-am", slug: "sensory-room", title: "Sensory room" },
    {
      id: "dcts-motor-skills",
      slug: "timi-motor-skills",
      title: "Motor skills",
      source: "timi-photo",
    },
    {
      id: "dcts-changing-room",
      slug: "changing-room",
      title: "Changing room",
      source: "swimming",
    },
    {
      id: "dcts-shower",
      slug: "timi-shower",
      title: "Shower",
      source: "timi-scene",
    },
    {
      id: "dcts-swimming",
      slug: "swimming-pool",
      title: "Swimming",
      source: "swimming",
    },
    { id: "dcts-hub-room", slug: "hub-room", title: "Hub room" },
    { id: "dcts-snack", slug: "snack", title: "Snack" },
    {
      id: "dcts-puzzles",
      slug: "timi-puzzle-2",
      title: "Puzzles",
      source: "timi-photo",
    },
    { id: "dcts-sensory-room-pm", slug: "sensory-room", title: "Sensory room" },
    {
      id: "dcts-timis-car",
      slug: "timis-car",
      title: "Timi's Car",
      source: "timi-scene",
    },
    { id: "dcts-home", slug: "home", title: "Home" },
  ] as const;

/** Items routine — object / library art (generic shower icon). */
export const DAY_CENTRE_TIMI_ITEMS_SCHEDULE_SEQUENCE: readonly DayCentreTimiStep[] =
  [
    { id: "dctsi-sensory-room-am", slug: "sensory-room", title: "Sensory room" },
    {
      id: "dctsi-motor-skills",
      slug: "timi-motor-skills",
      title: "Motor skills",
      source: "timi-photo",
    },
    {
      id: "dctsi-changing-room",
      slug: "changing-room",
      title: "Changing room",
      source: "swimming",
    },
    { id: "dctsi-shower", slug: "shower", title: "Shower", source: "shower" },
    {
      id: "dctsi-swimming",
      slug: "swimming-pool",
      title: "Swimming",
      source: "swimming",
    },
    { id: "dctsi-hub-room", slug: "hub-room", title: "Hub room" },
    { id: "dctsi-snack", slug: "snack", title: "Snack" },
    {
      id: "dctsi-puzzles",
      slug: "timi-puzzle-2",
      title: "Puzzles",
      source: "timi-photo",
    },
    {
      id: "dctsi-sensory-room-pm",
      slug: "sensory-room",
      title: "Sensory room",
    },
    {
      id: "dctsi-timis-car",
      slug: "timis-car",
      title: "Timi's Car",
      source: "timi-item",
    },
    { id: "dctsi-home", slug: "home", title: "Home" },
  ] as const;

/** @deprecated Use {@link DAY_CENTRE_TIMI_AVATAR_SCHEDULE_SEQUENCE}. */
export const DAY_CENTRE_TIMI_SCHEDULE_SEQUENCE =
  DAY_CENTRE_TIMI_AVATAR_SCHEDULE_SEQUENCE;

function dayCentreTimiResolvedSource(
  step: DayCentreTimiStep,
): DayCentreTimiArtSource {
  if (step.source) return step.source;
  if (step.slug.startsWith("timi-")) return "timi-photo";
  return "general";
}

export function dayCentreTimiImageUrlForStep(step: DayCentreTimiStep): string {
  switch (dayCentreTimiResolvedSource(step)) {
    case "timi-photo":
      return dayCentreTimiImageUrl(step.slug);
    case "timi-scene":
      return dayCentreTimiSceneUrl(step.slug);
    case "timi-item":
      return dayCentreTimiItemsImageUrl(step.slug);
    case "shower":
      return showerImageUrl(step.slug);
    case "swimming":
      return swimmingImageUrl(step.slug);
    case "general":
    default:
      return dayCentreGeneralImageUrl(step.slug);
  }
}

export function dayCentreTimiFocusImageUrlForStep(
  step: DayCentreTimiStep,
): string | undefined {
  if (dayCentreTimiResolvedSource(step) !== "timi-scene") return undefined;
  return dayCentreTimiSceneFocusUrl(step.slug);
}

export function dayCentreTimiScheduleImageUrlForStep(
  step: DayCentreTimiStep,
): string {
  return dayCentreTimiImageUrlForStep(step);
}

export function dayCentreTimiScheduleFocusImageUrlForStep(
  step: DayCentreTimiStep,
): string | undefined {
  return dayCentreTimiFocusImageUrlForStep(step);
}
