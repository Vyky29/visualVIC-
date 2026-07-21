#!/usr/bin/env node
/**
 * Smoke test: Schedule voice in visualVIC (no staff login required).
 *
 * Checks:
 * 1) GET  /api/schedule-voice  → elevenlabs flag (ELEVENLABS_API_KEY on this app)
 * 2) POST /api/schedule-voice  → audioBase64 for "home"
 *
 * By default hits production https://visual-vic.vercel.app
 * Local:  SMOKE_VOICE_BASE=http://localhost:3000 node scripts/smoke-schedule-voice.mjs
 *
 * Exit: 0 pass, 1 fail, 2 misconfigured
 */
const DEFAULT_BASE = "https://visual-vic.vercel.app";
const base = (process.env.SMOKE_VOICE_BASE || DEFAULT_BASE).replace(/\/$/, "");
const api = `${base}/api/schedule-voice`;

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

info(`Base: ${base}`);
info("Voice must work without staff JWT (app-owned ElevenLabs key).");

const getRes = await fetch(api, { method: "GET" });
let getJson = null;
try {
  getJson = await getRes.json();
} catch {
  getJson = null;
}

if (!getRes.ok) {
  fail(`GET ${api} → HTTP ${getRes.status} ${JSON.stringify(getJson)}`);
}

ok(`GET HTTP ${getRes.status}`);
info(`GET body: ${JSON.stringify(getJson)}`);

if (!getJson?.ok) {
  fail("GET missing ok:true");
}

if (!getJson.elevenlabs) {
  fail(
    "elevenlabs:false — set ELEVENLABS_API_KEY on Vercel for visualVIC (Production + Preview), then redeploy. Optional: ELEVENLABS_VOICE_ID=3WqHLnw80rOZqJzW9YRB",
  );
}

ok(`ElevenLabs configured (voiceId=${getJson.voiceId || "default"})`);

const postRes = await fetch(api, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
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
    `POST ${api} → HTTP ${postRes.status} ${JSON.stringify({
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
console.log("\nSMOKE PASS — app voice works without staff login");
process.exit(0);
