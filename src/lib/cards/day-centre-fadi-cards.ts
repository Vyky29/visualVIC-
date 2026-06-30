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
import { physical3dImageUrl } from "@/lib/cards/physical-cards";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";
import type { TailoredItems3dStep } from "@/lib/cards/tailored-items-3d-shared";

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
  source?: "fadi-scene" | "fadi-photo" | "general" | "3d";
};

export const DAY_CENTRE_FADI_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_FADI_PARTICIPANT_LABEL = "Fadi" as const;

export const DAY_CENTRE_FADI_AVATAR_ROUTINE_NAME =
  "Fadi · Day centre (avatar)" as const;

export const DAY_CENTRE_FADI_ITEMS_ROUTINE_NAME =
  "Fadi · Day centre (items)" as const;

/** @deprecated Use {@link DAY_CENTRE_FADI_AVATAR_ROUTINE_NAME}. */
export const DAY_CENTRE_FADI_ROUTINE_NAME = DAY_CENTRE_FADI_AVATAR_ROUTINE_NAME;

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
    id: "dcf-motor-skills",
    slug: "motor-skills",
    title: "Motor skills",
  },
  {
    id: "dcf-cooking-activity",
    slug: "cooking-activity",
    title: "Cooking activity",
  },
  {
    id: "dcf-keys-activity",
    slug: "keys-activity",
    title: "Keys activity",
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
  {
    id: "dcf-vassims-car",
    slug: "vassims-car",
    title: "Vassim's car",
    source: "fadi-scene",
  },
] as const;

/** Library · Items — 3D object cards (no avatar). */
export const DAY_CENTRE_FADI_ITEMS_LIBRARY_SEQUENCE: readonly TailoredItems3dStep[] =
  [
    {
      id: "dcfi-vassims-car",
      slug: "vassims-car",
      title: "Vassim's car",
      library: "3d",
    },
    {
      id: "dcfi-kitkat",
      slug: "kitkat",
      title: "KitKat",
      library: "3d",
    },
    {
      id: "dcfi-popcorn",
      slug: "popcorn",
      title: "Popcorn",
      library: "3d",
    },
    {
      id: "dcfi-doritos",
      slug: "doritos",
      title: "Doritos",
      library: "3d",
    },
    {
      id: "dcfi-crisps",
      slug: "crisps",
      title: "Crisps",
      library: "3d",
    },
    {
      id: "dcfi-yellow-bib",
      slug: "yellow-bib",
      title: "Yellow bib",
      library: "3d",
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
    source: "fadi-scene",
  },
] as const;

/** Stock routine · same flow with object / 3D illustrations. */
export const DAY_CENTRE_FADI_ITEMS_SCHEDULE_SEQUENCE: readonly DayCentreFadiStep[] =
  [
    {
      id: "dcfsi-day-centre",
      slug: "community-centre",
      title: "Day Centre",
      source: "general",
    },
    {
      id: "dcfsi-swimming",
      slug: "swimming-pool",
      title: "Swimming",
      source: "general",
    },
    {
      id: "dcfsi-snack-am",
      slug: "snack",
      title: "Snack",
      source: "general",
    },
    {
      id: "dcfsi-table-work",
      slug: "matching-cards",
      title: "Table work",
      source: "general",
    },
    {
      id: "dcfsi-coop",
      slug: "supermarket",
      title: "Co-op",
      source: "general",
    },
    {
      id: "dcfsi-snack-pm",
      slug: "snack",
      title: "Snack",
      source: "general",
    },
    {
      id: "dcfsi-vassims-car",
      slug: "vassims-car",
      title: "Vassim's car",
      source: "3d",
    },
  ] as const;

const FADI_SCENE_SLUGS = new Set(
  DAY_CENTRE_FADI_LIBRARY_SEQUENCE.map((s) => s.slug),
);

export function dayCentreFadiImageUrlForStep(step: DayCentreFadiStep): string {
  const source = step.source ?? "fadi-scene";
  // Vassim's car — 3D cartoon scene (avatar) or 3D item only; never the legacy photo.
  if (step.slug === "vassims-car") {
    if (source === "3d") return physical3dImageUrl(step.slug);
    return dayCentreFadiSceneUrl(step.slug);
  }
  switch (source) {
    case "general":
      return dayCentreGeneralImageUrl(step.slug);
    case "fadi-photo":
      return dayCentreFadiImageUrl(step.slug);
    case "3d":
      return physical3dImageUrl(step.slug);
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
