/**
 * Day Centre — Ikram personalised pack (real photos).
 * Drop PNGs into `public/cards/day centre/ikram/{slug}.png`.
 */

import {
  DAY_CENTRE_CATEGORY_COLOUR,
  dayCentreIkramImageUrl,
  dayCentreIkramSceneFocusUrl,
  dayCentreIkramSceneUrl,
} from "@/lib/cards/day-centre-shared";

export { DAY_CENTRE_CATEGORY_COLOUR };

export type DayCentreIkramStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_IKRAM_CATEGORY_LABEL = "Ikram · day centre" as const;

/**
 * 4×6 PECS grid — Ikram in pink sweatshirt, one activity per card (reference board).
 * Order matches the shipped photo grid row by row.
 */
export const DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE: readonly DayCentreIkramStep[] = [
  { id: "dci-toilet", slug: "toilet", title: "Toilet" },
  { id: "dci-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "dci-brush-teeth", slug: "brush-teeth", title: "Brush teeth" },
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

/** Ikram's Saturday schedule (photo 1) — stock routine order. */
export const DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE: readonly DayCentreIkramStep[] = [
  { id: "dci-music", slug: "music", title: "Music" },
  { id: "dci-cafe", slug: "cafe", title: "Cafe" },
  { id: "dci-bus", slug: "bus", title: "Bus" },
  { id: "dci-westfield", slug: "westfield", title: "Westfield" },
  {
    id: "dci-nail-varnish",
    slug: "black-nail-varnish",
    title: "Buy black nail varnish",
  },
  { id: "dci-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  { id: "dci-bus-return", slug: "bus-return", title: "Bus" },
  { id: "dci-bean-bag", slug: "bean-bag", title: "Relaxation bean bag" },
  { id: "dci-cab", slug: "cab", title: "Cab" },
  { id: "dci-home", slug: "home", title: "Home" },
] as const;

/** Full Ikram library — PECS grid first, then schedule extras + communication. */
export const DAY_CENTRE_IKRAM_SEQUENCE: readonly DayCentreIkramStep[] = [
  ...DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE,
  { id: "dci-music", slug: "music", title: "Music" },
  { id: "dci-westfield", slug: "westfield", title: "Westfield" },
  {
    id: "dci-nail-varnish",
    slug: "black-nail-varnish",
    title: "Buy black nail varnish",
  },
  { id: "dci-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  { id: "dci-bus-return", slug: "bus-return", title: "Bus" },
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

/** Ikram · day centre routine — all 10 steps use personalised `ikram/scenes/` art. */
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
