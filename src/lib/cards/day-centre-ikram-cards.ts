/**
 * Day Centre — Ikram personalised pack (real photos).
 * Drop PNGs into `public/cards/day centre/ikram/{slug}.png`.
 */

import {
  dayCentreIkramImageUrl,
  dayCentreIkramSceneFocusUrl,
  dayCentreIkramSceneUrl,
  dayCentreIkramPackMarkUrl,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { gettingDressUndressImageUrl } from "@/lib/cards/getting-dress-undress-cards";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import { swimmingImageUrl } from "@/lib/cards/swimming-cards";
import {
  TAILORED_SCHEDULES_CATEGORY_COLOUR,
  TAILORED_SCHEDULES_CATEGORY_LABEL,
} from "@/lib/cards/tailored-schedules-shared";
import type { TailoredItems3dStep } from "@/lib/cards/tailored-items-3d-shared";

export {
  TAILORED_SCHEDULES_CATEGORY_COLOUR as DAY_CENTRE_IKRAM_CATEGORY_COLOUR,
  dayCentreIkramPackMarkUrl,
};

export type DayCentreIkramStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_IKRAM_CATEGORY_LABEL =
  TAILORED_SCHEDULES_CATEGORY_LABEL;

export const DAY_CENTRE_IKRAM_PARTICIPANT_LABEL = "Ikram" as const;

/** Schedule Player + Home tile — personalised day centre (avatar art). */
export const DAY_CENTRE_IKRAM_ROUTINE_NAME =
  "Ikram · Day centre (avatar)" as const;

export const DAY_CENTRE_IKRAM_ITEMS_ROUTINE_NAME =
  "Ikram · Day centre (items)" as const;

/** @deprecated Legacy Saturday avatar name. */
export const DAY_CENTRE_IKRAM_SATURDAY_ROUTINE_NAME =
  "Ikram · Saturday outing (avatar)" as const;

/** @deprecated Removed from stock registry. */
export const DAY_CENTRE_IKRAM_MON_WED_FRI_ITEMS_ROUTINE_NAME =
  "Ikram · Mon / Wed / Fri (items)" as const;

/** @deprecated Removed from stock registry. */
export const DAY_CENTRE_IKRAM_MON_WED_FRI_ROUTINE_NAME =
  "Ikram · Mon / Wed / Fri (avatar)" as const;

/** @deprecated Removed from stock registry. */
export const DAY_CENTRE_IKRAM_TUESDAY_ITEMS_ROUTINE_NAME =
  "Ikram · Tuesday (items)" as const;

export type IkramDailyArtSource =
  | { type: "general"; slug: string }
  | { type: "ikram-scene"; slug: string }
  | { type: "dress"; slug: string }
  | { type: "shower"; slug: string }
  | { type: "swimming"; slug: string };

export type IkramDailyStep = {
  id: string;
  slug: string;
  title: string;
  items: IkramDailyArtSource;
  avatar: IkramDailyArtSource;
};

function ikramDailyArtLibrary(
  source: IkramDailyArtSource,
): TailoredItems3dStep["library"] {
  switch (source.type) {
    case "general":
      return "general";
    case "ikram-scene":
      return "ikram-scene";
    case "dress":
      return "dress";
    case "shower":
      return "shower";
    case "swimming":
      return "swimming";
  }
}

export function ikramDailyArtImageUrl(source: IkramDailyArtSource): string {
  switch (source.type) {
    case "general":
      return dayCentreGeneralImageUrl(source.slug);
    case "ikram-scene":
      return dayCentreIkramSceneUrl(source.slug);
    case "dress":
      return gettingDressUndressImageUrl(source.slug);
    case "shower":
      return showerImageUrl(source.slug);
    case "swimming":
      return swimmingImageUrl(source.slug);
  }
}

export function ikramDailyFocusImageUrl(
  source: IkramDailyArtSource,
): string | undefined {
  if (source.type !== "ikram-scene") return undefined;
  return dayCentreIkramSceneFocusUrl(source.slug);
}

export function dayCentreIkramDailyItemsImageUrlForStep(
  step: IkramDailyStep,
): string {
  return ikramDailyArtImageUrl(step.items);
}

export function dayCentreIkramDailyAvatarImageUrlForStep(
  step: IkramDailyStep,
): string {
  return ikramDailyArtImageUrl(step.avatar);
}

export function dayCentreIkramDailyAvatarFocusImageUrlForStep(
  step: IkramDailyStep,
): string | undefined {
  return ikramDailyFocusImageUrl(step.avatar);
}

/** Pink ribbon on Ikram cards — participant name + tailored schedules. */
export const DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL =
  `${DAY_CENTRE_IKRAM_PARTICIPANT_LABEL} · ${TAILORED_SCHEDULES_CATEGORY_LABEL}` as const;

/**
 * 4×6 PECS grid — Ikram in pink sweatshirt, one activity per card (reference board).
 * Order matches the shipped photo grid row by row.
 */
export const DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE: readonly DayCentreIkramStep[] = [
  { id: "dci-toilet", slug: "toilet", title: "Toilet" },
  { id: "dci-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "dci-brush-teeth", slug: "brush-teeth", title: "Brush teeth" },
  { id: "dci-socks-on", slug: "socks-on", title: "Put socks on" },
  { id: "dci-shoes-on", slug: "shoes-on", title: "Put shoes on" },
  { id: "dci-hairdresser", slug: "hairdresser", title: "Hairdresser" },
  { id: "dci-bus", slug: "bus", title: "Bus" },
  { id: "dci-taxi", slug: "taxi", title: "Taxi" },
  { id: "dci-walking", slug: "walking", title: "Walking" },
  { id: "dci-cross-road", slug: "cross-road", title: "Cross road" },
  { id: "dci-wait", slug: "wait", title: "Wait" },
  { id: "dci-home", slug: "home", title: "Home" },
  { id: "dci-park", slug: "park", title: "Park" },
  { id: "dci-karaoke", slug: "karaoke", title: "Karaoke" },
  { id: "dci-cafe", slug: "cafe", title: "Cafe" },
  { id: "dci-market", slug: "market", title: "Market" },
  { id: "dci-shopping", slug: "shopping", title: "Shopping" },
  { id: "dci-basket", slug: "basket", title: "Basket" },
  { id: "dci-pay", slug: "pay", title: "Pay" },
  { id: "dci-queue", slug: "queue", title: "Queue" },
  { id: "dci-eat", slug: "eat", title: "Eat" },
  { id: "dci-drink", slug: "drink", title: "Drink" },
  { id: "dci-snack", slug: "snack", title: "Snack" },
  { id: "dci-help", slug: "help", title: "Help" },
  { id: "dci-stop", slug: "stop", title: "Stop" },
] as const;

/**
 * Ikram · Day centre — Mon–Wed stock routine (items + avatar share step order).
 * Home ends with Ikram + Munchie (cat), not the generic house card.
 */
export const DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE: readonly IkramDailyStep[] = [
  {
    id: "dci-dc-music",
    slug: "music",
    title: "Music",
    items: { type: "general", slug: "music" },
    avatar: { type: "ikram-scene", slug: "music" },
  },
  {
    id: "dci-dc-circle-time",
    slug: "circle-time",
    title: "Circle time",
    items: { type: "general", slug: "circle-time" },
    avatar: { type: "general", slug: "circle-time" },
  },
  {
    id: "dci-dc-cafe",
    slug: "cafe",
    title: "Cafe",
    items: { type: "general", slug: "cafe" },
    avatar: { type: "ikram-scene", slug: "cafe" },
  },
  {
    id: "dci-dc-changing-room",
    slug: "changing-room",
    title: "Changing room",
    items: { type: "swimming", slug: "changing-room" },
    avatar: { type: "swimming", slug: "changing-room" },
  },
  {
    id: "dci-dc-swimsuit-on",
    slug: "swimsuit-on",
    title: "Swimming costume on",
    items: { type: "dress", slug: "swimsuit-on" },
    avatar: { type: "dress", slug: "swimsuit-on" },
  },
  {
    id: "dci-dc-swimming",
    slug: "swimming",
    title: "Swimming",
    items: { type: "general", slug: "swimming-pool" },
    avatar: { type: "ikram-scene", slug: "swimming" },
  },
  {
    id: "dci-dc-shower",
    slug: "shower",
    title: "Shower",
    items: { type: "shower", slug: "shower" },
    avatar: { type: "shower", slug: "shower" },
  },
  {
    id: "dci-dc-dry-body",
    slug: "dry-body",
    title: "Dry body",
    items: { type: "shower", slug: "dry-body" },
    avatar: { type: "shower", slug: "dry-body" },
  },
  {
    id: "dci-dc-vest-on",
    slug: "vest-on",
    title: "Vest on",
    items: { type: "dress", slug: "vest-on" },
    avatar: { type: "dress", slug: "vest-on" },
  },
  {
    id: "dci-dc-bean-bag",
    slug: "bean-bag",
    title: "Relaxation bean bag",
    items: { type: "general", slug: "bean-bag" },
    avatar: { type: "ikram-scene", slug: "bean-bag" },
  },
  {
    id: "dci-dc-bus",
    slug: "bus",
    title: "Bus",
    items: { type: "general", slug: "bus" },
    avatar: { type: "ikram-scene", slug: "bus" },
  },
  {
    id: "dci-dc-park",
    slug: "park",
    title: "Park",
    items: { type: "general", slug: "park" },
    avatar: { type: "ikram-scene", slug: "park" },
  },
  {
    id: "dci-dc-swing",
    slug: "swing",
    title: "Swing",
    items: { type: "general", slug: "swing" },
    avatar: { type: "ikram-scene", slug: "swing-with-luliya" },
  },
  {
    id: "dci-dc-walk",
    slug: "walk",
    title: "Walk",
    items: { type: "general", slug: "walk" },
    avatar: { type: "ikram-scene", slug: "walk" },
  },
  {
    id: "dci-dc-restaurant",
    slug: "restaurant",
    title: "Restaurant",
    items: { type: "general", slug: "restaurant" },
    avatar: { type: "general", slug: "restaurant" },
  },
  {
    id: "dci-dc-birthday-party",
    slug: "birthday-party",
    title: "Birthday party",
    items: { type: "general", slug: "birthday-party" },
    avatar: { type: "ikram-scene", slug: "birthday-party" },
  },
  {
    id: "dci-dc-birthday-cake",
    slug: "birthday-cake",
    title: "Birthday cake",
    items: { type: "general", slug: "birthday-cake" },
    avatar: { type: "general", slug: "birthday-cake" },
  },
  {
    id: "dci-dc-cab",
    slug: "cab",
    title: "Cab",
    items: { type: "general", slug: "cab" },
    avatar: { type: "ikram-scene", slug: "cab" },
  },
  {
    id: "dci-dc-home",
    slug: "home",
    title: "Home with munchie",
    items: { type: "ikram-scene", slug: "home" },
    avatar: { type: "ikram-scene", slug: "home" },
  },
] as const;

/** @deprecated Use {@link DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE}. */
export const DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE: readonly DayCentreIkramStep[] =
  DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE.map(({ id, slug, title }) => ({
    id,
    slug,
    title,
  }));

/** @deprecated Use {@link DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE} items art. */
export const DAY_CENTRE_IKRAM_ITEMS_SEQUENCE: readonly TailoredItems3dStep[] =
  DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE.map(({ id, slug, title, items }) => ({
    id: id.replace(/^dci-dc-/, "dcii-"),
    slug,
    title,
    library: ikramDailyArtLibrary(items),
  }));

/** Mon / Wed / Fri — swimming day (illustrated objects). */
export const DAY_CENTRE_IKRAM_MON_WED_FRI_ITEMS_SEQUENCE: readonly TailoredItems3dStep[] =
  [
    { id: "dcimwf-karaoke", slug: "karaoke", title: "Karaoke", library: "general" },
    {
      id: "dcimwf-circle-time",
      slug: "circle-time",
      title: "Circle time",
      library: "general",
    },
    { id: "dcimwf-toilet", slug: "toilet", title: "Toilet", library: "general" },
    {
      id: "dcimwf-swimsuit-on",
      slug: "swimsuit-on",
      title: "Swimming costume on",
      library: "dress",
    },
    {
      id: "dcimwf-swimming",
      slug: "swimming-pool",
      title: "Swimming",
      library: "general",
    },
    { id: "dcimwf-shower", slug: "shower", title: "Shower", library: "shower" },
    {
      id: "dcimwf-dress-on",
      slug: "tshirt-on",
      title: "Dress on",
      library: "dress",
    },
    {
      id: "dcimwf-bean-bag",
      slug: "bean-bag",
      title: "Relaxation bean bag",
      library: "general",
    },
    { id: "dcimwf-cafe", slug: "cafe", title: "Cafe", library: "general" },
    { id: "dcimwf-park", slug: "park", title: "Park", library: "general" },
    {
      id: "dcimwf-birthday-party",
      slug: "birthday-party",
      title: "Birthday party",
      library: "general",
    },
    { id: "dcimwf-cab", slug: "cab", title: "Cab", library: "general" },
    {
      id: "dcimwf-home",
      slug: "home",
      title: "Home with munchie",
      library: "general",
    },
  ] as const;

/** Mon / Wed / Fri — swimming day (personalised Ikram scenes). */
export const DAY_CENTRE_IKRAM_MON_WED_FRI_SCHEDULE_SEQUENCE: readonly DayCentreIkramStep[] =
  [
    { id: "dciwf-karaoke", slug: "karaoke", title: "Karaoke" },
    {
      id: "dciwf-circle-time",
      slug: "circle-time",
      title: "Circle time",
    },
    { id: "dciwf-toilet", slug: "toilet", title: "Toilet" },
    {
      id: "dciwf-swimsuit-on",
      slug: "swimsuit-on",
      title: "Swimming costume on",
    },
    {
      id: "dciwf-sitting-in-pool",
      slug: "sitting-in-the-pool",
      title: "Sitting in the pool",
    },
    { id: "dciwf-swimming", slug: "swimming", title: "Swimming" },
    { id: "dciwf-shower", slug: "shower", title: "Shower" },
    { id: "dciwf-dress-on", slug: "dress-on", title: "Dress on" },
    {
      id: "dciwf-bean-bag",
      slug: "bean-bag",
      title: "Relaxation bean bag",
    },
    { id: "dciwf-cafe", slug: "cafe", title: "Cafe" },
    { id: "dciwf-park", slug: "park", title: "Park" },
    {
      id: "dciwf-birthday-party",
      slug: "birthday-party",
      title: "Birthday party",
    },
    { id: "dciwf-cab", slug: "cab", title: "Cab" },
    {
      id: "dciwf-home",
      slug: "home",
      title: "Home with munchie",
    },
  ] as const;

/** Tuesday — outing (illustrated objects). */
export const DAY_CENTRE_IKRAM_TUESDAY_ITEMS_SEQUENCE: readonly TailoredItems3dStep[] =
  [
    { id: "dcitu-karaoke", slug: "karaoke", title: "Karaoke", library: "general" },
    {
      id: "dcitu-circle-time",
      slug: "circle-time",
      title: "Circle time",
      library: "general",
    },
    { id: "dcitu-toilet", slug: "toilet", title: "Toilet", library: "general" },
    {
      id: "dcitu-sams-cafe",
      slug: "sams-cafe",
      title: "Sam's Cafe",
      library: "general",
    },
    { id: "dcitu-bus", slug: "bus", title: "Bus", library: "general" },
    { id: "dcitu-park", slug: "park", title: "Park", library: "general" },
    { id: "dcitu-swing", slug: "swing", title: "Swing", library: "general" },
    { id: "dcitu-cafe", slug: "cafe", title: "Cafe", library: "general" },
    {
      id: "dcitu-birthday-party",
      slug: "birthday-party",
      title: "Birthday party",
      library: "general",
    },
    {
      id: "dcitu-cake",
      slug: "birthday-cake",
      title: "Birthday cake",
      library: "general",
    },
    { id: "dcitu-ball", slug: "football", title: "Ball", library: "3d" },
    { id: "dcitu-cab", slug: "cab", title: "Cab", library: "general" },
    {
      id: "dcitu-home",
      slug: "home",
      title: "Home with munchi",
      library: "general",
    },
  ] as const;

/** Full Ikram library — PECS grid first, then schedule extras + communication. */
export const DAY_CENTRE_IKRAM_SEQUENCE: readonly DayCentreIkramStep[] = [
  ...DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE,
  /** 2D cartoon poses (same style as standing/walk batch — separate from 3D `walking`). */
  { id: "dci-walk", slug: "walk", title: "Walk" },
  { id: "dci-sit-down", slug: "sit-down", title: "Sit down" },
  { id: "dci-music", slug: "music", title: "Music" },
  { id: "dci-westfield", slug: "westfield", title: "Westfield" },
  {
    id: "dci-nail-varnish",
    slug: "black-nail-varnish",
    title: "Buy black nail varnish",
  },
  { id: "dci-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  { id: "dci-bus-return", slug: "bus-return", title: "Bus to day centre" },
  { id: "dci-bean-bag", slug: "bean-bag", title: "Relaxation bean bag" },
  { id: "dci-cab", slug: "cab", title: "Cab" },
  { id: "dci-get-dressed", slug: "get-dressed", title: "Get dressed" },
  { id: "dci-hair-care", slug: "hair-care", title: "Hair care" },
  { id: "dci-bus-stop", slug: "bus-stop", title: "Bus stop" },
  {
    id: "dci-sitting-in-pool",
    slug: "sitting-in-the-pool",
    title: "Sitting in the pool",
  },
  { id: "dci-swimming", slug: "swimming", title: "Swimming" },
  { id: "dci-playground", slug: "playground", title: "Playground" },
  {
    id: "dci-swing-with-luliya",
    slug: "swing-with-luliya",
    title: "Swing with Luliya",
  },
  { id: "dci-library", slug: "library", title: "Library" },
  { id: "dci-supermarket", slug: "supermarket", title: "Supermarket" },
  { id: "dci-shops", slug: "shops", title: "Shops" },
  { id: "dci-restaurant", slug: "restaurant", title: "Restaurant" },
  { id: "dci-breakfast", slug: "breakfast", title: "Breakfast" },
  { id: "dci-dinner", slug: "dinner", title: "Dinner" },
  { id: "dci-wait-one", slug: "wait-one", title: "Wait" },
  { id: "dci-finished", slug: "finished", title: "Finished" },
  { id: "dci-more", slug: "more", title: "More" },
  { id: "dci-yes", slug: "yes", title: "Yes" },
  { id: "dci-no", slug: "no", title: "No" },
  { id: "dci-not-now", slug: "not-now", title: "Not now" },
  { id: "dci-swimming-pool", slug: "swimming-pool", title: "Swimming pool" },
  { id: "dci-hair-salon", slug: "hair-salon", title: "Hair salon" },
  { id: "dci-community-centre", slug: "community-centre", title: "Community centre" },
  { id: "dci-birthday-party", slug: "birthday-party", title: "Birthday party" },
] as const;

/**
 * Object/place/transport slugs — listed in Generic Library only (not Ikram library picker).
 * Does not affect routine illustration routing.
 */
/** Face-only / generic placeholders — not full-scene personalised art. */
export const DAY_CENTRE_IKRAM_GENERIC_ASSET_SLUGS = new Set([
  "finished",
  "supermarket",
  "community-centre",
]);

/** Library picker — only cards where Ikram appears in the illustration. */
export const DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE: readonly DayCentreIkramStep[] =
  DAY_CENTRE_IKRAM_SEQUENCE.filter(
    (s) => !DAY_CENTRE_IKRAM_GENERIC_ASSET_SLUGS.has(s.slug),
  );

/** PECS + home scene cards in the Ikram library picker (`ikram/scenes/`). */
const IKRAM_LIBRARY_SCENE_SLUGS = new Set(
  DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE.map((s) => s.slug).filter(
    (slug) => !DAY_CENTRE_IKRAM_GENERIC_ASSET_SLUGS.has(slug),
  ),
);

const IKRAM_DAY_CENTRE_STEP_BY_SLUG = new Map(
  DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE.map((s) => [s.slug, s]),
);

const IKRAM_SCHEDULE_SCENE_SLUGS = new Set(
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

const IKRAM_MON_WED_FRI_SCHEDULE_SCENE_SLUGS = new Set(
  DAY_CENTRE_IKRAM_MON_WED_FRI_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

function ikramScheduleImageUrlForStep(
  step: DayCentreIkramStep,
  sceneSlugs: Set<string>,
): string {
  if (sceneSlugs.has(step.slug)) {
    return dayCentreIkramSceneUrl(step.slug);
  }
  return dayCentreIkramImageUrl(step.slug);
}

function ikramScheduleFocusImageUrlForStep(
  step: DayCentreIkramStep,
  sceneSlugs: Set<string>,
): string | undefined {
  if (!sceneSlugs.has(step.slug)) return undefined;
  return dayCentreIkramSceneFocusUrl(step.slug);
}

/** Ikram library picker — personalised cards only. */
export function dayCentreIkramImageUrlForStep(step: DayCentreIkramStep): string {
  if (IKRAM_LIBRARY_SCENE_SLUGS.has(step.slug)) {
    return dayCentreIkramSceneUrl(step.slug);
  }
  return dayCentreIkramImageUrl(step.slug);
}

export function dayCentreIkramFocusImageUrlForStep(step: DayCentreIkramStep): string | undefined {
  if (!IKRAM_LIBRARY_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreIkramSceneFocusUrl(step.slug);
}

/** Ikram · Day centre routine — avatar art per step. */
export function dayCentreIkramScheduleImageUrlForStep(step: DayCentreIkramStep): string {
  const daily = IKRAM_DAY_CENTRE_STEP_BY_SLUG.get(step.slug);
  if (daily) return ikramDailyArtImageUrl(daily.avatar);
  return ikramScheduleImageUrlForStep(step, IKRAM_SCHEDULE_SCENE_SLUGS);
}

export function dayCentreIkramScheduleFocusImageUrlForStep(
  step: DayCentreIkramStep,
): string | undefined {
  const daily = IKRAM_DAY_CENTRE_STEP_BY_SLUG.get(step.slug);
  if (daily) return ikramDailyFocusImageUrl(daily.avatar);
  return ikramScheduleFocusImageUrlForStep(step, IKRAM_SCHEDULE_SCENE_SLUGS);
}

/** Ikram · Mon / Wed / Fri — personalised scenes where available. */
export function dayCentreIkramMonWedFriScheduleImageUrlForStep(
  step: DayCentreIkramStep,
): string {
  return ikramScheduleImageUrlForStep(step, IKRAM_MON_WED_FRI_SCHEDULE_SCENE_SLUGS);
}

export function dayCentreIkramMonWedFriScheduleFocusImageUrlForStep(
  step: DayCentreIkramStep,
): string | undefined {
  return ikramScheduleFocusImageUrlForStep(
    step,
    IKRAM_MON_WED_FRI_SCHEDULE_SCENE_SLUGS,
  );
}
