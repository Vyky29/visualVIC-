/**
 * Day Centre — Ikram personalised pack (real photos).
 * Drop PNGs into `public/cards/day centre/ikram/{slug}.png`.
 */

import {
  dayCentreIkramImageUrl,
  dayCentreIkramSceneFocusUrl,
  dayCentreIkramSceneUrl,
  dayCentreIkramPackMarkUrl,
} from "@/lib/cards/day-centre-shared";
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

/** Schedule Player + Home tile — participant-specific Saturday outing. */
export const DAY_CENTRE_IKRAM_ROUTINE_NAME = "Ikram · Saturday outing (avatar)" as const;

export const DAY_CENTRE_IKRAM_ITEMS_ROUTINE_NAME =
  "Ikram · Day centre (items)" as const;

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
 * Ikram's Saturday schedule — morning at centre, get ready, Westfield outing, cab home.
 * All steps use personalised `ikram/scenes/` art in Schedule Player.
 */
export const DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE: readonly DayCentreIkramStep[] = [
  { id: "dci-music", slug: "music", title: "Music at day centre" },
  { id: "dci-cafe", slug: "cafe", title: "Cafe" },
  { id: "dci-socks-on", slug: "socks-on", title: "Put socks on" },
  { id: "dci-shoes-on", slug: "shoes-on", title: "Put shoes on" },
  { id: "dci-bus", slug: "bus", title: "Bus to Westfield" },
  { id: "dci-westfield", slug: "westfield", title: "Westfield" },
  {
    id: "dci-nail-varnish",
    slug: "black-nail-varnish",
    title: "Buy black nail varnish",
  },
  { id: "dci-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  { id: "dci-bus-return", slug: "bus-return", title: "Bus to day centre" },
  { id: "dci-bean-bag", slug: "bean-bag", title: "Relaxation bean bag" },
  { id: "dci-cab", slug: "cab", title: "Cab home" },
  { id: "dci-home", slug: "home", title: "Home" },
] as const;

/** Same Saturday flow — illustrated day centre objects (no Ikram photos). */
export const DAY_CENTRE_IKRAM_ITEMS_SEQUENCE: readonly TailoredItems3dStep[] = [
  { id: "dcii-music", slug: "music", title: "Music at day centre", library: "general" },
  { id: "dcii-cafe", slug: "cafe", title: "Cafe", library: "general" },
  { id: "dcii-socks-on", slug: "socks-on", title: "Put socks on", library: "dress" },
  { id: "dcii-shoes-on", slug: "shoes-on", title: "Put shoes on", library: "dress" },
  { id: "dcii-bus", slug: "bus", title: "Bus to Westfield", library: "general" },
  { id: "dcii-westfield", slug: "westfield", title: "Westfield", library: "general" },
  {
    id: "dcii-nail-varnish",
    slug: "black-nail-varnish",
    title: "Buy black nail varnish",
    library: "general",
  },
  { id: "dcii-mcdonalds", slug: "mcdonalds", title: "McDonald's", library: "general" },
  { id: "dcii-bus-return", slug: "bus", title: "Bus to day centre", library: "general" },
  { id: "dcii-bean-bag", slug: "bean-bag", title: "Relaxation bean bag", library: "general" },
  { id: "dcii-cab", slug: "cab", title: "Cab home", library: "general" },
  { id: "dcii-home", slug: "home", title: "Home", library: "general" },
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
  { id: "dci-swimming", slug: "swimming", title: "Swimming" },
  { id: "dci-playground", slug: "playground", title: "Playground" },
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

const IKRAM_SCHEDULE_SCENE_SLUGS = new Set(
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE.map((s) => s.slug),
);

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

/** Ikram · Saturday routine — schedule steps use personalised `ikram/scenes/` art. */
export function dayCentreIkramScheduleImageUrlForStep(step: DayCentreIkramStep): string {
  if (IKRAM_SCHEDULE_SCENE_SLUGS.has(step.slug)) {
    return dayCentreIkramSceneUrl(step.slug);
  }
  return dayCentreIkramImageUrl(step.slug);
}

export function dayCentreIkramScheduleFocusImageUrlForStep(
  step: DayCentreIkramStep,
): string | undefined {
  if (!IKRAM_SCHEDULE_SCENE_SLUGS.has(step.slug)) return undefined;
  return dayCentreIkramSceneFocusUrl(step.slug);
}
