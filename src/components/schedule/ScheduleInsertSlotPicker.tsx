"use client";

import Image from "next/image";
import type { RoutineStep } from "@/lib/types/routine";
import {
  scheduleInsertAfterLabel,
  scheduleInsertAtStartLabel,
  scheduleInsertPickHint,
  scheduleInsertPickTitle,
  scheduleCardSearchClose,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { speakableRoutineStepTitle } from "@/lib/voice/speakable-titles";
import { cn } from "@/lib/utils/cn";

type Props = {
  open: boolean;
  steps: readonly RoutineStep[];
  onClose: () => void;
  /** Index in `steps` where the new card will be inserted (0 = before first). */
  onPickSlot: (insertAt: number) => void;
};

function StepThumb({ step }: { step: RoutineStep }) {
  if (!step.imageUrl) {
    return (
      <div className="h-11 w-9 shrink-0 rounded-lg bg-canvas-muted ring-1 ring-ink/8" />
    );
  }
  return (
    <div className="relative h-11 w-9 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-ink/8">
      <Image
        src={step.imageUrl}
        alt=""
        fill
        className="object-contain p-0.5"
        sizes="36px"
        unoptimized={step.imageUrl.startsWith("/")}
      />
    </div>
  );
}

function InsertSlotButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-sage/45 bg-sage-mist/40 px-3 py-2.5 text-[13px] font-semibold text-sage transition active:bg-sage-mist"
    >
      <span aria-hidden>+</span>
      {label}
    </button>
  );
}

export function ScheduleInsertSlotPicker({
  open,
  steps,
  onClose,
  onPickSlot,
}: Props) {
  const lang = useCardUiLanguage();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-ink/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-insert-slot-title"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mt-auto max-h-[85dvh] w-full overflow-hidden rounded-t-[1.5rem] bg-cream shadow-soft ring-1 ring-ink/10">
        <div className="flex items-start justify-between gap-3 border-b border-ink/5 px-4 pb-3 pt-4">
          <div className="min-w-0">
            <h2
              id="schedule-insert-slot-title"
              className="text-[16px] font-semibold text-ink"
            >
              {scheduleInsertPickTitle(lang)}
            </h2>
            <p className="mt-1 text-[12px] leading-snug text-ink-subtle">
              {scheduleInsertPickHint(lang)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl px-3 py-2 text-[13px] font-medium text-ink-subtle"
          >
            {scheduleCardSearchClose(lang)}
          </button>
        </div>

        <div className="max-h-[min(70dvh,32rem)] space-y-2 overflow-y-auto px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <InsertSlotButton
            label={scheduleInsertAtStartLabel(lang)}
            onClick={() => onPickSlot(0)}
          />

          {steps.map((step, index) => {
            const title =
              speakableRoutineStepTitle(step, lang) || step.title || "—";
            return (
              <div key={step.id} className="space-y-2">
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-ink/[0.07]",
                  )}
                >
                  <span className="w-5 shrink-0 text-center text-[12px] font-semibold tabular-nums text-ink-faint">
                    {index + 1}
                  </span>
                  <StepThumb step={step} />
                  <p className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink">
                    {title}
                  </p>
                </div>
                <InsertSlotButton
                  label={scheduleInsertAfterLabel(lang, title)}
                  onClick={() => onPickSlot(index + 1)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
