/**
 * Fitness / Physical pack — 3D illustration catalogue (531×648 PNG).
 * Output: `public/images/library-3d/{slug}.png`
 */

/** @type {{ file: string; slug: string; title: string; object: string }[]} */
const FITNESS_3D_ITEMS = [
  {
    file: "therapy-ball.png",
    slug: "therapy-ball",
    title: "Therapy ball",
    object:
      "a large blue therapy exercise ball resting on a grey gym mat, soft 3D rendered style",
  },
  {
    file: "trampoline.png",
    slug: "trampoline",
    title: "Trampoline",
    object:
      "a mini rebounder trampoline with grey jump surface and silver legs, soft 3D rendered style",
  },
  {
    file: "step-platform.png",
    slug: "step-platform",
    title: "Steps",
    object:
      "a grey aerobic step platform with two risers, soft 3D rendered style",
  },
  {
    file: "treadmill.png",
    slug: "treadmill",
    title: "Treadmill",
    object:
      "a treadmill with dark running belt, silver rails and blue console screen, soft 3D rendered style",
  },
  {
    file: "exercise-machine.png",
    slug: "exercise-machine",
    title: "Exercise machine",
    object:
      "a multi-gym cable exercise machine with black seat and weight stack, soft 3D rendered style",
  },
  {
    file: "weights.png",
    slug: "weights",
    title: "Weights",
    object:
      "a black dumbbell and stacked weight plates, soft 3D rendered style",
  },
  {
    file: "row-machine.png",
    slug: "row-machine",
    title: "Row machine",
    object:
      "a seated cable row machine with black seat and pulley, soft 3D rendered style",
  },
  {
    file: "skis.png",
    slug: "skis",
    title: "Skis",
    object: "a pair of colourful skis with bindings, soft 3D rendered style",
  },
  {
    file: "exercise-bike.png",
    slug: "exercise-bike",
    title: "Exercise bike",
    object:
      "a static spin exercise bike with large flywheel and console, soft 3D rendered style",
  },
  {
    file: "exercise-mat.png",
    slug: "exercise-mat",
    title: "Exercise mat",
    object: "a rolled purple yoga mat partly unrolled, soft 3D rendered style",
  },
  {
    file: "resistance-bands.png",
    slug: "resistance-bands",
    title: "Resistance bands",
    object:
      "three resistance bands with handles in green red and yellow, soft 3D rendered style",
  },
  {
    file: "foam-roller.png",
    slug: "foam-roller",
    title: "Foam roller",
    object: "a blue foam roller cylinder, soft 3D rendered style",
  },
  {
    file: "cones.png",
    slug: "cones",
    title: "Cones",
    object:
      "a set of bright yellow sports saucer disc cones — five stacked in a neat pile plus two loose cones beside them, low-profile flexible plastic agility markers with hollow tops and subtle horizontal ridges, soft 3D rendered style",
  },
  {
    file: "stretching.png",
    slug: "stretching",
    title: "Stretching",
    object: "a green stretch band loop, soft 3D rendered style",
  },
  {
    file: "bosu.png",
    slug: "bosu",
    title: "BOSU",
    object:
      "a BOSU balance trainer half blue dome on a flat black platform, soft 3D rendered style",
  },
  {
    file: "kettlebell.png",
    slug: "kettlebell",
    title: "Kettlebell",
    object: "a black cast iron kettlebell, soft 3D rendered style",
  },
  {
    file: "medicine-ball.png",
    slug: "medicine-ball",
    title: "Medicine ball",
    object: "a heavy red medicine ball with textured surface, soft 3D rendered style",
  },
  {
    file: "jump-rope.png",
    slug: "jump-rope",
    title: "Jump rope",
    object: "a jump rope with black handles coiled loosely, soft 3D rendered style",
  },
  {
    file: "punching-bag.png",
    slug: "punching-bag",
    title: "Punching bag",
    object: "a red heavy punching bag hanging from a chain, soft 3D rendered style",
  },
  {
    file: "agility-ladder.png",
    slug: "agility-ladder",
    title: "Agility ladder",
    object: "a flat yellow agility ladder on the ground, soft 3D rendered style",
  },
  {
    file: "balance-board.png",
    slug: "balance-board",
    title: "Balance board",
    object: "a wooden wobble balance board on a curved base, soft 3D rendered style",
  },
  {
    file: "football.png",
    slug: "football",
    title: "Football",
    object:
      "a classic black-and-white pentagon pattern soccer football on grass patch, soft 3D rendered style",
  },
  {
    file: "badminton.png",
    slug: "badminton",
    title: "Badminton",
    object:
      "a badminton racket and white feather shuttlecock, soft 3D rendered style",
  },
  {
    file: "basketball.png",
    slug: "basketball",
    title: "Basketball",
    object: "an orange basketball with black ribs, soft 3D rendered style",
  },
  {
    file: "ladder.png",
    slug: "ladder",
    title: "Ladder",
    object: "a flat yellow agility speed ladder on the ground, soft 3D rendered style",
  },
  {
    file: "hurdles.png",
    slug: "hurdles",
    title: "Hurdles",
    object:
      "three adjustable orange and white track hurdles for athletics training, soft 3D rendered style",
  },
  {
    file: "parachute.png",
    slug: "parachute",
    title: "Parachute",
    object:
      "a colourful round play parachute spread flat with rainbow panels and edge handles, soft 3D rendered style",
  },
  {
    file: "colour-balls.png",
    slug: "colour-balls",
    title: "Colour balls",
    object:
      "a cluster of bright colourful soft play balls in red blue yellow green and orange, soft 3D rendered style",
  },
  {
    file: "comb.png",
    slug: "comb",
    title: "Comb",
    object: "a blue wide-tooth plastic hair comb, soft 3D rendered style",
  },
  {
    file: "stilts.png",
    slug: "stilts",
    title: "Stilts",
    object:
      "a pair of wooden walking peg stilts with foot platforms and hand grips, soft 3D rendered style",
  },
];

const PROMPT_3D_TEMPLATE =
  "Create a single PixtoLearn style object illustration of [OBJECT]. Canvas size 531 × 648 px. PNG with transparent background. Soft 3D rendered illustration style. Rounded volumetric shapes. Gentle gradients and soft lighting. Subtle ground shadow only. Professional and child friendly. No text, no labels, no background scenery. Object centred vertically and horizontally. Object should occupy approximately 80 percent of the canvas height. Single isolated object only.";

function build3dPrompt(object) {
  return PROMPT_3D_TEMPLATE.replace("[OBJECT]", object);
}

module.exports = { FITNESS_3D_ITEMS, PROMPT_3D_TEMPLATE, build3dPrompt };
