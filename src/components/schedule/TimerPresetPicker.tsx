"use client";

import { cn } from "@/lib/utils/cn";
import {
  ROUTINE_TIMER_PRESETS_SEC,
  timerPresetLabel,
} from "@/lib/routines/resolve-step-timer";
import { routineTimerOffLabel } from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  compact?: boolean;
};

export function TimerPresetPicker({
  value,
  onChange,
  compact = false,
}: Props) {
  const lang = useCardUiLanguage();
  const presetLang = lang === "es" ? "es" : "en";

  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5",
        compact ? "max-w-[14rem]" : undefined,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(undefined)}
        className={cn(
          "rounded-full border px-2.5 py-1 text-[11px] font-medium transition active:scale-[0.98]",
          value === undefined
            ? "border-sage/40 bg-sage/10 text-sage"
            : "border-ink/10 bg-white text-ink-subtle",
        )}
      >
        {routineTimerOffLabel(lang)}
      </button>
      {ROUTINE_TIMER_PRESETS_SEC.map((sec) => (
        <button
          key={sec}
          type="button"
          onClick={() => onChange(sec)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-medium tabular-nums transition active:scale-[0.98]",
            value === sec
              ? "border-sage/40 bg-sage/10 text-sage"
              : "border-ink/10 bg-white text-ink-subtle",
          )}
        >
          {timerPresetLabel(sec, presetLang)}
        </button>
      ))}
    </div>
  );
}
