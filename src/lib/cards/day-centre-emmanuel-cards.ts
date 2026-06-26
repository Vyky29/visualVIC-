/**
 * Emmanuel · Day centre + gym — icon library, avatar scenes, and daily schedules.
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
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import { TAILORED_SCHEDULES_CATEGORY_LABEL } from "@/lib/cards/tailored-schedules-shared";
import type { TailoredItems3dStep } from "@/lib/cards/tailored-items-3d-shared";
import {
  physical3dGymImageUrl,
  physical3dImageUrl,
} from "@/lib/cards/physical-cards";

/** Dark navy — Emmanuel tailored schedules (distinct from shower #143d66 and swimming #4a8fa8). */
export const DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR = "#1E4A73" as const;

export { dayCentreEmmanuelPackMarkUrl, dayCentreEmmanuelAvatarUrl };

export type DayCentreEmmanuelStep = {
  id: string;
  slug: string;
  title: string;
};

export type EmmanuelDailyArtSource =
  | { type: "general"; slug: string }
  | { type: "emmanuel-icon"; slug: string }
  | { type: "emmanuel-scene"; slug: string }
  | { type: "shower"; slug: string }
  | { type: "3d"; slug: string }
  | { type: "3d-gym"; slug: string };

export type EmmanuelDailyStep = {
  id: string;
  slug: string;
  title: string;
  items: EmmanuelDailyArtSource;
  avatar: EmmanuelDailyArtSource;
};

export const DAY_CENTRE_EMMANUEL_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_EMMANUEL_PARTICIPANT_LABEL = "Emmanuel" as const;

/** Stock routine · full day with Emmanuel in art where available. */
export const DAY_CENTRE_EMMANUEL_AVATAR_ROUTINE_NAME =
  "Emmanuel · Day centre (avatar)" as const;

/** Stock routine · full day with object / icon art only. */
export const DAY_CENTRE_EMMANUEL_ITEMS_ROUTINE_NAME =
  "Emmanuel · Day centre (items)" as const;

export const DAY_CENTRE_EMMANUEL_GYM_AVATAR_ROUTINE_NAME =
  "Emmanuel · Gym (avatar)" as const;

export const DAY_CENTRE_EMMANUEL_GYM_ITEMS_ROUTINE_NAME =
  "Emmanuel · Gym (items)" as const;

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_GYM_ITEMS_ROUTINE_NAME}. */
export const DAY_CENTRE_EMMANUEL_MACHINERY_ROUTINE_NAME =
  DAY_CENTRE_EMMANUEL_GYM_ITEMS_ROUTINE_NAME;

export const DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_EMMANUEL_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/** Emmanuel's weekday — same flow in avatar and items stock routines. */
export const DAY_CENTRE_EMMANUEL_DAILY_SEQUENCE: readonly EmmanuelDailyStep[] =
  [
    {
      id: "dced-hub-room",
      slug: "hub-room",
      title: "Hub room",
      items: { type: "general", slug: "hub-room" },
      avatar: { type: "general", slug: "hub-room" },
    },
    {
      id: "dced-cruzigramas-am",
      slug: "cruzigramas-am",
      title: "Cruzigramas",
      items: { type: "emmanuel-icon", slug: "cruzigramas" },
      avatar: { type: "emmanuel-scene", slug: "cruzigramas" },
    },
    {
      id: "dced-snack",
      slug: "snack",
      title: "Snack",
      items: { type: "general", slug: "snack" },
      avatar: { type: "emmanuel-scene", slug: "snack" },
    },
    {
      id: "dced-gym",
      slug: "gym",
      title: "Gym",
      items: { type: "emmanuel-scene", slug: "gym-with-michelle" },
      avatar: { type: "emmanuel-scene", slug: "gym-with-michelle" },
    },
    {
      id: "dced-swimming",
      slug: "swimming",
      title: "Swimming",
      items: { type: "general", slug: "swimming-pool" },
      avatar: { type: "general", slug: "swimming-pool" },
    },
    {
      id: "dced-shower",
      slug: "shower",
      title: "Shower",
      items: { type: "shower", slug: "shower" },
      avatar: { type: "shower", slug: "shower" },
    },
    {
      id: "dced-shampoo",
      slug: "shampoo",
      title: "Shampoo",
      items: { type: "shower", slug: "shampoo" },
      avatar: { type: "shower", slug: "shampoo" },
    },
    {
      id: "dced-lunch",
      slug: "lunch",
      title: "Lunch",
      items: { type: "general", slug: "packed-lunch" },
      avatar: { type: "general", slug: "packed-lunch" },
    },
    {
      id: "dced-maths",
      slug: "maths",
      title: "Maths",
      items: { type: "emmanuel-icon", slug: "maths" },
      avatar: { type: "emmanuel-scene", slug: "maths" },
    },
    {
      id: "dced-football",
      slug: "football",
      title: "Football",
      items: { type: "3d", slug: "football" },
      avatar: { type: "emmanuel-scene", slug: "basketball" },
    },
    {
      id: "dced-washing-up",
      slug: "washing-up",
      title: "Washing up",
      items: { type: "emmanuel-icon", slug: "washing-up" },
      avatar: { type: "emmanuel-scene", slug: "washing-up" },
    },
    {
      id: "dced-cruzigramas-pm",
      slug: "cruzigramas-pm",
      title: "Cruzigramas",
      items: { type: "emmanuel-icon", slug: "cruzigramas" },
      avatar: { type: "emmanuel-scene", slug: "cruzigramas" },
    },
    {
      id: "dced-home",
      slug: "home",
      title: "Home",
      items: { type: "general", slug: "home" },
      avatar: { type: "general", slug: "home" },
    },
  ] as const;

/** Library · Items subgroup — activity icons (no avatar). */
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

/** Library · Avatar subgroup — personalised 3D scenes. */
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
    { id: "dce-snack", slug: "snack", title: "Snack" },
    { id: "dce-cruzigramas", slug: "cruzigramas", title: "Cruzigramas" },
    { id: "dce-maths", slug: "maths", title: "Maths" },
    {
      id: "dce-circle-time",
      slug: "circle-time",
      title: "Circle time",
    },
  ] as const;

/** Gym stock routine · Emmanuel in every illustration. */
export const DAY_CENTRE_EMMANUEL_GYM_AVATAR_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  [
    {
      id: "dceg-cross-trainer",
      slug: "cross-trainer",
      title: "Cross trainer",
    },
    {
      id: "dceg-gym-with-michelle",
      slug: "gym-with-michelle",
      title: "Gym with Michelle",
    },
    { id: "dceg-basketball", slug: "basketball", title: "Basketball" },
  ] as const;

/** Gym stock routine · equipment only (no Emmanuel). */
export const DAY_CENTRE_EMMANUEL_GYM_ITEMS_SEQUENCE: readonly TailoredItems3dStep[] =
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

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_GYM_ITEMS_SEQUENCE}. */
export const DAY_CENTRE_EMMANUEL_MACHINERY_3D_SEQUENCE =
  DAY_CENTRE_EMMANUEL_GYM_ITEMS_SEQUENCE;

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_DAILY_SEQUENCE}. */
export const DAY_CENTRE_EMMANUEL_SCHEDULE_SEQUENCE: readonly EmmanuelDailyStep[] =
  DAY_CENTRE_EMMANUEL_DAILY_SEQUENCE;

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE}. */
export const DAY_CENTRE_EMMANUEL_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE;

/** Library avatar picker — personalised scenes only. */
export const DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE: readonly DayCentreEmmanuelStep[] =
  DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE;

const EMMANUEL_AVATAR_SCENE_SLUGS = new Set(
  DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE.map((s) => s.slug),
);

export function emmanuelDailyArtImageUrl(source: EmmanuelDailyArtSource): string {
  switch (source.type) {
    case "general":
      return dayCentreGeneralImageUrl(source.slug);
    case "emmanuel-icon":
      return dayCentreEmmanuelIconUrl(source.slug);
    case "emmanuel-scene":
      return dayCentreEmmanuelSceneUrl(source.slug);
    case "shower":
      return showerImageUrl(source.slug);
    case "3d-gym":
      return physical3dGymImageUrl(source.slug);
    case "3d":
      return physical3dImageUrl(source.slug);
  }
}

export function emmanuelDailyFocusImageUrl(
  source: EmmanuelDailyArtSource,
): string | undefined {
  if (source.type !== "emmanuel-scene") return undefined;
  return dayCentreEmmanuelSceneFocusUrl(source.slug);
}

export function dayCentreEmmanuelDailyItemsImageUrlForStep(
  step: EmmanuelDailyStep,
): string {
  return emmanuelDailyArtImageUrl(step.items);
}

export function dayCentreEmmanuelDailyAvatarImageUrlForStep(
  step: EmmanuelDailyStep,
): string {
  return emmanuelDailyArtImageUrl(step.avatar);
}

export function dayCentreEmmanuelDailyAvatarFocusImageUrlForStep(
  step: EmmanuelDailyStep,
): string | undefined {
  return emmanuelDailyFocusImageUrl(step.avatar);
}

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

/** @deprecated Use daily items helpers. */
export function dayCentreEmmanuelScheduleImageUrlForStep(
  step: EmmanuelDailyStep,
): string {
  return dayCentreEmmanuelDailyItemsImageUrlForStep(step);
}

export function dayCentreEmmanuelScheduleFocusImageUrlForStep(
  _step: EmmanuelDailyStep,
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
