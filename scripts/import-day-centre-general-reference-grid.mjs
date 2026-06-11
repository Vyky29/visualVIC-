/**
 * Import Level 1 reference grid → Generic Day Centre cards (531×648).
 * Source: Cursor assets grid (4×3 cells).
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
  "image-e8f79c28-73f1-4264-b634-b1806ca78f85.png",
);

const srcPath = process.argv[2] ?? defaultSrc;
const outDir = path.join(root, "public", "cards", "day centre", "general");

/** @type {Array<{ slug: string; col: number; row: number; colSpan?: number; split?: "left" | "right"; pad?: number; noTrim?: boolean; centerScale?: number; inset?: { top?: number; bottom?: number; left?: number; right?: number } }>} */
const CELLS = [
  { slug: "music", col: 0, row: 0, inset: { right: 28 } },
  { slug: "cafe", col: 1, row: 0, inset: { left: 56, right: 20 } },
  { slug: "black-nail-varnish", col: 2, row: 0, split: "right", inset: { left: 12 } },
  { slug: "bus", col: 3, row: 0, inset: { left: 16, top: 12, bottom: 12 } },
  { slug: "westfield", col: 0, row: 1, inset: { right: 20, bottom: 16 } },
  { slug: "mcdonalds", col: 1, row: 1, inset: { left: 16, right: 16, top: 12, bottom: 12 } },
  { slug: "bean-bag", col: 3, row: 1, inset: { top: 28, left: 16 } },
  { slug: "cab", col: 0, row: 2, inset: { right: 24, top: 12, bottom: 16 } },
  { slug: "home", col: 1, row: 2, split: "right", pad: 8, inset: { left: 12, bottom: 12 } },
  {
    slug: "finished",
    col: 2,
    row: 2,
    colSpan: 2,
    inset: { left: 128, right: 24, bottom: 16 },
  },
];

async function extractCell(meta, cell) {
  const cw = Math.floor(meta.width / 4);
  const ch = Math.floor(meta.height / 3);
  const span = cell.colSpan ?? 1;
  let left = cell.col * cw;
  let top = cell.row * ch;
  let width = cw * span;
  let height = ch;

  if (cell.split === "left") {
    width = Math.floor(cw / 2);
  } else if (cell.split === "right") {
    left += Math.floor(cw / 2);
    width = Math.floor(cw / 2);
  }

  const inset = cell.inset ?? {};
  left += inset.left ?? 0;
  top += inset.top ?? 0;
  width -= (inset.left ?? 0) + (inset.right ?? 0);
  height -= (inset.top ?? 0) + (inset.bottom ?? 0);

  let img = sharp(srcPath).extract({ left, top, width, height });
  if (cell.pad) {
    img = img.extend({
      top: cell.pad,
      bottom: cell.pad,
      left: cell.pad,
      right: cell.pad,
      background: { r: 255, g: 255, b: 255 },
    });
  }

  return img.png().toBuffer();
}

async function toCard(cellBuffer, dest) {
  await fitIllustrationToCard(cellBuffer, dest);
}

async function main() {
  if (!fs.existsSync(srcPath)) {
    console.error("Source grid not found:", srcPath);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(srcPath).metadata();

  for (const cell of CELLS) {
    const rawDest = path.join(outDir, `_raw-${cell.slug}.png`);
    const dest = path.join(outDir, `${cell.slug}.png`);
    const buf = await extractCell(meta, cell);
    fs.writeFileSync(rawDest, buf);
    await toCard(buf, dest);
    console.log("ok:", cell.slug);
  }

  console.log(`Done — ${CELLS.length} cards → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
