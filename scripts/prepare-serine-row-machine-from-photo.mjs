/**
 * Crop Serine gym row-machine reference — isolate subject + Concept2 rail.
 * Removes trainer / foreground legs by tight extract, then exports card PNGs.
 *
 *   node scripts/prepare-serine-row-machine-from-photo.mjs [source.png]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const defaultSrc = path.join(
  process.env.HOME ?? "/Users/victor",
  ".cursor/projects/Users-victor-cursor-visualVIC/assets/image-6b1c705c-dfd9-4fc4-929c-e1f30d2a1083.png",
);

const src = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;
if (!fs.existsSync(src)) {
  console.error("source not found:", src);
  process.exit(1);
}

const serineDir = path.join(root, "public/cards/day centre/serine");
const scenesDir = path.join(serineDir, "scenes");
const refDir = path.join(serineDir, "_references");
const assetsDir =
  process.env.SERINE_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor/projects/Users-victor-cursor-visualVIC/assets",
  );

/** Fraction of full frame — tuned for gym photo with trainer on the right. */
const CROP_FRAC = {
  left: 0.14,
  top: 0.08,
  width: 0.46,
  height: 0.72,
};

async function main() {
  const meta = await sharp(src).metadata();
  const crop = {
    left: Math.round(meta.width * CROP_FRAC.left),
    top: Math.round(meta.height * CROP_FRAC.top),
    width: Math.round(meta.width * CROP_FRAC.width),
    height: Math.round(meta.height * CROP_FRAC.height),
  };

  const cropped = await sharp(src)
    .extract(crop)
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();

  fs.mkdirSync(scenesDir, { recursive: true });
  fs.mkdirSync(refDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });

  const copies = [
    path.join(assetsDir, "serine-3d-row-machine-raw.png"),
    path.join(scenesDir, "_raw-row-machine.png"),
    path.join(refDir, "serine-row-machine.png"),
  ];
  for (const dest of copies) {
    fs.writeFileSync(dest, cropped);
  }

  const fit = { fit: "cover-padded", position: "north" };
  await fitIllustrationToCard(cropped, path.join(scenesDir, "row-machine.png"), fit);
  await fitIllustrationToCard(cropped, path.join(scenesDir, "row-machine-focus.png"), {
    ...fit,
    height: FOCUS_H,
  });
  await fitIllustrationToCard(cropped, path.join(serineDir, "row-machine.png"), fit);

  console.log("source:", src);
  console.log("crop:", crop);
  console.log("Done — row-machine scene + _raw exported.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
