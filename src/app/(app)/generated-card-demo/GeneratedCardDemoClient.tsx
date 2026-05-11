"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/Button";
import {
  GeneratedPixtoCard,
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_COMPANY_MARK,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_TITLE_ZONE_H,
  GENERATED_PIXTO_TOP_LAYOUT_H,
  GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION,
} from "@/components/experimental/GeneratedPixtoCard";
import { GeneratedPixtoSlotScale } from "@/components/experimental/GeneratedPixtoSlotScale";
import {
  GENERATED_PIXTO_DEMO_ROUTINE_NAME,
  GENERATED_PIXTO_DEMO_ROUTINE_STEPS,
} from "@/lib/experimental/generated-pixto-demo-routine";
import { cn } from "@/lib/utils/cn";

const DOUBLE_TAP_MS = 300;
const TAP_PAIR_MAX_DIST = 48;
const TAP_CANCEL_SLOP = 14;

const ROUTINE = GENERATED_PIXTO_DEMO_ROUTINE_STEPS;

function DiagnosticPanel({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-[1.5rem] border border-ink/[0.08] bg-white p-4 shadow-soft">
      <div className="space-y-1">
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
          {title}
        </h3>
        <p className="text-[12px] leading-relaxed text-ink-subtle">{hint}</p>
      </div>
      {children}
    </div>
  );
}

function DiagnosticCardFrame({
  children,
  logoSize,
  topClassName = "bg-[#d5d5d5]",
  ribbonClassName = "bg-[#c9c9c9]",
  className,
}: {
  children: ReactNode;
  logoSize?: number;
  topClassName?: string;
  ribbonClassName?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative mx-auto grid w-full max-w-[min(100%,17.75rem)] overflow-hidden rounded-[1.35rem] ring-1 ring-ink/[0.08]",
        className,
      )}
      style={{
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${GENERATED_PIXTO_TOP_LAYOUT_H}fr ${GENERATED_PIXTO_TITLE_ZONE_H}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
      }}
    >
      <div className={cn("relative", topClassName)}>
        {logoSize ? (
          <div
            className="absolute right-[6%] top-[4%] rounded-[0.8rem] border border-dashed border-ink/15 bg-white/75"
            style={{
              width: `${(logoSize / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
              aspectRatio: "1 / 1",
            }}
          >
            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-ink/70">
              {logoSize}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-y border-ink/[0.06] bg-white px-4 py-2">{children}</div>
      <div className={ribbonClassName} />
    </article>
  );
}

function DiagnosticTitleBand({
  lines,
  textSizeClassName,
}: {
  lines: [string] | [string, string] | [string, string, string];
  textSizeClassName: string;
}) {
  const row1 = lines[0] ?? "";
  const row2 = lines[1] ?? "";
  const row3 = lines[2] ?? "";
  const lineCount = lines.length;

  return (
    <div
      className={cn(
        "grid h-full min-h-0 w-full grid-rows-3 text-center font-semibold lowercase tracking-tight text-ink",
        textSizeClassName,
      )}
    >
      {lineCount === 1 ? (
        <>
          <div aria-hidden />
          <div className="row-span-2 flex items-center justify-center">{row1}</div>
        </>
      ) : lineCount === 2 ? (
        <>
          <div aria-hidden />
          <div className="flex items-center justify-center">{row1}</div>
          <div className="flex items-center justify-center">{row2}</div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">{row1}</div>
          <div className="flex items-center justify-center">{row2}</div>
          <div className="flex items-center justify-center">{row3}</div>
        </>
      )}
    </div>
  );
}

function MeasurementPill({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-full bg-white/88 px-2 py-1 text-[10px] font-semibold tracking-tight text-ink shadow-[0_1px_4px_rgba(0,0,0,0.08)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

function OriginalCardMeasurements() {
  return (
    <article
      className="relative mx-auto grid w-full max-w-[min(100%,17.75rem)] overflow-hidden rounded-[1.35rem] ring-1 ring-ink/[0.08]"
      style={{
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${GENERATED_PIXTO_TOP_LAYOUT_H}fr ${GENERATED_PIXTO_TITLE_ZONE_H}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
      }}
    >
      <div className="relative bg-[#d9eefc]">
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[1rem] border border-dashed border-ink/15 bg-[#f9e39c]"
          style={{
            top: `${(GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION / GENERATED_PIXTO_TOP_LAYOUT_H) * 100}%`,
            width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${GENERATED_PIXTO_ILLUSTRATION_FRAME.h}`,
          }}
        />
        <div
          className="absolute right-[6%] top-[4%] rounded-[0.8rem] border border-dashed border-ink/15 bg-[#ffb0c1]"
          style={{
            width: `${(GENERATED_PIXTO_COMPANY_MARK.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: "1 / 1",
          }}
        />
        <MeasurementPill className="absolute left-3 top-3">
          card {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_CARD_SIZE.h}
        </MeasurementPill>
        <MeasurementPill className="absolute left-3 top-12">
          top block {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_TOP_LAYOUT_H}
        </MeasurementPill>
        <MeasurementPill className="absolute left-3 top-[23%]">
          top gap {GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION} h
        </MeasurementPill>
        <MeasurementPill className="absolute left-1/2 top-[42%] -translate-x-1/2">
          illustration {GENERATED_PIXTO_ILLUSTRATION_FRAME.w} x{" "}
          {GENERATED_PIXTO_ILLUSTRATION_FRAME.h}
        </MeasurementPill>
        <MeasurementPill className="absolute right-3 top-3">
          logo {GENERATED_PIXTO_COMPANY_MARK.w} x {GENERATED_PIXTO_COMPANY_MARK.h}
        </MeasurementPill>
      </div>
      <div className="relative flex items-center justify-center border-y border-ink/[0.06] bg-[#fff5c7]">
        <MeasurementPill>white area {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_TITLE_ZONE_H}</MeasurementPill>
      </div>
      <div className="relative flex items-center justify-center bg-[#d9c7ff]">
        <MeasurementPill>ribbon {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_CATEGORY_BAND_H}</MeasurementPill>
      </div>
    </article>
  );
}

export function GeneratedCardDemoClient() {
  const [routineIndex, setRoutineIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTouchTapRef = useRef<{ time: number; x: number; y: number } | null>(
    null,
  );
  const gestureRef = useRef<{
    pointerId: number;
    originX: number;
    originY: number;
    maxSlop: number;
  } | null>(null);

  const closeFocusPreview = useCallback(() => {
    setOpenIndex(null);
    lastTouchTapRef.current = null;
    gestureRef.current = null;
  }, []);

  const tryOpenFromDoubleTap = useCallback((index: number) => {
    setOpenIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setRoutineIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setRoutineIndex((i) => Math.min(ROUTINE.length - 1, i + 1));
  }, []);

  const makePointerHandlers = useCallback(
    (index: number) => {
      const releaseCapture = (el: HTMLElement | null, pointerId: number) => {
        if (!el) return;
        try {
          if (el.hasPointerCapture?.(pointerId)) el.releasePointerCapture(pointerId);
        } catch {
          /* ignore */
        }
      };

      const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* Safari */
        }
        gestureRef.current = {
          pointerId: e.pointerId,
          originX: e.clientX,
          originY: e.clientY,
          maxSlop: 0,
        };
      };

      const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const g = gestureRef.current;
        if (!g || e.pointerId !== g.pointerId) return;
        const slop = Math.hypot(e.clientX - g.originX, e.clientY - g.originY);
        g.maxSlop = Math.max(g.maxSlop, slop);
      };

      const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === "mouse") {
          gestureRef.current = null;
          return;
        }
        const g = gestureRef.current;
        if (!g || g.pointerId !== e.pointerId) return;
        releaseCapture(e.currentTarget, e.pointerId);
        gestureRef.current = null;
        if (g.maxSlop > TAP_CANCEL_SLOP) {
          lastTouchTapRef.current = null;
          return;
        }
        const t = Date.now();
        const prev = lastTouchTapRef.current;
        if (
          prev &&
          t - prev.time <= DOUBLE_TAP_MS &&
          Math.hypot(e.clientX - prev.x, e.clientY - prev.y) <= TAP_PAIR_MAX_DIST
        ) {
          lastTouchTapRef.current = null;
          tryOpenFromDoubleTap(index);
          return;
        }
        lastTouchTapRef.current = { time: t, x: e.clientX, y: e.clientY };
      };

      const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
        releaseCapture(e.currentTarget, e.pointerId);
        gestureRef.current = null;
        lastTouchTapRef.current = null;
      };

      return {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
      };
    },
    [tryOpenFromDoubleTap],
  );

  const active = openIndex != null ? ROUTINE[openIndex] : null;
  const currentStep = ROUTINE[routineIndex] ?? ROUTINE[0];

  useEffect(() => {
    if (openIndex == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFocusPreview();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, closeFocusPreview]);

  return (
    <div className="pb-10">
      <Header title="Generated card demo" backHref="/menu" />

      <div className="space-y-3 px-4 pt-3">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          <span className="font-medium text-ink">{GENERATED_PIXTO_DEMO_ROUTINE_NAME}</span>{" "}
          — use <span className="font-medium text-ink">Previous</span> /{" "}
          <span className="font-medium text-ink">Next</span> below. Double tap any
          thumbnail (or double-click) for a{" "}
          <span className="font-medium text-ink">Focus-style</span> fullscreen preview.
        </p>
      </div>

      <section className="mx-auto mt-8 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Card geometry study
        </h2>
        <p className="px-1 text-[13px] leading-relaxed text-ink-subtle">
          The white area stays fixed at the original size in every sample card. Only
          the text sizing and logo size change.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <DiagnosticPanel
            title="Original card"
            hint="Base geometry from Figma: coloured zones show the original block sizes."
          >
            <OriginalCardMeasurements />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="White area · 1 line"
            hint="Original card size, fixed white area, one line centered."
          >
            <DiagnosticCardFrame logoSize={88}>
              <DiagnosticTitleBand
                lines={["ready for takeoff"]}
                textSizeClassName="text-[28px] leading-[1.05]"
              />
            </DiagnosticCardFrame>
          </DiagnosticPanel>

          <DiagnosticPanel
            title="White area · 2 lines"
            hint="Same white area height; text split across the middle and bottom rows."
          >
            <DiagnosticCardFrame logoSize={88}>
              <DiagnosticTitleBand
                lines={["check in at", "the airline counter"]}
                textSizeClassName="text-[21px] leading-[1.02]"
              />
            </DiagnosticCardFrame>
          </DiagnosticPanel>

          <DiagnosticPanel
            title="White area · 3 lines · logo 88"
            hint="Three rows of text with the logo at 88 x 88."
          >
            <DiagnosticCardFrame logoSize={88}>
              <DiagnosticTitleBand
                lines={["listen to", "the safety", "instructions"]}
                textSizeClassName="text-[19px] leading-[1.02]"
              />
            </DiagnosticCardFrame>
          </DiagnosticPanel>

          <DiagnosticPanel
            title="White area · 3 lines · logo 82"
            hint="Same 3-line layout, but with the logo at 82 x 82 to compare."
          >
            <DiagnosticCardFrame logoSize={82}>
              <DiagnosticTitleBand
                lines={["listen to", "the safety", "instructions"]}
                textSizeClassName="text-[19px] leading-[1.02]"
              />
            </DiagnosticCardFrame>
          </DiagnosticPanel>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-lg space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Routine player
        </h2>
        <div className="flex flex-col items-center gap-3">
          <p className="text-[13px] font-medium tabular-nums text-ink-subtle">
            Step {routineIndex + 1} / {ROUTINE.length}
          </p>
          <GeneratedPixtoCard {...currentStep} />
          <div className="flex w-full max-w-xs flex-wrap justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              className="min-h-touch flex-1"
              disabled={routineIndex <= 0}
              onClick={goPrev}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="primary"
              className="min-h-touch flex-1"
              disabled={routineIndex >= ROUTINE.length - 1}
              onClick={goNext}
            >
              Next
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-5xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          All steps (gallery)
        </h2>
        <div className="flex flex-col items-center gap-8 sm:grid sm:grid-cols-2 sm:items-stretch sm:justify-items-center lg:grid-cols-3">
          {ROUTINE.map((demo, index) => {
            const ptr = makePointerHandlers(index);
            const isCurrent = index === routineIndex;
            return (
              <div
                key={`${demo.title}-${index}`}
                className="flex w-full max-w-[min(100%,17.75rem)] flex-col gap-2 justify-self-center sm:max-w-none"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`${demo.title}. Double tap for Focus preview.`}
                  className={cn(
                    "touch-manipulation rounded-[1.4rem] transition-shadow",
                    isCurrent
                      ? "ring-2 ring-sage/45 ring-offset-2 ring-offset-canvas"
                      : "ring-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/45 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                  )}
                  onPointerDown={ptr.onPointerDown}
                  onPointerMove={ptr.onPointerMove}
                  onPointerUp={ptr.onPointerUp}
                  onPointerCancel={ptr.onPointerCancel}
                  onDoubleClick={() => tryOpenFromDoubleTap(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setRoutineIndex(index);
                    }
                  }}
                >
                  <GeneratedPixtoCard {...demo} />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <p className="text-center text-[11px] text-ink-faint">
                    Double tap → Focus preview
                  </p>
                  <button
                    type="button"
                    className="text-center text-[12px] font-medium text-sage underline-offset-2 hover:underline"
                    onClick={() => setRoutineIndex(index)}
                  >
                    Load in routine player
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {active && openIndex != null ? (
          <motion.div
            key="gen-focus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex touch-manipulation flex-col bg-[#060807] text-cream"
            role="dialog"
            aria-modal="true"
            aria-label="Focus preview — generated card"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-cream/10 px-4 py-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))]">
              <p className="min-w-0 truncate text-[14px] font-semibold text-cream/90">
                Focus preview · {active.title}
              </p>
              <Button
                type="button"
                variant="secondary"
                className="!min-h-10 shrink-0 !bg-cream/10 !text-cream ring-1 ring-cream/20"
                onClick={closeFocusPreview}
              >
                Close
              </Button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <GeneratedPixtoFocusScale>
                <GeneratedPixtoSlotScale>
                  <GeneratedPixtoCard
                    {...active}
                    className="h-full w-full max-w-none rounded-[1.35rem]"
                  />
                </GeneratedPixtoSlotScale>
              </GeneratedPixtoFocusScale>
            </div>

            <button
              type="button"
              className="pointer-events-auto border-t border-cream/10 py-3 text-center text-[12px] text-cream/45"
              onClick={closeFocusPreview}
            >
              Tap here to close
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
