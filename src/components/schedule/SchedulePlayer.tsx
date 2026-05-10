"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Routine } from "@/lib/types/routine";
import { resolveCategoryBackCardUrl } from "@/lib/cards/resolve-category-back-card";
import { useRoutinePlayback } from "@/hooks/useRoutinePlayback";
import { Button } from "@/components/ui/Button";
import { SwipeableStepCard } from "@/components/schedule/SwipeableStepCard";
import {
  routineAccentRings,
  routineSchedulePlayerChrome,
} from "@/lib/utils/routine-accent";
import { cn } from "@/lib/utils/cn";

type Props = {
  routine: Routine;
  backHref: string;
};

export function SchedulePlayer({ routine, backHref }: Props) {
  const router = useRouter();
  const accentRings = useMemo(() => routineAccentRings(routine), [routine]);
  const scheduleChrome = useMemo(
    () => routineSchedulePlayerChrome(routine),
    [routine],
  );
  const {
    nowStep,
    finishedSteps,
    upcomingSteps,
    isComplete,
    completeCurrent,
    reset,
    stepStatus,
    completedCount,
    totalSteps,
  } = useRoutinePlayback(routine, { syncSession: true });

  const progress =
    totalSteps === 0 ? 0 : Math.round((completedCount / totalSteps) * 100);

  const focusHref = `/focus/${routine.id}`;
  const showFirstThen = routine.tags?.includes("first-then") ?? false;

  const openFocus = () => router.push(focusHref);

  return (
    <div className="flex flex-col gap-6 px-5 pb-10 pt-1">
      <header className="space-y-3">
        <div className="flex items-end justify-between gap-3 px-0.5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Schedule Player
            </p>
            <h2 className="mt-1 text-[22px] font-semibold leading-tight tracking-tight text-ink">
              {routine.name}
            </h2>
          </div>
          <span className={scheduleChrome.counterPill}>
            {completedCount}/{totalSteps}
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-canvas-muted ring-1 ring-ink/5"
          role="progressbar"
          aria-valuenow={completedCount}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
        >
          <motion.div
            className={cn(
              "h-full rounded-full",
              scheduleChrome.progressFill,
            )}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {nowStep && !isComplete ? (
          <Button
            type="button"
            variant="secondary"
            className={cn(scheduleChrome.focusCta)}
            onClick={openFocus}
          >
            Open Focus Mode
          </Button>
        ) : null}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="min-h-touch flex-1"
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="min-h-touch px-4"
            onClick={() => router.push(backHref)}
          >
            Close
          </Button>
        </div>

        {showFirstThen ? (
          <div className="flex justify-center px-1">
            <Link
              href="/first-then"
              className="touch-manipulation text-[13px] font-medium text-sage underline-offset-4 transition active:underline active:opacity-90 [@media(hover:hover)_and_(pointer:fine)]:hover:underline"
            >
              First &amp; Then
            </Link>
          </div>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-[min(100%,21rem)] space-y-6">
        {nowStep ? (
          <motion.section
            initial={{ opacity: 0.92, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative space-y-3 pt-1"
          >
            <div className="flex items-center gap-2 px-1">
              <span className={scheduleChrome.nowDot} />
              <h3 className={scheduleChrome.nowLabel}>Now</h3>
            </div>
            <SwipeableStepCard
              step={nowStep}
              status={stepStatus(nowStep)}
              variant="hero"
              onSwipeComplete={() => completeCurrent()}
              onDoubleTapOpenFocus={openFocus}
              completionBackImageUrl={resolveCategoryBackCardUrl(
                nowStep.imageUrl,
              )}
              accentRings={accentRings}
            />
            <p className="px-1 text-center text-[11px] leading-snug text-ink-faint">
              Double tap to focus
            </p>
          </motion.section>
        ) : null}

        {upcomingSteps.length > 0 ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22 }}
            className="space-y-2"
          >
            <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">
              Next
            </h3>
            <div className="flex flex-col items-center gap-4">
              {upcomingSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  className="flex w-full justify-center"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.22,
                    delay: Math.min(i * 0.04, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                <SwipeableStepCard
                  step={step}
                  status={stepStatus(step)}
                  variant="next"
                  onSwipeComplete={() => {}}
                  completionBackImageUrl={resolveCategoryBackCardUrl(
                    step.imageUrl,
                  )}
                  accentRings={accentRings}
                />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {finishedSteps.length > 0 ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 border-t border-ink/10 pt-6"
          >
            <div className="flex items-baseline justify-between gap-3 px-1">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Completed
              </h3>
              <span className="text-[12px] font-medium tabular-nums text-ink-faint">
                {completedCount} done
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {finishedSteps.map((step) => (
                <SwipeableStepCard
                  key={step.id}
                  step={step}
                  status={stepStatus(step)}
                  variant="compact"
                  onSwipeComplete={() => {}}
                  completionBackImageUrl={resolveCategoryBackCardUrl(
                    step.imageUrl,
                  )}
                  accentRings={accentRings}
                />
              ))}
            </div>
          </motion.section>
        ) : null}
      </div>

      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[min(100%,21rem)] rounded-3xl bg-gradient-to-br from-accent-soft/50 to-cream px-5 py-6 text-center ring-1 ring-accent/25"
        >
          <p className="text-[18px] font-semibold text-ink">Routine complete</p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-subtle">
            All steps are done. Run again anytime for the same calm rhythm.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button type="button" variant="secondary" onClick={reset}>
              Run again
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => router.push(backHref)}
            >
              Done
            </Button>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
