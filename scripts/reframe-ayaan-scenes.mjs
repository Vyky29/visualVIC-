/**
 * Re-export all Ayaan scene PNGs from saved `_raw-*.png` sources.
 *
 *   node scripts/reframe-ayaan-scenes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const ayaanDir = path.join(root, "public", "cards", "day centre", "ayaan");
const scenesDir = path.join(ayaanDir, "scenes");
const scenes2dDir = path.join(ayaanDir, "scenes-2d");

async function reframeFromRaw(slug, src) {
  const base = {
    fit: "cover-padded",
    minPad: 0,
    trim: true,
    trimThreshold: 18,
    position: "centre",
  };
  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}.png`), base);
  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}-focus.png`), {
    ...base,
    height: FOCUS_H,
  });
  await fitIllustrationToCard(src, path.join(ayaanDir, `${slug}.png`), base);

  const raw2d = path.join(scenes2dDir, `_raw-${slug}.png`);
  const src2d = fs.existsSync(raw2d) ? raw2d : src;
  await fitIllustrationToCard(src2d, path.join(scenes2dDir, `${slug}.png`), {
    fit: "cover-padded",
  });
  await fitIllustrationToCard(
    src2d,
    path.join(scenes2dDir, `${slug}-focus.png`),
    {
      fit: "cover-padded",
      height: FOCUS_H,
    },
  );

  console.log("reframed:", slug);
}

async function main() {
  const rawFiles = fs
    .readdirSync(scenesDir)
    .filter((name) => name.startsWith("_raw-") && name.endsWith(".png"));

  if (rawFiles.length === 0) {
    console.error("No _raw-*.png files in", scenesDir);
    process.exit(1);
  }

  for (const file of rawFiles.sort()) {
    const slug = file.slice("_raw-".length, -".png".length);
    await reframeFromRaw(slug, path.join(scenesDir, file));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
