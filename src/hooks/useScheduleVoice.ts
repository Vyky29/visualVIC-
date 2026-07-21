"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  readStoredScheduleVoiceEnabled,
  SCHEDULE_VOICE_CHANGE_EVENT,
  writeStoredScheduleVoiceEnabled,
} from "@/lib/preferences/schedule-voice-preference";
import {
  buildFirstThenSpeech,
  buildNowNextScheduleSpeech,
  playTimerAlarm,
  speakSchedulePhrase,
  stopScheduleVoice,
  unlockScheduleVoice,
} from "@/lib/voice/schedule-voice";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";

export function useScheduleVoice(lang: CardLanguageCode) {
  const [enabled, setEnabled] = useState(false);
  /** Skip the next auto step-speak (Focus effect) after timer already spoke. */
  const suppressStepSpeakRef = useRef(false);

  useEffect(() => {
    setEnabled(readStoredScheduleVoiceEnabled());
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      if (typeof ce.detail === "boolean") setEnabled(ce.detail);
      else setEnabled(readStoredScheduleVoiceEnabled());
    };
    window.addEventListener(SCHEDULE_VOICE_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(SCHEDULE_VOICE_CHANGE_EVENT, onChange);
  }, []);

  const setVoiceEnabled = useCallback((next: boolean) => {
    unlockScheduleVoice();
    writeStoredScheduleVoiceEnabled(next);
    setEnabled(next);
    if (!next) stopScheduleVoice();
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled(!readStoredScheduleVoiceEnabled());
  }, [setVoiceEnabled]);

  const speakIfEnabled = useCallback(
    async (text: string) => {
      if (!readStoredScheduleVoiceEnabled()) return;
      if (suppressStepSpeakRef.current) {
        suppressStepSpeakRef.current = false;
        return;
      }
      const t = text.trim();
      if (!t) return;
      await speakSchedulePhrase(t, lang);
    },
    [lang],
  );

  const speakScheduleOverview = useCallback(
    async (titles: readonly string[]) => {
      if (!readStoredScheduleVoiceEnabled()) return;
      const phrase = buildNowNextScheduleSpeech(titles, lang);
      if (!phrase) return;
      await speakSchedulePhrase(phrase, lang);
    },
    [lang],
  );

  const speakActivity = useCallback(
    async (title: string) => {
      await speakIfEnabled(title);
    },
    [speakIfEnabled],
  );

  const speakFirstThen = useCallback(
    async (firstTitle: string, thenTitle: string) => {
      if (!readStoredScheduleVoiceEnabled()) return;
      const phrase = buildFirstThenSpeech(firstTitle, thenTitle, lang);
      if (!phrase) return;
      await speakSchedulePhrase(phrase, lang);
    },
    [lang],
  );

  const advanceWithAlarmAndSpeak = useCallback(
    (nextTitle: string | undefined, advance: () => void) => {
      void (async () => {
        const voiceOn = readStoredScheduleVoiceEnabled();
        const ribbon = nextTitle?.trim() || "";
        // Avoid HTMLAudio beeps when we need TTS right after (iOS).
        await playTimerAlarm({ allowHtmlFallback: !voiceOn });
        advance();
        if (!voiceOn || !ribbon) return;
        suppressStepSpeakRef.current = true;
        await new Promise((r) => setTimeout(r, 120));
        await speakSchedulePhrase(ribbon, lang);
      })();
    },
    [lang],
  );

  /** Alarm only — use when a step-change effect will speak the new title. */
  const advanceWithAlarm = useCallback((advance: () => void) => {
    void (async () => {
      const voiceOn = readStoredScheduleVoiceEnabled();
      await playTimerAlarm({ allowHtmlFallback: !voiceOn });
      advance();
    })();
  }, []);

  return {
    voiceEnabled: enabled,
    setVoiceEnabled,
    toggleVoice,
    speakIfEnabled,
    speakScheduleOverview,
    speakActivity,
    speakFirstThen,
    advanceWithAlarmAndSpeak,
    advanceWithAlarm,
    unlockVoice: unlockScheduleVoice,
    stopVoice: stopScheduleVoice,
  };
}
