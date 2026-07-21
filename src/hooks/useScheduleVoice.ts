"use client";

import { useCallback, useEffect, useState } from "react";
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
        // Timer chime always — voice toggle only gates spoken titles.
        await playTimerAlarm();
        advance();
        if (readStoredScheduleVoiceEnabled() && nextTitle?.trim()) {
          await speakSchedulePhrase(nextTitle.trim(), lang);
        }
      })();
    },
    [lang],
  );

  /** Alarm only — use when a step-change effect will speak the new title. */
  const advanceWithAlarm = useCallback((advance: () => void) => {
    void (async () => {
      await playTimerAlarm();
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
