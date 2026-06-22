/**
 * Ayaan · Physical activity — personalised cartoon pack (2D + 3D).
 * Drop scene PNGs into `public/cards/day centre/ayaan/scenes/{slug}.png`.
 * Snack 3D source: `ayaansnack3d.png` → `node scripts/import-ayaan-scene.mjs snack`
 */

import {
  dayCentreAyaanImageUrl,
  dayCentreAyaanSceneFocusUrl,
  dayCentreAyaanSceneUrl,
  dayCentreAyaanAvatarUrl,
  dayCentreAyaanPackMarkUrl,
} from "@/lib/cards/day-centre-shared";
import {
  physical3dGymImageUrl,
  physical3dImageUrl,
} from "@/lib/cards/physical-cards";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";

/** Dark navy — Ayaan tailored schedules (distinct from shower #143d66 and swimming #4a8fa8). */
export const DAY_CENTRE_AYAAN_CATEGORY_COLOUR = "#1E4A73" as const;

export { dayCentreAyaanPackMarkUrl, dayCentreAyaanAvatarUrl };

export type DayCentreAyaanStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_AYAAN_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_AYAAN_PARTICIPANT_LABEL = "Ayaan" as const;

export const DAY_CENTRE_AYAAN_ROUTINE_NAME =
  "Ayaan · Gym · 3D with Ayaan" as const;

export const DAY_CENTRE_AYAAN_MACHINERY_ROUTINE_NAME =
  "Ayaan · 3D machinery only" as const;

export const DAY_CENTRE_AYAAN_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_AYAAN_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Gym / PE schedule — Ayaan in every illustration. */
export const DAY_CENTRE_AYAAN_SCHEDULE_SEQUENCE: readonly DayCentreAyaanStep[] =
  [
    { id: "dca-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
    { id: "dca-elastic-band", slug: "elastic-band", title: "Elastic band" },
    { id: "dca-sandbag", slug: "sandbag", title: "Sandbag" },
    { id: "dca-weights", slug: "weights", title: "Weights" },
    { id: "dca-weight-ball", slug: "weight-ball", title: "Weight ball" },
    {
      id: "dca-throwing-ball-on-bosu",
      slug: "throwing-ball-on-bosu",
      title: "Throwing ball on BOSU",
    },
    { id: "dca-treadmill", slug: "treadmill", title: "Treadmill" },
  ] as const;

export type DayCentreAyaanMachineryStep = {
  id: string;
  slug: string;
  title: string;
  library: "3d" | "3d-gym" | "ayaan";
};

/** Gym equipment only — 3D objects + machines (no Ayaan character). Finish auto-appended in player. */
export const DAY_CENTRE_AYAAN_MACHINERY_3D_SEQUENCE: readonly DayCentreAyaanMachineryStep[] =
  [
    { id: "dcam-snack", slug: "snack", title: "Snack", library: "ayaan" },
    { id: "dcam-treadmill-1", slug: "treadmill", title: "Treadmill", library: "3d" },
    {
      id: "dcam-therapy-ball-1",
      slug: "therapy-ball",
      title: "Therapy ball",
      library: "3d",
    },
    {
      id: "dcam-sandbags",
      slug: "sandbag-stack",
      title: "Sandbags",
      library: "3d-gym",
    },
    { id: "dcam-treadmill-2", slug: "treadmill", title: "Treadmill", library: "3d" },
    {
      id: "dcam-therapy-ball-2",
      slug: "therapy-ball",
      title: "Therapy ball",
      library: "3d",
    },
    { id: "dcam-dumbbells", slug: "weights", title: "Dumbbells", library: "3d" },
    { id: "dcam-steps", slug: "step-platform", title: "Steps", library: "3d" },
    {
      id: "dcam-therapy-ball-3",
      slug: "therapy-ball",
      title: "Therapy ball",
      library: "3d",
    },
    {
      id: "dcam-weight-ball",
      slug: "medicine-ball",
      title: "Weight ball",
      library: "3d",
    },
  ] as const;

export const DAY_CENTRE_AYAAN_SEQUENCE: readonly DayCentreAyaanStep[] =
  DAY_CENTRE_AYAAN_SCHEDULE_SEQUENCE;

export const DAY_CENTRE_AYAAN_LIBRARY_SEQUENCE: readonly DayCentreAyaanStep[] =
  DAY_CENTRE_AYAAN_SCHEDULE_SEQUENCE;

const AYAAN_SCENE_SLUGS = new Set(
  DAY_CENTRE_AYAAN_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

export function dayCentreAyaanImageUrlForStep(step: DayCentreAyaanStep): string {
  if (AYAAN_SCENE_SLUGS.has(step.slug)) {
    return dayCentreAyaanSceneUrl(step.slug);
  }
  return dayCentreAyaanImageUrl(step.slug);
}

export function dayCentreAyaanFocusImageUrlForStep(
  step: DayCentreAyaanStep,
): string | undefined {
  if (!AYAAN_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreAyaanSceneFocusUrl(step.slug);
}

export function dayCentreAyaanScheduleImageUrlForStep(
  step: DayCentreAyaanStep,
): string {
  return dayCentreAyaanSceneUrl(step.slug);
}

export function dayCentreAyaanScheduleFocusImageUrlForStep(
  step: DayCentreAyaanStep,
): string | undefined {
  return dayCentreAyaanSceneFocusUrl(step.slug);
}

export function dayCentreAyaanMachinery3dImageUrlForStep(
  step: DayCentreAyaanMachineryStep,
): string {
  switch (step.library) {
    case "ayaan":
      return dayCentreAyaanSceneUrl(step.slug);
    case "3d-gym":
      return physical3dGymImageUrl(step.slug);
    case "3d":
      return physical3dImageUrl(step.slug);
  }
}

export function dayCentreAyaanMachinery3dFocusImageUrlForStep(
  step: DayCentreAyaanMachineryStep,
): string | undefined {
  if (step.library !== "ayaan") return undefined;
  return dayCentreAyaanSceneFocusUrl(step.slug);
}
