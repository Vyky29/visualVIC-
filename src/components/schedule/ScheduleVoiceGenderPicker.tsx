"use client";

import { useCallback, useEffect, useState } from "react";
import {
  readStoredScheduleVoiceGender,
  SCHEDULE_VOICE_GENDER_CHANGE_EVENT,
  writeStoredScheduleVoiceGender,
  type ScheduleVoiceGender,
} from "@/lib/preferences/schedule-voice-gender-preference";
import {
  scheduleVoiceGenderFemale,
  scheduleVoiceGenderMale,
  scheduleVoiceGenderHint,
  scheduleVoiceGenderTitle,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { speakSchedulePhrase, unlockScheduleVoice } from "@/lib/voice/schedule-voice";
import { cn } from "@/lib/utils/cn";

export function ScheduleVoiceGenderPicker({
  className,
  previewOnSelect = true,
}: {
  className?: string;
  /** Speak a short sample when changing gender. */
  previewOnSelect?: boolean;
}) {
  const lang = useCardUiLanguage();
  const [gender, setGender] = useState<ScheduleVoiceGender>("female");

  useEffect(() => {
    setGender(readStoredScheduleVoiceGender());
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<ScheduleVoiceGender>;
      if (ce.detail === "female" || ce.detail === "male") {
        setGender(ce.detail);
      } else {
        setGender(readStoredScheduleVoiceGender());
      }
    };
    window.addEventListener(SCHEDULE_VOICE_GENDER_CHANGE_EVENT, onChange);
    return () =>
      window.removeEventListener(SCHEDULE_VOICE_GENDER_CHANGE_EVENT, onChange);
  }, []);

  const select = useCallback(
    (next: ScheduleVoiceGender) => {
      unlockScheduleVoice();
      writeStoredScheduleVoiceGender(next);
      setGender(next);
      if (previewOnSelect) {
        const sample =
          next === "female"
            ? scheduleVoiceGenderFemale(lang)
            : scheduleVoiceGenderMale(lang);
        void speakSchedulePhrase(sample, lang);
      }
    },
    [lang, previewOnSelect],
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div>
        <p className="text-[14px] font-semibold text-ink">
          {scheduleVoiceGenderTitle(lang)}
        </p>
        <p className="mt-0.5 text-[12px] leading-snug text-ink-subtle">
          {scheduleVoiceGenderHint(lang)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          aria-pressed={gender === "female"}
          onClick={() => select("female")}
          className={cn(
            "rounded-xl px-3 py-3 text-[14px] font-semibold transition active:scale-[0.98]",
            gender === "female"
              ? "bg-ink text-cream"
              : "bg-canvas-muted text-ink ring-1 ring-ink/[0.07]",
          )}
        >
          {scheduleVoiceGenderFemale(lang)}
        </button>
        <button
          type="button"
          aria-pressed={gender === "male"}
          onClick={() => select("male")}
          className={cn(
            "rounded-xl px-3 py-3 text-[14px] font-semibold transition active:scale-[0.98]",
            gender === "male"
              ? "bg-ink text-cream"
              : "bg-canvas-muted text-ink ring-1 ring-ink/[0.07]",
          )}
        >
          {scheduleVoiceGenderMale(lang)}
        </button>
      </div>
    </div>
  );
}
