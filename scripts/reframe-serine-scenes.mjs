/**
 * Re-export all Serine scene PNGs from saved `_raw-*.png` sources.
 *
 *   node scripts/reframe-serine-scenes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const serineDir = path.join(root, "public", "cards", "day centre", "serine");
const scenesDir = path.join(serineDir, "scenes");
const scenes2dDir = path.join(serineDir, "scenes-2d");

const FIT = { fit: "cover-padded", position: "north" };

async function reframeFromRaw(slug, src) {
  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}.png`), FIT);
  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}-focus.png`), {
    ...FIT,
    height: FOCUS_H,
  });
  await fitIllustrationToCard(src, path.join(serineDir, `${slug}.png`), FIT);

  const raw2d = path.join(scenes2dDir, `_raw-${slug}.png`);
  const src2d = fs.existsSync(raw2d) ? raw2d : src;
  if (fs.existsSync(scenes2dDir)) {
    await fitIllustrationToCard(src2d, path.join(scenes2dDir, `${slug}.png`), FIT);
    await fitIllustrationToCard(
      src2d,
      path.join(scenes2dDir, `${slug}-focus.png`),
      { ...FIT, height: FOCUS_H },
    );
  }

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
