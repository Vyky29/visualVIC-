import { NextResponse } from "next/server";

/** Same club / Portal help-guide voice (portal-help-voice-speak default). */
const DEFAULT_VOICE_ID = "3WqHLnw80rOZqJzW9YRB";
const MAX_CHARS = 1200;

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Prefer the voice ID currently configured on Portal guide TTS. */
async function resolveGuideVoiceId(): Promise<string> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && anon) {
    try {
      const res = await fetch(`${url}/functions/v1/portal-help-voice-speak`, {
        method: "GET",
        headers: {
          apikey: anon,
          Authorization: `Bearer ${anon}`,
        },
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const json = (await res.json()) as { voiceId?: string };
        const id = String(json.voiceId || "").trim();
        if (id) return id;
      }
    } catch {
      /* fall through */
    }
  }
  return process.env.ELEVENLABS_VOICE_ID?.trim() || DEFAULT_VOICE_ID;
}

/** Health: whether server-side ElevenLabs is configured (no staff login required). */
export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() || "";
  const voiceId = await resolveGuideVoiceId();
  return NextResponse.json({
    ok: true,
    elevenlabs: Boolean(apiKey),
    voiceId,
  });
}

/**
 * Schedule / Focus TTS for every user (no staff JWT).
 * Uses the same ElevenLabs voice as the Portal help guide.
 */
export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() || "";
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "no_elevenlabs" },
      { status: 503 },
    );
  }

  let payload: { text?: unknown };
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

  const voiceId = await resolveGuideVoiceId();
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
  });
}
