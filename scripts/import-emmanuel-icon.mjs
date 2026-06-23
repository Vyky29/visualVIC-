/**
 * Import one Emmanuel schedule icon → emmanuel/icons/{slug}.png (531×648).
 *
 *   node scripts/import-emmanuel-icon.mjs cruzigramas path/to/source.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importDesignerIllustration531x648 } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "cards", "day centre", "emmanuel", "icons");

async function toIcon(srcPath, slug) {
  fs.mkdirSync(outDir, { recursive: true });

  const rawDest = path.join(outDir, `_raw-${slug}.png`);
  const dest = path.join(outDir, `${slug}.png`);

  fs.copyFileSync(srcPath, rawDest);
  await importDesignerIllustration531x648(srcPath, dest);

  console.log("ok:", path.relative(root, dest));
}

const slug = process.argv[2];
const srcPath = process.argv[3];

if (!slug || !srcPath) {
  console.error("Usage: node scripts/import-emmanuel-icon.mjs <slug> <source.png>");
  process.exit(1);
}

if (!fs.existsSync(srcPath)) {
  console.error("Source not found:", srcPath);
  process.exit(1);
}

toIcon(srcPath, slug).catch((err) => {
  console.error(err);
  process.exit(1);
});
