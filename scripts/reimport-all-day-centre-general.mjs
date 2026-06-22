/**
 * Re-import all Level 1 Generic Day Centre cards:
 * 1) Bundled WOW pack cards (core / shower) — crop illustration, hide logo
 * 2) Designer `_raw-*.png` — scale to 531×648, no trim/pad
 *
 *   node scripts/reimport-all-day-centre-general.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  importBundledPackCardIllustration531x648,
  importDesignerIllustration531x648,
} from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "cards", "day centre", "general");

/** Slugs sourced from full bundled pack PNGs (not designer `_raw`). */
const PACK_IMPORTS = [
  ["help", "public/cards/core/help.png"],
  ["stop", "public/cards/core/stop.png"],
  ["more", "public/cards/core/more.png"],
  ["finished", "public/cards/core/finish.png"],
  ["yes", "public/cards/core/yes.png"],
  ["no", "public/cards/core/no.png"],
  ["wait", "public/cards/core/wait.png"],
  ["walk", "public/cards/core/walk.png"],
  ["toilet", "public/cards/core/toilet.png"],
  ["wash-hands", "public/cards/core/wash-hands.png"],
  ["eat", "public/cards/core/eat.png"],
  ["drink", "public/cards/core/drink.png"],
  ["shower", "public/cards/shower/shower.png"],
];

async function importFromPack(slug, relSrc) {
  const src = path.join(root, relSrc);
  if (!fs.existsSync(src)) {
    console.warn("skip pack (missing):", slug, relSrc);
    return false;
  }
  const rawDest = path.join(outDir, `_raw-${slug}.png`);
  const dest = path.join(outDir, `${slug}.png`);
  await importBundledPackCardIllustration531x648(src, dest);
  fs.copyFileSync(dest, rawDest);
  console.log("pack:", slug);
  return true;
}

async function importFromDesignerRaw(slug) {
  const src = path.join(outDir, `_raw-${slug}.png`);
  const dest = path.join(outDir, `${slug}.png`);
  if (!fs.existsSync(src)) return false;
  await importDesignerIllustration531x648(src, dest);
  console.log("raw:", slug);
  return true;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const packSlugs = new Set();
  let packOk = 0;
  for (const [slug, relSrc] of PACK_IMPORTS) {
    if (await importFromPack(slug, relSrc)) {
      packSlugs.add(slug);
      packOk++;
    }
  }

  const raws = fs
    .readdirSync(outDir)
    .filter((f) => f.startsWith("_raw-") && f.endsWith(".png"))
    .sort();

  let rawOk = 0;
  for (const raw of raws) {
    const slug = raw.slice(5, -4);
    if (packSlugs.has(slug)) continue;
    if (await importFromDesignerRaw(slug)) rawOk++;
  }

  console.log(`Done — ${packOk} pack + ${rawOk} designer → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
