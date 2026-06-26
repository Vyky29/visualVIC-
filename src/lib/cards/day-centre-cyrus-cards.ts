/**
 * Cyrus · Day centre — personalised cartoon pack (3D scenes).
 * Drop scene PNGs into `public/cards/day centre/cyrus/scenes/{slug}.png`
 * Import: `node scripts/import-cyrus-scene.mjs <slug>`
 */

import {
  dayCentreGeneralImageUrl,
  dayCentreCyrusSceneFocusUrl,
  dayCentreCyrusSceneUrl,
  dayCentreCyrusAvatarUrl,
  dayCentreCyrusPackMarkUrl,
  dayCentreCyrusTailoredHomeAvatarUrl,
} from "@/lib/cards/day-centre-shared";
import { climbingImageUrl } from "@/lib/cards/climbing-cards";
import { physical3dImageUrl } from "@/lib/cards/physical-cards";
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
  source?: "cyrus-scene" | "general" | "climbing" | "physical-3d";
};

export const DAY_CENTRE_CYRUS_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_CYRUS_PARTICIPANT_LABEL = "Cyrus" as const;

export const DAY_CENTRE_CYRUS_ROUTINE_NAME =
  "Cyrus · Day centre (avatar)" as const;

export const DAY_CENTRE_CYRUS_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_CYRUS_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Library — personalised 3D scenes. */
export const DAY_CENTRE_CYRUS_LIBRARY_SEQUENCE: readonly DayCentreCyrusStep[] =
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
    {
      id: "dcc-numbers-math",
      slug: "numbers-math",
      title: "Numbers (Math)",
    },
  ] as const;

/** Stock routine · Items — Cyrus's day-centre order. */
export const DAY_CENTRE_CYRUS_SCHEDULE_SEQUENCE: readonly DayCentreCyrusStep[] =
  [
    {
      id: "dccs-snack",
      slug: "snack",
      title: "Snack",
      source: "general",
    },
    {
      id: "dccs-ipad-am",
      slug: "ipad",
      title: "iPad",
      source: "general",
    },
    {
      id: "dccs-table-work",
      slug: "table-work",
      title: "Table work",
      source: "cyrus-scene",
    },
    {
      id: "dccs-ipad-midday",
      slug: "ipad",
      title: "iPad",
      source: "general",
    },
    {
      id: "dccs-climbing-wall",
      slug: "climbing-wall",
      title: "Climbing wall",
      source: "climbing",
    },
    {
      id: "dccs-basketball",
      slug: "basketball",
      title: "Basketball",
      source: "physical-3d",
    },
    {
      id: "dccs-climbing",
      slug: "climb-up",
      title: "Climbing",
      source: "climbing",
    },
    {
      id: "dccs-ipad-pm",
      slug: "ipad",
      title: "iPad",
      source: "general",
    },
    {
      id: "dccs-home",
      slug: "home",
      title: "Home",
      source: "general",
    },
  ] as const;

const CYRUS_SCENE_SLUGS = new Set(
  DAY_CENTRE_CYRUS_LIBRARY_SEQUENCE.map((s) => s.slug),
);

export function dayCentreCyrusImageUrlForStep(step: DayCentreCyrusStep): string {
  switch (step.source ?? "cyrus-scene") {
    case "general":
      return dayCentreGeneralImageUrl(step.slug);
    case "climbing":
      return climbingImageUrl(step.slug);
    case "physical-3d":
      return physical3dImageUrl(step.slug);
    case "cyrus-scene":
      return dayCentreCyrusSceneUrl(step.slug);
  }
}

export function dayCentreCyrusFocusImageUrlForStep(
  step: DayCentreCyrusStep,
): string | undefined {
  if ((step.source ?? "cyrus-scene") !== "cyrus-scene") return undefined;
  if (!CYRUS_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreCyrusSceneFocusUrl(step.slug);
}

export function dayCentreCyrusScheduleImageUrlForStep(
  step: DayCentreCyrusStep,
): string {
  return dayCentreCyrusImageUrlForStep(step);
}

export function dayCentreCyrusScheduleFocusImageUrlForStep(
  step: DayCentreCyrusStep,
): string | undefined {
  return dayCentreCyrusSceneFocusUrl(step.slug);
}
