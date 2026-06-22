/**
 * Import curated picks from the designer 5×5 gym sheet (16 items, inset crop).
 *
 *   node scripts/import-fitness-3d-gym-curated.mjs /path/to/sheet.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";
import { FITNESS_3D_GYM_CURATED_SHEET } from "./fitness-3d-gym-curated-manifest.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const defaultSrc = path.join(
  process.env.HOME ?? "/Users/victor",
  "Pictures/Photos Library.photoslibrary/originals/3/3E5B328F-AF31-438E-BF33-E4540DDCFA9B.png",
);

const srcPath = process.argv[2] ?? defaultSrc;
const outDir = path.join(root, "public", "images", "library-3d-gym");
const rawDir = path.join(outDir, "_raw");

/** Shrink each cell extract to avoid neighbour bleed from grid lines. */
const CELL_INSET_FRAC = 0.075;

const COLS = 5;
const ROWS = 5;

async function extractCell(src, meta, col, row) {
  const cellW = meta.width / COLS;
  const cellH = meta.height / ROWS;
  const insetX = Math.round(cellW * CELL_INSET_FRAC);
  const insetY = Math.round(cellH * CELL_INSET_FRAC);
  const left = Math.round(col * cellW) + insetX;
  const top = Math.round(row * cellH) + insetY;
  const width = Math.max(1, Math.round(cellW) - insetX * 2);
  const height = Math.max(1, Math.round(cellH) - insetY * 2);

  return sharp(src)
    .extract({
      left: Math.min(left, meta.width - 1),
      top: Math.min(top, meta.height - 1),
      width: Math.min(width, meta.width - left),
      height: Math.min(height, meta.height - top),
    })
    .png()
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(srcPath)) {
    console.error("Source not found:", srcPath);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(rawDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  console.log(
    `Sheet ${meta.width}×${meta.height} — ${FITNESS_3D_GYM_CURATED_SHEET.length} curated cells (inset ${CELL_INSET_FRAC * 100}%)`,
  );

  for (const { slug, title, col, row } of FITNESS_3D_GYM_CURATED_SHEET) {
    const buf = await extractCell(srcPath, meta, col, row);
    const rawDest = path.join(rawDir, `${slug}.png`);
    const dest = path.join(outDir, `${slug}.png`);

    fs.writeFileSync(rawDest, buf);
    await fitIllustrationToCard(buf, dest, {
      minPad: 28,
      fit: "contain",
      background: "#ffffff",
      trim: true,
      trimThreshold: 14,
    });
    console.log(`ok: [${col},${row}] ${slug} — ${title}`);
  }

  console.log(`\nDone — ${FITNESS_3D_GYM_CURATED_SHEET.length} → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
