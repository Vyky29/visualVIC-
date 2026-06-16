/**
 * Fit staged 3D PNGs → library-3d cards (531×648).
 *
 *   node scripts/fit-fitness-3d-staging.mjs
 *   node scripts/fit-fitness-3d-staging.mjs weights row-machine
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";
import { FITNESS_3D_ITEMS } from "./pixtolearn-fitness-3d-items.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const stagingDir = path.join(root, "scripts", ".staging", "fitness-3d");
const outDir = path.join(root, "public", "images", "library-3d");

const only = process.argv.slice(2);
const slugs =
  only.length > 0
    ? only
    : FITNESS_3D_ITEMS.map((i) => i.slug).filter((slug) => {
        const imported = new Set([
          "therapy-ball",
          "trampoline",
          "step-platform",
          "exercise-machine",
          "treadmill",
          "exercise-mat",
          "foam-roller",
          "stretching",
        ]);
        return !imported.has(slug);
      });

fs.mkdirSync(outDir, { recursive: true });

for (const slug of slugs) {
  const src = path.join(stagingDir, `${slug}.png`);
  const dest = path.join(outDir, `${slug}.png`);
  if (!fs.existsSync(src)) {
    console.log(`skip (no staging file): ${slug}`);
    continue;
  }
  await fitIllustrationToCard(src, dest, {
    minPad: 24,
    background: "#ffffff",
    trim: true,
    trimThreshold: 20,
  });
  console.log("ok:", slug);
}
