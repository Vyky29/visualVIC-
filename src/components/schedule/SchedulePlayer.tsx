"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Routine, RoutineStep } from "@/lib/types/routine";
import { resolveCategoryBackCardUrlForStep } from "@/lib/cards/resolve-category-back-card";
import { useRoutinePlayback } from "@/hooks/useRoutinePlayback";
import { Button } from "@/components/ui/Button";
import { SwipeableStepCard } from "@/components/schedule/SwipeableStepCard";
import {
  routineAccentRings,
  routineSchedulePlayerChrome,
} from "@/lib/utils/routine-accent";
import { writeFirstThenSession } from "@/lib/experimental/first-then-session";
import { routineStepToGeneratedPixtoCard } from "@/lib/experimental/routine-step-to-pixto-card";
import { cn } from "@/lib/utils/cn";
import { SCHEDULE_COLUMN_CLASS, APP_SHELL_TABLET_INSET_CLASS } from "@/lib/constants/app-shell-layout";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import {
  dashboardFirstThenCardEyebrow,
  dashboardSchedulePlayerTitle,
  schedulePlayerCloseCta,
  schedulePlayerCompletedLabel,
  schedulePlayerDone,
  schedulePlayerDoneCountLabel,
  schedulePlayerDoubleTapHint,
  schedulePlayerDesktopFocusHint,
  schedulePlayerFocusModeCta,
  schedulePlayerNextLabel,
  schedulePlayerNowLabel,
  schedulePlayerResetCta,
  schedulePlayerTimerButton,
  schedulePlayerAddCardButton,
  routineTimerStepLabel,
  focusModeOptTimerHint,
  schedulePlayerRoutineCompleteBody,
  schedulePlayerRoutineCompleteTitle,
  schedulePlayerRunAgain,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { usePrefersFineHover } from "@/lib/hooks/usePrefersFineHover";
import { resolveStepTimerSec } from "@/lib/routines/resolve-step-timer";
import { useStepCountdown } from "@/hooks/useStepCountdown";
import { useAutoAdvanceOnTimerFinish } from "@/lib/hooks/useAutoAdvanceOnTimerFinish";
import { TimerPresetPicker } from "@/components/schedule/TimerPresetPicker";
import { ScheduleCardSearchPanel } from "@/components/schedule/ScheduleCardSearchPanel";
import type { PickableLibraryCard } from "@/lib/library/pickable-library-cards";
import {
  routineStepsFromLibraryPick,
} from "@/lib/library/pickable-library-cards";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { resolveRoutineById } from "@/lib/mock/routines";
import {
  isDeviceCustomRoutineId,
  loadScheduleStepsOverride,
  routineStepsWithoutFinishLike,
  saveScheduleStepsOverride,
} from "@/lib/preferences/schedule-steps-override";

type Props = {
  routine: Routine;
  backHref: string;
  getFocusHref?: (args: {
    routine: Routine;
    nowStep: RoutineStep;
    nowIndex: number;
  }) => string;
};

function FocusButtonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
      <path
        d="M3.75 12c1.8-3.62 4.93-5.43 8.25-5.43S18.45 8.38 20.25 12c-1.8 3.62-4.93 5.43-8.25 5.43S5.55 15.62 3.75 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.35" fill="currentColor" />
    </svg>
  );
}

function ResetButtonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
      <path
        d="M8.1 8.35h7.15M7.4 11.8h5.9M8.1 15.25h4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14.9 4.75h-5.8a3.35 3.35 0 0 0-3.35 3.35v7.8a3.35 3.35 0 0 0 3.35 3.35h5.8a3.35 3.35 0 0 0 3.35-3.35V8.1l-3.35-3.35Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseButtonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
      <path
        d="M7 7 17 17M17 7 7 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function pickToRoutineStep(card: PickableLibraryCard, index: number): RoutineStep {
  const fromPick = routineStepsFromLibraryPick(card.pickId, index)[0];
  if (fromPick) {
    return {
      ...fromPick,
      id: `sched-add-${Date.now().toString(36)}-${index}-${card.pickId.replace(/[^a-zA-Z0-9]+/g, "-")}`,
    };
  }
  return {
    id: `sched-add-${Date.now().toString(36)}-${index}`,
    title: card.label,
    imageUrl: card.imageUrl,
    ...(card.generatedPixto ? { generatedPixto: card.generatedPixto } : {}),
  };
}

function insertStepAfterIndex(
  steps: readonly RoutineStep[],
  index: number,
  newStep: RoutineStep,
): RoutineStep[] {
  const next = [...steps];
  next.splice(Math.max(0, index + 1), 0, newStep);
  return next;
}

export function SchedulePlayer({
  routine,
  backHref,
  getFocusHref,
}: Props) {
  const router = useRouter();
  const { routines: customRoutines, replaceRoutine } = useCustomRoutines();
  const [stepsOverride, setStepsOverride] = useState<RoutineStep[] | null>(null);
  const [showCardSearch, setShowCardSearch] = useState(false);

  useEffect(() => {
    const stored = loadScheduleStepsOverride(routine.id);
    setStepsOverride(stored);
  }, [routine.id]);

  const baseSteps = useMemo(
    () => routineStepsWithoutFinishLike(stepsOverride ?? routine.steps),
    [routine.steps, stepsOverride],
  );

  const playbackRoutine = useMemo(
    (): Routine => ({
      ...routine,
      steps: baseSteps,
    }),
    [routine, baseSteps],
  );

  const persistScheduleSteps = useCallback(
    (nextSteps: RoutineStep[]) => {
      const withoutFinish = routineStepsWithoutFinishLike(nextSteps);
      setStepsOverride(withoutFinish);
      saveScheduleStepsOverride(routine.id, withoutFinish);

      const isCustom = isDeviceCustomRoutineId(routine.id, customRoutines);
      const isStock = Boolean(resolveRoutineById(routine.id));
      if (isCustom && !isStock) {
        replaceRoutine({
          ...routine,
          steps: withoutFinish,
        });
      }
    },
    [customRoutines, replaceRoutine, routine],
  );

  const accentRings = useMemo(
    () => routineAccentRings(playbackRoutine),
    [playbackRoutine],
  );
  const scheduleChrome = useMemo(
    () => routineSchedulePlayerChrome(playbackRoutine),
    [playbackRoutine],
  );
  const {
    nowStep,
    nextStep,
    finishedSteps,
    upcomingSteps,
    isComplete,
    completeCurrent,
    reset,
    stepStatus,
    completedCount,
    totalSteps,
    nowIndex,
    steps,
  } = useRoutinePlayback(playbackRoutine, {
    syncSession: true,
    appendFinishStep: false,
  });

  const progress =
    totalSteps === 0 ? 0 : Math.round((completedCount / totalSteps) * 100);

  const showFirstThen = routine.tags?.includes("first-then") ?? false;
  const cardUiLang = useCardUiLanguage();
  const prefersFinePointer = usePrefersFineHover();
  const [showTimerPanel, setShowTimerPanel] = useState(false);
  const [sessionTimerSec, setSessionTimerSec] = useState<number | undefined>();

  const savedTimerSec = nowStep ? resolveStepTimerSec(nowStep) : undefined;
  const activeTimerSec =
    sessionTimerSec === 0
      ? undefined
      : sessionTimerSec ?? savedTimerSec;
  const {
    remaining: nowTimerRemaining,
    totalSeconds: nowTimerTotal,
    hasTimer: nowHasTimer,
    finished: nowTimerFinished,
  } = useStepCountdown(
    activeTimerSec,
    nowStep?.id ?? "none",
    Boolean(nowStep && !isComplete),
  );

  useAutoAdvanceOnTimerFinish({
    active: Boolean(nowStep && !isComplete),
    stepKey: nowStep?.id ?? "none",
    hasTimer: nowHasTimer,
    finished: nowTimerFinished,
    onAdvance: completeCurrent,
  });

  useEffect(() => {
    setSessionTimerSec(undefined);
    setShowTimerPanel(false);
  }, [nowStep?.id]);

  const addCardToSchedule = useCallback(
    (card: PickableLibraryCard) => {
      if (nowIndex < 0) return;
      const newStep = pickToRoutineStep(card, nowIndex + 1);
      const nextSteps = insertStepAfterIndex(baseSteps, nowIndex, newStep);
      persistScheduleSteps(nextSteps);
    },
    [baseSteps, nowIndex, persistScheduleSteps],
  );

  const openFocus = () => {
    if (!nowStep) return;
    const focusHref = getFocusHref
      ? getFocusHref({ routine, nowStep, nowIndex })
      : `/focus/${routine.id}`;
    router.push(focusHref);
  };

  const openFirstThen = () => {
    if (!nowStep) return;
    const thenStep = nextStep ?? steps[nowIndex + 1];
    if (!thenStep) return;
    writeFirstThenSession({
      first: routineStepToGeneratedPixtoCard(nowStep),
      second: routineStepToGeneratedPixtoCard(thenStep),
      routineHref: `/player/${routine.id}`,
    });
    router.push(`/first-then?from=${encodeURIComponent(`/player/${routine.id}`)}`);
  };

  return (
    <div className={cn("flex flex-col gap-6 px-5 pb-10 pt-1", APP_SHELL_TABLET_INSET_CLASS)}>
      <ScheduleCardSearchPanel
        open={showCardSearch}
        onClose={() => setShowCardSearch(false)}
        onPick={addCardToSchedule}
      />
      <header className="space-y-3">
        <div className="flex items-end justify-between gap-3 px-0.5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              {dashboardSchedulePlayerTitle(cardUiLang)}
            </p>
            <h2 className="mt-1 text-[22px] font-semibold leading-tight tracking-tight text-ink">
              {stockRoutineDisplayName(routine.id, routine.name, cardUiLang)}
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
        <div className="flex items-stretch gap-2">
          {nowStep && !isComplete ? (
            <Button
              type="button"
              variant="secondary"
              className={cn(
                scheduleChrome.focusCta,
                "min-w-0 flex-[1.45] gap-2.5 px-4 w-auto",
              )}
              onClick={openFocus}
            >
              <FocusButtonIcon />
              <span className="truncate">{schedulePlayerFocusModeCta(cardUiLang)}</span>
            </Button>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            className="min-h-touch min-w-0 flex-[1.05] gap-2 px-4"
            onClick={reset}
          >
            <ResetButtonIcon />
            <span>{schedulePlayerResetCta(cardUiLang)}</span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="min-h-touch min-w-0 flex-1 gap-2 px-3"
            onClick={() => setShowTimerPanel((v) => !v)}
            aria-pressed={showTimerPanel || nowHasTimer}
          >
            <span aria-hidden>⏱</span>
            <span className="truncate">{schedulePlayerTimerButton(cardUiLang)}</span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="min-h-touch min-w-0 flex-1 gap-2 px-3"
            onClick={() => setShowCardSearch(true)}
          >
            <span aria-hidden>+</span>
            <span className="truncate">{schedulePlayerAddCardButton(cardUiLang)}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="min-h-touch shrink-0 gap-2 px-4"
            onClick={() => router.push(backHref)}
          >
            <span className="text-[#C84C57]">
              <CloseButtonIcon />
            </span>
            <span>{schedulePlayerCloseCta(cardUiLang)}</span>
          </Button>
        </div>

        {showTimerPanel && nowStep && !isComplete ? (
          <div className="space-y-2 rounded-2xl border border-ink/10 bg-white/80 px-3 py-3">
            <p className="text-[13px] font-medium text-ink">
              {routineTimerStepLabel(cardUiLang)}
            </p>
            <p className="text-[12px] leading-snug text-ink-subtle">
              {focusModeOptTimerHint(cardUiLang)}
            </p>
            <TimerPresetPicker
              value={
                sessionTimerSec === 0
                  ? undefined
                  : sessionTimerSec ?? savedTimerSec
              }
              onChange={(sec) => setSessionTimerSec(sec ?? 0)}
            />
          </div>
        ) : null}

        {showFirstThen ? (
          <div className="flex justify-center px-1">
            <button
              type="button"
              onClick={openFirstThen}
              className="touch-manipulation text-[13px] font-medium text-sage underline-offset-4 transition active:underline active:opacity-90 [@media(hover:hover)_and_(pointer:fine)]:hover:underline"
            >
              {dashboardFirstThenCardEyebrow(cardUiLang)}
            </button>
          </div>
        ) : null}
      </div>

      <div className={cn("mx-auto w-full space-y-6", SCHEDULE_COLUMN_CLASS)}>
        {nowStep ? (
          <motion.section
            initial={{ opacity: 0.92, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative space-y-3 pt-1"
          >
            <div className="flex items-center gap-2 px-1">
              <span className={scheduleChrome.nowDot} />
              <h3 className={scheduleChrome.nowLabel}>
                {schedulePlayerNowLabel(cardUiLang)}
              </h3>
            </div>
            <div className="relative">
              <SwipeableStepCard
                step={nowStep}
                status={stepStatus(nowStep)}
                variant="hero"
                onSwipeComplete={() => completeCurrent()}
                doubleTapCompletes
                completionBackImageUrl={resolveCategoryBackCardUrlForStep(nowStep)}
                accentRings={accentRings}
                scheduleTimer={
                  nowHasTimer
                    ? {
                        remainingSec: nowTimerRemaining,
                        totalSec: nowTimerTotal,
                        finished: nowTimerFinished,
                      }
                    : undefined
                }
              />
            </div>
            <p className="px-1 text-center text-[11px] leading-snug text-ink-faint">
              {prefersFinePointer
                ? schedulePlayerDesktopFocusHint(cardUiLang)
                : schedulePlayerDoubleTapHint(cardUiLang)}
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
              {schedulePlayerNextLabel(cardUiLang)}
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
                  completionBackImageUrl={resolveCategoryBackCardUrlForStep(step)}
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
                {schedulePlayerCompletedLabel(cardUiLang)}
              </h3>
              <span className="text-[12px] font-medium tabular-nums text-ink-faint">
                {schedulePlayerDoneCountLabel(completedCount, cardUiLang)}
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
                  completionBackImageUrl={resolveCategoryBackCardUrlForStep(step)}
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
          className={cn(
            "mx-auto w-full rounded-3xl bg-gradient-to-br from-accent-soft/50 to-cream px-5 py-6 text-center ring-1 ring-accent/25",
            SCHEDULE_COLUMN_CLASS,
          )}
        >
          <p className="text-[18px] font-semibold text-ink">
            {schedulePlayerRoutineCompleteTitle(cardUiLang)}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-subtle">
            {schedulePlayerRoutineCompleteBody(cardUiLang)}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button type="button" variant="secondary" onClick={reset}>
              {schedulePlayerRunAgain(cardUiLang)}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => router.push(backHref)}
            >
              {schedulePlayerDone(cardUiLang)}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
