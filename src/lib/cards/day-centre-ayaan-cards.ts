/**
 * Ayaan · Physical activity — personalised cartoon pack (2D + 3D).
 * Drop scene PNGs into `public/cards/day centre/ayaan/scenes/{slug}.png`.
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
  PHYSICAL_3D_GYM_CATALOG,
  PHYSICAL_3D_LIBRARY_CATALOG,
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
  "Ayaan · Gym equipment · 3D" as const;

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

/** Gym equipment only — soft 3D objects + machines (`library-3d/` + `library-3d-gym/`). */
export const DAY_CENTRE_AYAAN_MACHINERY_3D_SEQUENCE: readonly DayCentreAyaanStep[] =
  [
    ...PHYSICAL_3D_LIBRARY_CATALOG.map((item) => ({
      id: `dcam-${item.slug}`,
      slug: item.slug,
      title: item.title,
    })),
    ...PHYSICAL_3D_GYM_CATALOG.map((item) => ({
      id: `dcam-gym-${item.slug}`,
      slug: item.slug,
      title: item.title,
    })),
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

const AYAAN_MACHINERY_GYM_SLUGS = new Set(
  PHYSICAL_3D_GYM_CATALOG.map((item) => item.slug),
);

export function dayCentreAyaanMachinery3dImageUrlForStep(
  step: DayCentreAyaanStep,
): string {
  if (AYAAN_MACHINERY_GYM_SLUGS.has(step.slug)) {
    return physical3dGymImageUrl(step.slug);
  }
  return physical3dImageUrl(step.slug);
}
