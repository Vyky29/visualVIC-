/**
 * Schedule / Focus voice — ElevenLabs when staff JWT works, browser TTS otherwise.
 * iOS: must start browser TTS in the same call stack as the tap (no await before speak).
 */

import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { effectiveDigitalUiLang } from "@/lib/preferences/card-language-preference";

const EDGE_FN = "portal-help-voice-speak";
const APP_VOICE_API = "/api/schedule-voice";
const MAX_CHARS = 1200;

let activeAudio: HTMLAudioElement | null = null;
/** One unlocked element — new Audio() after a gesture often cannot play on iOS. */
let voiceEl: HTMLAudioElement | null = null;
let blobUrls: string[] = [];
let audioUnlocked = false;
let audioCtx: AudioContext | null = null;

const SILENT_WAV =
  "data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YRAAAAAAAAAAAAAAAAAAAAAAAAAA";

function revokeBlobs() {
  for (const url of blobUrls) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    }
  }
  blobUrls = [];
}

function base64ToBlobUrl(base64: string, mime = "audio/mpeg"): string {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
  blobUrls.push(url);
  return url;
}

function ensureVoiceEl(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  if (!voiceEl) {
    voiceEl = new Audio();
    voiceEl.setAttribute("playsinline", "");
    voiceEl.setAttribute("webkit-playsinline", "true");
    try {
      (voiceEl as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;
    } catch {
      /* ignore */
    }
    voiceEl.preload = "auto";
  }
  return voiceEl;
}

function getAudioContextCtor(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  return (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext ||
    null
  );
}

function resumeAudioContext() {
  try {
    const Ctx = getAudioContextCtor();
    if (!Ctx) return;
    audioCtx ??= new Ctx();
    if (audioCtx.state === "suspended") {
      void audioCtx.resume().catch(() => {});
    }
  } catch {
    /* ignore */
  }
}

/** Call from a user gesture so iOS allows later playback. */
export function unlockScheduleVoice(): void {
  if (typeof window === "undefined") return;
  resumeAudioContext();
  const el = ensureVoiceEl();
  if (el && !audioUnlocked) {
    try {
      el.muted = true;
      el.src = SILENT_WAV;
      const p = el.play();
      const finish = () => {
        try {
          el.pause();
          el.currentTime = 0;
          el.muted = false;
        } catch {
          /* ignore */
        }
        audioUnlocked = true;
      };
      if (p && typeof p.then === "function") {
        void p.then(finish).catch(() => {
          try {
            el.muted = false;
          } catch {
            /* ignore */
          }
        });
      } else {
        finish();
      }
    } catch {
      audioUnlocked = true;
    }
  }
  // Warm speechSynthesis inside the gesture (Portal pattern).
  try {
    if (window.speechSynthesis) {
      const warm = new SpeechSynthesisUtterance(" ");
      warm.volume = 0.01;
      window.speechSynthesis.speak(warm);
      window.speechSynthesis.cancel();
    }
  } catch {
    /* ignore */
  }
}

export function stopScheduleVoice(): void {
  try {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio = null;
    }
  } catch {
    /* ignore */
  }
  try {
    if (voiceEl) {
      voiceEl.pause();
    }
  } catch {
    /* ignore */
  }
  revokeBlobs();
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
}

async function authToken(): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createBrowserSupabase();
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session?.access_token) return data.session.access_token;
    const refreshed = await supabase.auth.refreshSession();
    return refreshed.data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Start browser TTS in the current call stack (required on iOS after a tap).
 * Do not await anything before calling this from a gesture handler.
 */
function speakBrowserImmediate(text: string, lang: CardLanguageCode): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const ui = effectiveDigitalUiLang(lang);
    u.lang = ui === "es" ? "es-ES" : "en-GB";
    u.rate = 0.92;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      const want = ui === "es" ? "es" : "en";
      const match = voices.find((v) => v.lang?.toLowerCase().startsWith(want));
      if (match) u.voice = match;
    }
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

async function playOnVoiceEl(src: string): Promise<boolean> {
  const el = ensureVoiceEl();
  if (!el) return false;
  activeAudio = el;
  try {
    el.pause();
  } catch {
    /* ignore */
  }
  el.muted = false;
  el.src = src;
  try {
    await el.play();
    await new Promise<void>((resolve) => {
      el.onended = () => resolve();
      el.onerror = () => resolve();
    });
    return true;
  } catch {
    return false;
  }
}

async function playCloudAudioPayload(json: {
  ok?: boolean;
  audioBase64?: string;
  mime?: string;
}): Promise<boolean> {
  if (!json.ok || !json.audioBase64) return false;
  const blobUrl = base64ToBlobUrl(json.audioBase64, json.mime || "audio/mpeg");
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
  return playOnVoiceEl(blobUrl);
}

/** App API — works for everyone (no staff login). */
async function speakViaAppApi(text: string): Promise<boolean> {
  try {
    const res = await fetch(APP_VOICE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.slice(0, MAX_CHARS) }),
    });
    if (!res.ok) return false;
    const json = (await res.json()) as {
      ok?: boolean;
      audioBase64?: string;
      mime?: string;
    };
    return playCloudAudioPayload(json);
  } catch {
    return false;
  }
}

/** Portal edge — only when a staff Supabase session exists (legacy / fallback). */
async function speakViaPortalEdge(text: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return false;

  const token = await authToken();
  if (!token) return false;

  try {
    const res = await fetch(`${url}/functions/v1/${EDGE_FN}`, {
      method: "POST",
      headers: {
        apikey: anon,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text.slice(0, MAX_CHARS) }),
    });
    if (!res.ok) return false;
    const json = (await res.json()) as {
      ok?: boolean;
      audioBase64?: string;
      mime?: string;
    };
    return playCloudAudioPayload(json);
  } catch {
    return false;
  }
}

async function speakCloudTts(text: string): Promise<boolean> {
  if (await speakViaAppApi(text)) return true;
  return speakViaPortalEdge(text);
}

/**
 * Speak a phrase. Starts browser TTS immediately (gesture-safe), then upgrades
 * to ElevenLabs via /api/schedule-voice (no staff login required).
 */
export async function speakSchedulePhrase(
  text: string,
  lang: CardLanguageCode,
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed || typeof window === "undefined") return;
  stopScheduleVoice();
  unlockScheduleVoice();
  // CRITICAL: sync TTS before any await — iOS blocks speak() after the gesture ends.
  speakBrowserImmediate(trimmed, lang);
  const ok = await speakCloudTts(trimmed);
  if (!ok) {
    if (!window.speechSynthesis?.speaking && !window.speechSynthesis?.pending) {
      speakBrowserImmediate(trimmed, lang);
    }
  }
}

function beepWavDataUrl(freq: number, durationMs: number): string {
  const sampleRate = 22050;
  const n = Math.max(1, Math.floor((sampleRate * durationMs) / 1000));
  const data = new Int16Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const attack = Math.min(1, i / 180);
    const release = Math.min(1, (n - i) / 350);
    const env = attack * release;
    data[i] = (Math.sin(2 * Math.PI * freq * t) * 0.38 * env * 32767) | 0;
  }
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = n * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  const writeStr = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);
  for (let i = 0; i < n; i++) view.setInt16(44 + i * 2, data[i], true);
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return `data:audio/wav;base64,${btoa(binary)}`;
}

async function playBeepsViaHtmlAudio(): Promise<void> {
  const tones = [
    { freq: 880, ms: 160 },
    { freq: 1175, ms: 180 },
    { freq: 1319, ms: 220 },
  ];
  for (const tone of tones) {
    const ok = await playOnVoiceEl(beepWavDataUrl(tone.freq, tone.ms));
    if (!ok) break;
  }
}

/** Short rising alarm before auto-advance. */
export async function playTimerAlarm(options?: {
  allowHtmlFallback?: boolean;
}): Promise<void> {
  if (typeof window === "undefined") return;
  const allowHtml = options?.allowHtmlFallback !== false;
  resumeAudioContext();
  unlockScheduleVoice();

  const tryWebBeeps = async (): Promise<boolean> => {
    try {
      const Ctx = getAudioContextCtor();
      if (!Ctx) return false;
      if (!audioCtx || audioCtx.state === "closed") {
        audioCtx = new Ctx();
      }
      if (audioCtx.state === "suspended") {
        await audioCtx.resume().catch(() => {});
      }
      if (audioCtx.state !== "running") {
        try {
          await audioCtx.close();
        } catch {
          /* ignore */
        }
        audioCtx = new Ctx();
        await audioCtx.resume().catch(() => {});
      }
      if (audioCtx.state !== "running") return false;

      const playBeep = (freq: number, start: number, dur: number) => {
        const osc = audioCtx!.createOscillator();
        const gain = audioCtx!.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(audioCtx!.destination);
        osc.start(start);
        osc.stop(start + dur + 0.02);
      };

      const t0 = audioCtx.currentTime;
      playBeep(880, t0, 0.18);
      playBeep(1175, t0 + 0.22, 0.22);
      playBeep(1319, t0 + 0.48, 0.28);
      await new Promise((r) => setTimeout(r, 820));
      return true;
    } catch {
      return false;
    }
  };

  const ok = await tryWebBeeps();
  if (ok) return;
  if (allowHtml) await playBeepsViaHtmlAudio();
}

export function buildNowNextScheduleSpeech(
  titles: readonly string[],
  lang: CardLanguageCode,
): string {
  const clean = titles.map((t) => t.trim()).filter(Boolean);
  if (clean.length === 0) return "";
  const ui = effectiveDigitalUiLang(lang);
  const now = ui === "es" ? "Ahora" : "Now";
  const next = ui === "es" ? "Después" : "Next";
  if (clean.length === 1) return `${now} ${clean[0]}`;
  return `${now} ${clean[0]}, ${next} ${clean.slice(1).join(", ")}`;
}

export function buildFirstThenSpeech(
  firstTitle: string,
  thenTitle: string,
  lang: CardLanguageCode,
): string {
  const ui = effectiveDigitalUiLang(lang);
  const first = ui === "es" ? "Primero" : "First";
  const then = ui === "es" ? "Después" : "Then";
  const a = firstTitle.trim();
  const b = thenTitle.trim();
  if (a && b) return `${first} ${a}. ${then} ${b}`;
  if (a) return `${first} ${a}`;
  if (b) return `${then} ${b}`;
  return "";
}
