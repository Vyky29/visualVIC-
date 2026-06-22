"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import {
  schedulePlayerAddCardButton,
  schedulePlayerTimerButton,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { StepTimerBadge } from "@/components/schedule/StepTimerBadge";
import { TimerPresetPicker } from "@/components/schedule/TimerPresetPicker";
import {
  focusModeOptTimerHint,
  routineTimerStepLabel,
} from "@/lib/i18n/app-shell-locale";

type Props = {
  showTimerPanel: boolean;
  onToggleTimerPanel: () => void;
  onOpenAddCard: () => void;
  nowHasTimer: boolean;
  nowTimerRemaining: number;
  nowTimerTotal: number;
  nowTimerFinished: boolean;
  sessionTimerSec: number | undefined;
  savedTimerSec: number | undefined;
  onTimerChange: (sec: number | undefined) => void;
  disabled?: boolean;
};

function TimerToggleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px]" aria-hidden>
      <circle cx="12" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 9V13l2.5 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3.5h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AddCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px]" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlashcardControlButton({
  label,
  pressed,
  onClick,
  children,
  className,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "pointer-events-auto flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full bg-white/95 px-2.5 text-ink shadow-soft ring-1 ring-ink/10 backdrop-blur-sm transition active:bg-white tablet:h-11 tablet:min-w-11 tablet:px-3",
        pressed && "ring-sage/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ScheduleFlashcardControls({
  showTimerPanel,
  onToggleTimerPanel,
  onOpenAddCard,
  nowHasTimer,
  nowTimerRemaining,
  nowTimerTotal,
  nowTimerFinished,
  sessionTimerSec,
  savedTimerSec,
  onTimerChange,
  disabled = false,
}: Props) {
  const lang = useCardUiLanguage();

  if (disabled) return null;

  return (
    <>
      <div className="pointer-events-none absolute left-3 top-3 z-[13] flex max-w-[calc(100%-1.5rem)] flex-wrap items-start gap-2 tablet:left-4 tablet:top-4">
        {nowHasTimer ? (
          <button
            type="button"
            aria-label={schedulePlayerTimerButton(lang)}
            aria-pressed={showTimerPanel}
            onClick={onToggleTimerPanel}
            className="pointer-events-auto"
          >
            <StepTimerBadge
              remainingSec={nowTimerRemaining}
              totalSec={nowTimerTotal}
              variant="schedule"
              finished={nowTimerFinished}
              className="!static !h-[2.75rem] !w-[2.75rem] tablet:!h-[3rem] tablet:!w-[3rem]"
            />
          </button>
        ) : (
          <FlashcardControlButton
            label={schedulePlayerTimerButton(lang)}
            pressed={showTimerPanel}
            onClick={onToggleTimerPanel}
          >
            <TimerToggleIcon />
            <span className="hidden text-[12px] font-semibold sm:inline">
              {schedulePlayerTimerButton(lang)}
            </span>
          </FlashcardControlButton>
        )}

        <FlashcardControlButton
          label={schedulePlayerAddCardButton(lang)}
          onClick={onOpenAddCard}
        >
          <AddCardIcon />
          <span className="hidden text-[12px] font-semibold sm:inline">
            {schedulePlayerAddCardButton(lang)}
          </span>
        </FlashcardControlButton>
      </div>

      {showTimerPanel ? (
        <div className="pointer-events-auto absolute left-3 right-3 top-[3.75rem] z-[13] space-y-2 rounded-2xl border border-ink/10 bg-white/95 px-3 py-3 shadow-soft backdrop-blur-sm tablet:left-4 tablet:right-auto tablet:top-[4.25rem] tablet:w-[min(100%,20rem)]">
          <p className="text-[13px] font-medium text-ink">
            {routineTimerStepLabel(lang)}
          </p>
          <p className="text-[12px] leading-snug text-ink-subtle">
            {focusModeOptTimerHint(lang)}
          </p>
          <TimerPresetPicker
            value={
              sessionTimerSec === 0
                ? undefined
                : sessionTimerSec ?? savedTimerSec
            }
            onChange={(sec) => onTimerChange(sec ?? 0)}
          />
        </div>
      ) : null}
    </>
  );
}
