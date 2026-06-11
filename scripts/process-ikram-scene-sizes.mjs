/**
 * Import new RAW assets → PixtoLearn sizes (delegates crop rules to reframe-all).
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reframe = path.join(__dirname, "reframe-all-ikram-scenes.mjs");

const result = spawnSync(process.execPath, [reframe], { stdio: "inherit" });
process.exit(result.status ?? 1);
