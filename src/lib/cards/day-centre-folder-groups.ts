/**
 * Day Centre folder taxonomy — groups library cards and schedules by theme.
 * Folders mirror participant folders (Ikram, Serine, …) inside Day centre.
 */

import type { DayCentreFolderId } from "@/lib/routines/day-centre-folders";
import { MINI_GYM_LIBRARY_SLUGS } from "@/lib/cards/mini-gym-library-groups";

const COOKING_SLUGS = new Set([
  "apron",
  "mixing-bowl",
  "wooden-spoon",
  "rolling-pin",
  "cheese-grater",
  "vegetable-peeler",
  "chopping-board",
  "tomato-sauce",
  "tuna",
  "sweetcorn",
  "mayonnaise",
  "ketchup",
  "milk",
  "strawberries",
  "paintbrush",
  "paint-palette",
  "scissors",
  "glue-stick",
  "coloured-paper",
  "jigsaw-puzzle",
  "sorting-trays",
  "matching-cards",
  "play-dough",
  "pizza",
  "cooking",
  "painting",
  "peeling",
]);

const COMMUNITY_SLUGS = new Set([
  "westfield",
  "mcdonalds",
  "supermarket",
  "market",
  "bakery",
  "shops",
  "shopping",
  "shopping-basket",
  "pay",
  "queue",
  "restaurant",
  "bus",
  "tube",
  "bus-stop",
  "cross-road",
  "wait",
]);

/** Climbing cards surfaced in Day centre → Bouldering folder. */
export const DAY_CENTRE_BOULDERING_CLIMB_SLUGS = new Set([
  "boulder-wall",
  "holds",
  "grab-hold",
  "step-on-hold",
  "put-climbing-shoes-on",
  "climbing-shoes",
  "magnesium-bag",
  "rub-your-palms",
]);

export function dayCentreFolderForSlug(slug: string): DayCentreFolderId {
  if (MINI_GYM_LIBRARY_SLUGS.has(slug)) return "mini-gym";
  if (COOKING_SLUGS.has(slug)) return "cooking";
  if (COMMUNITY_SLUGS.has(slug)) return "community";
  return "mixed";
}

export function isDayCentreBoulderingClimbSlug(slug: string): boolean {
  return DAY_CENTRE_BOULDERING_CLIMB_SLUGS.has(slug);
}
