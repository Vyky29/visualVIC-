/**
 * Import one designer Physical Activity PNG (already ~531×648) into library-3d or library-3d-gym.
 *
 *   node scripts/import-physical-3d-asset.mjs library-3d therapy-ball /path/to/source.png
 *   node scripts/import-physical-3d-asset.mjs library-3d-gym sandbag-stack /path/to/source.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importDesignerIllustration531x648 } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const [libraryDir, slug, srcPath] = process.argv.slice(2);
if (!libraryDir || !slug || !srcPath) {
  console.error(
    "Usage: node scripts/import-physical-3d-asset.mjs <library-3d|library-3d-gym> <slug> /path/to/source.png",
  );
  process.exit(1);
}

if (libraryDir !== "library-3d" && libraryDir !== "library-3d-gym") {
  console.error("libraryDir must be library-3d or library-3d-gym");
  process.exit(1);
}

if (!fs.existsSync(srcPath)) {
  console.error("Source not found:", srcPath);
  process.exit(1);
}

const outDir = path.join(root, "public", "images", libraryDir);
const dest = path.join(outDir, `${slug}.png`);

fs.mkdirSync(outDir, { recursive: true });

await importDesignerIllustration531x648(srcPath, dest);
console.log("ok:", path.relative(root, dest));
