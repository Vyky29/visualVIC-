"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { GENERATED_PIXTO_CARD_SIZE } from "@/components/experimental/GeneratedPixtoCard";
import { PIXTO_FOCUS_CARD_MAX_SCALE } from "@/lib/constants/pixto-focus-card";

type Props = { children: ReactNode };

/**
 * Focus scaling for generated HTML cards uses the card's own 744×1054 geometry.
 * This keeps the ribete flush with the bottom edge, just like Schedule NOW/NEXT,
 * and only enlarges the whole card to the biggest size that fits on screen.
 */
export function GeneratedPixtoFocusScale({ children }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const { width: W, height: H } = outer.getBoundingClientRect();
      if (W <= 0 || H <= 0) return;
      const sx = W / GENERATED_PIXTO_CARD_SIZE.w;
      const sy = H / GENERATED_PIXTO_CARD_SIZE.h;
      const uncapped = Math.min(sx, sy);
      const s = Math.min(uncapped, PIXTO_FOCUS_CARD_MAX_SCALE);
      setScale(Number.isFinite(s) && s > 0 ? s : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const slotW = GENERATED_PIXTO_CARD_SIZE.w * scale;
  const slotH = GENERATED_PIXTO_CARD_SIZE.h * scale;

  return (
    <div
      ref={outerRef}
      className="relative flex h-full min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center"
    >
      <div
        className="relative mx-auto shrink-0 self-center will-change-transform"
        style={{
          width: slotW,
          height: slotH,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: GENERATED_PIXTO_CARD_SIZE.w,
            height: GENERATED_PIXTO_CARD_SIZE.h,
            transform: `scale(${scale})`,
          }}
        >
          <div className="relative h-full min-h-0 w-full min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
