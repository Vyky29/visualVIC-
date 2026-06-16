/**
 * Import designer 4×5 bundle with label band below each illustration.
 *
 * Cell layout per item:
 *   top 531×648  — illustration (imported)
 *   bottom 531×56 — label (discarded)
 *
 * Expected canvas: 2124 × 3520 px (or 2× retina 4248 × 7040).
 *
 *   node scripts/import-fitness-3d-designer-bundle.mjs /path/to/bundle.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";
import { FITNESS_3D_ITEMS } from "./pixtolearn-fitness-3d-items.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const srcPath = process.argv[2];
if (!srcPath) {
  console.error("Usage: node scripts/import-fitness-3d-designer-bundle.mjs /path/to/bundle.png");
  process.exit(1);
}

const outDir = path.join(root, "public", "images", "library-3d");
const rawDir = path.join(outDir, "_raw");

const COLS = 4;
const ROWS = 5;
const ILLUST_W = 531;
const ILLUST_H = 648;
const LABEL_H = 56;
const ROW_H = ILLUST_H + LABEL_H;

const SLUGS = FITNESS_3D_ITEMS.map((i) => i.slug);

async function main() {
  if (!fs.existsSync(srcPath)) {
    console.error("Source not found:", srcPath);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(rawDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  const cellW = Math.floor(meta.width / COLS);
  const rowH = Math.floor(meta.height / ROWS);
  const illustH = Math.min(ILLUST_H, rowH - 8);

  console.log(`Bundle ${meta.width}×${meta.height} → cell ${cellW}×${rowH}, crop illust ${cellW}×${illustH}`);

  for (let i = 0; i < SLUGS.length; i += 1) {
    const slug = SLUGS[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = col * cellW;
    const top = row * rowH;

    const buf = await sharp(srcPath)
      .extract({ left, top, width: cellW, height: illustH })
      .png()
      .toBuffer();

    const rawDest = path.join(rawDir, `${slug}.png`);
    const dest = path.join(outDir, `${slug}.png`);
    fs.writeFileSync(rawDest, buf);
    await fitIllustrationToCard(buf, dest, {
      minPad: 20,
      background: "#ffffff",
      trim: true,
      trimThreshold: 24,
    });
    console.log("ok:", slug);
  }

  console.log(`\nDone — ${SLUGS.length} cards → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
