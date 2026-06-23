/**
 * Day Centre — General pack (illustrated placeholders only).
 * Grouped from Ikram schedule + IKRAM Visual Cards sheet — all drawings.
 */

import {
  DAY_CENTRE_CATEGORY_COLOUR,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import type { TailoredItems3dStep } from "@/lib/cards/tailored-items-3d-shared";

export { DAY_CENTRE_CATEGORY_COLOUR };

export type DayCentreGeneralStep = {
  id: string;
  slug: string;
  title: string;
};

export const DAY_CENTRE_GENERAL_CATEGORY_LABEL = "At the day centre" as const;

/** Illustrated PNGs under `public/cards/day centre/general/`. */
export const DAY_CENTRE_GENERAL_CARD_FILES = [
  "bakery.png",
  "bean-bag.png",
  "birthday-cake.png",
  "birthday-party.png",
  "black-nail-varnish.png",
  "breakfast.png",
  "brush-teeth.png",
  "bus-stop.png",
  "bus.png",
  "cab.png",
  "tube.png",
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
  "ketchup.png",
  "library.png",
  "make-up.png",
  "market.png",
  "mayonnaise.png",
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
  "sweetcorn.png",
  "stop.png",
  "supermarket.png",
  "swimming-pool.png",
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
  "tuna.png",
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
  // Mini gym
  "therapy-ball.png",
  "trampoline.png",
  "treadmill.png",
  "cones.png",
  "step-platform.png",
  "rope.png",
  "weights.png",
  "exercise-bike.png",
  "bells.png",
  // Held — not shown in Library until more Physical Activity items are added
  "exercise-machine.png",
  "row-machine.png",
  "skis.png",
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
  { id: "dcg-tube", slug: "tube", title: "Tube" },
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
  { id: "dcg-bakery", slug: "bakery", title: "Bakery" },
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
  { id: "dcg-tuna", slug: "tuna", title: "Tuna" },
  { id: "dcg-sweetcorn", slug: "sweetcorn", title: "Sweetcorn" },
  { id: "dcg-mayonnaise", slug: "mayonnaise", title: "Mayonnaise" },
  { id: "dcg-ketchup", slug: "ketchup", title: "Ketchup" },
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
  // Mini gym
  { id: "dcg-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "dcg-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "dcg-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "dcg-cones", slug: "cones", title: "Cones" },
  { id: "dcg-step-platform", slug: "step-platform", title: "Steps" },
  { id: "dcg-rope", slug: "rope", title: "Rope" },
  { id: "dcg-weights", slug: "weights", title: "Weights" },
  { id: "dcg-exercise-bike", slug: "exercise-bike", title: "Mini bikes" },
  { id: "dcg-bells", slug: "bells", title: "Bells" },
  // Held — more Physical Activity items may join Mini gym later
  { id: "dcg-exercise-machine", slug: "exercise-machine", title: "Exercise machine" },
  { id: "dcg-row-machine", slug: "row-machine", title: "Row machine" },
  { id: "dcg-skis", slug: "skis", title: "Skis" },
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

/** Mini gym routine — equipment only (531×648 illustrations). */
export const DAY_CENTRE_FITNESS_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcgf-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "dcgf-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "dcgf-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "dcgf-cones", slug: "cones", title: "Cones" },
  { id: "dcgf-step-platform", slug: "step-platform", title: "Steps" },
  { id: "dcgf-rope", slug: "rope", title: "Rope" },
  { id: "dcgf-weights", slug: "weights", title: "Weights" },
  { id: "dcgf-exercise-bike", slug: "exercise-bike", title: "Mini bikes" },
  { id: "dcgf-bells", slug: "bells", title: "Bells" },
  { id: "dcgf-exercise-mat", slug: "exercise-mat", title: "Exercise mat" },
  { id: "dcgf-resistance-bands", slug: "resistance-bands", title: "Resistance bands" },
  { id: "dcgf-foam-roller", slug: "foam-roller", title: "Foam roller" },
  { id: "dcgf-stretching", slug: "stretching", title: "Stretching" },
] as const;

/** Mixed illustrated day — personal care, activities, cooking, outing (Schedule Player). */
export const DAY_CENTRE_GENERAL_SCHEDULE_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcgs-breakfast", slug: "breakfast", title: "Breakfast" },
  { id: "dcgs-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "dcgs-music", slug: "music", title: "Music" },
  { id: "dcgs-jigsaw", slug: "jigsaw-puzzle", title: "Jigsaw puzzle" },
  { id: "dcgs-mixing-bowl", slug: "mixing-bowl", title: "Mixing bowl" },
  { id: "dcgs-pizza", slug: "pizza", title: "Pizza" },
  { id: "dcgs-painting", slug: "painting", title: "Painting" },
  { id: "dcgs-bus", slug: "bus", title: "Bus" },
  { id: "dcgs-market", slug: "market", title: "Market" },
  { id: "dcgs-cafe", slug: "cafe", title: "Cafe" },
  { id: "dcgs-bean-bag", slug: "bean-bag", title: "Relaxation bean bag" },
  { id: "dcgs-home", slug: "home", title: "Home" },
] as const;

/** Mini gym — equipment-only schedule. */
export const DAY_CENTRE_MINI_GYM_SCHEDULE_SEQUENCE: readonly DayCentreGeneralStep[] =
  DAY_CENTRE_FITNESS_SEQUENCE;

/** Cooking activity — kitchen materials and food prep. */
export const DAY_CENTRE_COOKING_SCHEDULE_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dccc-apron", slug: "apron", title: "Apron" },
  { id: "dccc-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "dccc-mixing-bowl", slug: "mixing-bowl", title: "Mixing bowl" },
  { id: "dccc-wooden-spoon", slug: "wooden-spoon", title: "Wooden spoon" },
  { id: "dccc-pizza", slug: "pizza", title: "Pizza" },
  { id: "dccc-cooking", slug: "cooking", title: "Cooking" },
  { id: "dccc-peeling", slug: "peeling", title: "Peeling" },
] as const;

/** Community outing — Westfield, McDonald's and transport. */
export const DAY_CENTRE_COMMUNITY_SCHEDULE_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dccc-bus", slug: "bus", title: "Bus" },
  { id: "dccc-westfield", slug: "westfield", title: "Westfield" },
  { id: "dccc-shopping", slug: "shopping", title: "Shopping" },
  { id: "dccc-queue", slug: "queue", title: "Queue" },
  { id: "dccc-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  { id: "dccc-cab", slug: "cab", title: "Cab" },
] as const;

/** Mini gym · warm-up (2D objects). */
export const DAY_CENTRE_MINI_GYM_WARMUP_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcgw-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "dcgw-exercise-mat", slug: "exercise-mat", title: "Exercise mat" },
  { id: "dcgw-resistance-bands", slug: "resistance-bands", title: "Resistance bands" },
  { id: "dcgw-stretching", slug: "stretching", title: "Stretching" },
] as const;

/** Mini gym · cardio stations (2D). */
export const DAY_CENTRE_MINI_GYM_CARDIO_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcgc-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "dcgc-exercise-bike", slug: "exercise-bike", title: "Mini bikes" },
  { id: "dcgc-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "dcgc-step-platform", slug: "step-platform", title: "Steps" },
  { id: "dcgc-rope", slug: "rope", title: "Rope" },
] as const;

/** Mini gym · strength (2D). */
export const DAY_CENTRE_MINI_GYM_STRENGTH_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcgs-weights", slug: "weights", title: "Weights" },
  { id: "dcgs-bells", slug: "bells", title: "Bells" },
  { id: "dcgs-step-platform", slug: "step-platform", title: "Steps" },
  { id: "dcgs-foam-roller", slug: "foam-roller", title: "Foam roller" },
] as const;

/** Mini gym · 3D warm-up — objects on disk in `library-3d/`. */
export const DAY_CENTRE_MINI_GYM_3D_WARMUP_SEQUENCE: readonly TailoredItems3dStep[] = [
  { id: "dcg3w-therapy-ball", slug: "therapy-ball", title: "Therapy ball", library: "3d" },
  { id: "dcg3w-exercise-mat", slug: "exercise-mat", title: "Exercise mat", library: "3d" },
  { id: "dcg3w-resistance-bands", slug: "resistance-bands", title: "Resistance bands", library: "3d" },
  { id: "dcg3w-bosu", slug: "bosu", title: "BOSU", library: "3d" },
] as const;

/** Mini gym · full 3D equipment schedule (no cones/rope/bells — not on disk). */
export const DAY_CENTRE_MINI_GYM_3D_FITNESS_SEQUENCE: readonly TailoredItems3dStep[] = [
  { id: "dc3f-therapy-ball", slug: "therapy-ball", title: "Therapy ball", library: "3d" },
  { id: "dc3f-trampoline", slug: "trampoline", title: "Trampoline", library: "3d" },
  { id: "dc3f-treadmill", slug: "treadmill", title: "Treadmill", library: "3d" },
  { id: "dc3f-step-platform", slug: "step-platform", title: "Steps", library: "3d" },
  { id: "dc3f-weights", slug: "weights", title: "Weights", library: "3d" },
  { id: "dc3f-exercise-bike", slug: "exercise-bike", title: "Mini bikes", library: "3d" },
  { id: "dc3f-exercise-mat", slug: "exercise-mat", title: "Exercise mat", library: "3d" },
  { id: "dc3f-resistance-bands", slug: "resistance-bands", title: "Resistance bands", library: "3d" },
  { id: "dc3f-foam-roller", slug: "foam-roller", title: "Foam roller", library: "3d" },
] as const;

/** Mini gym · 3D cardio stations. */
export const DAY_CENTRE_MINI_GYM_3D_CARDIO_SEQUENCE: readonly TailoredItems3dStep[] = [
  { id: "dc3c-treadmill", slug: "treadmill", title: "Treadmill", library: "3d" },
  { id: "dc3c-exercise-bike", slug: "exercise-bike", title: "Mini bikes", library: "3d" },
  { id: "dc3c-trampoline", slug: "trampoline", title: "Trampoline", library: "3d" },
  { id: "dc3c-step-platform", slug: "step-platform", title: "Steps", library: "3d" },
  { id: "dc3c-row-machine", slug: "row-machine", title: "Row machine", library: "3d" },
] as const;

/** Mini gym · 3D strength. */
export const DAY_CENTRE_MINI_GYM_3D_STRENGTH_SEQUENCE: readonly TailoredItems3dStep[] = [
  { id: "dc3s-weights", slug: "weights", title: "Weights", library: "3d" },
  { id: "dc3s-kettlebell", slug: "kettlebell", title: "Kettlebell", library: "3d" },
  { id: "dc3s-medicine-ball", slug: "medicine-ball", title: "Weight ball", library: "3d" },
  { id: "dc3s-step-platform", slug: "step-platform", title: "Steps", library: "3d" },
  { id: "dc3s-foam-roller", slug: "foam-roller", title: "Foam roller", library: "3d" },
] as const;

/** Cooking · kitchen prep (materials). */
export const DAY_CENTRE_COOKING_PREP_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dccp-apron", slug: "apron", title: "Apron" },
  { id: "dccp-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "dccp-chopping-board", slug: "chopping-board", title: "Chopping board" },
  { id: "dccp-vegetable-peeler", slug: "vegetable-peeler", title: "Vegetable peeler" },
  { id: "dccp-tomato-sauce", slug: "tomato-sauce", title: "Tomato sauce" },
  { id: "dccp-peeling", slug: "peeling", title: "Peeling" },
] as const;

/** Cooking · bake / mix (pizza day). */
export const DAY_CENTRE_COOKING_BAKE_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dccb-apron", slug: "apron", title: "Apron" },
  { id: "dccb-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "dccb-mixing-bowl", slug: "mixing-bowl", title: "Mixing bowl" },
  { id: "dccb-wooden-spoon", slug: "wooden-spoon", title: "Wooden spoon" },
  { id: "dccb-rolling-pin", slug: "rolling-pin", title: "Rolling pin" },
  { id: "dccb-pizza", slug: "pizza", title: "Pizza" },
  { id: "dccb-cooking", slug: "cooking", title: "Cooking" },
] as const;

/** Community · market day. */
export const DAY_CENTRE_COMMUNITY_MARKET_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dccm-bus", slug: "bus", title: "Bus" },
  { id: "dccm-market", slug: "market", title: "Market" },
  { id: "dccm-shopping-basket", slug: "shopping-basket", title: "Basket" },
  { id: "dccm-pay", slug: "pay", title: "Pay" },
  { id: "dccm-snack", slug: "snack", title: "Snack" },
  { id: "dccm-bus-stop", slug: "bus-stop", title: "Bus stop" },
  { id: "dccm-home", slug: "home", title: "Home" },
] as const;

/** Community · park outing. */
export const DAY_CENTRE_COMMUNITY_PARK_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dccp-walk", slug: "walk", title: "Walking" },
  { id: "dccp-park", slug: "park", title: "Park" },
  { id: "dccp-playground", slug: "playground", title: "Playground" },
  { id: "dccp-cafe", slug: "cafe", title: "Cafe" },
  { id: "dccp-wait", slug: "wait", title: "Waiting" },
  { id: "dccp-cab", slug: "cab", title: "Cab" },
  { id: "dccp-home", slug: "home", title: "Home" },
] as const;

/** Mixed day — composite schedules (karaoke, cafe, swimming, choosing, cab, home, …). */
export const DAY_CENTRE_MIXED_SCHEDULE_SEQUENCE: readonly DayCentreGeneralStep[] = [
  { id: "dcmx-karaoke", slug: "karaoke", title: "Karaoke" },
  { id: "dcmx-walk", slug: "walk", title: "Walking" },
  { id: "dcmx-cafe", slug: "cafe", title: "Cafe" },
  { id: "dcmx-swimming", slug: "swimming-pool", title: "Swimming" },
  { id: "dcmx-eat", slug: "eat", title: "Lunch" },
  { id: "dcmx-sorting", slug: "sorting-trays", title: "Choosing" },
  { id: "dcmx-bean-bag", slug: "bean-bag", title: "Relaxation" },
  { id: "dcmx-music", slug: "music", title: "Music" },
  { id: "dcmx-cab", slug: "cab", title: "Cab" },
  { id: "dcmx-home", slug: "home", title: "Home" },
] as const;
