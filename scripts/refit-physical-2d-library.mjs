/**
 * Re-fit Physical 2D library PNGs with contain (no crop).
 *
 *   node scripts/refit-physical-2d-library.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";
import {
  FITNESS_2D_REFERENCES,
  resolveFitness2dReferencePath,
} from "./fitness-2d-reference-manifest.js";

const EXTRA_SLUGS = ["skis", "foam-roller", "stretching"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const libraryDir = path.join(root, "public", "images", "library");
const generalDir = path.join(root, "public", "cards", "day centre", "general");
const refBySlug = new Map(FITNESS_2D_REFERENCES.map((e) => [e.slug, e]));
const slugs = [
  ...FITNESS_2D_REFERENCES.map((e) => e.slug),
  ...EXTRA_SLUGS,
];

for (const slug of slugs) {
  const ref = refBySlug.get(slug);
  const src = ref
    ? resolveFitness2dReferencePath(ref)
    : path.join(libraryDir, `${slug}.png`);
  const dest = path.join(libraryDir, `${slug}.png`);
  const generalOut = path.join(generalDir, `${slug}.png`);

  if (!fs.existsSync(src)) {
    console.log("skip (missing):", slug);
    continue;
  }

  await fitIllustrationToCard(src, dest, {
    minPad: 36,
    fit: "contain",
    background: "#ffffff",
    trim: true,
    trimThreshold: 18,
  });
  if (fs.existsSync(generalDir)) {
    fs.copyFileSync(dest, generalOut);
  }
  console.log("ok:", slug);
}
