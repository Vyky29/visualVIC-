/**
 * Emmanuel · Day centre — icon schedule + personalised avatar library.
 * Icon PNGs: `public/cards/day centre/emmanuel/icons/{slug}.png`
 * Avatar scenes: `public/cards/day centre/emmanuel/scenes/{slug}.png`
 */

import {
  dayCentreEmmanuelIconUrl,
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

/** Stock routine · personalised avatar scenes (Emmanuel in art). */
export const DAY_CENTRE_EMMANUEL_AVATAR_ROUTINE_NAME =
  "Emmanuel · Day centre (avatar)" as const;

/** Stock routine · activity object icons (no avatar in art). */
export const DAY_CENTRE_EMMANUEL_ITEMS_ROUTINE_NAME =
  "Emmanuel · Day centre (items)" as const;

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_ITEMS_ROUTINE_NAME}. */
export const DAY_CENTRE_EMMANUEL_ROUTINE_NAME =
  DAY_CENTRE_EMMANUEL_ITEMS_ROUTINE_NAME;

export const DAY_CENTRE_EMMANUEL_MACHINERY_ROUTINE_NAME =
  "Emmanuel Physical Activity (items)" as const;

export const DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_EMMANUEL_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Day centre schedule — icon cards only. Replace PNGs in `emmanuel/icons/`. */
export const DAY_CENTRE_EMMANUEL_ICON_SEQUENCE: readonly TailoredItems3dStep[] =
  [
    {
      id: "dcei-cruzigramas",
      slug: "cruzigramas",
      title: "Cruzigramas",
      library: "emmanuel-icons",
    },
    {
      id: "dcei-washing-up",
      slug: "washing-up",
      title: "Washing up",
      library: "emmanuel-icons",
    },
    {
      id: "dcei-table-work",
      slug: "table-work",
      title: "Table work",
      library: "emmanuel-icons",
    },
    {
      id: "dcei-spelling",
      slug: "spelling",
      title: "Spelling",
      library: "emmanuel-icons",
    },
    {
      id: "dcei-handwriting",
      slug: "handwriting",
      title: "Handwriting",
      library: "emmanuel-icons",
    },
    {
      id: "dcei-maths",
      slug: "maths",
      title: "Maths",
      library: "emmanuel-icons",
    },
  ] as const;

/** Personalised avatar scenes — library · 3D / 2D (Emmanuel in illustration). */
export const DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  [
    {
      id: "dce-cross-trainer",
      slug: "cross-trainer",
      title: "Cross trainer",
    },
    {
      id: "dce-gym-with-michelle",
      slug: "gym-with-michelle",
      title: "Gym with Michelle",
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
      slug: "elliptical",
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

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_ICON_SEQUENCE} or {@link DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE}. */
export const DAY_CENTRE_EMMANUEL_SCHEDULE_SEQUENCE: readonly TailoredItems3dStep[] =
  DAY_CENTRE_EMMANUEL_ICON_SEQUENCE;

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE}. */
export const DAY_CENTRE_EMMANUEL_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE;

/** Library avatar picker — personalised scenes only (not icon schedule). */
export const DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE;

const EMMANUEL_AVATAR_SCENE_SLUGS = new Set(
  DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE.map((s) => s.slug),
);

export function dayCentreEmmanuelIconImageUrlForStep(
  step: TailoredItems3dStep,
): string {
  return dayCentreEmmanuelIconUrl(step.slug);
}

export function dayCentreEmmanuelImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string {
  if (EMMANUEL_AVATAR_SCENE_SLUGS.has(step.slug)) {
    return dayCentreEmmanuelSceneUrl(step.slug);
  }
  return dayCentreEmmanuelImageUrl(step.slug);
}

export function dayCentreEmmanuelFocusImageUrlForStep(
  step: DayCentreEmmanuelStep,
): string | undefined {
  if (!EMMANUEL_AVATAR_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreEmmanuelSceneFocusUrl(step.slug);
}

export function dayCentreEmmanuelScheduleImageUrlForStep(
  step: TailoredItems3dStep,
): string {
  return dayCentreEmmanuelIconUrl(step.slug);
}

export function dayCentreEmmanuelScheduleFocusImageUrlForStep(
  _step: TailoredItems3dStep,
): string | undefined {
  return undefined;
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
