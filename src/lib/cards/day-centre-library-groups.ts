/**
 * Thematic groups for Day centre illustrated library cards.
 * New thematic groups are listed first so cooking/fitness cards are easy to find.
 */

export type DayCentreLibraryGroup =
  | "mini-gym"
  | "fitness-held"
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
  "mini-gym",
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
  // Mini gym
  "therapy-ball": "mini-gym",
  trampoline: "mini-gym",
  treadmill: "mini-gym",
  cones: "mini-gym",
  "step-platform": "mini-gym",
  rope: "mini-gym",
  weights: "mini-gym",
  "exercise-bike": "mini-gym",
  bells: "mini-gym",
  "exercise-mat": "mini-gym",
  "resistance-bands": "mini-gym",
  "foam-roller": "mini-gym",
  stretching: "mini-gym",
  football: "mini-gym",
  badminton: "mini-gym",
  basketball: "mini-gym",
  // Held — more Physical Activity items may join later
  "exercise-machine": "fitness-held",
  "row-machine": "fitness-held",
  skis: "fitness-held",
  // Materials — kitchen
  apron: "materials-kitchen",
  "mixing-bowl": "materials-kitchen",
  "wooden-spoon": "materials-kitchen",
  "rolling-pin": "materials-kitchen",
  saucepan: "materials-kitchen",
  hob: "materials-kitchen",
  microwave: "materials-kitchen",
  oven: "materials-kitchen",
  "cheese-grater": "materials-kitchen",
  "vegetable-peeler": "materials-kitchen",
  "chopping-board": "materials-kitchen",
  knife: "materials-kitchen",
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
  tube: "community",
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
  bakery: "shopping",
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
  tuna: "food-drink",
  sweetcorn: "food-drink",
  mayonnaise: "food-drink",
  ketchup: "food-drink",
  milk: "food-drink",
  strawberries: "food-drink",
  ice: "food-drink",
  bananas: "food-drink",
  tomato: "food-drink",
  onion: "food-drink",
  butter: "food-drink",
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
  "hub-room": "places-extras",
  "make-up": "places-extras",
  "birthday-cake": "places-extras",
  "birthday-party": "places-extras",
};

export function dayCentreLibraryGroupForSlug(
  slug: string,
): DayCentreLibraryGroup {
  return SLUG_GROUP[slug] ?? "places-extras";
}
