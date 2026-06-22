/**
 * Replace the illustration slot in a shower WOW pack card with a 3D designer PNG.
 * Keeps title band, category ribbon, and pack mark from the existing card.
 *
 *   node scripts/import-shower-3d-illustration.mjs brush-hair /path/to/3d-raw.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  BUNDLED_PACK_CARD_INSET,
  fitIllustrationToCard,
  NOW_W,
  NOW_H,
} from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const showerDir = path.join(root, "public", "cards", "shower");

function illustrationSlotRect(cardW, cardH) {
  const inset = BUNDLED_PACK_CARD_INSET;
  return {
    left: Math.round(cardW * inset.left),
    top: Math.round(cardH * inset.top),
    width: Math.round(cardW * (1 - inset.left - inset.right)),
    height: Math.round(cardH * (1 - inset.top - inset.bottom)),
  };
}

async function main() {
  const slug = process.argv[2];
  const srcPath = process.argv[3];

  if (!slug || !srcPath) {
    console.error(
      "Usage: node scripts/import-shower-3d-illustration.mjs <slug> /path/to/3d-raw.png",
    );
    process.exit(1);
  }

  const resolved = path.isAbsolute(srcPath) ? srcPath : path.join(root, srcPath);
  if (!fs.existsSync(resolved)) {
    console.error("Source not found:", resolved);
    process.exit(1);
  }

  const cardPath = path.join(showerDir, `${slug}.png`);
  if (!fs.existsSync(cardPath)) {
    console.error("Card not found:", cardPath);
    process.exit(1);
  }

  fs.mkdirSync(showerDir, { recursive: true });

  const rawDest = path.join(showerDir, `_raw-${slug}.png`);
  fs.copyFileSync(resolved, rawDest);

  const fittedIllustration = path.join(showerDir, `_fitted-${slug}.png`);
  await fitIllustrationToCard(resolved, fittedIllustration, {
    width: NOW_W,
    height: NOW_H,
    minPad: 0,
    fit: "contain",
    trim: true,
    trimThreshold: 18,
  });

  const cardMeta = await sharp(cardPath).metadata();
  const slot = illustrationSlotRect(cardMeta.width, cardMeta.height);

  const illustration = await sharp(fittedIllustration)
    .resize(slot.width, slot.height, { fit: "contain", background: "#ffffff" })
    .png()
    .toBuffer();

  const whitePatch = await sharp({
    create: {
      width: slot.width,
      height: slot.height,
      channels: 3,
      background: "#ffffff",
    },
  })
    .png()
    .toBuffer();

  const dest = cardPath;
  const tmpDest = path.join(showerDir, `_tmp-${slug}.png`);
  await sharp(cardPath)
    .composite([
      { input: whitePatch, left: slot.left, top: slot.top },
      { input: illustration, left: slot.left, top: slot.top },
    ])
    .png()
    .toFile(tmpDest);
  fs.renameSync(tmpDest, dest);

  fs.unlinkSync(fittedIllustration);
  console.log("ok:", path.relative(root, dest));
  console.log("raw:", path.relative(root, rawDest));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
