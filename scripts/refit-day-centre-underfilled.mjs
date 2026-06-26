/**
 * Re-fit under-filled Day centre general cards so illustrations fill the slot.
 *
 * Scenes / photos → cover (full bleed, may crop edges).
 * Objects / PECS items → contain with minimal pad (enlarged, never cropped).
 *
 * Only touches cards whose trimmed content fills < 92% of the 531×648 slot.
 *
 *   node scripts/refit-day-centre-underfilled.mjs
 *   node scripts/refit-day-centre-underfilled.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, NOW_W, NOW_H } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const generalDir = path.join(root, "public", "cards", "day centre", "general");

const FILL_THRESHOLD = 0.92;
const dryRun = process.argv.includes("--dry-run");

/** Groups treated as full-bleed scenes (cover). */
const SCENE_GROUPS = new Set([
  "activities-leisure",
  "community",
  "places-extras",
  "shopping",
  "personal-care",
  "activities-cooking",
]);

/** Slugs in object groups that are still environment/action scenes. */
const SCENE_SLUGS = new Set([
  "eat",
  "breakfast",
  "dinner",
  "packed-lunch",
  "restaurant",
  "mcdonalds",
  "birthday-party",
  "birthday-cake",
]);

/** Slugs in scene groups that should stay as isolated objects. */
const OBJECT_SLUGS = new Set([
  "flip-flops",
  "bean-bag",
  "shopping-basket",
  "black-nail-varnish",
  "queue",
  "pay",
]);

// Inline slug → group map (mirrors day-centre-library-groups.ts).
const SLUG_GROUP = {
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
  "exercise-machine": "fitness-held",
  "row-machine": "fitness-held",
  skis: "fitness-held",
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
  paintbrush: "materials-art",
  "paint-palette": "materials-art",
  scissors: "materials-art",
  "glue-stick": "materials-art",
  "coloured-paper": "materials-art",
  ipad: "technology",
  tablet: "technology",
  whiteboard: "technology",
  laptop: "technology",
  "jigsaw-puzzle": "activities-cognitive",
  "sorting-trays": "activities-cognitive",
  "matching-cards": "activities-cognitive",
  "play-dough": "activities-cognitive",
  pizza: "activities-cooking",
  cooking: "activities-cooking",
  painting: "activities-cooking",
  peeling: "activities-cooking",
  toilet: "personal-care",
  shower: "personal-care",
  "wash-hands": "personal-care",
  "brush-teeth": "personal-care",
  "get-dressed": "personal-care",
  "hair-care": "personal-care",
  bus: "community",
  tube: "community",
  cab: "community",
  walk: "community",
  "cross-road": "community",
  wait: "community",
  home: "community",
  "bus-stop": "community",
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
  "sensory-room": "activities-leisure",
  "flip-flops": "activities-leisure",
  library: "activities-leisure",
  music: "activities-leisure",
  "bean-bag": "activities-leisure",
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
  help: "communication",
  stop: "communication",
  finished: "communication",
  more: "communication",
  yes: "communication",
  no: "communication",
  "not-now": "communication",
  "community-centre": "places-extras",
  "hub-room": "places-extras",
  "make-up": "places-extras",
  "birthday-cake": "places-extras",
  "birthday-party": "places-extras",
};

function groupForSlug(slug) {
  return SLUG_GROUP[slug] ?? "places-extras";
}

function isSceneCard(slug) {
  if (slug.startsWith("timi-")) return true;
  if (OBJECT_SLUGS.has(slug)) return false;
  if (SCENE_SLUGS.has(slug)) return true;
  return SCENE_GROUPS.has(groupForSlug(slug));
}

async function measureFill(cardPath) {
  try {
    const { data, info } = await sharp(cardPath)
      .trim({ threshold: 12, background: "#ffffff" })
      .toBuffer({ resolveWithObject: true });
    return {
      fillW: info.width / NOW_W,
      fillH: info.height / NOW_H,
      trimmedW: info.width,
      trimmedH: info.height,
    };
  } catch {
    return { fillW: 1, fillH: 1, trimmedW: NOW_W, trimmedH: NOW_H };
  }
}

function resolveSource(slug) {
  const raw = path.join(generalDir, `_raw-${slug}.png`);
  const card = path.join(generalDir, `${slug}.png`);
  if (fs.existsSync(raw)) return raw;
  if (fs.existsSync(card)) return card;
  return null;
}

const files = fs
  .readdirSync(generalDir)
  .filter((f) => f.endsWith(".png") && !f.startsWith("_raw"));

let processed = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace(/\.png$/, "");
  const dest = path.join(generalDir, file);
  const fill = await measureFill(dest);

  if (fill.fillW >= FILL_THRESHOLD && fill.fillH >= FILL_THRESHOLD) {
    skipped++;
    continue;
  }

  const src = resolveSource(slug);
  if (!src) {
    console.log("skip (no source):", slug);
    skipped++;
    continue;
  }

  const scene = isSceneCard(slug);
  // Objects: skip when already maxed on the long axis (thin items stay letterboxed).
  if (!scene && Math.max(fill.fillW, fill.fillH) >= FILL_THRESHOLD) {
    skipped++;
    continue;
  }

  const mode = scene ? "cover" : "contain";
  const opts = scene
    ? { fit: "cover", trim: true, trimThreshold: 18, minPad: 0, position: "centre" }
    : { fit: "contain", minPad: 8, trim: true, trimThreshold: 18 };

  console.log(
    `${dryRun ? "[dry] " : ""}${slug}: ${mode} (was ${(fill.fillW * 100).toFixed(0)}%×${(fill.fillH * 100).toFixed(0)}%)`,
  );

  if (!dryRun) {
    const out =
      path.resolve(src) === path.resolve(dest)
        ? path.join(generalDir, `.refit-tmp-${slug}.png`)
        : dest;
    await fitIllustrationToCard(src, out, opts);
    if (out !== dest) {
      fs.renameSync(out, dest);
    }
  }
  processed++;
}

console.log(
  `\n${dryRun ? "Would process" : "Processed"} ${processed}, skipped ${skipped} (already filled or missing).`,
);
