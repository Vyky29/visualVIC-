#!/usr/bin/env node
/**
 * Smoke test: /api/schedule-voice (no staff login).
 *
 *   node scripts/smoke-schedule-voice.mjs
 *   SMOKE_VOICE_BASE=http://localhost:3000 node scripts/smoke-schedule-voice.mjs
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

const getRes = await fetch(api, { method: "GET" });
const getJson = await getRes.json().catch(() => null);
if (!getRes.ok || !getJson?.ok) {
  fail(`GET → HTTP ${getRes.status} ${JSON.stringify(getJson)}`);
}
ok(`GET HTTP ${getRes.status}`);
info(`voices: ${JSON.stringify(getJson.voices || getJson.voiceId)}`);
if (!getJson.elevenlabs) {
  fail("elevenlabs:false — set ELEVENLABS_API_KEY on Vercel");
}
ok("ElevenLabs configured");

const samples = [
  { lang: "en", gender: "female", text: "home" },
  { lang: "en", gender: "male", text: "home" },
  { lang: "es", gender: "female", text: "casa" },
  { lang: "es", gender: "male", text: "casa" },
];

for (const sample of samples) {
  const postRes = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sample),
  });
  const postJson = await postRes.json().catch(() => null);
  if (!postRes.ok || !postJson?.ok || !postJson.audioBase64) {
    fail(
      `POST ${sample.lang}/${sample.gender} → HTTP ${postRes.status} ${JSON.stringify({
        error: postJson?.error,
      })}`,
    );
  }
  const bytes = Buffer.from(postJson.audioBase64, "base64");
  if (bytes.length < 200) fail(`Audio too small for ${sample.lang}/${sample.gender}`);
  ok(
    `POST ${sample.lang}/${sample.gender} → ${bytes.length}B voiceId=${postJson.voiceId || "?"}`,
  );
}

console.log("\nSMOKE PASS — gender + language voice slots");
process.exit(0);
