/**
 * Serine · Physical activity — personalised cartoon pack (2D first, then 3D).
 * Drop scene PNGs into `public/cards/day centre/serine/scenes/{slug}.png`.
 */

import {
  dayCentreSerineImageUrl,
  dayCentreSerineSceneFocusUrl,
  dayCentreSerineSceneUrl,
  dayCentreSerinePackMarkUrl,
} from "@/lib/cards/day-centre-shared";
import {
  TAILORED_SCHEDULES_CATEGORY_COLOUR,
  TAILORED_SCHEDULES_CATEGORY_LABEL,
} from "@/lib/cards/tailored-schedules-shared";

export {
  TAILORED_SCHEDULES_CATEGORY_COLOUR as DAY_CENTRE_SERINE_CATEGORY_COLOUR,
  dayCentreSerinePackMarkUrl,
};

export type DayCentreSerineStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_SERINE_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_SERINE_PARTICIPANT_LABEL = "Serine" as const;

export const DAY_CENTRE_SERINE_ROUTINE_NAME =
  "Serine · Physical activity" as const;

export const DAY_CENTRE_SERINE_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_SERINE_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Gym / PE schedule — Serine in every illustration. */
export const DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE: readonly DayCentreSerineStep[] =
  [
    {
      id: "dcs-therapy-ball-bouncing",
      slug: "therapy-ball-bouncing",
      title: "Bounce on therapy ball",
    },
    { id: "dcs-treadmill", slug: "treadmill", title: "Treadmill" },
    { id: "dcs-row-machine", slug: "row-machine", title: "Row machine" },
    { id: "dcs-exercise-bike", slug: "exercise-bike", title: "Exercise bike" },
    { id: "dcs-sandbag-carry", slug: "sandbag-carry", title: "Carry sandbag" },
    {
      id: "dcs-weights-on-bosu",
      slug: "weights-on-bosu",
      title: "Weights on BOSU",
    },
    { id: "dcs-toilet", slug: "toilet", title: "Toilet" },
    { id: "dcs-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
    { id: "dcs-skierg", slug: "skierg", title: "Ski machine" },
    { id: "dcs-stretching", slug: "stretching", title: "Stretching" },
    { id: "dcs-finished", slug: "finished", title: "Finished" },
  ] as const;

export const DAY_CENTRE_SERINE_SEQUENCE: readonly DayCentreSerineStep[] =
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE;

export const DAY_CENTRE_SERINE_LIBRARY_SEQUENCE: readonly DayCentreSerineStep[] =
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE;

const SERINE_SCENE_SLUGS = new Set(
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

export function dayCentreSerineImageUrlForStep(step: DayCentreSerineStep): string {
  if (SERINE_SCENE_SLUGS.has(step.slug)) {
    return dayCentreSerineSceneUrl(step.slug);
  }
  return dayCentreSerineImageUrl(step.slug);
}

export function dayCentreSerineFocusImageUrlForStep(
  step: DayCentreSerineStep,
): string | undefined {
  if (!SERINE_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreSerineSceneFocusUrl(step.slug);
}

export function dayCentreSerineScheduleImageUrlForStep(
  step: DayCentreSerineStep,
): string {
  return dayCentreSerineSceneUrl(step.slug);
}

export function dayCentreSerineScheduleFocusImageUrlForStep(
  step: DayCentreSerineStep,
): string | undefined {
  return dayCentreSerineSceneFocusUrl(step.slug);
}
