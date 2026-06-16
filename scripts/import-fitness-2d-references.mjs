/**
 * Import user-provided 2D fitness PNGs → 531×648 library cards.
 *
 * Uses the exact reference files the user sent in chat (not SVG placeholders).
 *
 *   node scripts/import-fitness-2d-references.mjs
 *   node scripts/import-fitness-2d-references.mjs --only=therapy-ball
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FITNESS_2D_REFERENCES,
  resolveFitness2dReferencePath,
} from "./fitness-2d-reference-manifest.js";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const LIBRARY_DIR = path.join(root, "public", "images", "library");
const REFERENCES_DIR = path.join(LIBRARY_DIR, "references");
const GENERAL_DIR = path.join(root, "public", "cards", "day centre", "general");

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const onlySlug = onlyArg ? onlyArg.slice("--only=".length) : null;

let entries = FITNESS_2D_REFERENCES;
if (onlySlug) {
  entries = FITNESS_2D_REFERENCES.filter((e) => e.slug === onlySlug);
  if (entries.length === 0) {
    console.error(`Unknown slug: ${onlySlug}`);
    process.exit(1);
  }
}

fs.mkdirSync(LIBRARY_DIR, { recursive: true });
fs.mkdirSync(REFERENCES_DIR, { recursive: true });
fs.mkdirSync(GENERAL_DIR, { recursive: true });

const created = [];
const failed = [];

for (const entry of entries) {
  const srcPath = resolveFitness2dReferencePath(entry);
  const libraryOut = path.join(LIBRARY_DIR, entry.file);
  const generalOut = path.join(GENERAL_DIR, entry.file);
  const referenceCopy = path.join(REFERENCES_DIR, entry.file);

  process.stdout.write(`${entry.slug} ... `);

  if (!fs.existsSync(srcPath)) {
    failed.push({ slug: entry.slug, error: `missing source ${srcPath}` });
    console.log("failed (missing source)");
    continue;
  }

  try {
    fs.copyFileSync(srcPath, referenceCopy);
    await fitIllustrationToCard(srcPath, libraryOut, {
      minPad: 24,
      background: "#ffffff",
      trim: true,
      trimThreshold: 18,
    });
    fs.copyFileSync(libraryOut, generalOut);
    created.push(entry.slug);
    console.log("ok");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failed.push({ slug: entry.slug, error: message });
    console.log(`failed (${message})`);
  }
}

console.log("\n--- Summary ---");
console.log(`Imported (${created.length}): ${created.join(", ") || "(none)"}`);
if (failed.length) {
  console.log("Failed:");
  for (const f of failed) console.log(`  ${f.slug}: ${f.error}`);
  process.exit(1);
}

console.log("\nOutputs:");
console.log(`  ${LIBRARY_DIR}`);
console.log(`  ${GENERAL_DIR}`);
console.log(`  ${REFERENCES_DIR} (source copies)`);
