/**
 * Import illustration from a full PixtoLearn designer card (core / shower / etc.)
 * into Level 1 general/{slug}.png (531×648 illustration-only).
 *
 * Drops the bottom title band, trims white, centres in the card frame.
 *
 * Usage: node scripts/import-day-centre-from-pack-card.mjs <slug> <pack-card.png>
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "cards", "day centre", "general");

/** Default fraction of card height kept (excludes bottom title label). */
const DEFAULT_BODY_HEIGHT_FRAC = 0.78;

/** Per-slug tuning after inspecting pack card layouts. */
const SLUG_BODY_FRAC = {
  shower: 0.72,
  "brush-teeth": 0.72,
};

async function extractIllustration(srcPath, bodyFrac) {
  const meta = await sharp(srcPath).metadata();
  const bodyH = Math.round(meta.height * bodyFrac);

  const cropped = await sharp(srcPath)
    .extract({ left: 0, top: 0, width: meta.width, height: bodyH })
    .png()
    .toBuffer();

  try {
    return await sharp(cropped)
      .trim({ threshold: 12, background: "#ffffff" })
      .png()
      .toBuffer();
  } catch {
    return cropped;
  }
}

async function main() {
  const slug = process.argv[2];
  const srcPath = process.argv[3];
  const bodyFrac =
    Number(process.argv[4]) ||
    SLUG_BODY_FRAC[slug] ||
    DEFAULT_BODY_HEIGHT_FRAC;

  if (!slug || !srcPath) {
    console.error(
      "Usage: node scripts/import-day-centre-from-pack-card.mjs <slug> <pack-card.png>",
    );
    process.exit(1);
  }

  const resolved = path.isAbsolute(srcPath) ? srcPath : path.join(root, srcPath);
  if (!fs.existsSync(resolved)) {
    console.error("Source not found:", resolved);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const extracted = await extractIllustration(resolved, bodyFrac);
  const rawDest = path.join(outDir, `_raw-${slug}.png`);
  const dest = path.join(outDir, `${slug}.png`);

  fs.writeFileSync(rawDest, extracted);
  await fitIllustrationToCard(extracted, dest);

  console.log("ok:", path.relative(root, dest));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
