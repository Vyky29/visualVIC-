 "use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  GeneratedPixtoCard,
  type GeneratedPixtoCardProps,
} from "@/components/experimental/GeneratedPixtoCard";
import { HOTEL_GENERATED_CARD_PROPS } from "@/lib/experimental/generated-pixto-demo-routine";
import { cn } from "@/lib/utils/cn";

const cardShell =
  "relative overflow-hidden rounded-[1.35rem] border-2 border-[#CDD3D8] bg-[#F1F4F6] shadow-[0_8px_28px_-14px_rgba(28,36,32,0.18)]";
const WOW_CARD_ASPECT = "744 / 1054";

function IconFirst({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0 text-sage", className)}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" className="fill-sage stroke-ink/15" strokeWidth="1" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        1
      </text>
    </svg>
  );
}

function IconThen({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0 text-accent", className)}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" className="fill-accent stroke-ink/12" strokeWidth="1" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        2
      </text>
    </svg>
  );
}

function IconConnector({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0 text-ink-subtle", className)}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepVisualCard({
  generatedCard,
  label,
  icon,
  className,
}: {
  generatedCard: GeneratedPixtoCardProps;
  label: "First" | "Then";
  icon: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        cardShell,
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2 border-b-2 border-[#CDD3D8] bg-[#F1F4F6] py-2.5">
        <div className="grayscale">{icon}</div>
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
          {label}
        </span>
      </div>
      <div className="relative aspect-[10/13] w-full overflow-hidden bg-[#F1F4F6] p-[10px]">
        <div
          className="relative mx-auto h-full max-h-full w-full max-w-[84%]"
          style={{ aspectRatio: WOW_CARD_ASPECT }}
        >
          <GeneratedPixtoCard
            {...generatedCard}
            schedulePresentation
            suppressNeutralRing
            className="h-full max-w-none w-full"
          />
        </div>
      </div>
    </article>
  );
}

export default function FirstThenDemoPage() {
  const [viewport, setViewport] = useState({ w: 402, h: 874 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    const orientation = window.screen?.orientation as
      | (ScreenOrientation & {
          lock?: (orientation: "portrait") => Promise<void>;
          unlock?: () => void;
        })
      | undefined;
    if (orientation?.lock) {
      orientation.lock("portrait").catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", updateViewport);
      orientation?.unlock?.();
    };
  }, []);

  const first = HOTEL_GENERATED_CARD_PROPS[0];
  const second = HOTEL_GENERATED_CARD_PROPS[1];
  const shortSide = Math.min(viewport.w, viewport.h);
  const longSide = Math.max(viewport.w, viewport.h);
  const sceneScale = Math.min(viewport.w / shortSide, viewport.h / longSide);
  const sceneStyle: CSSProperties = {
    width: `${longSide}px`,
    height: `${shortSide}px`,
    transform: `translate(-50%, -50%) rotate(90deg) scale(${sceneScale})`,
    transformOrigin: "center center",
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden overscroll-none bg-canvas touch-manipulation">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute left-1/2 top-1/2" style={sceneStyle}>
          <div className="h-full w-full bg-canvas px-[max(0.75rem,env(safe-area-inset-top))] py-[max(0.5rem,env(safe-area-inset-left))]">
            <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-1">
              <div className="flex h-full min-h-0 items-center justify-center">
                <div className="aspect-[10/13] h-full max-h-full max-w-[15.4rem]">
                  <StepVisualCard
                    generatedCard={first}
                    label="First"
                    icon={<IconFirst className="h-6 w-6" />}
                    className="h-full"
                  />
                </div>
              </div>

              <div className="flex h-full items-center justify-center">
                <div className="flex min-h-[10.5rem] flex-col items-center justify-center gap-1.5">
                  <Link
                    href="/menu"
                    className="flex h-8 min-w-[4.6rem] items-center justify-center rounded-[0.9rem] border border-ink/10 bg-white px-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink shadow-soft transition active:scale-[0.99]"
                  >
                    Menu
                  </Link>
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-full bg-canvas-muted/96 ring-1 ring-ink/10 shadow-[0_8px_18px_-14px_rgba(28,36,32,0.35)]">
                    <IconConnector className="h-3.5 w-3.5" />
                    <span className="mt-[-1px] text-[10px] font-semibold text-ink-subtle">
                      &amp;
                    </span>
                  </div>
                  <Link
                    href="/player/brushing-teeth"
                    className="flex h-8 min-w-[4.6rem] items-center justify-center rounded-[0.9rem] bg-ink px-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-cream shadow-soft transition active:scale-[0.99]"
                  >
                    Routine
                  </Link>
                </div>
              </div>

              <div className="flex h-full min-h-0 items-center justify-center">
                <div className="aspect-[10/13] h-full max-h-full max-w-[15.4rem]">
                  <StepVisualCard
                    generatedCard={second}
                    label="Then"
                    icon={<IconThen className="h-6 w-6" />}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
