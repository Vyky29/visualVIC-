/**
 * Re-import user Physical Activity PNGs without trim/extra padding (531×648 canvas).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importDesignerIllustration531x648 } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assets =
  process.env.PHYSICAL_3D_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

/** @type {Array<{ library: "library-3d" | "library-3d-gym"; slug: string; src: string }>} */
const ITEMS = [
  {
    library: "library-3d",
    slug: "therapy-ball",
    src: "image-6bbdac43-a179-4bb0-ad46-b00ad69c7149.png",
  },
  {
    library: "library-3d",
    slug: "trampoline",
    src: "image-13e22bd7-e71c-4d5b-8e93-a7f6210d56d8.png",
  },
  {
    library: "library-3d",
    slug: "step-platform",
    src: "image-88021895-d2b5-4c61-ab63-5b315bb28d75.png",
  },
  {
    library: "library-3d",
    slug: "treadmill",
    src: "image-14cb5b3e-26ce-45dc-8beb-a179322197be.png",
  },
  {
    library: "library-3d-gym",
    slug: "arms-machine",
    src: "image-42137297-f554-4552-8205-1dbbc6e785ea.png",
  },
  {
    library: "library-3d",
    slug: "row-machine",
    src: "image-4ef5ea7a-a2f3-49c9-b2b9-df4b2869ccf2.png",
  },
  {
    library: "library-3d",
    slug: "exercise-bike",
    src: "image-c3570263-b334-4445-a947-1d5b9d956266.png",
  },
  {
    library: "library-3d",
    slug: "resistance-bands",
    src: "image-8d032f56-348c-41fb-b0ec-b81db294670a.png",
  },
  {
    library: "library-3d",
    slug: "bosu",
    src: "image-ea8b8b58-d866-40e3-9cd2-617a952aa968.png",
  },
  {
    library: "library-3d",
    slug: "kettlebell",
    src: "image-c514c94a-cfcc-4930-9045-df4591a9f553.png",
  },
  {
    library: "library-3d",
    slug: "medicine-ball",
    src: "image-5031b63b-3461-4412-8854-b2b1d3c46c92.png",
  },
  {
    library: "library-3d",
    slug: "balance-board",
    src: "image-625c19fe-3fc8-436f-9c14-c80312471276.png",
  },
  {
    library: "library-3d-gym",
    slug: "sandbag-stack",
    src: "image-63da78e5-ee7e-4835-ad24-f520df908a80.png",
  },
  {
    library: "library-3d",
    slug: "foam-roller",
    src: "image-03bf1c19-ab8e-45bd-bcf3-c7209e27cd4c.png",
  },
  {
    library: "library-3d",
    slug: "exercise-mat",
    src: "image-8533b37b-5c04-41d3-aaaf-12370f644b1b.png",
  },
  {
    library: "library-3d",
    slug: "weights",
    src: "image-25392ce5-8f3c-423a-afd2-b4e2f4aacb24.png",
  },
];

for (const item of ITEMS) {
  const srcPath = path.join(assets, item.src);
  if (!fs.existsSync(srcPath)) {
    console.warn("skip (missing):", item.slug, srcPath);
    continue;
  }
  const outDir = path.join(root, "public", "images", item.library);
  const dest = path.join(outDir, `${item.slug}.png`);
  fs.mkdirSync(outDir, { recursive: true });
  await importDesignerIllustration531x648(srcPath, dest);
  console.log("ok:", item.library, item.slug);
}

console.log("\nDone — designer PNGs on 531×648 canvas (no trim).");
