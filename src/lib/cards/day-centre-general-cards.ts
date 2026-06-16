/**
 * Day Centre — General pack (illustrated placeholders only).
 * Grouped from Ikram schedule + IKRAM Visual Cards sheet — all drawings.
 */

import {
  DAY_CENTRE_CATEGORY_COLOUR,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";

export { DAY_CENTRE_CATEGORY_COLOUR };

export type DayCentreGeneralStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_GENERAL_CATEGORY_LABEL = "At the day centre" as const;

/** Illustrated PNGs under `public/cards/day centre/general/`. */
export const DAY_CENTRE_GENERAL_CARD_FILES = [
  "bean-bag.png",
  "birthday-cake.png",
  "birthday-party.png",
  "black-nail-varnish.png",
  "breakfast.png",
  "brush-teeth.png",
  "bus-stop.png",
  "bus.png",
  "cab.png",
  "cafe.png",
  "community-centre.png",
  "cross-road.png",
  "dinner.png",
  "drink.png",
  "eat.png",
  "finished.png",
  "get-dressed.png",
  "hair-care.png",
  "hair-salon.png",
  "help.png",
  "home.png",
  "karaoke.png",
  "library.png",
  "make-up.png",
  "market.png",
  "mcdonalds.png",
  "more.png",
  "music.png",
  "no.png",
  "not-now.png",
  "park-and-swing.png",
  "park.png",
  "pay.png",
  "playground.png",
  "queue.png",
  "restaurant.png",
  "shopping-basket.png",
  "shopping.png",
  "shops.png",
  "shower.png",
  "snack.png",
  "stop.png",
  "supermarket.png",
  "swimming-pool.png",
  "taxi.png",
  "toilet.png",
  "wait.png",
  "walk.png",
  "wash-hands.png",
  "westfield.png",
  "yes.png",
  // Materials — kitchen
  "apron.png",
  "mixing-bowl.png",
  "wooden-spoon.png",
  "rolling-pin.png",
  "cheese-grater.png",
  "vegetable-peeler.png",
  "chopping-board.png",
  "tomato-sauce.png",
  // Materials — art & craft
  "paintbrush.png",
  "paint-palette.png",
  "scissors.png",
  "glue-stick.png",
  "coloured-paper.png",
  // Activities — cognitive & sensory
  "jigsaw-puzzle.png",
  "sorting-trays.png",
  "matching-cards.png",
  "play-dough.png",
  // Activities — cooking, food & art (generic objects, no people)
  "pizza.png",
  "cooking.png",
  "painting.png",
  "peeling.png",
  // Fitness — equipment
  "therapy-ball.png",
  "trampoline.png",
  "step-platform.png",
  "treadmill.png",
  "exercise-machine.png",
  "weights.png",
  "row-machine.png",
  "skis.png",
  "exercise-bike.png",
  // Fitness — stretching
  "exercise-mat.png",
  "resistance-bands.png",
  "foam-roller.png",
  "stretching.png",
] as const;

export function dayCentreGeneralImageUrlForStep(step: DayCentreGeneralStep): string {
  return dayCentreGeneralImageUrl(step.slug);
}

/** General library — grouped like IKRAM Visual Cards (illustrations). */
export const DAY_CENTRE_GENERAL_SEQUENCE: readonly DayCentreGeneralStep[] = [
  // Personal care
  { id: "dcg-toilet", slug: "toilet", title: "Toilet" },
  { id: "dcg-shower", slug: "shower", title: "Shower" },
  { id: "dcg-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "dcg-brush-teeth", slug: "brush-teeth", title: "Brush teeth" },
  { id: "dcg-get-dressed", slug: "get-dressed", title: "Get dressed" },
  { id: "dcg-hair-care", slug: "hair-care", title: "Hair care" },
  // Community access
  { id: "dcg-bus", slug: "bus", title: "Bus" },
  { id: "dcg-taxi", slug: "taxi", title: "Taxi" },
  { id: "dcg-cab", slug: "cab", title: "Cab" },
  { id: "dcg-walk", slug: "walk", title: "Walking" },
  { id: "dcg-cross-road", slug: "cross-road", title: "Crossing road" },
  { id: "dcg-wait", slug: "wait", title: "Waiting" },
  { id: "dcg-home", slug: "home", title: "Home" },
  { id: "dcg-bus-stop", slug: "bus-stop", title: "Bus stop" },
  // Activities & leisure
  { id: "dcg-swimming-pool", slug: "swimming-pool", title: "Swimming" },
  { id: "dcg-hair-salon", slug: "hair-salon", title: "Hairdresser" },
  { id: "dcg-karaoke", slug: "karaoke", title: "Karaoke" },
  { id: "dcg-park", slug: "park", title: "Park" },
  { id: "dcg-park-swing", slug: "park-and-swing", title: "Park and swing" },
  { id: "dcg-playground", slug: "playground", title: "Playground" },
  { id: "dcg-cafe", slug: "cafe", title: "Cafe" },
  { id: "dcg-library", slug: "library", title: "Library" },
  { id: "dcg-music", slug: "music", title: "Music" },
  { id: "dcg-bean-bag", slug: "bean-bag", title: "Relaxation bean bag" },
  // Shopping & market
  { id: "dcg-supermarket", slug: "supermarket", title: "Supermarket" },
  { id: "dcg-market", slug: "market", title: "Market" },
  { id: "dcg-shops", slug: "shops", title: "Shops" },
  { id: "dcg-shopping", slug: "shopping", title: "Shopping" },
  { id: "dcg-shopping-basket", slug: "shopping-basket", title: "Basket" },
  { id: "dcg-pay", slug: "pay", title: "Pay" },
  { id: "dcg-queue", slug: "queue", title: "Queue" },
  { id: "dcg-westfield", slug: "westfield", title: "Westfield" },
  {
    id: "dcg-nail-varnish",
    slug: "black-nail-varnish",
    title: "Buy black nail varnish",
  },
  // Food & drink
  { id: "dcg-eat", slug: "eat", title: "Eat" },
  { id: "dcg-drink", slug: "drink", title: "Drink" },
  { id: "dcg-snack", slug: "snack", title: "Snack" },
  { id: "dcg-restaurant", slug: "restaurant", title: "Restaurant" },
  { id: "dcg-breakfast", slug: "breakfast", title: "Breakfast" },
  { id: "dcg-dinner", slug: "dinner", title: "Dinner" },
  { id: "dcg-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  // Materials — kitchen & cooking
  { id: "dcg-apron", slug: "apron", title: "Apron" },
  { id: "dcg-mixing-bowl", slug: "mixing-bowl", title: "Mixing bowl" },
  { id: "dcg-wooden-spoon", slug: "wooden-spoon", title: "Wooden spoon" },
  { id: "dcg-rolling-pin", slug: "rolling-pin", title: "Rolling pin" },
  { id: "dcg-cheese-grater", slug: "cheese-grater", title: "Cheese grater" },
  { id: "dcg-vegetable-peeler", slug: "vegetable-peeler", title: "Vegetable peeler" },
  { id: "dcg-chopping-board", slug: "chopping-board", title: "Chopping board" },
  { id: "dcg-tomato-sauce", slug: "tomato-sauce", title: "Tomato sauce" },
  // Materials — art & craft
  { id: "dcg-paintbrush", slug: "paintbrush", title: "Paintbrush" },
  { id: "dcg-paint-palette", slug: "paint-palette", title: "Paint palette" },
  { id: "dcg-scissors", slug: "scissors", title: "Scissors" },
  { id: "dcg-glue-stick", slug: "glue-stick", title: "Glue stick" },
  { id: "dcg-coloured-paper", slug: "coloured-paper", title: "Coloured paper" },
  // Activities — puzzles, sorting & matching
  { id: "dcg-jigsaw-puzzle", slug: "jigsaw-puzzle", title: "Jigsaw puzzle" },
  { id: "dcg-sorting-trays", slug: "sorting-trays", title: "Sorting trays" },
  { id: "dcg-matching-cards", slug: "matching-cards", title: "Matching cards" },
  { id: "dcg-play-dough", slug: "play-dough", title: "Play dough" },
  // Activities — cooking, food & art (until Oct — object illustrations)
  { id: "dcg-pizza", slug: "pizza", title: "Pizza" },
  { id: "dcg-cooking", slug: "cooking", title: "Cooking" },
  { id: "dcg-painting", slug: "painting", title: "Painting" },
  { id: "dcg-peeling", slug: "peeling", title: "Peeling" },
  // Fitness — equipment
  { id: "dcg-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "dcg-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "dcg-step-platform", slug: "step-platform", title: "Steps" },
  { id: "dcg-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "dcg-exercise-machine", slug: "exercise-machine", title: "Exercise machine" },
  { id: "dcg-weights", slug: "weights", title: "Weights" },
  { id: "dcg-row-machine", slug: "row-machine", title: "Row machine" },
  { id: "dcg-skis", slug: "skis", title: "Skis" },
  { id: "dcg-exercise-bike", slug: "exercise-bike", title: "Exercise bike" },
  // Fitness — stretching
  { id: "dcg-exercise-mat", slug: "exercise-mat", title: "Exercise mat" },
  { id: "dcg-resistance-bands", slug: "resistance-bands", title: "Resistance bands" },
  { id: "dcg-foam-roller", slug: "foam-roller", title: "Foam roller" },
  { id: "dcg-stretching", slug: "stretching", title: "Stretching" },
  // Communication
  { id: "dcg-help", slug: "help", title: "Help" },
  { id: "dcg-stop", slug: "stop", title: "Stop" },
  { id: "dcg-finished", slug: "finished", title: "Finished" },
  { id: "dcg-more", slug: "more", title: "More" },
  { id: "dcg-yes", slug: "yes", title: "Yes" },
  { id: "dcg-no", slug: "no", title: "No" },
  { id: "dcg-not-now", slug: "not-now", title: "Not now" },
  // Places & extras
  { id: "dcg-community-centre", slug: "community-centre", title: "Community centre" },
  { id: "dcg-make-up", slug: "make-up", title: "Make up" },
  { id: "dcg-birthday-cake", slug: "birthday-cake", title: "Birthday cake" },
  { id: "dcg-birthday-party", slug: "birthday-party", title: "Birthday party" },
] as const;

/** Fitness routine — equipment then stretching (531×648 illustrations). */
export const DAY_CENTRE_FITNESS_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcgf-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "dcgf-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "dcgf-step-platform", slug: "step-platform", title: "Steps" },
  { id: "dcgf-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "dcgf-exercise-machine", slug: "exercise-machine", title: "Exercise machine" },
  { id: "dcgf-weights", slug: "weights", title: "Weights" },
  { id: "dcgf-row-machine", slug: "row-machine", title: "Row machine" },
  { id: "dcgf-skis", slug: "skis", title: "Skis" },
  { id: "dcgf-exercise-bike", slug: "exercise-bike", title: "Exercise bike" },
  { id: "dcgf-exercise-mat", slug: "exercise-mat", title: "Exercise mat" },
  { id: "dcgf-resistance-bands", slug: "resistance-bands", title: "Resistance bands" },
  { id: "dcgf-foam-roller", slug: "foam-roller", title: "Foam roller" },
  { id: "dcgf-stretching", slug: "stretching", title: "Stretching" },
] as const;

/** Saturday schedule (photo 1) — general illustrations; return bus reuses `bus` art. */
export const DAY_CENTRE_GENERAL_SCHEDULE_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcgs-music", slug: "music", title: "Music" },
  { id: "dcgs-cafe", slug: "cafe", title: "Cafe" },
  { id: "dcgs-bus", slug: "bus", title: "Bus" },
  { id: "dcgs-westfield", slug: "westfield", title: "Westfield" },
  {
    id: "dcgs-nail-varnish",
    slug: "black-nail-varnish",
    title: "Buy black nail varnish",
  },
  { id: "dcgs-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  { id: "dcgs-bus-return", slug: "bus", title: "Bus" },
  { id: "dcgs-bean-bag", slug: "bean-bag", title: "Relaxation bean bag" },
  { id: "dcgs-cab", slug: "cab", title: "Cab" },
  { id: "dcgs-home", slug: "home", title: "Home" },
] as const;
