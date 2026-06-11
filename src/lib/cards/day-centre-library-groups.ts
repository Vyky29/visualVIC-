/**
 * Library sub-sections for Day centre (general pack).
 * New thematic groups are listed first so cooking/fitness cards are easy to find.
 */

export type DayCentreLibraryGroup =
  | "fitness-equipment"
  | "fitness-stretching"
  | "materials-kitchen"
  | "materials-art"
  | "activities-cognitive"
  | "activities-cooking"
  | "personal-care"
  | "community"
  | "activities-leisure"
  | "shopping"
  | "food-drink"
  | "communication"
  | "places-extras";

/** Display order in Library → Home → Day centre accordion. */
export const DAY_CENTRE_LIBRARY_GROUP_ORDER: readonly DayCentreLibraryGroup[] = [
  "fitness-equipment",
  "fitness-stretching",
  "materials-kitchen",
  "materials-art",
  "activities-cognitive",
  "activities-cooking",
  "personal-care",
  "community",
  "activities-leisure",
  "shopping",
  "food-drink",
  "communication",
  "places-extras",
] as const;

const SLUG_GROUP: Record<string, DayCentreLibraryGroup> = {
  // Fitness — equipment
  "therapy-ball": "fitness-equipment",
  trampoline: "fitness-equipment",
  "step-platform": "fitness-equipment",
  treadmill: "fitness-equipment",
  "exercise-machine": "fitness-equipment",
  skis: "fitness-equipment",
  "exercise-bike": "fitness-equipment",
  // Fitness — stretching
  "exercise-mat": "fitness-stretching",
  "resistance-bands": "fitness-stretching",
  "foam-roller": "fitness-stretching",
  stretching: "fitness-stretching",
  // Materials — kitchen
  apron: "materials-kitchen",
  "mixing-bowl": "materials-kitchen",
  "wooden-spoon": "materials-kitchen",
  "rolling-pin": "materials-kitchen",
  "cheese-grater": "materials-kitchen",
  "vegetable-peeler": "materials-kitchen",
  "chopping-board": "materials-kitchen",
  "tomato-sauce": "materials-kitchen",
  // Materials — art
  paintbrush: "materials-art",
  "paint-palette": "materials-art",
  scissors: "materials-art",
  "glue-stick": "materials-art",
  "coloured-paper": "materials-art",
  // Activities — cognitive
  "jigsaw-puzzle": "activities-cognitive",
  "sorting-trays": "activities-cognitive",
  "matching-cards": "activities-cognitive",
  "play-dough": "activities-cognitive",
  // Activities — cooking & art
  pizza: "activities-cooking",
  cooking: "activities-cooking",
  painting: "activities-cooking",
  peeling: "activities-cooking",
  // Personal care
  toilet: "personal-care",
  shower: "personal-care",
  "wash-hands": "personal-care",
  "brush-teeth": "personal-care",
  "get-dressed": "personal-care",
  "hair-care": "personal-care",
  // Community
  bus: "community",
  taxi: "community",
  cab: "community",
  walk: "community",
  "cross-road": "community",
  wait: "community",
  home: "community",
  "bus-stop": "community",
  // Activities & leisure
  "swimming-pool": "activities-leisure",
  "hair-salon": "activities-leisure",
  karaoke: "activities-leisure",
  park: "activities-leisure",
  "park-and-swing": "activities-leisure",
  playground: "activities-leisure",
  cafe: "activities-leisure",
  library: "activities-leisure",
  music: "activities-leisure",
  "bean-bag": "activities-leisure",
  // Shopping
  supermarket: "shopping",
  market: "shopping",
  shops: "shopping",
  shopping: "shopping",
  "shopping-basket": "shopping",
  pay: "shopping",
  queue: "shopping",
  westfield: "shopping",
  "black-nail-varnish": "shopping",
  // Food & drink
  eat: "food-drink",
  drink: "food-drink",
  snack: "food-drink",
  restaurant: "food-drink",
  breakfast: "food-drink",
  dinner: "food-drink",
  mcdonalds: "food-drink",
  // Communication
  help: "communication",
  stop: "communication",
  finished: "communication",
  more: "communication",
  yes: "communication",
  no: "communication",
  "not-now": "communication",
  // Places & extras
  "community-centre": "places-extras",
  "make-up": "places-extras",
  "birthday-cake": "places-extras",
  "birthday-party": "places-extras",
};

export function dayCentreLibraryGroupForSlug(
  slug: string,
): DayCentreLibraryGroup {
  return SLUG_GROUP[slug] ?? "places-extras";
}
