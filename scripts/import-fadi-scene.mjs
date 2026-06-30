/**
 * Import one Fadi scene from a 3D raw asset into card PNGs.
 *
 *   node scripts/import-fadi-scene.mjs yellow-bib-walk
 *   node scripts/import-fadi-scene.mjs happy
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/import-fadi-scene.mjs <slug>");
  process.exit(1);
}

const assets =
  process.env.FADI_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const fadiDir = path.join(root, "public", "cards", "day centre", "fadi");
const scenesDir = path.join(fadiDir, "scenes");
const emotionsDir = path.join(fadiDir, "emotions");

async function publishScene(src) {
  fs.mkdirSync(scenesDir, { recursive: true });
  const rawLocal = path.join(scenesDir, `_raw-${slug}.png`);
  if (src !== rawLocal) {
    fs.copyFileSync(src, rawLocal);
  }

  const fitOpts = {
    fit: "cover-padded",
    minPad: 0,
    trim: true,
    trimThreshold: 18,
    position: "centre",
  };

  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}.png`), fitOpts);
  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}-focus.png`), {
    ...fitOpts,
    height: FOCUS_H,
  });
  await fitIllustrationToCard(src, path.join(fadiDir, `${slug}.png`), fitOpts);

  console.log("scene:", path.relative(root, scenesDir));
}

async function publishEmotion(src) {
  fs.mkdirSync(emotionsDir, { recursive: true });
  const rawLocal = path.join(emotionsDir, `_raw-${slug}.png`);
  if (src !== rawLocal) {
    fs.copyFileSync(src, rawLocal);
  }

  const fitOpts = {
    fit: "cover-padded",
    minPad: 8,
    trim: true,
    trimThreshold: 18,
    position: "centre",
  };

  await fitIllustrationToCard(src, path.join(emotionsDir, `${slug}.png`), fitOpts);
  await fitIllustrationToCard(
    src,
    path.join(scenesDir, `${slug}.png`),
    fitOpts,
  );
  await fitIllustrationToCard(src, path.join(fadiDir, `${slug}.png`), fitOpts);
  await fitIllustrationToCard(
    src,
    path.join(scenesDir, `${slug}-focus.png`),
    { ...fitOpts, height: FOCUS_H },
  );

  console.log("emotion:", path.relative(root, emotionsDir));
}

async function main() {
  const candidates = [
    path.join(assets, `fadi-3d-${slug}-raw.png`),
    path.join(scenesDir, `_raw-${slug}.png`),
  ];
  const src = candidates.find((p) => fs.existsSync(p));
  if (!src) {
    console.error("No raw source found for", slug);
    process.exit(1);
  }

  if (slug === "happy") {
    await publishEmotion(src);
  } else {
    await publishScene(src);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
