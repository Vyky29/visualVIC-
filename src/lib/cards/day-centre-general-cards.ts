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
  "bananas.png",
  "bean-bag.png",
  "birthday-cake.png",
  "birthday-party.png",
  "black-nail-varnish.png",
  "breakfast.png",
  "brush-teeth.png",
  "bus-stop.png",
  "bus.png",
  "butter.png",
  "cab.png",
  "tube.png",
  "cafe.png",
  "circle-time.png",
  "community-centre.png",
  "flip-flops.png",
  "hub-room.png",
  "cross-road.png",
  "dinner.png",
  "drink.png",
  "eat.png",
  "finished.png",
  "get-dressed.png",
  "hair-care.png",
  "hair-salon.png",
  "help.png",
  "hob.png",
  "home.png",
  "ice.png",
  "karaoke.png",
  "ketchup.png",
  "knife.png",
  "library.png",
  "market.png",
  "mayonnaise.png",
  "mcdonalds.png",
  "milk.png",
  "microwave.png",
  "more.png",
  "music.png",
  "no.png",
  "not-now.png",
  "packed-lunch.png",
  "oven.png",
  "park-and-swing.png",
  "park.png",
  "sams-cafe.png",
  "sensory-room.png",
  "swing.png",
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
  "strawberries.png",
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
  "saucepan.png",
  "cheese-grater.png",
  "vegetable-peeler.png",
  "chopping-board.png",
  "tomato-sauce.png",
  "tomato.png",
  "tuna.png",
  "flour.png",
  "water.png",
  "mix.png",
  "knead.png",
  "pizza-dough.png",
  "cheese.png",
  "chorizo.png",
  "tidy-up.png",
  "washing-up.png",
  // Materials — art & craft
  "paintbrush.png",
  "paint-palette.png",
  "scissors.png",
  "glue-stick.png",
  "coloured-paper.png",
  // Technology
  "ipad.png",
  "tablet.png",
  "timi-fitness.png",
  "timi-motor-skills-with-raul.png",
  "whiteboard.png",
  "laptop.png",
  // Activities — cognitive & sensory
  "jigsaw-puzzle.png",
  "sorting-trays.png",
  "matching-cards.png",
  "play-dough.png",
  "timi-foam.png",
  "timi-motor-skills.png",
  "timi-screwdriver.png",
  "timi-puzzle-2.png",
  "timi-stacking-cubes.png",
  "timi-puzzles-with-raul.png",
  "timi-vocational-activity.png",
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
  { id: "dcg-circle-time", slug: "circle-time", title: "Circle time" },
  { id: "dcg-park", slug: "park", title: "Park" },
  { id: "dcg-park-swing", slug: "park-and-swing", title: "Park and swing" },
  { id: "dcg-swing", slug: "swing", title: "Swing" },
  { id: "dcg-playground", slug: "playground", title: "Playground" },
  { id: "dcg-cafe", slug: "cafe", title: "Cafe" },
  { id: "dcg-sams-cafe", slug: "sams-cafe", title: "Sam's Cafe" },
  { id: "dcg-sensory-room", slug: "sensory-room", title: "Sensory room" },
  { id: "dcg-flip-flops", slug: "flip-flops", title: "Flip-flops" },
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
  { id: "dcg-packed-lunch", slug: "packed-lunch", title: "Packed lunch" },
  { id: "dcg-drink", slug: "drink", title: "Drink" },
  { id: "dcg-snack", slug: "snack", title: "Snack" },
  { id: "dcg-tuna", slug: "tuna", title: "Tuna" },
  { id: "dcg-sweetcorn", slug: "sweetcorn", title: "Sweetcorn" },
  { id: "dcg-mayonnaise", slug: "mayonnaise", title: "Mayonnaise" },
  { id: "dcg-ketchup", slug: "ketchup", title: "Ketchup" },
  { id: "dcg-milk", slug: "milk", title: "Milk" },
  { id: "dcg-strawberries", slug: "strawberries", title: "Strawberries" },
  { id: "dcg-ice", slug: "ice", title: "Ice" },
  { id: "dcg-bananas", slug: "bananas", title: "Bananas" },
  { id: "dcg-tomato", slug: "tomato", title: "Tomato" },
  { id: "dcg-onion", slug: "onion", title: "Onion" },
  { id: "dcg-butter", slug: "butter", title: "Butter" },
  { id: "dcg-restaurant", slug: "restaurant", title: "Restaurant" },
  { id: "dcg-breakfast", slug: "breakfast", title: "Breakfast" },
  { id: "dcg-dinner", slug: "dinner", title: "Dinner" },
  { id: "dcg-mcdonalds", slug: "mcdonalds", title: "McDonald's" },
  // Materials — kitchen & cooking
  { id: "dcg-apron", slug: "apron", title: "Apron" },
  { id: "dcg-mixing-bowl", slug: "mixing-bowl", title: "Mixing bowl" },
  { id: "dcg-wooden-spoon", slug: "wooden-spoon", title: "Wooden spoon" },
  { id: "dcg-rolling-pin", slug: "rolling-pin", title: "Rolling pin" },
  { id: "dcg-saucepan", slug: "saucepan", title: "Saucepan" },
  { id: "dcg-hob", slug: "hob", title: "Hob" },
  { id: "dcg-microwave", slug: "microwave", title: "Microwave" },
  { id: "dcg-oven", slug: "oven", title: "Oven" },
  { id: "dcg-cheese-grater", slug: "cheese-grater", title: "Cheese grater" },
  { id: "dcg-vegetable-peeler", slug: "vegetable-peeler", title: "Vegetable peeler" },
  { id: "dcg-chopping-board", slug: "chopping-board", title: "Chopping board" },
  { id: "dcg-knife", slug: "knife", title: "Knife" },
  { id: "dcg-tomato-sauce", slug: "tomato-sauce", title: "Tomato sauce" },
  { id: "dcg-flour", slug: "flour", title: "Flour" },
  { id: "dcg-water", slug: "water", title: "Water" },
  { id: "dcg-mix", slug: "mix", title: "Mix" },
  { id: "dcg-knead", slug: "knead", title: "Knead" },
  { id: "dcg-pizza-dough", slug: "pizza-dough", title: "Pizza dough" },
  { id: "dcg-cheese", slug: "cheese", title: "Cheese" },
  { id: "dcg-chorizo", slug: "chorizo", title: "Chorizo" },
  { id: "dcg-tidy-up", slug: "tidy-up", title: "Tidy up" },
  { id: "dcg-washing-up", slug: "washing-up", title: "Washing up" },
  // Materials — art & craft
  { id: "dcg-paintbrush", slug: "paintbrush", title: "Paintbrush" },
  { id: "dcg-paint-palette", slug: "paint-palette", title: "Paint palette" },
  { id: "dcg-scissors", slug: "scissors", title: "Scissors" },
  { id: "dcg-glue-stick", slug: "glue-stick", title: "Glue stick" },
  { id: "dcg-coloured-paper", slug: "coloured-paper", title: "Coloured paper" },
  // Technology
  { id: "dcg-ipad", slug: "ipad", title: "iPad" },
  { id: "dcg-tablet", slug: "tablet", title: "Tablet" },
  { id: "dcg-timi-fitness", slug: "timi-fitness", title: "Timi fitness" },
  {
    id: "dcg-timi-motor-skills-raul",
    slug: "timi-motor-skills-with-raul",
    title: "Timi motor skills with Raul",
  },
  { id: "dcg-whiteboard", slug: "whiteboard", title: "Whiteboard" },
  { id: "dcg-laptop", slug: "laptop", title: "Laptop" },
  // Activities — puzzles, sorting & matching
  { id: "dcg-jigsaw-puzzle", slug: "jigsaw-puzzle", title: "Jigsaw puzzle" },
  { id: "dcg-sorting-trays", slug: "sorting-trays", title: "Sorting trays" },
  { id: "dcg-matching-cards", slug: "matching-cards", title: "Matching cards" },
  { id: "dcg-play-dough", slug: "play-dough", title: "Play dough" },
  { id: "dcg-timi-foam", slug: "timi-foam", title: "Timi foam" },
  {
    id: "dcg-timi-motor-skills",
    slug: "timi-motor-skills",
    title: "Timi motor skills",
  },
  {
    id: "dcg-timi-screwdriver",
    slug: "timi-screwdriver",
    title: "Timi screwdriver",
  },
  {
    id: "dcg-timi-puzzle-2",
    slug: "timi-puzzle-2",
    title: "Timi puzzle 2",
  },
  {
    id: "dcg-timi-stacking-cubes",
    slug: "timi-stacking-cubes",
    title: "Timi stacking cubes",
  },
  {
    id: "dcg-timi-puzzles-raul",
    slug: "timi-puzzles-with-raul",
    title: "Timi puzzles with Raul",
  },
  {
    id: "dcg-timi-vocational-activity",
    slug: "timi-vocational-activity",
    title: "Timi vocational activity",
  },
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
  { id: "dcg-community-centre", slug: "community-centre", title: "Club Sensational" },
  { id: "dcg-hub-room", slug: "hub-room", title: "Hub room" },
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

/** Every cooking stock routine — wash hands first, then apron. */
export const DAY_CENTRE_COOKING_OPENING_SEQUENCE: readonly DayCentreGeneralStep[] =
  [
    { id: "dcco-wash-hands", slug: "wash-hands", title: "Wash hands" },
    { id: "dcco-apron", slug: "apron", title: "Apron" },
  ] as const;

/** Cooking · Pizza day — dough to finished (after opening). */
export const DAY_CENTRE_COOKING_PIZZA_DAY_SEQUENCE: readonly DayCentreGeneralStep[] =
  [
    { id: "dccpd-mixing-bowl", slug: "mixing-bowl", title: "Mixing bowl" },
    { id: "dccpd-wooden-spoon", slug: "wooden-spoon", title: "Wooden spoon" },
    { id: "dccpd-flour", slug: "flour", title: "Flour" },
    { id: "dccpd-water", slug: "water", title: "Water" },
    { id: "dccpd-mix", slug: "mix", title: "Mix" },
    { id: "dccpd-knead", slug: "knead", title: "Knead" },
    { id: "dccpd-pizza-dough", slug: "pizza-dough", title: "Pizza dough" },
    { id: "dccpd-rolling-pin", slug: "rolling-pin", title: "Rolling pin" },
    { id: "dccpd-tomato-sauce", slug: "tomato-sauce", title: "Tomato sauce" },
    { id: "dccpd-cheese", slug: "cheese", title: "Cheese" },
    { id: "dccpd-chorizo", slug: "chorizo", title: "Chorizo" },
    { id: "dccpd-oven", slug: "oven", title: "Oven" },
    { id: "dccpd-eat", slug: "eat", title: "Eat" },
    { id: "dccpd-tidy-up", slug: "tidy-up", title: "Tidy up" },
    { id: "dccpd-washing-up", slug: "washing-up", title: "Washing up" },
    { id: "dccpd-finished", slug: "finished", title: "Finished" },
  ] as const;

/** Cooking activity — full pizza day schedule. */
export const DAY_CENTRE_COOKING_SCHEDULE_SEQUENCE: readonly DayCentreGeneralStep[] =
  [
    ...DAY_CENTRE_COOKING_OPENING_SEQUENCE,
    ...DAY_CENTRE_COOKING_PIZZA_DAY_SEQUENCE,
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
  { id: "dc3f-football", slug: "football", title: "Football", library: "3d" },
  { id: "dc3f-badminton", slug: "badminton", title: "Badminton", library: "3d" },
  { id: "dc3f-basketball", slug: "basketball", title: "Basketball", library: "3d" },
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
export const DAY_CENTRE_COOKING_PREP_SEQUENCE: readonly DayCentreGeneralStep[] =
  [
    ...DAY_CENTRE_COOKING_OPENING_SEQUENCE,
    { id: "dccp-chopping-board", slug: "chopping-board", title: "Chopping board" },
    {
      id: "dccp-vegetable-peeler",
      slug: "vegetable-peeler",
      title: "Vegetable peeler",
    },
    { id: "dccp-tomato-sauce", slug: "tomato-sauce", title: "Tomato sauce" },
    { id: "dccp-peeling", slug: "peeling", title: "Peeling" },
  ] as const;

/** Cooking · bake / mix (pizza dough through oven). */
export const DAY_CENTRE_COOKING_BAKE_SEQUENCE: readonly DayCentreGeneralStep[] =
  [
    ...DAY_CENTRE_COOKING_OPENING_SEQUENCE,
    { id: "dccb-mixing-bowl", slug: "mixing-bowl", title: "Mixing bowl" },
    { id: "dccb-wooden-spoon", slug: "wooden-spoon", title: "Wooden spoon" },
    { id: "dccb-flour", slug: "flour", title: "Flour" },
    { id: "dccb-water", slug: "water", title: "Water" },
    { id: "dccb-mix", slug: "mix", title: "Mix" },
    { id: "dccb-knead", slug: "knead", title: "Knead" },
    { id: "dccb-pizza-dough", slug: "pizza-dough", title: "Pizza dough" },
    { id: "dccb-rolling-pin", slug: "rolling-pin", title: "Rolling pin" },
    { id: "dccb-tomato-sauce", slug: "tomato-sauce", title: "Tomato sauce" },
    { id: "dccb-cheese", slug: "cheese", title: "Cheese" },
    { id: "dccb-chorizo", slug: "chorizo", title: "Chorizo" },
    { id: "dccb-oven", slug: "oven", title: "Oven" },
    { id: "dccb-pizza", slug: "pizza", title: "Pizza" },
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
  { id: "dcmx-eat", slug: "packed-lunch", title: "Lunch" },
  { id: "dcmx-sorting", slug: "sorting-trays", title: "Choosing" },
  { id: "dcmx-bean-bag", slug: "bean-bag", title: "Relaxation" },
  { id: "dcmx-music", slug: "music", title: "Music" },
  { id: "dcmx-cab", slug: "cab", title: "Cab" },
  { id: "dcmx-home", slug: "home", title: "Home" },
] as const;
