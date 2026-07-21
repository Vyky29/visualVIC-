import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { effectiveDigitalUiLang } from "@/lib/preferences/card-language-preference";
import type { ScheduleVoiceGender } from "@/lib/preferences/schedule-voice-gender-preference";

/**
 * ElevenLabs voice IDs for Schedule / Focus.
 * Override any slot with ELEVENLABS_VOICE_ID_{EN|ES}_{MALE|FEMALE} on the server.
 *
 * EN male default = Portal help-guide club voice.
 * ES slots are sensible multilingual defaults until you plug in your chosen Spanish voices.
 */
export const SCHEDULE_VOICE_DEFAULTS = {
  en: {
    /** Portal guide / club voice */
    male: "3WqHLnw80rOZqJzW9YRB",
    /** English feminine (Sarah) — swap via env when you prefer another */
    female: "EXAVITQu4vr4xnSDxMaL",
  },
  es: {
    /** Placeholder multilingual male — replace with your Spanish male voice */
    male: "nPczCjzI2devNBz1zQrb",
    /** Placeholder multilingual female — replace with your Spanish female voice */
    female: "pFZP5JQG7iQjIQuC4Bku",
  },
} as const;

export type ScheduleVoiceLang = "en" | "es";

export function scheduleVoiceLangFromUi(
  lang: CardLanguageCode,
): ScheduleVoiceLang {
  return effectiveDigitalUiLang(lang) === "es" ? "es" : "en";
}

/** Server-only: resolve ElevenLabs voice id for lang + gender. */
export function resolveScheduleVoiceId(args: {
  lang: ScheduleVoiceLang;
  gender: ScheduleVoiceGender;
}): string {
  const { lang, gender } = args;
  const envKey =
    lang === "es"
      ? gender === "female"
        ? "ELEVENLABS_VOICE_ID_ES_FEMALE"
        : "ELEVENLABS_VOICE_ID_ES_MALE"
      : gender === "female"
        ? "ELEVENLABS_VOICE_ID_EN_FEMALE"
        : "ELEVENLABS_VOICE_ID_EN_MALE";

  const fromEnv = process.env[envKey]?.trim();
  if (fromEnv) return fromEnv;

  // Legacy single override → English male / guide
  if (lang === "en" && gender === "male") {
    const legacy = process.env.ELEVENLABS_VOICE_ID?.trim();
    if (legacy) return legacy;
  }

  return SCHEDULE_VOICE_DEFAULTS[lang][gender];
}
