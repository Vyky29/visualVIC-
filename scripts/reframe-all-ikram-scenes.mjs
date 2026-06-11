/**
 * Re-frame all Ikram scene illustrations from RAW sources.
 * PixtoLearn: Now/Next 531×648, Focus 531×663 — safe margins (no edge clipping).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";
import { IKRAM_PECS_GRID } from "./ikram-pecs-grid-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

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

    await fitIllustrationToCard(src, path.join(scenesDir, `${slug}.png`));
    await fitIllustrationToCard(src, path.join(scenesDir, `${slug}-focus.png`), {
      height: FOCUS_H,
    });
    await fitIllustrationToCard(src, path.join(ikramDir, `${slug}.png`));

    console.log("ok:", slug);
    ok++;
  }

  console.log(`Done — ${ok} reframed, ${skip} skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
