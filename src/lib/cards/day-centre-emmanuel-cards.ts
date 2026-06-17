/**
 * Emmanuel · Physical activity — personalised cartoon pack (2D + 3D).
 * Drop scene PNGs into `public/cards/day centre/emmanuel/scenes/{slug}.png`.
 */

import {
  dayCentreEmmanuelImageUrl,
  dayCentreEmmanuelSceneFocusUrl,
  dayCentreEmmanuelSceneUrl,
  dayCentreEmmanuelAvatarUrl,
} from "@/lib/cards/day-centre-shared";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";

/** Dark navy — Emmanuel tailored schedules (distinct from shower #143d66 and swimming #4a8fa8). */
export const DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR = "#1E4A73" as const;

export {
  dayCentreEmmanuelAvatarUrl as dayCentreEmmanuelPackMarkUrl,
};

export type DayCentreEmmanuelStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_EMMANUEL_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_EMMANUEL_PARTICIPANT_LABEL = "Emmanuel" as const;

export const DAY_CENTRE_EMMANUEL_ROUTINE_NAME =
  "Emmanuel · Physical activity" as const;

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
