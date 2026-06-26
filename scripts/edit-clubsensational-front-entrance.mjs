/**
 * Replace swimfarm window branding with clubSENsational on the front entrance photo.
 */
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const src = path.join(
  process.env.HOME ?? "/Users/victor",
  ".cursor/projects/Users-victor-cursor-visualVIC/assets/D8588613-C60D-4CA0-BAF8-086F8548A3A8_1_105_c-a3fb79f1-1745-4375-ae26-9757caab835e.png",
);
const out = path.join(
  root,
  "public/cards/day centre/_refs/clubsensational-day-centre-front.png",
);

async function waterPatch(fromSrc, extract, outW, outH) {
  return sharp(fromSrc)
    .extract(extract)
    .blur(10)
    .modulate({ brightness: 1.02, saturation: 0.95 })
    .resize(outW, outH, { fit: "fill" })
    .png()
    .toBuffer();
}

function brandSvg(width, fontSize, secondLine) {
  const h = secondLine ? Math.round(fontSize * 2.35) : Math.round(fontSize * 1.45);
  const line2 = secondLine
    ? `<text x="50%" y="78%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(fontSize * 0.45)}" font-weight="500" fill="#ffffff" opacity="0.95">${secondLine}</text>`
    : "";
  return Buffer.from(
    `<svg width="${width}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="${secondLine ? "42%" : "62%"}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff">club<tspan font-weight="800">SEN</tspan>sational</text>
      ${line2}
    </svg>`,
  );
}

const rightTopPatch = await waterPatch(src, { left: 880, top: 380, width: 100, height: 60 }, 220, 88);
const rightBottomPatch = await waterPatch(src, { left: 840, top: 450, width: 140, height: 55 }, 270, 52);
const leftPatch = await waterPatch(src, { left: 55, top: 380, width: 90, height: 60 }, 165, 105);

const rightTitle = brandSvg(220, 24);
const rightUrl = brandSvg(270, 20, "www.clubsensational.org");
const leftTitle = brandSvg(165, 18);

await sharp(src)
  .composite([
    { input: rightTopPatch, left: 785, top: 208, blend: "over" },
    { input: rightTitle, left: 785, top: 215 },
    { input: rightBottomPatch, left: 728, top: 598, blend: "over" },
    { input: rightUrl, left: 728, top: 592 },
    { input: leftPatch, left: 28, top: 268, blend: "over" },
    { input: leftTitle, left: 28, top: 300 },
  ])
  .png()
  .toFile(out);

console.log("ok:", out);
