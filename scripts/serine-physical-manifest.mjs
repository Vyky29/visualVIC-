/**
 * Serine · Physical activity — schedule manifest + generation prompts.
 *
 * Phase 1: flat 2D vector (`SERINE_2D_CHARACTER_PROMPT` + scene lines)
 * Phase 2: soft 3D Pixar storybook (`SERINE_3D_CHARACTER_PROMPT` + scene lines)
 *
 * Raw assets (Cursor assets folder):
 *   serine-2d-{slug}-raw.png   ← Phase 1 scene illustrations
 *   serine-3d-{slug}-raw.png   ← Phase 2 scene illustrations
 *   serine-cartoon-2d-adult.png
 *   serine-cartoon-3d-adult.png
 *
 * Reference photos (real):
 *   serine-cara.png, serine-pe1.png, serine-body.png
 */

/** Schedule Player order — gym / PE routine for Serine. */
export const SERINE_PHYSICAL_SCHEDULE = [
  {
    slug: "therapy-ball-bouncing",
    title: "Bounce on therapy ball",
    scene:
      "bouncing gently on a large blue therapy ball, both feet on floor, hands on knees, gym setting",
  },
  {
    slug: "treadmill",
    title: "Treadmill",
    scene: "walking on a treadmill in a gym, side view, machine clearly visible",
  },
  {
    slug: "row-machine",
    title: "Row machine",
    scene: "sitting on a rowing machine pulling the handle, gym equipment visible",
  },
  {
    slug: "exercise-bike",
    title: "Exercise bike",
    scene: "pedalling on a stationary exercise bike, gym setting",
  },
  {
    slug: "sandbag-carry",
    title: "Walk with sandbag",
    scene:
      "walking forward in a gym carrying a large sandbag with orange ends and black middle, both hands on strap handles, mid-stride, white t-shirt, dark grey joggers, pink trainers, green lanyard",
  },
  {
    slug: "sandbag-shoulders",
    title: "Sandbag on shoulders",
    scene:
      "walking forward in a gym with a large pink sandbag across shoulders and neck, both hands gripping black handles near head, mid-stride, white t-shirt, dark grey joggers, pink trainers, green lanyard",
  },
  {
    slug: "weights-on-bosu",
    title: "Weights on BOSU",
    scene:
      "standing balanced on a blue BOSU ball, holding a 2kg dumbbell in each hand at shoulder height, white t-shirt, dark grey joggers, pink trainers, green sunflower lanyard, gym setting",
  },
  {
    slug: "step-up-box",
    title: "Step up on box",
    scene:
      "stepping up onto a black 20-inch plyometric box, right foot on box, left foot on floor, knee raised, side view, light t-shirt, dark grey EA7 joggers, pink trainers, green lanyard, red therapy ball nearby, gym setting",
  },
  {
    slug: "toilet",
    title: "Toilet",
    scene: "sitting on toilet in a clean bathroom, modest and respectful framing",
  },
  {
    slug: "therapy-ball",
    title: "Therapy ball",
    scene:
      "standing next to a large blue therapy ball, one hand resting on top of the ball, object clearly visible",
  },
  {
    slug: "skierg",
    title: "Ski machine",
    scene: "using a SkiErg ski machine, pulling handles down, machine clearly visible",
  },
  {
    slug: "stretching",
    title: "Stretching",
    scene: "stretching arms overhead or touching toes on an exercise mat, calm pose",
  },
  {
    slug: "finished",
    title: "Finished",
    scene: "smiling with arms raised in celebration, finished workout, no extra props",
  },
];

/** Shared identity — always the same outfit and accessories in every card. */
export const SERINE_IDENTITY =
  "Serine, young woman, warm light skin, dark hair tied back, friendly smile, face matches reference photo. " +
  "ALWAYS wearing black-rimmed glasses and large over-ear headphones (black with red ear cups). " +
  "ALWAYS wearing the SAME dark charcoal Hello Kitty sweatshirt, black joggers, and white trainers with red accents.";

export const SERINE_2D_CHARACTER_PROMPT =
  `${SERINE_IDENTITY} ` +
  "Flat 2D vector illustration, clean outlines, simple shapes, white background, no floor shadow, " +
  "neurodiversity-friendly, bright soft colours, vertical portrait, no text.";

export const SERINE_3D_CHARACTER_PROMPT =
  `${SERINE_IDENTITY} ` +
  "Soft painterly 3D Pixar storybook illustration, vertical portrait, warm light, white background, no text.";

export function serineScenePrompt(style, item) {
  const character =
    style === "3d" ? SERINE_3D_CHARACTER_PROMPT : SERINE_2D_CHARACTER_PROMPT;
  return `${character} Scene: Serine ${item.scene}.`;
}

export function serineScheduleSlugs() {
  return SERINE_PHYSICAL_SCHEDULE.map((s) => s.slug);
}
