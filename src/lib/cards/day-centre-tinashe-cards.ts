/**
 * Tinashe · Day centre — personalised tailored pack.
 * Avatar: `public/avatars/tinashe-cartoon(.png|-2d.png)`
 * Scenes (later): `public/cards/day centre/tinashe/scenes/{slug}.png`
 */

import {
  dayCentreGeneralImageUrl,
  dayCentreTinasheSceneFocusUrl,
  dayCentreTinasheSceneUrl,
  dayCentreTinasheAvatarUrl,
  dayCentreTinashePackMarkUrl,
  dayCentreTinasheTailoredHomeAvatarUrl,
} from "@/lib/cards/day-centre-shared";
import { climbingImageUrl } from "@/lib/cards/climbing-cards";
import { physical3dImageUrl } from "@/lib/cards/physical-cards";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";

/** Deep purple — Tinashe tailored schedules (distinct from teal, amber, pink, navy). */
export const DAY_CENTRE_TINASHE_CATEGORY_COLOUR = "#5E35B1" as const;

export {
  dayCentreTinashePackMarkUrl,
  dayCentreTinasheAvatarUrl,
  dayCentreTinasheTailoredHomeAvatarUrl,
};

export type DayCentreTinasheStep = {
  id: string;
  slug: string;
  title: string;
  source?: "tinashe-scene" | "general" | "climbing" | "physical-3d";
};

export const DAY_CENTRE_TINASHE_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_TINASHE_PARTICIPANT_LABEL = "Tinashe" as const;

export const DAY_CENTRE_TINASHE_ROUTINE_NAME =
  "Tinashe · Day centre (avatar)" as const;

export const DAY_CENTRE_TINASHE_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_TINASHE_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/**
 * Library — starter pack (general / climbing / physical) until personal scenes ship.
 */
export const DAY_CENTRE_TINASHE_LIBRARY_SEQUENCE: readonly DayCentreTinasheStep[] =
  [
    {
      id: "dctn-snack",
      slug: "snack",
      title: "Snack",
      source: "general",
    },
    {
      id: "dctn-ipad",
      slug: "ipad",
      title: "iPad",
      source: "general",
    },
    {
      id: "dctn-trampoline",
      slug: "trampoline",
      title: "Trampoline",
      source: "general",
    },
    {
      id: "dctn-climbing-wall",
      slug: "climbing-wall",
      title: "Climbing wall",
      source: "climbing",
    },
    {
      id: "dctn-climb-up",
      slug: "climb-up",
      title: "Climbing",
      source: "climbing",
    },
    {
      id: "dctn-basketball",
      slug: "basketball",
      title: "Basketball",
      source: "physical-3d",
    },
    {
      id: "dctn-home",
      slug: "home",
      title: "Home",
      source: "general",
    },
  ] as const;

/** Stock routine · Day centre order. */
export const DAY_CENTRE_TINASHE_SCHEDULE_SEQUENCE: readonly DayCentreTinasheStep[] =
  [
    {
      id: "dctns-snack",
      slug: "snack",
      title: "Snack",
      source: "general",
    },
    {
      id: "dctns-ipad-am",
      slug: "ipad",
      title: "iPad",
      source: "general",
    },
    {
      id: "dctns-trampoline",
      slug: "trampoline",
      title: "Trampoline",
      source: "general",
    },
    {
      id: "dctns-ipad-midday",
      slug: "ipad",
      title: "iPad",
      source: "general",
    },
    {
      id: "dctns-climbing-wall",
      slug: "climbing-wall",
      title: "Climbing wall",
      source: "climbing",
    },
    {
      id: "dctns-basketball",
      slug: "basketball",
      title: "Basketball",
      source: "physical-3d",
    },
    {
      id: "dctns-climbing",
      slug: "climb-up",
      title: "Climbing",
      source: "climbing",
    },
    {
      id: "dctns-ipad-pm",
      slug: "ipad",
      title: "iPad",
      source: "general",
    },
    {
      id: "dctns-home",
      slug: "home",
      title: "Home",
      source: "general",
    },
  ] as const;

const TINASHE_SCENE_SLUGS = new Set(
  DAY_CENTRE_TINASHE_LIBRARY_SEQUENCE.filter(
    (s) => (s.source ?? "tinashe-scene") === "tinashe-scene",
  ).map((s) => s.slug),
);

export function dayCentreTinasheImageUrlForStep(
  step: DayCentreTinasheStep,
): string {
  switch (step.source ?? "tinashe-scene") {
    case "general":
      return dayCentreGeneralImageUrl(step.slug);
    case "climbing":
      return climbingImageUrl(step.slug);
    case "physical-3d":
      return physical3dImageUrl(step.slug);
    case "tinashe-scene":
      return dayCentreTinasheSceneUrl(step.slug);
  }
}

export function dayCentreTinasheFocusImageUrlForStep(
  step: DayCentreTinasheStep,
): string | undefined {
  if ((step.source ?? "tinashe-scene") !== "tinashe-scene") return undefined;
  if (!TINASHE_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreTinasheSceneFocusUrl(step.slug);
}

export function dayCentreTinasheScheduleImageUrlForStep(
  step: DayCentreTinasheStep,
): string {
  return dayCentreTinasheImageUrlForStep(step);
}

export function dayCentreTinasheScheduleFocusImageUrlForStep(
  step: DayCentreTinasheStep,
): string | undefined {
  if ((step.source ?? "tinashe-scene") !== "tinashe-scene") return undefined;
  return dayCentreTinasheSceneFocusUrl(step.slug);
}
