/**
 * Generate PixtoLearn library illustrations (531×648 PNG).
 *
 * Mode A — local SVG (default, no API, free):
 *   node scripts/generate-pixtolearn-images.js
 *   node scripts/generate-pixtolearn-images.js --mode=local
 *
 * Mode B — OpenAI gpt-image-1 (when billing is ready):
 *   Add OPENAI_API_KEY to private/.env.local
 *   node scripts/generate-pixtolearn-images.js --mode=openai
 *
 * Options:
 *   --force              overwrite existing PNGs
 *   --only=therapy-ball.png   single file
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");

/** Load KEY=VALUE lines from env files (later files do not override existing env). */
function loadEnvFiles(filenames) {
  for (const filename of filenames) {
    const envPath = path.join(ROOT, filename);
    if (!fs.existsSync(envPath)) continue;

    const content = fs.readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

loadEnvFiles(["private/.env.local", ".env.local", ".env"]);

const OUT_DIR = path.join(ROOT, "public", "images", "library");
const W = 531;
const H = 648;

const ITEMS = [
  { file: "therapy-ball.png", slug: "therapy-ball", object: "therapy ball" },
  { file: "trampoline.png", slug: "trampoline", object: "trampoline" },
  { file: "step-platform.png", slug: "step-platform", object: "step platform" },
  { file: "treadmill.png", slug: "treadmill", object: "treadmill" },
  { file: "exercise-machine.png", slug: "exercise-machine", object: "exercise machine" },
  { file: "skis.png", slug: "skis", object: "skis" },
  { file: "exercise-bike.png", slug: "exercise-bike", object: "exercise bike" },
  { file: "exercise-mat.png", slug: "exercise-mat", object: "exercise mat" },
  { file: "resistance-bands.png", slug: "resistance-bands", object: "resistance bands" },
  { file: "foam-roller.png", slug: "foam-roller", object: "foam roller" },
  { file: "stretching.png", slug: "stretching", object: "stretching symbol" },
  { file: "apron.png", slug: "apron", object: "apron" },
  { file: "mixing-bowl.png", slug: "mixing-bowl", object: "mixing bowl" },
  { file: "wooden-spoon.png", slug: "wooden-spoon", object: "wooden spoon" },
  { file: "rolling-pin.png", slug: "rolling-pin", object: "rolling pin" },
  { file: "cheese-grater.png", slug: "cheese-grater", object: "cheese grater" },
  { file: "vegetable-peeler.png", slug: "vegetable-peeler", object: "vegetable peeler" },
  { file: "chopping-board.png", slug: "chopping-board", object: "chopping board" },
  { file: "tomato-sauce.png", slug: "tomato-sauce", object: "tomato sauce bottle" },
  { file: "paintbrush.png", slug: "paintbrush", object: "paintbrush" },
  { file: "paint-palette.png", slug: "paint-palette", object: "paint palette" },
  { file: "scissors.png", slug: "scissors", object: "scissors" },
  { file: "glue-stick.png", slug: "glue-stick", object: "glue stick" },
  { file: "coloured-paper.png", slug: "coloured-paper", object: "coloured paper" },
  { file: "jigsaw-puzzle.png", slug: "jigsaw-puzzle", object: "jigsaw puzzle" },
  { file: "sorting-trays.png", slug: "sorting-trays", object: "sorting trays" },
  { file: "matching-cards.png", slug: "matching-cards", object: "matching cards" },
  { file: "play-dough.png", slug: "play-dough", object: "play dough" },
  { file: "pizza.png", slug: "pizza", object: "pizza" },
  { file: "cooking.png", slug: "cooking", object: "cooking activity" },
  { file: "painting.png", slug: "painting", object: "painting activity" },
  { file: "peeling.png", slug: "peeling", object: "peeling activity" },
];

const PROMPT_TEMPLATE =
  "Create a single PixtoLearn style object illustration of [OBJECT]. Canvas size 531 × 648 px. PNG with transparent background. Flat vector illustration. Clean educational visual. Thin dark outlines. Soft rounded shapes. Professional and child friendly. No text, no labels, no shadows, no gradients, no background elements. Object centred vertically and horizontally. Object should occupy approximately 80 percent of the canvas height. Single isolated object only.";

const REQUEST_DELAY_MS = 1500;

function buildPrompt(object) {
  return PROMPT_TEMPLATE.replace("[OBJECT]", object);
}

function parseArgs() {
  const force = process.argv.includes("--force");
  const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice("--only=".length) : null;

  const modeArg = process.argv.find((arg) => arg.startsWith("--mode="));
  const mode = modeArg ? modeArg.slice("--mode=".length) : "local";

  if (mode !== "local" && mode !== "openai") {
    console.error('Error: --mode must be "local" or "openai"');
    process.exit(1);
  }

  return { force, only, mode };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function requireSharp() {
  try {
    return require("sharp");
  } catch {
    throw new Error(
      'Missing package "sharp". Install it with: npm install sharp --save-dev'
    );
  }
}

async function loadOpenAI() {
  try {
    const { default: OpenAI } = require("openai");
    return OpenAI;
  } catch {
    throw new Error(
      'Missing package "openai". Install it with: npm install openai --save-dev'
    );
  }
}

async function decodeImageResponse(image) {
  if (image.b64_json) {
    return Buffer.from(image.b64_json, "base64");
  }

  if (image.url) {
    const response = await fetch(image.url);
    if (!response.ok) {
      throw new Error(`Failed to download image (${response.status})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  throw new Error("OpenAI response did not include b64_json or url");
}

async function resizeToCanvas(sharp, inputBuffer) {
  return sharp(inputBuffer)
    .resize(W, H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function generateLocalOne(sharp, item) {
  const { ILLUSTRATIONS, illustrationSvg } = require("./pixtolearn-library-illustrations");
  const body = ILLUSTRATIONS[item.slug];
  if (!body) {
    throw new Error(`No local SVG for slug "${item.slug}"`);
  }

  const svg = illustrationSvg(body, W, H);
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function generateOpenAIOne(openai, sharp, item) {
  const prompt = buildPrompt(item.object);

  const response = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    n: 1,
    size: "1024x1024",
    quality: "medium",
    output_format: "png",
    background: "transparent",
  });

  const image = response.data?.[0];
  if (!image) {
    throw new Error("OpenAI returned no image data");
  }

  const rawBuffer = await decodeImageResponse(image);
  return resizeToCanvas(sharp, rawBuffer);
}

async function main() {
  const { force, only, mode } = parseArgs();
  const sharp = requireSharp();

  let openai = null;
  if (mode === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error(
        "Error: OPENAI_API_KEY not found. Add it to private/.env.local:\n" +
          "  OPENAI_API_KEY=sk-..."
      );
      process.exit(1);
    }
    const OpenAI = await loadOpenAI();
    openai = new OpenAI({ apiKey });
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let items = ITEMS;
  if (only) {
    items = ITEMS.filter((item) => item.file === only);
    if (items.length === 0) {
      console.error(`Error: no item matches --only=${only}`);
      process.exit(1);
    }
  }

  const created = [];
  const skipped = [];
  const failed = [];

  const modeLabel = mode === "local" ? "A (local SVG)" : "B (OpenAI API)";
  console.log(`Mode: ${modeLabel}`);
  console.log(`Output directory: ${OUT_DIR}`);
  console.log(`Generating ${items.length} image(s)...\n`);

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const outPath = path.join(OUT_DIR, item.file);

    if (!force && fs.existsSync(outPath)) {
      skipped.push(item.file);
      console.log(`[${i + 1}/${items.length}] skip (exists): ${item.file}`);
      continue;
    }

    process.stdout.write(`[${i + 1}/${items.length}] ${item.file} ... `);

    try {
      const pngBuffer =
        mode === "local"
          ? await generateLocalOne(sharp, item)
          : await generateOpenAIOne(openai, sharp, item);
      fs.writeFileSync(outPath, pngBuffer);
      created.push(item.file);
      console.log("ok");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failed.push({ file: item.file, error: message });
      console.log(`failed (${message})`);
    }

    if (mode === "openai" && i < items.length - 1) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Created (${created.length}):`);
  if (created.length === 0) {
    console.log("  (none)");
  } else {
    for (const file of created) {
      console.log(`  ✓ ${file}`);
    }
  }

  if (skipped.length > 0) {
    console.log(`\nSkipped (${skipped.length}, already exist — use --force to overwrite):`);
    for (const file of skipped) {
      console.log(`  - ${file}`);
    }
  }

  console.log(`\nFailed (${failed.length}):`);
  if (failed.length === 0) {
    console.log("  (none)");
  } else {
    for (const entry of failed) {
      console.log(`  ✗ ${entry.file}: ${entry.error}`);
    }
  }

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
