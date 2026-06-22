"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { formatTimerDisplay } from "@/lib/routines/resolve-step-timer";
import { scheduleStepTimerAria } from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

type Props = {
  remainingSec: number;
  totalSec: number;
  variant: "focus" | "schedule" | "schedule-pack-mark";
  finished?: boolean;
  className?: string;
  /** Schedule pack-mark slot — progress ring matches card category. */
  categoryColour?: string;
};

export function StepTimerBadge({
  remainingSec,
  totalSec,
  variant,
  finished = false,
  className,
  categoryColour,
}: Props) {
  const lang = useCardUiLanguage();
  const progress =
    totalSec > 0 ? Math.min(1, Math.max(0, remainingSec / totalSec)) : 0;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const isFocus = variant === "focus";
  const isPackMark = variant === "schedule-pack-mark";
  const ringColour = categoryColour ?? (isFocus ? "#f5f0e8" : "#6b9080");

  return (
    <div
      className={cn(
        "pointer-events-none flex items-center justify-center",
        isPackMark
          ? "relative h-full w-full"
          : cn(
              "absolute z-[12]",
              isFocus
                ? "bottom-4 right-4 tablet:bottom-5 tablet:right-5"
                : "bottom-3 right-3 tablet:bottom-4 tablet:right-4",
            ),
        className,
      )}
      aria-live="polite"
      aria-label={scheduleStepTimerAria(remainingSec, lang)}
    >
      <motion.div
        animate={
          finished
            ? { scale: [1, 1.06, 1], opacity: [1, 0.92, 1] }
            : { scale: 1, opacity: 1 }
        }
        transition={
          finished
            ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        className={cn(
          "relative flex items-center justify-center rounded-2xl shadow-soft ring-1 backdrop-blur-sm",
          isPackMark
            ? "aspect-square h-full w-full rounded-[22%] bg-white/95 ring-ink/10"
            : cn(
                "rounded-full",
                "h-[3.75rem] w-[3.75rem] tablet:h-[4.25rem] tablet:w-[4.25rem]",
                isFocus
                  ? "bg-black/55 text-cream ring-white/20"
                  : "bg-white/92 text-ink ring-ink/10",
              ),
        )}
      >
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 52 52"
          aria-hidden
        >
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke={isFocus ? "rgba(255,255,255,0.15)" : "rgba(28,36,32,0.1)"}
            strokeWidth="3"
          />
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke={ringColour}
            strokeOpacity={isFocus ? 0.85 : 1}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span
          className={cn(
            "relative tabular-nums tracking-tight text-ink",
            isPackMark
              ? totalSec >= 600
                ? "text-[9px] font-bold sm:text-[10px]"
                : "text-[10px] font-bold sm:text-[11px]"
              : totalSec >= 600
                ? "text-[15px] font-bold"
                : "text-[17px] font-bold",
            isFocus && !isPackMark && "text-cream",
          )}
        >
          {formatTimerDisplay(remainingSec)}
        </span>
      </motion.div>
    </div>
  );
}
