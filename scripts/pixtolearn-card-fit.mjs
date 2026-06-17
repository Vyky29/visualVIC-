/**
 * Fit illustration sources into a fixed PixtoLearn export canvas (531×648).
 * Use for library / batch exports only — schedule UI scales any source with
 * object-contain inside the 531×648 (or 531×663 focus) illustration slot.
 */
import sharp from "sharp";

export const NOW_W = 531;
export const NOW_H = 648;
export const FOCUS_H = 663;

/** Minimum white padding (px) on every side inside the card frame. */
export const MIN_PAD = 36;

/**
 * @param {Buffer | string} src
 * @param {string} dest
 * @param {{
 *   minPad?: number;
 *   trim?: boolean;
 *   trimThreshold?: number;
 *   width?: number;
 *   height?: number;
 *   background?: string;
 *   fit?: "contain" | "cover" | "cover-padded";
 *   position?: string;
 * }} [opts]
 */
export async function fitIllustrationToCard(src, dest, opts = {}) {
  const trimThreshold = opts.trimThreshold ?? 12;
  const width = opts.width ?? NOW_W;
  const height = opts.height ?? NOW_H;
  const background = opts.background ?? "#ffffff";
  const fit = opts.fit ?? "contain";
  let img = sharp(src);

  if (opts.trim !== false) {
    try {
      img = img.trim({ threshold: trimThreshold, background });
    } catch {
      // uniform / tiny images — keep original
    }
  }

  if (fit === "cover") {
    await img
      .resize(width, height, { fit: "cover", position: opts.position ?? "centre" })
      .png()
      .toFile(dest);
    return;
  }

  const minPad = opts.minPad ?? MIN_PAD;
  const maxW = width - 2 * minPad;
  const maxH = height - 2 * minPad;

  if (fit === "cover-padded") {
    const resized = await img
      .resize(maxW, maxH, { fit: "cover", position: opts.position ?? "centre" })
      .png()
      .toBuffer();
    await sharp({
      create: { width, height, channels: 3, background },
    })
      .composite([{ input: resized, gravity: "centre" }])
      .png()
      .toFile(dest);
    return;
  }

  const meta = await img.metadata();
  const scale = Math.min(maxW / meta.width, maxH / meta.height);
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const resized = await img.resize(w, h).png().toBuffer();

  await sharp({
    create: { width, height, channels: 3, background },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toFile(dest);
}

/**
 * Trim whitespace only — keeps natural artwork dimensions for UI scaling.
 * @param {Buffer | string} src
 * @param {string} dest
 */
export async function trimIllustrationOnly(src, dest, opts = {}) {
  const trimThreshold = opts.trimThreshold ?? 12;
  const background = opts.background ?? "#ffffff";
  let img = sharp(src);
  try {
    img = img.trim({ threshold: trimThreshold, background });
  } catch {
    // keep original
  }
  await img.png().toFile(dest);
}
