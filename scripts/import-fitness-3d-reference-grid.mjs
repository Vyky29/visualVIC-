/**
 * Import 3D fitness reference grid → Physical · 3D library (531×648).
 *
 * Default source: user ChatGPT 3D fitness grid (3×4 cells, portrait).
 *
 *   node scripts/import-fitness-3d-reference-grid.mjs
 *   node scripts/import-fitness-3d-reference-grid.mjs /path/to/grid.png
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
  "ChatGPT_Image_Jun_16__2026__10_00_17_PM-d512b28a-7a6c-441b-90fb-1924fbf2a43e.png",
);

const srcPath = process.argv[2] ?? defaultSrc;
const outDir = path.join(root, "public", "images", "library-3d");
const rawDir = path.join(outDir, "_raw");

/** 3 columns × 4 rows on the reference sheet. */
const GRID_COLS = 3;
const GRID_ROWS = 4;

/**
 * @type {Array<{
 *   slug: string;
 *   col: number;
 *   row: number;
 *   minPad?: number;
 *   background?: string;
 *   trim?: boolean;
 * }>}
 */
const CELLS = [
  { slug: "therapy-ball", col: 0, row: 0, minPad: 20, background: "#ffffff", trim: true },
  { slug: "trampoline", col: 1, row: 0, minPad: 20, background: "#ffffff", trim: true },
  { slug: "step-platform", col: 2, row: 0, minPad: 20, background: "#ffffff", trim: true },
  { slug: "exercise-machine", col: 0, row: 1, minPad: 20, background: "#ffffff", trim: true },
  { slug: "treadmill", col: 2, row: 1, minPad: 20, background: "#ffffff", trim: true },
  { slug: "exercise-mat", col: 1, row: 2, minPad: 20, background: "#ffffff", trim: true },
  { slug: "foam-roller", col: 2, row: 2, minPad: 20, background: "#ffffff", trim: true },
  { slug: "stretching", col: 1, row: 3, minPad: 16, background: "#ffffff", trim: true },
];

async function extractCell(meta, cell) {
  const cw = Math.floor(meta.width / GRID_COLS);
  const ch = Math.floor(meta.height / GRID_ROWS);
  const left = cell.col * cw;
  const top = cell.row * ch;

  return sharp(srcPath)
    .extract({ left, top, width: cw, height: ch })
    .png()
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(srcPath)) {
    console.error("Source grid not found:", srcPath);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(rawDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  console.log(`Grid ${meta.width}×${meta.height} → cell ~${Math.floor(meta.width / GRID_COLS)}×${Math.floor(meta.height / GRID_ROWS)}`);

  for (const cell of CELLS) {
    const rawDest = path.join(rawDir, `${cell.slug}.png`);
    const dest = path.join(outDir, `${cell.slug}.png`);
    const buf = await extractCell(meta, cell);
    fs.writeFileSync(rawDest, buf);
    await fitIllustrationToCard(buf, dest, {
      minPad: cell.minPad ?? 24,
      background: cell.background ?? "#ffffff",
      trim: cell.trim ?? true,
      trimThreshold: 24,
    });
    console.log("ok:", cell.slug);
  }

  console.log(`\nDone — ${CELLS.length} cards → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
