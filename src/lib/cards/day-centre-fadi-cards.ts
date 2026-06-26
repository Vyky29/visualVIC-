/**
 * Fadi · Day centre — personalised cartoon pack (3D scenes + item routine).
 * Scene PNGs live in `public/cards/day centre/fadi/scenes/{slug}.png`.
 */

import {
  dayCentreFadiAvatarUrl,
  dayCentreFadiImageUrl,
  dayCentreFadiPackMarkUrl,
  dayCentreFadiSceneFocusUrl,
  dayCentreFadiSceneUrl,
  dayCentreFadiTailoredHomeAvatarUrl,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";

/** Burgundy — Fadi tailored schedules, matching his avatar clothing. */
export const DAY_CENTRE_FADI_CATEGORY_COLOUR = "#8C1E2E" as const;

export {
  dayCentreFadiAvatarUrl,
  dayCentreFadiPackMarkUrl,
  dayCentreFadiTailoredHomeAvatarUrl,
};

export type DayCentreFadiStep = {
  id: string;
  slug: string;
  title: string;
  source?: "fadi-scene" | "fadi-photo" | "general";
};

export const DAY_CENTRE_FADI_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_FADI_PARTICIPANT_LABEL = "Fadi" as const;

export const DAY_CENTRE_FADI_ROUTINE_NAME =
  "Fadi · Day centre (avatar)" as const;

export const DAY_CENTRE_FADI_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_FADI_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Library — personalised 3D scenes. */
export const DAY_CENTRE_FADI_LIBRARY_SEQUENCE: readonly DayCentreFadiStep[] = [
  {
    id: "dcf-walking-with-roberto",
    slug: "walking-with-roberto",
    title: "Walking with Roberto",
  },
  {
    id: "dcf-yellow-bib-walk",
    slug: "yellow-bib-walk",
    title: "Yellow bib walk",
  },
  {
    id: "dcf-happy",
    slug: "happy",
    title: "Happy",
  },
  {
    id: "dcf-motor-skills",
    slug: "motor-skills",
    title: "Motor skills",
  },
  {
    id: "dcf-pe-steps",
    slug: "pe-steps",
    title: "PE steps",
  },
  {
    id: "dcf-swimming",
    slug: "swimming",
    title: "Swimming",
  },
] as const;

/** Stock routine · Fadi's day-centre order. */
export const DAY_CENTRE_FADI_SCHEDULE_SEQUENCE: readonly DayCentreFadiStep[] = [
  {
    id: "dcfs-day-centre",
    slug: "community-centre",
    title: "Day Centre",
    source: "general",
  },
  {
    id: "dcfs-swimming",
    slug: "swimming",
    title: "Swimming",
    source: "fadi-scene",
  },
  {
    id: "dcfs-snack-am",
    slug: "snack",
    title: "Snack",
    source: "general",
  },
  {
    id: "dcfs-table-work",
    slug: "motor-skills",
    title: "Table work",
    source: "fadi-scene",
  },
  {
    id: "dcfs-coop",
    slug: "supermarket",
    title: "Co-op",
    source: "general",
  },
  {
    id: "dcfs-snack-pm",
    slug: "snack",
    title: "Snack",
    source: "general",
  },
  {
    id: "dcfs-vassims-car",
    slug: "vassims-car",
    title: "Vassim's car",
    source: "fadi-photo",
  },
] as const;

const FADI_SCENE_SLUGS = new Set(
  DAY_CENTRE_FADI_LIBRARY_SEQUENCE.map((s) => s.slug),
);

export function dayCentreFadiImageUrlForStep(step: DayCentreFadiStep): string {
  switch (step.source ?? "fadi-scene") {
    case "general":
      return dayCentreGeneralImageUrl(step.slug);
    case "fadi-photo":
      return dayCentreFadiImageUrl(step.slug);
    case "fadi-scene":
      return dayCentreFadiSceneUrl(step.slug);
  }
}

export function dayCentreFadiFocusImageUrlForStep(
  step: DayCentreFadiStep,
): string | undefined {
  if ((step.source ?? "fadi-scene") !== "fadi-scene") return undefined;
  if (!FADI_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreFadiSceneFocusUrl(step.slug);
}

export function dayCentreFadiScheduleImageUrlForStep(
  step: DayCentreFadiStep,
): string {
  return dayCentreFadiImageUrlForStep(step);
}

export function dayCentreFadiScheduleFocusImageUrlForStep(
  step: DayCentreFadiStep,
): string | undefined {
  return dayCentreFadiFocusImageUrlForStep(step);
}
