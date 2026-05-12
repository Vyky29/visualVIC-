"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  GENERATED_PIXTO_FOCUS_CARD_SIZE,
  GENERATED_PIXTO_FOCUS_EXTRA_WIDTH_PX,
} from "@/components/experimental/GeneratedPixtoCard";
import { PIXTO_FOCUS_CARD_MAX_SCALE } from "@/lib/constants/pixto-focus-card";

type Props = { children: ReactNode };

/**
 * Focus scaling for generated HTML cards uses the focus-specific taller geometry.
 * The focus card keeps its full design height, but its internal blocks are
 * rebalanced and the whole card is centred in the available screen area.
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
      const sx = W / GENERATED_PIXTO_FOCUS_CARD_SIZE.w;
      const sy = H / GENERATED_PIXTO_FOCUS_CARD_SIZE.h;
      const uncapped = Math.min(sx, sy);
      const s = Math.min(uncapped, PIXTO_FOCUS_CARD_MAX_SCALE);
      setScale(Number.isFinite(s) && s > 0 ? s : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const slotW =
    GENERATED_PIXTO_FOCUS_CARD_SIZE.w * scale +
    GENERATED_PIXTO_FOCUS_EXTRA_WIDTH_PX;
  const slotH = GENERATED_PIXTO_FOCUS_CARD_SIZE.h * scale;
  const stretchedScaleX =
    scale > 0
      ? scale *
        (1 +
          GENERATED_PIXTO_FOCUS_EXTRA_WIDTH_PX /
            (GENERATED_PIXTO_FOCUS_CARD_SIZE.w * scale))
      : scale;

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
            width: GENERATED_PIXTO_FOCUS_CARD_SIZE.w,
            height: GENERATED_PIXTO_FOCUS_CARD_SIZE.h,
            transform: `scale(${stretchedScaleX}, ${scale})`,
          }}
        >
          <div className="relative h-full min-h-0 w-full min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
