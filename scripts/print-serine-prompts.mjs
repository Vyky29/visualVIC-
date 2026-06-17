/**
 * Print copy-paste prompts for Serine 2D / 3D scene generation.
 *
 *   node scripts/print-serine-prompts.mjs
 *   SERINE_ILLUSTRATION_STYLE=3d node scripts/print-serine-prompts.mjs
 */
import {
  SERINE_PHYSICAL_SCHEDULE,
  serineScenePrompt,
} from "./serine-physical-manifest.mjs";

const style = (process.env.SERINE_ILLUSTRATION_STYLE ?? "2d").toLowerCase();

console.log(`\n=== Serine · Physical activity (${style.toUpperCase()}) ===\n`);
console.log(
  "Save each output to Cursor assets as:",
  `serine-${style}-{slug}-raw.png\n`,
);

for (const item of SERINE_PHYSICAL_SCHEDULE) {
  console.log(`--- ${item.slug} (${item.title}) ---`);
  console.log(serineScenePrompt(style, item));
  console.log(`→ serine-${style}-${item.slug}-raw.png\n`);
}

console.log("Avatar raw names:");
console.log(`  serine-cartoon-${style}-adult.png`);
console.log("\nThen run:");
console.log(`  node scripts/reframe-all-serine-scenes.mjs`);
console.log(`  node scripts/import-serine-references.mjs`);
