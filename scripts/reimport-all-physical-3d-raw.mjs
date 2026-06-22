/**
 * Import every `_raw/{slug}.png` → `{slug}.png` (531×648) for library-3d and library-3d-gym.
 *
 *   node scripts/reimport-all-physical-3d-raw.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importDesignerIllustration531x648 } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const LIBRARIES = ["library-3d", "library-3d-gym"];

async function importRawLibrary(libraryDir) {
  const base = path.join(root, "public", "images", libraryDir);
  const rawDir = path.join(base, "_raw");
  if (!fs.existsSync(rawDir)) {
    console.warn("skip (no _raw):", libraryDir);
    return 0;
  }

  const raws = fs
    .readdirSync(rawDir)
    .filter((f) => f.endsWith(".png"))
    .sort();

  let ok = 0;
  for (const file of raws) {
    const slug = file.slice(0, -4);
    const src = path.join(rawDir, file);
    const dest = path.join(base, `${slug}.png`);
    await importDesignerIllustration531x648(src, dest);
    console.log("ok:", libraryDir, slug);
    ok++;
  }
  return ok;
}

let total = 0;
for (const lib of LIBRARIES) {
  total += await importRawLibrary(lib);
}

console.log(`\nDone — ${total} Physical Activity 3D asset(s).`);
