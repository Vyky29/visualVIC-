/**
 * Import one Ayaan scene from 2D / 3D raw assets into card PNGs.
 *
 *   node scripts/import-ayaan-scene.mjs weight-ball
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/import-ayaan-scene.mjs <slug>");
  process.exit(1);
}

const assets =
  process.env.AYAAN_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const ayaanDir = path.join(root, "public", "cards", "day centre", "ayaan");
const scenesDir = path.join(ayaanDir, "scenes");
const scenes2dDir = path.join(ayaanDir, "scenes-2d");

async function publish(style, src, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const rawLocal = path.join(scenesDir, `_raw-${slug}.png`);
  if (style === "3d" && src !== rawLocal) {
    fs.copyFileSync(src, rawLocal);
  }

  await fitIllustrationToCard(src, path.join(outDir, `${slug}.png`), {
    fit: "cover-padded",
    minPad: 0,
    trim: true,
    trimThreshold: 18,
    position: "centre",
  });
  await fitIllustrationToCard(src, path.join(outDir, `${slug}-focus.png`), {
    fit: "cover-padded",
    minPad: 0,
    trim: true,
    trimThreshold: 18,
    position: "centre",
    height: FOCUS_H,
  });

  if (style === "3d") {
    await fitIllustrationToCard(src, path.join(ayaanDir, `${slug}.png`), {
      fit: "cover-padded",
      minPad: 0,
      trim: true,
      trimThreshold: 18,
      position: "centre",
    });
  }

  console.log(`${style}:`, path.relative(root, outDir));
}

async function main() {
  const raw2d = path.join(assets, `ayaan-2d-${slug}-raw.png`);
  const raw3d = path.join(assets, `ayaan-3d-${slug}-raw.png`);

  if (fs.existsSync(raw2d)) {
    await publish("2d", raw2d, scenes2dDir);
  } else {
    console.warn("missing 2d raw:", raw2d);
  }

  if (fs.existsSync(raw3d)) {
    await publish("3d", raw3d, scenesDir);
  } else {
    console.warn("missing 3d raw:", raw3d);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
