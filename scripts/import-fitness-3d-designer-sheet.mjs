/**
 * Import designer 4×5 fitness 3D bundle (no label band — illustration fills each cell).
 *
 *   node scripts/import-fitness-3d-designer-sheet.mjs /path/to/sheet.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const defaultSrc = path.join(
  process.env.HOME ?? "/Users/victor",
  ".cursor",
  "projects",
  "Users-victor-cursor-visualVIC",
  "assets",
  "composer-annotation-c1b3518f-7fc5-44b0-9c6e-e027d0517c4c.png",
);

const srcPath = process.argv[2] ?? defaultSrc;
const outDir = path.join(root, "public", "images", "library-3d");
const rawDir = path.join(outDir, "_raw");

const COLS = 4;
const ROWS = 5;

/** Row-major order matching the designer sheet (Jun 2026). */
const GRID_SLUGS = [
  "therapy-ball",
  "trampoline",
  "step-platform",
  "treadmill",
  "exercise-machine",
  "row-machine",
  "skis",
  "exercise-bike",
  "resistance-bands",
  "bosu",
  "kettlebell",
  "medicine-ball",
  "jump-rope",
  "punching-bag",
  "agility-ladder",
  "balance-board",
  "weights",
  "foam-roller",
  "exercise-mat",
  "weights",
];

async function main() {
  if (!fs.existsSync(srcPath)) {
    console.error("Source not found:", srcPath);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(rawDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  const cellW = Math.floor(meta.width / COLS);
  const cellH = Math.floor(meta.height / ROWS);

  console.log(`Sheet ${meta.width}×${meta.height} → cell ${cellW}×${cellH}`);

  const seen = new Set();

  for (let i = 0; i < GRID_SLUGS.length; i += 1) {
    const slug = GRID_SLUGS[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = col * cellW;
    const top = row * cellH;

    const buf = await sharp(srcPath)
      .extract({ left, top, width: cellW, height: cellH })
      .png()
      .toBuffer();

    const rawDest = path.join(rawDir, `${slug}.png`);
    const dest = path.join(outDir, `${slug}.png`);
    fs.writeFileSync(rawDest, buf);

    if (seen.has(slug)) {
      console.log(`skip overwrite (duplicate cell): ${slug} [${col},${row}]`);
      continue;
    }
    seen.add(slug);

    await fitIllustrationToCard(buf, dest, {
      minPad: 16,
      background: "#ffffff",
      trim: true,
      trimThreshold: 18,
    });
    console.log("ok:", slug);
  }

  console.log("\nNote: stretching not on sheet — kept existing library-3d/stretching.png");
  console.log(`Done → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
