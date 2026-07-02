import type { RoutineStep } from "@/lib/types/routine";

/** Explicit “no timer” on this step. */
export function isStepTimerExplicitlyOff(step: RoutineStep): boolean {
  return step.durationHintSec === 0;
}

/**
 * Optional per-step countdown (seconds). Only set when the step has an explicit
 * duration — never inherited from a routine-wide default.
 */
export function resolveStepTimerSec(step: RoutineStep): number | undefined {
  if (isStepTimerExplicitlyOff(step)) return undefined;

  const stepSec = step.durationHintSec;
  if (typeof stepSec === "number" && stepSec > 0) return stepSec;

  return undefined;
}

export function formatTimerDisplay(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Preset durations staff can pick when building a routine. */
export const ROUTINE_TIMER_PRESETS_SEC = [30, 60, 120, 180, 300, 600] as const;

export function timerPresetLabel(seconds: number, lang: "en" | "es"): string {
  if (seconds < 60) return lang === "es" ? `${seconds} s` : `${seconds}s`;
  const minutes = seconds / 60;
  return lang === "es" ? `${minutes} min` : `${minutes}m`;
}
