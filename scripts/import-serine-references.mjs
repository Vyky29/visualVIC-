/**
 * Copy Serine real-photo references into the pack + publish avatars when cartoon art exists.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assets =
  process.env.SERINE_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const serineDir = path.join(root, "public", "cards", "day centre", "serine");
const refDir = path.join(serineDir, "_references");
const avatarDir = path.join(root, "public", "avatars");

/** Real photos — canonical names after import. */
const REAL_PHOTOS = {
  cara: {
    asset: "3252d698e687fe92ad83e2518bf78c4656a330eedb36c3b4c605889034f1c002-407d7ea8-adc7-408a-93c2-5a68850b3002.png",
    dest: "serine-cara.png",
  },
  pe1: {
    asset: "image-728e418a-b7ae-4315-93f2-3a65cf1914dd.png",
    dest: "serine-pe1.png",
  },
  body: {
    asset: "image-c2b99021-e4e1-45b4-a54a-6a929b9297fa.png",
    dest: "serine-body.png",
  },
};

const CARTOON = {
  "2d": { asset: "serine-cartoon-2d-adult.png", avatar: "serine-cartoon-2d.png" },
  "3d": { asset: "serine-cartoon-3d-adult.png", avatar: "serine-cartoon.png" },
};

async function maybeAvatar(src, destName, style) {
  if (!fs.existsSync(src)) return false;
  const dest = path.join(avatarDir, destName);
  if (style === "2d") {
    await sharp(src).png().toFile(dest);
  } else {
    await fitIllustrationToCard(src, dest);
  }
  fs.copyFileSync(src, path.join(refDir, path.basename(src)));
  return true;
}

async function main() {
  fs.mkdirSync(refDir, { recursive: true });
  fs.mkdirSync(avatarDir, { recursive: true });

  for (const { asset, dest } of Object.values(REAL_PHOTOS)) {
    const src = path.join(assets, asset);
    if (!fs.existsSync(src)) {
      console.warn("missing photo:", asset);
      continue;
    }
    fs.copyFileSync(src, path.join(refDir, dest));
    console.log("ref:", dest);
  }

  for (const [style, { asset, avatar }] of Object.entries(CARTOON)) {
    const src = path.join(assets, asset);
    if (await maybeAvatar(src, avatar, style)) {
      console.log("avatar:", style, "→", avatar);
    } else {
      console.warn("missing cartoon:", asset, `(phase ${style})`);
    }
  }

  const logoSrc = path.join(assets, CARTOON["3d"].asset);
  const logoFallback = path.join(assets, CARTOON["2d"].asset);
  const logoFrom = fs.existsSync(logoSrc)
    ? logoSrc
    : fs.existsSync(logoFallback)
      ? logoFallback
      : path.join(refDir, REAL_PHOTOS.cara.dest);

  if (fs.existsSync(logoFrom)) {
    await sharp(logoFrom)
      .resize(85, 85, { fit: "cover", position: "centre" })
      .png()
      .toFile(path.join(root, "public", "cards", "day centre", "logo-day-centre-serine.png"));
    console.log("pack logo ok");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
