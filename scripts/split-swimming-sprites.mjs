/**
 * Recorta rejillas Pixto "swimming" y exporta cada tarjeta en proporción 5:7.
 *
 * Uso:
 *   node scripts/split-swimming-sprites.mjs
 *   node scripts/split-swimming-sprites.mjs <ruta-hoja-2x5> <ruta-hoja-3x4>
 */

import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "cards", "swimming");

/** Ancho de salida; alto = ancho * 7/5 (retrato 5:7). */
const OUT_W = 740;
const OUT_H = Math.round((OUT_W * 7) / 5);

const DEFAULT_SHEET_2x5 = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor",
  "projects",
  "c-Users-info-OneDrive-Desktop-visualVIC",
  "assets",
  "c__Users_info_AppData_Roaming_Cursor_User_workspaceStorage_7a17a3e6ed1ee0200a437570bdc49757_images_proyecto_6_objetos-448e7c7a-33e0-4ea5-ae36-4ddc4880b915.png",
);

const DEFAULT_SHEET_3x4 = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor",
  "projects",
  "c-Users-info-OneDrive-Desktop-visualVIC",
  "assets",
  "c__Users_info_AppData_Roaming_Cursor_User_workspaceStorage_7a17a3e6ed1ee0200a437570bdc49757_images_proyecto_6_swimming-1b43afee-c42f-4543-99d0-2649e682cc7a.png",
);

/** Nombres de archivo (sin .png), orden fila a fila, izquierda → derecha. */
const NAMES_2x5 = [
  "swimming-pixto-logo",
  "swimming-costume",
  "swim-cap",
  "pool",
  "googles",
  "float",
  "showers",
  "sinkers",
  "flip-flops",
  "changing-room",
];

const NAMES_3x4 = [
  "swim-cap-on",
  "goggles-on",
  "wearing-flip-flops",
  "ready-for-swimming",
  "swimming-shower",
  "blow-bubbles",
  "float-on-back",
  "kick-legs",
  "splash",
  "pick-up-sinkers",
  "jumping",
  "swimming-getting-dressed",
];

async function splitGrid(inputPath, rows, cols, names) {
  const meta = await sharp(inputPath).metadata();
  const W = meta.width ?? 0;
  const H = meta.height ?? 0;
  if (!W || !H) throw new Error(`No size: ${inputPath}`);

  const cellW = Math.floor(W / cols);
  const cellH = Math.floor(H / rows);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const base = names[idx];
      if (!base) continue;

      const left = c * cellW;
      const top = r * cellH;

      await sharp(inputPath)
        .extract({ left, top, width: cellW, height: cellH })
        .resize(OUT_W, OUT_H, { fit: "cover", position: "centre" })
        .png()
        .toFile(path.join(OUT_DIR, `${base}.png`));

      console.log(`OK ${base}.png (${cellW}×${cellH} → ${OUT_W}×${OUT_H})`);
    }
  }
}

const sheet1 = process.argv[2] ?? DEFAULT_SHEET_2x5;
const sheet2 = process.argv[3] ?? DEFAULT_SHEET_3x4;

await mkdir(OUT_DIR, { recursive: true });
console.log(`Salida: ${OUT_DIR}`);
console.log(`Tamaño 5:7 → ${OUT_W}×${OUT_H}px\n`);

await splitGrid(sheet1, 2, 5, NAMES_2x5);
await splitGrid(sheet2, 3, 4, NAMES_3x4);

console.log("\nListo.");
