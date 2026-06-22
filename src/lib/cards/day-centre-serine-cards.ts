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
import { coreImageUrl } from "@/lib/cards/core-cards";
import type { TailoredItems3dStep } from "@/lib/cards/tailored-items-3d-shared";
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
  "Serine Physical Activity (avatar)" as const;

export const DAY_CENTRE_SERINE_MACHINERY_ROUTINE_NAME =
  "Serine Physical Activity (items)" as const;

export const DAY_CENTRE_SERINE_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_SERINE_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Gym / PE schedule — Serine in every illustration. */
export const DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE: readonly DayCentreSerineStep[] =
  [
    { id: "dcs-treadmill", slug: "treadmill", title: "Treadmill" },
    { id: "dcs-row-machine", slug: "row-machine", title: "Row machine" },
    { id: "dcs-sandbag-carry", slug: "sandbag-carry", title: "Walk with sandbag" },
    {
      id: "dcs-sandbag-shoulders",
      slug: "sandbag-shoulders",
      title: "Sandbag on shoulders",
    },
    {
      id: "dcs-weights-on-bosu",
      slug: "weights-on-bosu",
      title: "Weights on BOSU",
    },
    {
      id: "dcs-knees-up-on-top",
      slug: "knees-up-on-top",
      title: "Knees up on box",
    },
    { id: "dcs-weight-ball", slug: "weight-ball", title: "Weight ball" },
    {
      id: "dcs-weight-ball-on-bench",
      slug: "weight-ball-on-bench",
      title: "Weight ball on bench",
    },
  ] as const;

/** Gym equipment only — 3D objects (no Serine character). */
export const DAY_CENTRE_SERINE_MACHINERY_3D_SEQUENCE: readonly TailoredItems3dStep[] =
  [
    { id: "dcsm-treadmill", slug: "treadmill", title: "Treadmill", library: "3d" },
    { id: "dcsm-row-machine", slug: "row-machine", title: "Row machine", library: "3d" },
    { id: "dcsm-sandbag-blue", slug: "sandbag-blue", title: "Sandbag", library: "3d-gym" },
    { id: "dcsm-sandbag-stack", slug: "sandbag-stack", title: "Sandbags", library: "3d-gym" },
    { id: "dcsm-weights", slug: "weights", title: "Weights", library: "3d" },
    { id: "dcsm-bosu", slug: "bosu", title: "BOSU", library: "3d" },
    { id: "dcsm-step-platform", slug: "step-platform", title: "Steps", library: "3d" },
    { id: "dcsm-medicine-ball", slug: "medicine-ball", title: "Weight ball", library: "3d" },
    {
      id: "dcsm-bench-press",
      slug: "arms-machine",
      title: "Weight ball on bench",
      library: "3d-gym",
    },
  ] as const;

export const DAY_CENTRE_SERINE_SEQUENCE: readonly DayCentreSerineStep[] =
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE;

export const DAY_CENTRE_SERINE_LIBRARY_SEQUENCE: readonly DayCentreSerineStep[] =
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE;

/** Generic core visuals — not personalised Serine scenes. */
const SERINE_CORE_BORROWED_SLUGS: Readonly<Record<string, string>> = {};

const SERINE_PERSONALISED_SCENE_SLUGS = new Set(
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE.map((s) => s.slug).filter(
    (slug) => !(slug in SERINE_CORE_BORROWED_SLUGS),
  ),
);

function serineCoreBorrowedImageUrl(slug: string): string | undefined {
  const coreSlug = SERINE_CORE_BORROWED_SLUGS[slug];
  return coreSlug ? coreImageUrl(coreSlug) : undefined;
}

export function dayCentreSerineImageUrlForStep(step: DayCentreSerineStep): string {
  const borrowed = serineCoreBorrowedImageUrl(step.slug);
  if (borrowed) return borrowed;
  if (SERINE_PERSONALISED_SCENE_SLUGS.has(step.slug)) {
    return dayCentreSerineSceneUrl(step.slug);
  }
  return dayCentreSerineImageUrl(step.slug);
}

export function dayCentreSerineFocusImageUrlForStep(
  step: DayCentreSerineStep,
): string | undefined {
  if (step.slug in SERINE_CORE_BORROWED_SLUGS) return undefined;
  if (!SERINE_PERSONALISED_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreSerineSceneFocusUrl(step.slug);
}

export function dayCentreSerineScheduleImageUrlForStep(
  step: DayCentreSerineStep,
): string {
  const borrowed = serineCoreBorrowedImageUrl(step.slug);
  if (borrowed) return borrowed;
  return dayCentreSerineSceneUrl(step.slug);
}

export function dayCentreSerineScheduleFocusImageUrlForStep(
  step: DayCentreSerineStep,
): string | undefined {
  if (step.slug in SERINE_CORE_BORROWED_SLUGS) return undefined;
  return dayCentreSerineSceneFocusUrl(step.slug);
}
