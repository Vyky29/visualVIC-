"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/Button";
import {
  GeneratedPixtoCard,
  type GeneratedPixtoCardProps,
} from "@/components/experimental/GeneratedPixtoCard";
import { GeneratedPixtoFocusScale } from "@/components/experimental/GeneratedPixtoFocusScale";
import { cn } from "@/lib/utils/cn";

const DOUBLE_TAP_MS = 300;
const TAP_PAIR_MAX_DIST = 48;
const TAP_CANCEL_SLOP = 14;

const DEMOS: GeneratedPixtoCardProps[] = [
  {
    illustrationUrl: "/cards/at%20the%20airport/get-your-boarding-pass.PNG",
    title: "Get your boarding pass",
    category: "At the airport",
    categoryColour: "#5a7d9a",
    iconUrl: "/brand/pixtolearn-logo.png",
    cardType: "standard",
  },
  {
    illustrationUrl: "/cards/at%20the%20hotel/arrive-at-the-hotel.PNG",
    title: "Arrive at the hotel",
    category: "At the hotel",
    categoryColour: "#a67c52",
    iconUrl: "/brand/pixtolearn-logo.png",
  },
  {
    illustrationUrl: "/cards/core/drink.png",
    title: "Order a drink at the counter",
    category: "At the cafe",
    categoryColour: "#4a6572",
    cardType: "dense",
  },
];

export function GeneratedCardDemoClient() {
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

  const active = openIndex != null ? DEMOS[openIndex] : null;

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
          Double tap a card (or double-click with mouse) to open a{" "}
          <span className="font-medium text-ink">Focus-style</span> fullscreen
          preview — dark chrome like{" "}
          <span className="font-medium text-ink">Focus Mode</span>, scaled with{" "}
          <span className="font-medium text-ink">GeneratedPixtoFocusScale</span>{" "}
          (744×1054 design box).
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-10 px-4 pb-8 sm:grid sm:grid-cols-2 sm:items-stretch sm:justify-items-center lg:grid-cols-3">
        {DEMOS.map((demo, index) => {
          const ptr = makePointerHandlers(index);
          return (
            <div
              key={demo.title}
              className="flex w-full max-w-[min(100%,17.75rem)] flex-col gap-2 justify-self-center sm:max-w-none"
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`${demo.title}. Double tap to open Focus preview.`}
                className={cn(
                  "touch-manipulation rounded-[1.4rem] ring-0 transition-shadow",
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
                    tryOpenFromDoubleTap(index);
                  }
                }}
              >
                <GeneratedPixtoCard {...demo} />
              </div>
              <p className="px-1 text-center text-[11px] text-ink-faint">
                Double tap to Focus preview
              </p>
            </div>
          );
        })}
      </div>

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
                <GeneratedPixtoCard
                  {...active}
                  className="h-full w-full max-w-none rounded-[1.35rem]"
                />
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
