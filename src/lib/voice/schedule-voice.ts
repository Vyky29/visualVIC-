/**
 * Schedule / Focus voice — same ElevenLabs edge function as Portal guide,
 * with browser speechSynthesis fallback when unsigned or offline.
 */

import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { effectiveDigitalUiLang } from "@/lib/preferences/card-language-preference";

const EDGE_FN = "portal-help-voice-speak";
const MAX_CHARS = 1200;

let activeAudio: HTMLAudioElement | null = null;
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

function ensureAudioEl(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  const el = new Audio();
  el.setAttribute("playsinline", "");
  el.setAttribute("webkit-playsinline", "true");
  try {
    (el as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;
  } catch {
    /* ignore */
  }
  return el;
}

function resumeAudioContext() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    audioCtx ??= new Ctx();
    if (audioCtx.state === "suspended") {
      void audioCtx.resume().catch(() => {});
    }
  } catch {
    /* ignore */
  }
}

/** Call from a user gesture (toggle / first tap) so iOS allows later playback. */
export function unlockScheduleVoice(): void {
  if (typeof window === "undefined") return;
  resumeAudioContext();
  if (audioUnlocked) return;
  const el = ensureAudioEl();
  if (!el) {
    audioUnlocked = true;
    return;
  }
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

export function stopScheduleVoice(): void {
  try {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio = null;
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

function speakBrowser(text: string, lang: CardLanguageCode): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = effectiveDigitalUiLang(lang) === "es" ? "es-ES" : "en-GB";
      u.rate = 0.92;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    } catch {
      resolve();
    }
  });
}

async function speakElevenLabs(text: string): Promise<boolean> {
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
    if (!json.ok || !json.audioBase64) return false;

    const blobUrl = base64ToBlobUrl(json.audioBase64, json.mime || "audio/mpeg");
    const el = ensureAudioEl();
    if (!el) return false;
    activeAudio = el;
    el.src = blobUrl;
    el.muted = false;
    await new Promise<void>((resolve) => {
      el.onended = () => resolve();
      el.onerror = () => resolve();
      void el.play().catch(() => resolve());
    });
    return true;
  } catch {
    return false;
  }
}

/** Speak one phrase (ElevenLabs when staff session available, else browser TTS). */
export async function speakSchedulePhrase(
  text: string,
  lang: CardLanguageCode,
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed || typeof window === "undefined") return;
  stopScheduleVoice();
  unlockScheduleVoice();
  const ok = await speakElevenLabs(trimmed);
  if (!ok) await speakBrowser(trimmed, lang);
}

/** Short rising alarm before auto-advance. */
export async function playTimerAlarm(): Promise<void> {
  if (typeof window === "undefined") return;
  resumeAudioContext();
  unlockScheduleVoice();
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    audioCtx ??= new Ctx();
    if (audioCtx.state === "suspended") await audioCtx.resume().catch(() => {});

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
  } catch {
    /* ignore */
  }
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
