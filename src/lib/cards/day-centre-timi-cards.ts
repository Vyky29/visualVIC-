/**
 * Timi · Day centre — personalised photo pack.
 * Timi's cards live in `public/cards/day centre/timi/{slug}.png`.
 */

import {
  dayCentreTimiAvatarUrl,
  dayCentreTimiImageUrl,
  dayCentreTimiPackMarkUrl,
  dayCentreTimiTailoredHomeAvatarUrl,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";

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
] as const;

/** Stock routine — Timi's day-centre order. */
export const DAY_CENTRE_TIMI_SCHEDULE_SEQUENCE: readonly DayCentreTimiStep[] = [
  { id: "dcts-sensory-room-am", slug: "sensory-room", title: "Sensory room" },
  { id: "dcts-circle-time", slug: "circle-time", title: "Circle time" },
  { id: "dcts-motor-skills", slug: "timi-motor-skills", title: "Motor skills" },
  { id: "dcts-swimming-pool", slug: "swimming-pool", title: "Swimming pool" },
  { id: "dcts-snack", slug: "snack", title: "Snack" },
  { id: "dcts-puzzles", slug: "timi-puzzle-2", title: "Puzzles" },
  { id: "dcts-sensory-room-pm", slug: "sensory-room", title: "Sensory room" },
  { id: "dcts-home", slug: "home", title: "Home" },
] as const;

export function dayCentreTimiImageUrlForStep(step: DayCentreTimiStep): string {
  if (step.slug.startsWith("timi-")) {
    return dayCentreTimiImageUrl(step.slug);
  }
  return dayCentreGeneralImageUrl(step.slug);
}

export function dayCentreTimiFocusImageUrlForStep(
  _step: DayCentreTimiStep,
): string | undefined {
  return undefined;
}

export function dayCentreTimiScheduleImageUrlForStep(
  step: DayCentreTimiStep,
): string {
  return dayCentreTimiImageUrlForStep(step);
}

export function dayCentreTimiScheduleFocusImageUrlForStep(
  _step: DayCentreTimiStep,
): string | undefined {
  return undefined;
}
