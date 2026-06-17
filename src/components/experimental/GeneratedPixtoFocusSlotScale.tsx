"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { GENERATED_PIXTO_FOCUS_CARD_SIZE } from "@/components/experimental/GeneratedPixtoCard";
import { GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX } from "@/lib/constants/generated-pixto-card-sizes";

type Props = { children: ReactNode };

/**
 * Fits the Focus 3-zone card into the stage. Width-first: fills the stage
 * width (up to 28rem), then uses remaining height — illustration zone grows
 * inside the card; text/footer stay fixed px.
 */
export function GeneratedPixtoFocusSlotScale({ children }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const { width: W, height: H } = outer.getBoundingClientRect();
      if (W <= 0 || H <= 0) return;
      const bleed = GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX * 2;
      const sx = (W - bleed) / GENERATED_PIXTO_FOCUS_CARD_SIZE.w;
      const sy = (H - bleed) / GENERATED_PIXTO_FOCUS_CARD_SIZE.h;
      // Width-first on tall stages; fall back to height when landscape is short.
      const s =
        H >= GENERATED_PIXTO_FOCUS_CARD_SIZE.h * sx
          ? sx
          : Math.min(sx, sy);
      setScale(Number.isFinite(s) && s > 0 ? s : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const bleed = GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX;
  const slotW = GENERATED_PIXTO_FOCUS_CARD_SIZE.w * scale + bleed * 2;
  const slotH = GENERATED_PIXTO_FOCUS_CARD_SIZE.h * scale + bleed * 2;

  return (
    <div
      ref={outerRef}
      className="relative flex h-full min-h-0 w-full min-w-0 items-center justify-center"
    >
      <div
        className="relative mx-auto shrink-0 will-change-transform"
        style={{ width: slotW, height: slotH, padding: bleed }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: GENERATED_PIXTO_FOCUS_CARD_SIZE.w,
            height: GENERATED_PIXTO_FOCUS_CARD_SIZE.h,
            transform: `scale(${scale})`,
          }}
        >
          <div className="relative h-full min-h-0 w-full min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
