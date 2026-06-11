/**
 * Verify PixtoLearn card PNGs: correct size + no subject inside the safe margin.
 *
 * Usage:
 *   node scripts/verify-card-framing.mjs
 *   node scripts/verify-card-framing.mjs public/cards/day\ centre/general
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { FOCUS_H, MIN_PAD, NOW_H, NOW_W } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const WHITE_THRESH = 245;
const DARK_RATIO_LIMIT = 0.005;

const DEFAULT_DIRS = [
  path.join(root, "public", "cards", "day centre", "general"),
  path.join(root, "public", "cards", "day centre", "ikram"),
  path.join(root, "public", "cards", "day centre", "ikram", "scenes"),
];

function listPngs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".png") && !f.startsWith("_"))
    .map((f) => path.join(dir, f));
}

async function checkMargins(file) {
  const meta = await sharp(file).metadata();
  const expectedH = file.endsWith("-focus.png") ? FOCUS_H : NOW_H;
  const issues = [];

  if (meta.width !== NOW_W || meta.height !== expectedH) {
    issues.push(`size:${meta.width}x${meta.height}`);
  }

  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const bands = [
    ["top", 0, width, 0, MIN_PAD],
    ["bottom", 0, width, height - MIN_PAD, height],
    ["left", 0, MIN_PAD, 0, height],
    ["right", width - MIN_PAD, width, 0, height],
  ];

  for (const [name, x0, x1, y0, y1] of bands) {
    let dark = 0;
    let total = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * width + x) * channels;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 20) continue;
        total++;
        if (r < WHITE_THRESH || g < WHITE_THRESH || b < WHITE_THRESH) dark++;
      }
    }
    if (total > 0 && dark / total > DARK_RATIO_LIMIT) {
      issues.push(name);
    }
  }

  return issues;
}

async function main() {
  const dirs = process.argv.slice(2).map((d) => (path.isAbsolute(d) ? d : path.join(root, d)));
  const targets = dirs.length ? dirs : DEFAULT_DIRS;

  let bad = 0;
  let ok = 0;

  for (const dir of targets) {
    for (const file of listPngs(dir)) {
      const issues = await checkMargins(file);
      const rel = path.relative(root, file);
      if (issues.length) {
        console.log("FAIL", rel, "→", issues.join(", "));
        bad++;
      } else {
        ok++;
      }
    }
  }

  console.log(`\n${ok} ok, ${bad} failed (safe margin ${MIN_PAD}px, frame ${NOW_W}×${NOW_H}/${FOCUS_H})`);
  if (bad) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
