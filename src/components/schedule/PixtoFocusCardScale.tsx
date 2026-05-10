"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  PIXTO_FOCUS_CARD_MAX_SCALE,
  PIXTO_FOCUS_CARD_REF_HEIGHT_PX,
  PIXTO_FOCUS_CARD_REF_WIDTH_PX,
} from "@/lib/constants/pixto-focus-card";

type Props = { children: ReactNode };

/**
 * Fixed design-size container; scales all content as one block to fit the
 * available slot (viewport / safe area).
 */
export function PixtoFocusCardScale({ children }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const { width: W, height: H } = outer.getBoundingClientRect();
      if (W <= 0 || H <= 0) return;
      const sx = W / PIXTO_FOCUS_CARD_REF_WIDTH_PX;
      const sy = H / PIXTO_FOCUS_CARD_REF_HEIGHT_PX;
      const uncapped = Math.min(sx, sy);
      const s = Math.min(uncapped, PIXTO_FOCUS_CARD_MAX_SCALE);
      setScale(Number.isFinite(s) && s > 0 ? s : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      className="relative flex h-full min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center"
    >
      <div
        className="mx-auto flex shrink-0 self-center will-change-transform"
        style={{
          width: PIXTO_FOCUS_CARD_REF_WIDTH_PX,
          height: PIXTO_FOCUS_CARD_REF_HEIGHT_PX,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div className="relative h-full min-h-0 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}
