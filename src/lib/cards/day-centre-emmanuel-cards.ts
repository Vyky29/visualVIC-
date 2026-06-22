/**
 * Emmanuel · Physical activity — personalised cartoon pack (2D + 3D).
 * Drop scene PNGs into `public/cards/day centre/emmanuel/scenes/{slug}.png`.
 */

import {
  dayCentreEmmanuelImageUrl,
  dayCentreEmmanuelScene2dFocusUrl,
  dayCentreEmmanuelScene2dUrl,
  dayCentreEmmanuelSceneFocusUrl,
  dayCentreEmmanuelSceneUrl,
  dayCentreEmmanuelAvatarUrl,
  dayCentreEmmanuelPackMarkUrl,
} from "@/lib/cards/day-centre-shared";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";
import type { TailoredItems3dStep } from "@/lib/cards/tailored-items-3d-shared";

/** Dark navy — Emmanuel tailored schedules (distinct from shower #143d66 and swimming #4a8fa8). */
export const DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR = "#1E4A73" as const;

export { dayCentreEmmanuelPackMarkUrl, dayCentreEmmanuelAvatarUrl };

export type DayCentreEmmanuelStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_EMMANUEL_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_EMMANUEL_PARTICIPANT_LABEL = "Emmanuel" as const;

export const DAY_CENTRE_EMMANUEL_ROUTINE_NAME =
  "Emmanuel Physical Activity (avatar)" as const;

export const DAY_CENTRE_EMMANUEL_MACHINERY_ROUTINE_NAME =
  "Emmanuel Physical Activity (items)" as const;

export const DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_EMMANUEL_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Gym / PE schedule — Emmanuel in every illustration. */
export const DAY_CENTRE_EMMANUEL_SCHEDULE_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  [
    {
      id: "dce-cross-trainer",
      slug: "cross-trainer",
      title: "Cross trainer",
    },
    { id: "dce-basketball", slug: "basketball", title: "Basketball" },
    { id: "dce-cruzigramas", slug: "cruzigramas", title: "Cruzigramas" },
    { id: "dce-maths", slug: "maths", title: "Maths" },
    {
      id: "dce-circle-time",
      slug: "circle-time",
      title: "Circle time",
    },
  ] as const;

/** Gym equipment only — 3D objects (no Emmanuel character). */
export const DAY_CENTRE_EMMANUEL_MACHINERY_3D_SEQUENCE: readonly TailoredItems3dStep[] =
  [
    {
      id: "dcem-elliptical",
      slug: "arms-machine",
      title: "Cross trainer",
      library: "3d-gym",
    },
    {
      id: "dcem-exercise-bike",
      slug: "exercise-bike",
      title: "Exercise bike",
      library: "3d",
    },
    {
      id: "dcem-treadmill",
      slug: "treadmill",
      title: "Treadmill",
      library: "3d",
    },
    {
      id: "dcem-exercise-mat",
      slug: "exercise-mat",
      title: "Exercise mat",
      library: "3d",
    },
    {
      id: "dcem-therapy-ball",
      slug: "therapy-ball",
      title: "Therapy ball",
      library: "3d",
    },
  ] as const;

export const DAY_CENTRE_EMMANUEL_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  DAY_CENTRE_EMMANUEL_SCHEDULE_SEQUENCE;

export const DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  DAY_CENTRE_EMMANUEL_SCHEDULE_SEQUENCE;

const EMMANUEL_SCENE_SLUGS = new Set(
  DAY_CENTRE_EMMANUEL_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

export function dayCentreEmmanuelImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string {
  if (EMMANUEL_SCENE_SLUGS.has(step.slug)) {
    return dayCentreEmmanuelSceneUrl(step.slug);
  }
  return dayCentreEmmanuelImageUrl(step.slug);
}

export function dayCentreEmmanuelFocusImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string | undefined {
  if (!EMMANUEL_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreEmmanuelSceneFocusUrl(step.slug);
}

export function dayCentreEmmanuelScheduleImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string {
  return dayCentreEmmanuelSceneUrl(step.slug);
}

export function dayCentreEmmanuelScheduleFocusImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string | undefined {
  return dayCentreEmmanuelSceneFocusUrl(step.slug);
}

export function dayCentreEmmanuelLibrary2dImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string {
  return dayCentreEmmanuelScene2dUrl(step.slug);
}

export function dayCentreEmmanuelLibrary2dFocusImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string | undefined {
  return dayCentreEmmanuelScene2dFocusUrl(step.slug);
}
