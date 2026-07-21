import { NextResponse } from "next/server";
import type { ScheduleVoiceGender } from "@/lib/preferences/schedule-voice-gender-preference";
import {
  resolveScheduleVoiceId,
  type ScheduleVoiceLang,
} from "@/lib/voice/schedule-voice-catalog";

const MAX_CHARS = 1200;

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function parseLang(v: unknown): ScheduleVoiceLang {
  return v === "es" ? "es" : "en";
}

function parseGender(v: unknown): ScheduleVoiceGender {
  return v === "male" ? "male" : "female";
}

/** Health + which voice slots are configured. */
export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() || "";
  const voices = {
    en: {
      female: resolveScheduleVoiceId({ lang: "en", gender: "female" }),
      male: resolveScheduleVoiceId({ lang: "en", gender: "male" }),
    },
    es: {
      female: resolveScheduleVoiceId({ lang: "es", gender: "female" }),
      male: resolveScheduleVoiceId({ lang: "es", gender: "male" }),
    },
  };
  return NextResponse.json({
    ok: true,
    elevenlabs: Boolean(apiKey),
    voices,
  });
}

/**
 * Schedule / Focus TTS — no staff login.
 * Body: { text, lang?: "en"|"es", gender?: "female"|"male" }
 */
export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() || "";
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "no_elevenlabs" },
      { status: 503 },
    );
  }

  let payload: { text?: unknown; lang?: unknown; gender?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const text = String(payload.text ?? "")
    .trim()
    .slice(0, MAX_CHARS);
  if (!text) {
    return NextResponse.json(
      { ok: false, error: "missing_text" },
      { status: 400 },
    );
  }

  const lang = parseLang(payload.lang);
  const gender = parseGender(payload.gender);
  const voiceId = resolveScheduleVoiceId({ lang, gender });
  const modelId =
    process.env.ELEVENLABS_MODEL_ID?.trim() || "eleven_multilingual_v2";

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.42,
          similarity_boost: 0.78,
          style: 0.15,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error(
      "[api/schedule-voice] ElevenLabs error",
      res.status,
      errText.slice(0, 200),
    );
    return NextResponse.json(
      { ok: false, error: "elevenlabs_failed" },
      { status: 502 },
    );
  }

  const buf = new Uint8Array(await res.arrayBuffer());
  if (!buf.length) {
    return NextResponse.json(
      { ok: false, error: "empty_audio" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    audioBase64: bytesToBase64(buf),
    mime: "audio/mpeg",
    voiceId,
    lang,
    gender,
  });
}
