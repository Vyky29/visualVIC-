/**
 * Import one Timi avatar scene from a 3D raw asset into card PNGs.
 *
 *   node scripts/import-timi-scene.mjs timis-car
 *   node scripts/import-timi-scene.mjs timi-shower
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/import-timi-scene.mjs <slug>");
  process.exit(1);
}

const assets =
  process.env.TIMI_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const timiDir = path.join(root, "public", "cards", "day centre", "timi");
const scenesDir = path.join(timiDir, "scenes");

async function main() {
  const slugStem = slug.replace(/^timi-/, "");
  const candidates = [
    path.join(assets, `timi-scene-${slug}-3d-raw.png`),
    path.join(assets, `timi-scene-${slugStem}-3d-raw.png`),
    path.join(scenesDir, `_raw-${slug}.png`),
  ];
  const src = candidates.find((p) => fs.existsSync(p));
  if (!src) {
    console.error("No raw source found for", slug, candidates);
    process.exit(1);
  }

  fs.mkdirSync(scenesDir, { recursive: true });
  const rawLocal = path.join(scenesDir, `_raw-${slug}.png`);
  if (src !== rawLocal) {
    fs.copyFileSync(src, rawLocal);
  }

  const fitOpts =
    slug === "timis-car"
      ? {
          fit: "contain",
          minPad: 28,
          trim: false,
          position: "centre",
        }
      : {
          fit: "cover-padded",
          minPad: 0,
          trim: true,
          trimThreshold: 18,
          position: "centre",
        };

  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}.png`), fitOpts);
  await fitIllustrationToCard(src, path.join(scenesDir, `${slug}-focus.png`), {
    ...fitOpts,
    height: FOCUS_H,
  });

  console.log("scene:", path.relative(root, scenesDir), slug);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
