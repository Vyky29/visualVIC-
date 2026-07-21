#!/usr/bin/env node
/**
 * Smoke test: Schedule voice → portal-help-voice-speak (ElevenLabs).
 *
 * What this checks:
 * 1) Edge function is reachable
 * 2) ELEVENLABS_API_KEY is present in Supabase function secrets (GET.elevenlabs)
 * 3) Optional: POST with a staff access token returns audioBase64
 *
 * Secrets live on Supabase (Portal project), NOT in visualVIC Vercel env.
 * visualVIC only needs NEXT_PUBLIC_SUPABASE_URL + ANON_KEY + a staff session.
 *
 * Usage:
 *   node scripts/smoke-schedule-voice.mjs
 *   SCHEDULE_VOICE_SMOKE_JWT='eyJ...' node scripts/smoke-schedule-voice.mjs
 *
 * Exit codes: 0 ok, 1 fail, 2 misconfigured env
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    out[m[1]] = m[2].trim();
  }
  return out;
}

const local = {
  ...loadEnvFile(path.join(root, ".env.production")),
  ...loadEnvFile(path.join(root, ".env.local")),
};

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || local.NEXT_PUBLIC_SUPABASE_URL || "")
  .replace(/\/$/, "");
const anon =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || local.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const staffJwt = (process.env.SCHEDULE_VOICE_SMOKE_JWT || "").trim();

const EDGE = "portal-help-voice-speak";

function fail(msg, code = 1) {
  console.error(`FAIL  ${msg}`);
  process.exit(code);
}

function ok(msg) {
  console.log(`OK    ${msg}`);
}

function info(msg) {
  console.log(`INFO  ${msg}`);
}

if (!url || !anon) {
  fail(
    "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (.env.local)",
    2,
  );
}

info(`Supabase: ${url}`);
info(`Edge fn:  ${EDGE}`);
info(
  "Note: ELEVENLABS_* secrets are Supabase Edge secrets (Portal), not Vercel visualVIC env.",
);

const getRes = await fetch(`${url}/functions/v1/${EDGE}`, {
  method: "GET",
  headers: {
    apikey: anon,
    Authorization: `Bearer ${anon}`,
  },
});

let getJson = null;
try {
  getJson = await getRes.json();
} catch {
  getJson = null;
}

if (!getRes.ok) {
  fail(`GET ${EDGE} → HTTP ${getRes.status} ${JSON.stringify(getJson)}`);
}

ok(`GET HTTP ${getRes.status}`);
info(`GET body: ${JSON.stringify(getJson)}`);

if (!getJson?.ok) {
  fail("GET response missing ok:true");
}

if (!getJson.elevenlabs) {
  fail(
    "elevenlabs:false — ELEVENLABS_API_KEY is NOT set (or empty) on Supabase for portal-help-voice-speak. Set it with: supabase secrets set ELEVENLABS_API_KEY=... --project-ref cklpnwhlqsulpmkipmqb then redeploy the function.",
  );
}

ok(`ElevenLabs key present on edge (voiceId=${getJson.voiceId || "default"})`);

if (!staffJwt) {
  info("No SCHEDULE_VOICE_SMOKE_JWT — skipping POST audio check.");
  info(
    "To test full TTS: copy access_token from a staff session (DevTools → Application → localStorage supabase) and run:",
  );
  info("  SCHEDULE_VOICE_SMOKE_JWT='…' node scripts/smoke-schedule-voice.mjs");
  info(
    "App behavior without staff JWT: browser speechSynthesis only (often silent on iOS).",
  );
  console.log("\nSMOKE PASS (probe only — POST skipped)");
  process.exit(0);
}

const postRes = await fetch(`${url}/functions/v1/${EDGE}`, {
  method: "POST",
  headers: {
    apikey: anon,
    Authorization: `Bearer ${staffJwt}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: "home" }),
});

let postJson = null;
try {
  postJson = await postRes.json();
} catch {
  postJson = null;
}

if (!postRes.ok || !postJson?.ok || !postJson.audioBase64) {
  fail(
    `POST ${EDGE} → HTTP ${postRes.status} ${JSON.stringify({
      ok: postJson?.ok,
      error: postJson?.error,
      hasAudio: Boolean(postJson?.audioBase64),
    })}`,
  );
}

const bytes = Buffer.from(postJson.audioBase64, "base64");
if (bytes.length < 200) {
  fail(`Audio too small (${bytes.length} bytes)`);
}

ok(`POST returned audio (${bytes.length} bytes, mime=${postJson.mime || "audio/mpeg"})`);
console.log("\nSMOKE PASS (probe + staff TTS)");
process.exit(0);
