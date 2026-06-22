"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { formatTimerDisplay } from "@/lib/routines/resolve-step-timer";
import { scheduleStepTimerAria } from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

type Props = {
  remainingSec: number;
  totalSec: number;
  variant: "focus" | "schedule";
  finished?: boolean;
  className?: string;
};

export function StepTimerBadge({
  remainingSec,
  totalSec,
  variant,
  finished = false,
  className,
}: Props) {
  const lang = useCardUiLanguage();
  const progress =
    totalSec > 0 ? Math.min(1, Math.max(0, remainingSec / totalSec)) : 0;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const isFocus = variant === "focus";

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-[12] flex items-center justify-center",
        isFocus ? "bottom-4 right-4 tablet:bottom-5 tablet:right-5" : "left-3 top-3 tablet:left-4 tablet:top-4",
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
          "relative flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full shadow-soft ring-1 backdrop-blur-sm tablet:h-[4.25rem] tablet:w-[4.25rem]",
          isFocus
            ? "bg-black/55 text-cream ring-white/20"
            : "bg-white/92 text-ink ring-ink/10",
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
            className={isFocus ? "stroke-white/15" : "stroke-ink/10"}
            strokeWidth="3"
          />
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            className={cn(
              "transition-[stroke-dashoffset] duration-1000 ease-linear",
              isFocus ? "stroke-cream/85" : "stroke-sage",
            )}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span
          className={cn(
            "relative tabular-nums tracking-tight",
            totalSec >= 600 ? "text-[15px] font-bold" : "text-[17px] font-bold",
          )}
        >
          {formatTimerDisplay(remainingSec)}
        </span>
      </motion.div>
    </div>
  );
}
