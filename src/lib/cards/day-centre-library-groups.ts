/**
 * Thematic groups for Day centre illustrated library cards.
 * New thematic groups are listed first so cooking/fitness cards are easy to find.
 */

export type DayCentreLibraryGroup =
  | "mini-gym"
  | "fitness-held"
  | "materials-kitchen"
  | "materials-art"
  | "technology"
  | "activities-cognitive"
  | "activities-cooking"
  | "personal-care"
  | "community"
  | "activities-leisure"
  | "shopping"
  | "food-drink"
  | "places-extras";

/** Display order in Library → Home → Day centre accordion. */
export const DAY_CENTRE_LIBRARY_GROUP_ORDER: readonly DayCentreLibraryGroup[] = [
  "mini-gym",
  "materials-kitchen",
  "materials-art",
  "technology",
  "activities-cognitive",
  "activities-cooking",
  "personal-care",
  "community",
  "activities-leisure",
  "shopping",
  "food-drink",
  "places-extras",
] as const;

const SLUG_GROUP: Record<string, DayCentreLibraryGroup> = {
  // Mini gym — agility, balls, mats, sports (machines → Physical Activity)
  "therapy-ball": "mini-gym",
  trampoline: "mini-gym",
  cones: "mini-gym",
  rope: "mini-gym",
  weights: "mini-gym",
  bells: "mini-gym",
  "exercise-mat": "mini-gym",
  "resistance-bands": "mini-gym",
  "foam-roller": "mini-gym",
  football: "mini-gym",
  badminton: "mini-gym",
  basketball: "mini-gym",
  tennis: "mini-gym",
  ladder: "mini-gym",
  hurdles: "mini-gym",
  parachute: "mini-gym",
  "colour-balls": "mini-gym",
  "jump-rope": "mini-gym",
  stilts: "mini-gym",
  "plyo-box": "mini-gym",
  bosu: "mini-gym",
  "balance-board": "mini-gym",
  // Held — more Physical Activity items may join later
  "exercise-machine": "fitness-held",
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
  flour: "materials-kitchen",
  water: "materials-kitchen",
  mix: "activities-cooking",
  knead: "activities-cooking",
  "pizza-dough": "activities-cooking",
  cheese: "food-drink",
  chorizo: "food-drink",
  "tidy-up": "activities-cooking",
  "washing-up": "materials-kitchen",
  // Materials — art
  paintbrush: "materials-art",
  "paint-palette": "materials-art",
  scissors: "materials-art",
  "glue-stick": "materials-art",
  "coloured-paper": "materials-art",
  pencils: "materials-art",
  pen: "materials-art",
  "colouring-pens": "materials-art",
  "felt-tips": "materials-art",
  eraser: "materials-art",
  sharpener: "materials-art",
  paint: "materials-art",
  // Technology
  ipad: "technology",
  tablet: "technology",
  whiteboard: "technology",
  laptop: "technology",
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
  // Transport
  bus: "community",
  tube: "community",
  cab: "community",
  walk: "community",
  "cross-road": "community",
  wait: "community",
  "bus-stop": "community",
  "train-station": "community",
  // Activities & leisure
  "swimming-pool": "activities-leisure",
  "hair-salon": "activities-leisure",
  karaoke: "activities-leisure",
  "circle-time": "activities-leisure",
  park: "activities-leisure",
  "park-and-swing": "activities-leisure",
  swing: "activities-leisure",
  playground: "activities-leisure",
  cafe: "activities-leisure",
  "sams-cafe": "activities-leisure",
  "flip-flops": "activities-leisure",
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
  "coop-shopping-basket": "shopping",
  "sainsbury-shopping-basket": "shopping",
  pay: "shopping",
  queue: "shopping",
  westfield: "shopping",
  // Food & drink
  eat: "food-drink",
  "packed-lunch": "food-drink",
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
  // Held — hidden from library (communication cards kept for routines)
  help: "fitness-held",
  stop: "fitness-held",
  finished: "fitness-held",
  more: "fitness-held",
  yes: "fitness-held",
  no: "fitness-held",
  "not-now": "fitness-held",
  // Places
  home: "places-extras",
  "community-centre": "places-extras",
  "hub-room": "places-extras",
  "sensory-room": "places-extras",
};

export function dayCentreLibraryGroupForSlug(
  slug: string,
): DayCentreLibraryGroup {
  return SLUG_GROUP[slug] ?? "places-extras";
}
