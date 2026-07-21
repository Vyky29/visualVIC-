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
import { buildFirstThenQueueFromRoutineSteps } from "@/lib/first-then/build-first-then-queue";
import { cn } from "@/lib/utils/cn";
import { SCHEDULE_COLUMN_CLASS, APP_SHELL_TABLET_INSET_CLASS } from "@/lib/constants/app-shell-layout";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import {
  dashboardFirstThenCardEyebrow,
  dashboardSchedulePlayerTitle,
  schedulePlayerCompletedLabel,
  schedulePlayerDone,
  schedulePlayerDoneCountLabel,
  schedulePlayerDoubleTapHint,
  schedulePlayerDesktopFocusHint,
  schedulePlayerVoiceToggleAria,
  schedulePlayerNextLabel,
  schedulePlayerNowLabel,
  schedulePlayerAddCardButton,
  schedulePlayerToolbarFocus,
  schedulePlayerToolbarAudio,
  schedulePlayerToolbarTimer,
  schedulePlayerToolbarReset,
  schedulePlayerToolbarClose,
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
import { useScheduleVoice } from "@/hooks/useScheduleVoice";
import { ScheduleVoiceToggle } from "@/components/schedule/ScheduleVoiceToggle";
import { ScheduleToolbarAction } from "@/components/schedule/ScheduleToolbarAction";
import { ScheduleInsertSlotPicker } from "@/components/schedule/ScheduleInsertSlotPicker";
import { speakableRoutineStepTitle } from "@/lib/voice/speakable-titles";
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.2 8.4A6.4 6.4 0 1 1 5.6 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.2 5.2v3.4H10.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimerButtonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="13" r="7.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 13V9.5M9.5 4.5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AddButtonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 6.5v11M6.5 12h11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseButtonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
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

function insertStepAtIndex(
  steps: readonly RoutineStep[],
  index: number,
  newStep: RoutineStep,
): RoutineStep[] {
  const next = [...steps];
  next.splice(Math.max(0, Math.min(index, next.length)), 0, newStep);
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
  const [showInsertPicker, setShowInsertPicker] = useState(false);
  const [insertAtIndex, setInsertAtIndex] = useState<number | null>(null);

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
  const {
    voiceEnabled,
    toggleVoice,
    speakScheduleOverview,
    advanceWithAlarmAndSpeak,
    unlockVoice,
  } = useScheduleVoice(cardUiLang);

  const remainingTitles = useMemo(() => {
    if (isComplete || nowIndex < 0) return [] as string[];
    return steps
      .slice(nowIndex)
      .map((s) => speakableRoutineStepTitle(s, cardUiLang))
      .filter(Boolean);
  }, [cardUiLang, isComplete, nowIndex, steps]);

  useEffect(() => {
    if (!voiceEnabled || remainingTitles.length === 0) return;
    void speakScheduleOverview(remainingTitles);
    // Speak overview when voice turns on or routine id changes — not on every step.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [voiceEnabled, routine.id]);

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

  const onTimerAdvance = useCallback(() => {
    const nextTitle = speakableRoutineStepTitle(nextStep, cardUiLang);
    advanceWithAlarmAndSpeak(nextTitle || undefined, completeCurrent);
  }, [advanceWithAlarmAndSpeak, cardUiLang, completeCurrent, nextStep]);

  useAutoAdvanceOnTimerFinish({
    active: Boolean(nowStep && !isComplete),
    stepKey: nowStep?.id ?? "none",
    hasTimer: nowHasTimer,
    finished: nowTimerFinished,
    onAdvance: onTimerAdvance,
  });

  useEffect(() => {
    setSessionTimerSec(undefined);
    setShowTimerPanel(false);
  }, [nowStep?.id]);

  const closeAddFlow = useCallback(() => {
    setShowInsertPicker(false);
    setShowCardSearch(false);
    setInsertAtIndex(null);
  }, []);

  const openAddFlow = useCallback(() => {
    setShowCardSearch(false);
    setInsertAtIndex(null);
    setShowInsertPicker(true);
  }, []);

  const onPickInsertSlot = useCallback((insertAt: number) => {
    setInsertAtIndex(insertAt);
    setShowInsertPicker(false);
    setShowCardSearch(true);
  }, []);

  const addCardToSchedule = useCallback(
    (card: PickableLibraryCard) => {
      const at =
        insertAtIndex ??
        (nowIndex >= 0 ? nowIndex + 1 : baseSteps.length);
      const newStep = pickToRoutineStep(card, at);
      const nextSteps = insertStepAtIndex(baseSteps, at, newStep);
      persistScheduleSteps(nextSteps);
      closeAddFlow();
    },
    [baseSteps, closeAddFlow, insertAtIndex, nowIndex, persistScheduleSteps],
  );

  const openFocus = () => {
    if (!nowStep) return;
    const focusHref = getFocusHref
      ? getFocusHref({ routine, nowStep, nowIndex })
      : `/focus/${routine.id}`;
    router.push(focusHref);
  };

  const openFirstThen = () => {
    if (!nowStep || nowIndex < 0) return;
    const queue = buildFirstThenQueueFromRoutineSteps(steps, nowIndex, {
      firstTimerSec: activeTimerSec,
    });
    if (queue.length < 2) return;
    writeFirstThenSession({
      queue,
      routineHref: `/player/${routine.id}`,
    });
    router.push(`/first-then?from=${encodeURIComponent(`/player/${routine.id}`)}`);
  };

  return (
    <div className={cn("flex flex-col gap-6 px-5 pb-10 pt-1", APP_SHELL_TABLET_INSET_CLASS)}>
      <ScheduleInsertSlotPicker
        open={showInsertPicker}
        steps={baseSteps}
        onClose={closeAddFlow}
        onPickSlot={onPickInsertSlot}
      />
      <ScheduleCardSearchPanel
        open={showCardSearch}
        onClose={closeAddFlow}
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
        <div className="flex items-stretch gap-1.5 sm:gap-2">
          {nowStep && !isComplete ? (
            <ScheduleToolbarAction
              icon={<FocusButtonIcon />}
              label={schedulePlayerToolbarFocus(cardUiLang)}
              onClick={openFocus}
              emphasize
            />
          ) : null}
          <ScheduleVoiceToggle
            enabled={voiceEnabled}
            onToggle={toggleVoice}
            ariaLabel={schedulePlayerVoiceToggleAria(cardUiLang)}
            label={schedulePlayerToolbarAudio(cardUiLang)}
            stacked
          />
          <ScheduleToolbarAction
            icon={<ResetButtonIcon />}
            label={schedulePlayerToolbarReset(cardUiLang)}
            onClick={reset}
          />
          <ScheduleToolbarAction
            icon={<TimerButtonIcon />}
            label={schedulePlayerToolbarTimer(cardUiLang)}
            onClick={() => {
              unlockVoice();
              setShowTimerPanel((v) => !v);
            }}
            pressed={showTimerPanel || nowHasTimer}
          />
          <ScheduleToolbarAction
            icon={<AddButtonIcon />}
            label={schedulePlayerAddCardButton(cardUiLang)}
            onClick={openAddFlow}
          />
          <ScheduleToolbarAction
            icon={<CloseButtonIcon />}
            label={schedulePlayerToolbarClose(cardUiLang)}
            onClick={() => router.push(backHref)}
            danger
          />
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
              onChange={(sec) => {
                unlockVoice();
                setSessionTimerSec(sec ?? 0);
              }}
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
