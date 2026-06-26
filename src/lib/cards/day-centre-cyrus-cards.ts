/**
 * Cyrus · Day centre — personalised cartoon pack (3D scenes).
 * Drop scene PNGs into `public/cards/day centre/cyrus/scenes/{slug}.png`
 * Import: `node scripts/import-cyrus-scene.mjs <slug>`
 */

import {
  dayCentreCyrusSceneFocusUrl,
  dayCentreCyrusSceneUrl,
  dayCentreCyrusAvatarUrl,
  dayCentreCyrusPackMarkUrl,
  dayCentreCyrusTailoredHomeAvatarUrl,
} from "@/lib/cards/day-centre-shared";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";

/** Teal — Cyrus tailored schedules (distinct from pink, navy, and day centre red). */
export const DAY_CENTRE_CYRUS_CATEGORY_COLOUR = "#2E7D6E" as const;

export {
  dayCentreCyrusPackMarkUrl,
  dayCentreCyrusAvatarUrl,
  dayCentreCyrusTailoredHomeAvatarUrl,
};

export type DayCentreCyrusStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_CYRUS_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_CYRUS_PARTICIPANT_LABEL = "Cyrus" as const;

export const DAY_CENTRE_CYRUS_ROUTINE_NAME =
  "Cyrus · Day centre (avatar)" as const;

export const DAY_CENTRE_CYRUS_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_CYRUS_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Stock routine — extend as new 3D scenes ship. */
export const DAY_CENTRE_CYRUS_SCHEDULE_SEQUENCE: readonly DayCentreCyrusStep[] =
  [
    {
      id: "dcc-table-work",
      slug: "table-work",
      title: "Table work",
    },
    {
      id: "dcc-trampoline",
      slug: "trampoline",
      title: "Trampoline",
    },
    {
      id: "dcc-mini-gym",
      slug: "mini-gym",
      title: "Mini gym",
    },
    {
      id: "dcc-motor-skills",
      slug: "motor-skills",
      title: "Motor skills",
    },
  ] as const;

export const DAY_CENTRE_CYRUS_LIBRARY_SEQUENCE: readonly DayCentreCyrusStep[] =
  DAY_CENTRE_CYRUS_SCHEDULE_SEQUENCE;

const CYRUS_SCENE_SLUGS = new Set(
  DAY_CENTRE_CYRUS_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

export function dayCentreCyrusImageUrlForStep(step: DayCentreCyrusStep): string {
  if (CYRUS_SCENE_SLUGS.has(step.slug)) {
    return dayCentreCyrusSceneUrl(step.slug);
  }
  return dayCentreCyrusSceneUrl(step.slug);
}

export function dayCentreCyrusFocusImageUrlForStep(
  step: DayCentreCyrusStep,
): string | undefined {
  if (!CYRUS_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreCyrusSceneFocusUrl(step.slug);
}

export function dayCentreCyrusScheduleImageUrlForStep(
  step: DayCentreCyrusStep,
): string {
  return dayCentreCyrusSceneUrl(step.slug);
}

export function dayCentreCyrusScheduleFocusImageUrlForStep(
  step: DayCentreCyrusStep,
): string | undefined {
  return dayCentreCyrusSceneFocusUrl(step.slug);
}
