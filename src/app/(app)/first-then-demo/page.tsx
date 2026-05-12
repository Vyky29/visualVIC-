 "use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { getRoutineById } from "@/lib/mock/routines";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionClass,
} from "@/lib/utils/visual-card-url";

const cardShell =
  "relative overflow-hidden rounded-[1.35rem] bg-white shadow-[0_8px_28px_-14px_rgba(28,36,32,0.22)]";

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
  imageUrl,
  alt,
  tone,
  label,
  icon,
  className,
}: {
  imageUrl?: string;
  alt: string;
  tone: "sage" | "accent";
  label: "First" | "Then";
  icon: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        cardShell,
        "ring-1 ring-ink/14",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center gap-2 border-b border-ink/10 bg-ink/[0.055] py-2.5",
        )}
      >
        <div className="grayscale">{icon}</div>
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
          {label}
        </span>
      </div>
      <div className="relative aspect-[10/13] w-full overflow-hidden bg-white p-1.5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className={cn(
              "object-contain p-[1px]",
              isPixtoLearnBundledCardUrl(imageUrl)
                ? pixtoBundledCardObjectPositionClass
                : "object-center",
            )}
            sizes="(orientation: landscape) 40vw, 84vw"
            priority={tone === "sage"}
          />
        ) : null}
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

  const brushing = getRoutineById("brushing-teeth");
  const first = brushing?.steps[0];
  const second = brushing?.steps[1];
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
            <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-1">
              <div className="flex h-full min-h-0 items-center justify-center">
                <div className="aspect-[10/13] h-full max-h-full">
                  <StepVisualCard
                    imageUrl={first?.imageUrl}
                    alt={first?.title ?? "First step"}
                    tone="sage"
                    label="First"
                    icon={<IconFirst className="h-6 w-6" />}
                    className="h-full"
                  />
                </div>
              </div>

              <div className="flex h-full items-center justify-center">
                <div className="flex items-center gap-2 [@media(orientation:landscape)]:min-h-[12rem] [@media(orientation:landscape)]:flex-col [@media(orientation:landscape)]:justify-center">
                  <Link
                    href="/menu"
                    className="flex h-9 items-center justify-center rounded-[0.95rem] border border-ink/10 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink shadow-soft transition active:scale-[0.99] [@media(orientation:landscape)_and_(max-height:500px)]:h-8 [@media(orientation:landscape)_and_(max-height:500px)]:text-[9px]"
                  >
                    Menu
                  </Link>
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-canvas-muted/96 ring-1 ring-ink/10 shadow-[0_8px_18px_-14px_rgba(28,36,32,0.35)]">
                    <IconConnector className="h-4 w-4" />
                    <span className="mt-[-1px] text-[11px] font-semibold text-ink-subtle">
                      &amp;
                    </span>
                  </div>
                  <Link
                    href="/player/brushing-teeth"
                    className="flex h-9 items-center justify-center rounded-[0.95rem] bg-ink px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream shadow-soft transition active:scale-[0.99] [@media(orientation:landscape)_and_(max-height:500px)]:h-8 [@media(orientation:landscape)_and_(max-height:500px)]:text-[9px]"
                  >
                    Routine
                  </Link>
                </div>
              </div>

              <div className="flex h-full min-h-0 items-center justify-center">
                <div className="aspect-[10/13] h-full max-h-full">
                  <StepVisualCard
                    imageUrl={second?.imageUrl}
                    alt={second?.title ?? "Then step"}
                    tone="accent"
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
