/** @deprecated Use scripts/reframe-all-ikram-scenes.mjs */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const result = spawnSync(process.execPath, [path.join(__dirname, "reframe-all-ikram-scenes.mjs")], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
