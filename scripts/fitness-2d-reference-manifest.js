/**
 * User-provided 2D fitness illustration sources (Cursor assets).
 * Import with: node scripts/import-fitness-2d-references.mjs
 */
const path = require("node:path");

const ASSETS_DIR = path.join(
  process.env.HOME ?? "/Users/victor",
  ".cursor",
  "projects",
  "Users-victor-cursor-visualVIC",
  "assets",
);

/** @type {{ slug: string; file: string; src: string }[]} */
const FITNESS_2D_REFERENCES = [
  {
    slug: "therapy-ball",
    file: "therapy-ball.png",
    src: "image-9e3f347e-5fe8-4205-a12d-1f19fa834329.png",
  },
  {
    slug: "trampoline",
    file: "trampoline.png",
    src: "image-7db61ac9-cc0f-42d8-9281-e64ba6590f19.png",
  },
  {
    slug: "step-platform",
    file: "step-platform.png",
    src: "image-d91bba5e-6bf1-4166-a1b9-87958e49cd39.png",
  },
  {
    slug: "treadmill",
    file: "treadmill.png",
    src: "image-98fc7f3c-aeeb-4b9c-892b-193c55a3f676.png",
  },
  {
    slug: "exercise-bike",
    file: "exercise-bike.png",
    src: "image-b9447124-f1ac-4d5a-8f30-893045bed820.png",
  },
  {
    slug: "exercise-mat",
    file: "exercise-mat.png",
    src: "image-2f3ca468-f594-445b-a7a2-af1f8d687c51.png",
  },
  {
    slug: "resistance-bands",
    file: "resistance-bands.png",
    src: "image-f1c4605c-f11d-4957-903f-ac086df75bca.png",
  },
  {
    slug: "exercise-machine",
    file: "exercise-machine.png",
    src: "image-368977fd-6a37-47f1-92db-6cf5dd6e0e52.png",
  },
  {
    slug: "weights",
    file: "weights.png",
    src: "image-9d1ea133-8355-4d78-8a17-d77801aa873e.png",
  },
  {
    slug: "row-machine",
    file: "row-machine.png",
    src: "image-a3aa680f-0100-4ce9-bb6a-aeef4422f67f.png",
  },
];

function resolveFitness2dReferencePath(entry) {
  return path.join(ASSETS_DIR, entry.src);
}

module.exports = {
  ASSETS_DIR,
  FITNESS_2D_REFERENCES,
  resolveFitness2dReferencePath,
};
