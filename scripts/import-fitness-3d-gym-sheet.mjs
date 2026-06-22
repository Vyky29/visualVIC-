/**
 * Import designer 5×5 gym equipment sheet → library-3d-gym (531×648).
 *
 *   node scripts/import-fitness-3d-gym-sheet.mjs
 *   node scripts/import-fitness-3d-gym-sheet.mjs /path/to/sheet.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";
import { FITNESS_3D_GYM_SHEET } from "./fitness-3d-gym-sheet-manifest.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const defaultSrc = path.join(
  process.env.HOME ?? "/Users/victor",
  ".cursor",
  "projects",
  "Users-victor-cursor-visualVIC",
  "assets",
  "ChatGPT_Image_Jun_16__2026__11_40_58_PM-9aae175e-a7f6-4369-9a93-d55c2d0630fd.png",
);

const srcPath = process.argv[2] ?? defaultSrc;
const outDir = path.join(root, "public", "images", "library-3d-gym");

const COLS = 5;
const ROWS = 5;

async function main() {
  if (!fs.existsSync(srcPath)) {
    console.error("Source not found:", srcPath);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  const cellW = Math.floor(meta.width / COLS);
  const cellH = Math.floor(meta.height / ROWS);

  console.log(`Sheet ${meta.width}×${meta.height} → cell ${cellW}×${cellH}`);

  if (FITNESS_3D_GYM_SHEET.length !== COLS * ROWS) {
    console.error(
      `Manifest has ${FITNESS_3D_GYM_SHEET.length} items; expected ${COLS * ROWS}`,
    );
    process.exit(1);
  }

  for (let i = 0; i < FITNESS_3D_GYM_SHEET.length; i += 1) {
    const { slug, title } = FITNESS_3D_GYM_SHEET[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = col * cellW;
    const top = row * cellH;

    const buf = await sharp(srcPath)
      .extract({ left, top, width: cellW, height: cellH })
      .png()
      .toBuffer();

    const dest = path.join(outDir, `${slug}.png`);
    await fitIllustrationToCard(buf, dest, {
      minPad: 36,
      fit: "contain",
      background: "#ffffff",
      trim: true,
      trimThreshold: 18,
    });
    console.log(`ok: [${col},${row}] ${slug} — ${title}`);
  }

  console.log(`\nDone — ${FITNESS_3D_GYM_SHEET.length} cards → ${outDir}`);
  console.log("Update scripts/fitness-3d-gym-sheet-manifest.js when designer confirms names.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
