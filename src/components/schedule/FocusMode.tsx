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
import { routineAccentRings } from "@/lib/utils/routine-accent";

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

const FOCUS_STAGE_CARD_W = 357.5 as const;
const FOCUS_STAGE_CARD_H = 619.4 as const;

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
            className="mx-auto w-full max-w-lg rounded-t-[1.5rem] bg-cream px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-soft ring-1 ring-ink/10"
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

function FocusCardStage({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-auto mx-auto flex h-full min-h-0 w-full max-w-lg flex-col px-5 py-4">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div
          className="relative shrink-0"
          style={{
            width: `min(100%, ${FOCUS_STAGE_CARD_W}px)`,
            height: `min(100%, ${FOCUS_STAGE_CARD_H}px)`,
          }}
        >
          {children}
        </div>
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
  const {
    nowStep,
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
    appendFinishStep: true,
  });

  const accentRings = useMemo(() => routineAccentRings(routine), [routine]);

  const [sheet, setSheet] = useState<"support" | "options" | null>(null);

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
    <div className="fixed left-0 right-0 top-0 z-50 flex h-[100svh] max-h-[100svh] min-h-0 flex-col overflow-hidden overscroll-none bg-[#060807] touch-manipulation text-cream">
      {stepPositionLabel ? (
        <div
          aria-live="polite"
          className="pointer-events-none absolute left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] z-[55] -translate-x-1/2 rounded-full bg-ink/55 px-3 py-1.5 text-[13px] font-semibold tabular-nums tracking-tight text-cream/92 ring-1 ring-cream/18"
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
              <FocusCardStage>
                <SwipeableStepCard
                  step={nowStep}
                  status={stepStatus(nowStep)}
                  variant="focus"
                  onSwipeComplete={completeCurrent}
                  doubleTapCompletes
                  completionBackImageUrl={nowStepBackCardUrl}
                  accentRings={accentRings}
                />
              </FocusCardStage>
            </motion.div>
          ) : !isComplete && !nowStep ? (
            <motion.div
              key="stuck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex min-h-0 flex-col items-center justify-center px-6 text-center"
            >
              <p className="text-[17px] font-medium text-cream/88">
                Nothing left in this pass
              </p>
              <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-cream/42">
                Tap anywhere to return to your schedule.
              </p>
              <button
                type="button"
                aria-label="Return to schedule"
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
              <p className="text-[20px] font-medium tracking-tight text-cream/92">
                All steps finished
              </p>
              <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-cream/42">
                Tap anywhere to return to your schedule.
              </p>
              <button
                type="button"
                aria-label="Return to schedule"
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
            aria-label="Previous step"
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
            aria-label="Skip to next step"
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
            aria-label="Support tools"
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
            aria-label="Options"
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

      <Sheet
        open={sheet === "support"}
        title="Support"
        onClose={() => setSheet(null)}
      >
        <div className="flex flex-col gap-2">
          {[
            ["Calm card", () => setSheet(null)],
            ["Repeat instruction", () => setSheet(null)],
            ["Simplified support", () => setSheet(null)],
          ].map(([label, fn]) =>
            sheetRow(label as string, fn as () => void, label as string),
          )}
        </div>
      </Sheet>

      <Sheet
        open={sheet === "options"}
        title="Options"
        onClose={() => setSheet(null)}
      >
        <div className="flex flex-col gap-2">
          {sheetRow("Back to schedule", () => {
            setSheet(null);
            exit();
          }, "opt-back")}
          {sheetRow("First & then", () => {
            setSheet(null);
            router.push("/first-then");
          }, "opt-ft")}
          {sheetRow("Restart routine", () => {
            setSheet(null);
            reset();
          }, "opt-restart")}
          {sheetRow("Mark as finished", () => {
            setSheet(null);
            completeCurrent();
          }, "opt-done")}
          {sheetRow("Exit focus mode", () => {
            setSheet(null);
            exit();
          }, "opt-exit")}
        </div>
      </Sheet>
    </div>
  );
}
