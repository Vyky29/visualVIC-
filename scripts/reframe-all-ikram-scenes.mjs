/**
 * Re-frame all Ikram scene illustrations from RAW sources.
 * PixtoLearn: Now/Next 531×648, Focus 531×663, cover crop (no letterboxing).
 *
 * Default crop: centre (keeps Ikram in frame).
 * Vehicle scenes: right anchor (window was stealing attention crop).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { IKRAM_PECS_GRID } from "./ikram-pecs-grid-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const NOW_W = 531;
const NOW_H = 648;
const FOCUS_H = 663;

const assets =
  process.env.IKRAM_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const ikramDir = path.join(root, "public", "cards", "day centre", "ikram");
const scenesDir = path.join(ikramDir, "scenes");

const SCHEDULE_EXTRAS = [
  "music",
  "westfield",
  "black-nail-varnish",
  "mcdonalds",
  "bus-return",
  "bean-bag",
  "cab",
];

const ALL_SLUGS = [
  ...IKRAM_PECS_GRID.map((g) => g.slug),
  ...SCHEDULE_EXTRAS.filter((s) => !IKRAM_PECS_GRID.some((g) => g.slug === s)),
];

/** Scenes where the subject sits by a window — anchor crop on the right. */
const CROP_RIGHT = new Set(["bus", "bus-return", "taxi", "cab"]);

function cropPosition(slug) {
  return CROP_RIGHT.has(slug) ? "right" : "centre";
}

function rawAssetNames(slug) {
  const names = [
    `ikram-pecs-${slug}-raw.png`,
    `ikram-scene-${slug}-raw.png`,
  ];
  if (slug === "black-nail-varnish") {
    names.push("ikram-scene-nail-varnish-raw.png");
  }
  return names;
}

function resolveSrc(slug) {
  // Prefer Cursor asset raws (personalised scenes) over stale local _raw copies.
  const candidates = [
    ...rawAssetNames(slug).map((n) => path.join(assets, n)),
    path.join(scenesDir, `_raw-${slug}.png`),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function writeCrop(src, dest, height, position) {
  await sharp(src)
    .resize(NOW_W, height, { fit: "cover", position })
    .png()
    .toFile(dest);
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });

  let ok = 0;
  let skip = 0;

  for (const slug of ALL_SLUGS) {
    const src = resolveSrc(slug);
    if (!src) {
      console.warn("skip — no raw:", slug);
      skip++;
      continue;
    }

    const rawLocal = path.join(scenesDir, `_raw-${slug}.png`);
    if (src !== rawLocal) {
      fs.copyFileSync(src, rawLocal);
    }

    const pos = cropPosition(slug);
    await writeCrop(src, path.join(scenesDir, `${slug}.png`), NOW_H, pos);
    await writeCrop(src, path.join(scenesDir, `${slug}-focus.png`), FOCUS_H, pos);
    await writeCrop(src, path.join(ikramDir, `${slug}.png`), NOW_H, pos);

    console.log("ok:", slug, `(${pos})`);
    ok++;
  }

  console.log(`Done — ${ok} reframed, ${skip} skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
