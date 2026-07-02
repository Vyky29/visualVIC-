"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Routine } from "@/lib/types/routine";
import { useRoutinePlayback } from "@/hooks/useRoutinePlayback";
import { resolveCategoryBackCardUrlForStep } from "@/lib/cards/resolve-category-back-card";
import { SwipeableStepCard } from "@/components/schedule/SwipeableStepCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { FOCUS_CARD_STAGE_CLASS } from "@/lib/constants/app-shell-layout";
import { routineAccentRings } from "@/lib/utils/routine-accent";
import {
  focusModeAllFinishedTitle,
  focusModeAriaOptions,
  focusModeAriaPreviousStep,
  focusModeAriaSkipNext,
  focusModeAriaSupportTools,
  focusModeNothingLeftBody,
  focusModeNothingLeftTitle,
  focusModeOptBackSchedule,
  focusModeOptExpandedCards,
  focusModeOptExitFocus,
  focusModeOptFirstThen,
  focusModeOptMarkFinished,
  focusModeOptRestartRoutine,
  focusModeReturnScheduleAria,
  focusModeSheetOptionsTitle,
  focusModeSheetSupportTitle,
  focusModeSupportCalmCard,
  focusModeSupportRepeatInstruction,
  focusModeSupportSimplified,
  schedulePlayerCloseCta,
  schedulePlayerDone,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { useFocusExpandedCards } from "@/lib/preferences/use-focus-expanded-cards";
import { usePrefersFineHover } from "@/lib/hooks/usePrefersFineHover";
import { writeFirstThenSession } from "@/lib/experimental/first-then-session";
import { routineStepToGeneratedPixtoCard } from "@/lib/experimental/routine-step-to-pixto-card";
import { resolveStepTimerSec } from "@/lib/routines/resolve-step-timer";
import { useStepCountdown } from "@/hooks/useStepCountdown";
import { useAutoAdvanceOnTimerFinish } from "@/lib/hooks/useAutoAdvanceOnTimerFinish";
import { TimerPresetPicker } from "@/components/schedule/TimerPresetPicker";
import {
  focusModeOptTimerHint,
  routineTimerStepLabel,
} from "@/lib/i18n/app-shell-locale";

type Props = {
  routine: Routine;
  exitHref: string;
};

/**
 * Set to `true` while testing corner zones in `next dev`. Keep `false` for normal use.
 */
const SHOW_FOCUS_ZONE_LABELS = false;

const showZoneDebug =
  process.env.NODE_ENV === "development" && SHOW_FOCUS_ZONE_LABELS;

/** Bottom sheet — no handle bar, calm */
function Sheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex touch-manipulation flex-col justify-end bg-ink/45 backdrop-blur-[2px]"
          role="presentation"
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            exit={{ y: 16 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mx-auto w-full max-w-lg rounded-t-[1.5rem] bg-cream px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-soft ring-1 ring-ink/10",
              "tablet:max-w-[min(100%,36rem)]",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[14px] font-medium text-ink/90">{title}</p>
            <div className="mt-3 pb-1">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function sheetRow(
  label: string,
  onActivate: () => void,
  key: string,
) {
  return (
    <button
      key={key}
      type="button"
      className="w-full rounded-xl border-0 bg-canvas-muted/90 py-3.5 pl-4 pr-4 text-left text-[15px] font-normal text-ink ring-1 ring-ink/[0.07] transition-colors active:bg-canvas"
      onClick={onActivate}
    >
      {label}
    </button>
  );
}

function sheetToggleRow(
  label: string,
  active: boolean,
  onToggle: () => void,
  key: string,
) {
  return (
    <button
      key={key}
      type="button"
      aria-pressed={active}
      className="flex w-full items-center justify-between gap-3 rounded-xl border-0 bg-canvas-muted/90 py-3.5 pl-4 pr-4 text-left text-[15px] font-normal text-ink ring-1 ring-ink/[0.07] transition-colors active:bg-canvas"
      onClick={onToggle}
    >
      <span>{label}</span>
      {active ? (
        <span className="shrink-0 text-[13px] font-semibold text-sage">On</span>
      ) : null}
    </button>
  );
}

function FocusCardStage({
  children,
  expandedCards,
}: {
  children: ReactNode;
  expandedCards: boolean;
}) {
  return (
    <div className="pointer-events-auto flex h-full min-h-0 w-full flex-col px-1 py-0.5 sm:px-1.5 tablet:px-4">
      <div
        className={cn(
          "relative mx-auto h-full min-h-0 w-full",
          expandedCards
            ? FOCUS_CARD_STAGE_CLASS.expanded
            : FOCUS_CARD_STAGE_CLASS.default,
        )}
      >
        {children}
      </div>
    </div>
  );
}

const TAP_SLOP = 14;
const TAP_MAX_MS = 420;

/** Reliable tap (no long-press) for iOS Safari — small movement, short duration */
function useTapZone(onTap: () => void) {
  const startRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const movedRef = useRef(false);
  const captureElRef = useRef<HTMLElement | null>(null);
  const captureIdRef = useRef<number | null>(null);

  const releaseCapture = useCallback(() => {
    const el = captureElRef.current;
    const id = captureIdRef.current;
    captureElRef.current = null;
    captureIdRef.current = null;
    if (el != null && id != null) {
      try {
        if (el.hasPointerCapture?.(id)) el.releasePointerCapture(id);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    movedRef.current = false;
    const el = e.currentTarget as HTMLElement;
    captureElRef.current = el;
    captureIdRef.current = e.pointerId;
    try {
      el.setPointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = startRef.current;
    if (!s) return;
    if (
      Math.hypot(e.clientX - s.x, e.clientY - s.y) > TAP_SLOP
    ) {
      movedRef.current = true;
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      releaseCapture();
      const s = startRef.current;
      startRef.current = null;
      if (!s || movedRef.current) return;
      if (Date.now() - s.t > TAP_MAX_MS) return;
      onTap();
    },
    [onTap, releaseCapture],
  );

  const onPointerCancel = useCallback(() => {
    releaseCapture();
    startRef.current = null;
    movedRef.current = false;
  }, [releaseCapture]);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}

export function FocusMode({ routine, exitHref }: Props) {
  const router = useRouter();
  const lang = useCardUiLanguage();
  const prefersFineHover = usePrefersFineHover();
  const { enabled: expandedCards, toggle: toggleExpandedCards } =
    useFocusExpandedCards();
  const {
    steps,
    nowStep,
    nextStep,
    nowIndex,
    totalSteps,
    isComplete,
    completeCurrent,
    skipCurrent,
    reset,
    stepStatus,
    goPrevious,
  } = useRoutinePlayback(routine, {
    syncSession: true,
    appendFinishStep: false,
  });

  const openFirstThen = useCallback(() => {
    if (!nowStep) return;
    const thenStep = nextStep ?? steps[nowIndex + 1];
    if (!thenStep) return;
    writeFirstThenSession({
      first: routineStepToGeneratedPixtoCard(nowStep, routine),
      second: routineStepToGeneratedPixtoCard(thenStep, routine),
      routineHref: exitHref,
    });
    setSheet(null);
    router.push(`/first-then?from=${encodeURIComponent(exitHref)}`);
  }, [nowStep, nextStep, steps, nowIndex, exitHref, router, routine]);

  const accentRings = useMemo(() => routineAccentRings(routine), [routine]);

  const [sheet, setSheet] = useState<"support" | "options" | null>(null);
  const [sessionTimerSec, setSessionTimerSec] = useState<number | undefined>();

  const exit = useCallback(() => router.push(exitHref), [router, exitHref]);

  const tl = useTapZone(goPrevious);
  const tr = useTapZone(skipCurrent);
  const bl = useTapZone(() => setSheet("support"));
  const br = useTapZone(() => setSheet("options"));

  /** Safe-area only — avoids extra gutters so the flashcard can use the screen. */
  const pad = cn(
    "pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
  );

  const stepPositionLabel =
    !isComplete && nowStep && totalSteps > 0 && nowIndex >= 0
      ? `${nowIndex + 1} / ${totalSteps}`
      : null;
  const nowStepBackCardUrl = nowStep
    ? resolveCategoryBackCardUrlForStep(nowStep)
    : undefined;

  const savedTimerSec = nowStep
    ? resolveStepTimerSec(nowStep, routine)
    : undefined;
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
  }, [nowStep?.id]);

  useEffect(() => {
    if (!prefersFineHover) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        exit();
        return;
      }
      if (isComplete || !nowStep) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrevious();
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        skipCurrent();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        completeCurrent();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    completeCurrent,
    exit,
    goPrevious,
    isComplete,
    nowStep,
    prefersFineHover,
    skipCurrent,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const prevBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overscrollBehavior: body.style.overscrollBehavior,
    };
    const prevHtml = {
      overflow: documentElement.style.overflow,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };

    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overscrollBehavior = "none";

    return () => {
      documentElement.style.overflow = prevHtml.overflow;
      documentElement.style.overscrollBehavior = prevHtml.overscrollBehavior;
      body.style.overflow = prevBody.overflow;
      body.style.position = prevBody.position;
      body.style.top = prevBody.top;
      body.style.left = prevBody.left;
      body.style.right = prevBody.right;
      body.style.width = prevBody.width;
      body.style.overscrollBehavior = prevBody.overscrollBehavior;
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex h-[100svh] max-h-[100svh] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-black touch-manipulation text-cream"
    >
      {stepPositionLabel ? (
        <div
          aria-live="polite"
          className="pointer-events-none absolute left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] z-[55] -translate-x-1/2 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold tabular-nums tracking-tight text-ink shadow-soft ring-1 ring-ink/10"
        >
          {stepPositionLabel}
        </div>
      ) : null}
      {/* Visual card — does not receive touches */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[40] flex min-h-0 flex-col",
          pad,
        )}
      >
        <AnimatePresence>
          {!isComplete && nowStep ? (
            <motion.div
              key={nowStep.id}
              initial={{ opacity: 0.96 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex min-h-0 w-full flex-col"
            >
              <FocusCardStage expandedCards={expandedCards}>
                <div className="relative h-full min-h-0 w-full">
                  <SwipeableStepCard
                    step={nowStep}
                    status={stepStatus(nowStep)}
                    variant="focus"
                    onSwipeComplete={completeCurrent}
                    doubleTapCompletes
                    completionBackImageUrl={nowStepBackCardUrl}
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
              </FocusCardStage>
            </motion.div>
          ) : !isComplete && !nowStep ? (
            <motion.div
              key="stuck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex min-h-0 flex-col items-center justify-center px-6 text-center"
            >
              <p className="text-[17px] font-medium text-cream">
                {focusModeNothingLeftTitle(lang)}
              </p>
              <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-cream/70">
                {focusModeNothingLeftBody(lang)}
              </p>
              <button
                type="button"
                aria-label={focusModeReturnScheduleAria(lang)}
                className="pointer-events-auto absolute inset-0 bg-transparent"
                onClick={exit}
              />
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex min-h-0 flex-col items-center justify-center px-6 text-center"
            >
              <p className="text-[20px] font-medium tracking-tight text-cream">
                {focusModeAllFinishedTitle(lang)}
              </p>
              <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-cream/70">
                {focusModeNothingLeftBody(lang)}
              </p>
              <button
                type="button"
                aria-label={focusModeReturnScheduleAria(lang)}
                className="pointer-events-auto absolute inset-0 bg-transparent"
                onClick={exit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner tap zones — invisible; back / skip / sheets (also with Pixto card). */}
      {!isComplete && nowStep ? (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[60] flex flex-col",
          pad,
        )}
      >
        <div className="flex h-[min(22svh,168px)] shrink-0">
          <div
            role="button"
            tabIndex={0}
            aria-label={focusModeAriaPreviousStep(lang)}
            className="pointer-events-auto relative flex flex-1 touch-manipulation select-none outline-none focus:outline-none"
            onContextMenu={(e) => e.preventDefault()}
            onPointerDown={tl.onPointerDown}
            onPointerMove={tl.onPointerMove}
            onPointerUp={tl.onPointerUp}
            onPointerCancel={tl.onPointerCancel}
          >
            {showZoneDebug ? (
              <span className="pointer-events-none absolute left-2 top-2 rounded bg-ink/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-cream/90">
                Top Left
              </span>
            ) : null}
          </div>
          <div
            role="button"
            tabIndex={0}
            aria-label={focusModeAriaSkipNext(lang)}
            className="pointer-events-auto relative flex flex-1 touch-manipulation select-none outline-none focus:outline-none"
            onContextMenu={(e) => e.preventDefault()}
            onPointerDown={tr.onPointerDown}
            onPointerMove={tr.onPointerMove}
            onPointerUp={tr.onPointerUp}
            onPointerCancel={tr.onPointerCancel}
          >
            {showZoneDebug ? (
              <span className="pointer-events-none absolute right-2 top-2 rounded bg-ink/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-cream/90">
                Top Right
              </span>
            ) : null}
          </div>
        </div>
        <div className="pointer-events-none min-h-0 flex-1" />
        <div className="flex h-[min(22svh,168px)] shrink-0">
          <div
            role="button"
            tabIndex={0}
            aria-label={focusModeAriaSupportTools(lang)}
            className="pointer-events-auto relative flex flex-1 touch-manipulation select-none"
            onContextMenu={(e) => e.preventDefault()}
            onPointerDown={bl.onPointerDown}
            onPointerMove={bl.onPointerMove}
            onPointerUp={bl.onPointerUp}
            onPointerCancel={bl.onPointerCancel}
          >
            {showZoneDebug ? (
              <span className="pointer-events-none absolute bottom-2 left-2 rounded bg-ink/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-cream/90">
                Support
              </span>
            ) : null}
          </div>
          <div
            role="button"
            tabIndex={0}
            aria-label={focusModeAriaOptions(lang)}
            className="pointer-events-auto relative flex flex-1 touch-manipulation select-none outline-none focus:outline-none"
            onContextMenu={(e) => e.preventDefault()}
            onPointerDown={br.onPointerDown}
            onPointerMove={br.onPointerMove}
            onPointerUp={br.onPointerUp}
            onPointerCancel={br.onPointerCancel}
          >
            {showZoneDebug ? (
              <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-ink/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-cream/90">
                Options
              </span>
            ) : null}
          </div>
        </div>
      </div>
      ) : null}

      {prefersFineHover && !isComplete && nowStep ? (
        <div className="pointer-events-auto absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-[65] flex w-[min(100%,22rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/95 px-3 py-2.5 shadow-soft ring-1 ring-ink/10">
          <button
            type="button"
            onClick={goPrevious}
            className="rounded-xl bg-canvas-muted px-3 py-2 text-[13px] font-medium text-ink transition hover:bg-canvas"
          >
            ← {focusModeAriaPreviousStep(lang)}
          </button>
          <button
            type="button"
            onClick={completeCurrent}
            className="rounded-xl bg-sage px-3 py-2 text-[13px] font-semibold text-cream transition hover:opacity-90"
          >
            {schedulePlayerDone(lang)}
          </button>
          <button
            type="button"
            onClick={skipCurrent}
            className="rounded-xl bg-canvas-muted px-3 py-2 text-[13px] font-medium text-ink transition hover:bg-canvas"
          >
            {focusModeAriaSkipNext(lang)} →
          </button>
          <button
            type="button"
            onClick={() => setSheet("options")}
            className="rounded-xl bg-canvas-muted px-3 py-2 text-[13px] font-medium text-ink transition hover:bg-canvas"
          >
            {focusModeAriaOptions(lang)}
          </button>
          <button
            type="button"
            onClick={exit}
            className="rounded-xl border border-ink/10 px-3 py-2 text-[13px] font-medium text-[#C84C57] transition hover:bg-canvas-muted"
          >
            {schedulePlayerCloseCta(lang)}
          </button>
        </div>
      ) : null}

      <Sheet
        open={sheet === "support"}
        title={focusModeSheetSupportTitle(lang)}
        onClose={() => setSheet(null)}
      >
        <div className="flex flex-col gap-2">
          {[
            [focusModeSupportCalmCard(lang), () => setSheet(null)],
            [focusModeSupportRepeatInstruction(lang), () => setSheet(null)],
            [focusModeSupportSimplified(lang), () => setSheet(null)],
          ].map(([label, fn]) =>
            sheetRow(label as string, fn as () => void, label as string),
          )}
        </div>
      </Sheet>

      <Sheet
        open={sheet === "options"}
        title={focusModeSheetOptionsTitle(lang)}
        onClose={() => setSheet(null)}
      >
        <div className="flex flex-col gap-3">
          <div className="space-y-2 rounded-xl bg-canvas-muted/60 px-3 py-3 ring-1 ring-ink/[0.07]">
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
              onChange={(sec) => setSessionTimerSec(sec ?? 0)}
            />
          </div>
          {sheetToggleRow(
            focusModeOptExpandedCards(lang),
            expandedCards,
            toggleExpandedCards,
            "opt-expanded-cards",
          )}
          {sheetRow(focusModeOptBackSchedule(lang), () => {
            setSheet(null);
            exit();
          }, "opt-back")}
          {sheetRow(focusModeOptFirstThen(lang), openFirstThen, "opt-ft")}
          {sheetRow(focusModeOptRestartRoutine(lang), () => {
            setSheet(null);
            reset();
          }, "opt-restart")}
          {sheetRow(focusModeOptMarkFinished(lang), () => {
            setSheet(null);
            completeCurrent();
          }, "opt-done")}
          {sheetRow(focusModeOptExitFocus(lang), () => {
            setSheet(null);
            exit();
          }, "opt-exit")}
        </div>
      </Sheet>
    </div>
  );
}
