 "use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { PixtoLearnIconMark } from "@/components/brand/PixtoLearnIconMark";
import {
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_WOW_COMPANY_MARK,
  GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
  type GeneratedPixtoCardProps,
} from "@/components/experimental/GeneratedPixtoCard";
import { HOTEL_GENERATED_CARD_PROPS } from "@/lib/experimental/generated-pixto-demo-routine";
import { cn } from "@/lib/utils/cn";

const cardShell =
  "relative overflow-hidden rounded-[1.35rem] border-2 border-[#BCC5CC] bg-[#E2E7EB] shadow-[0_8px_28px_-14px_rgba(28,36,32,0.18)]";
const WOW_CARD_ASPECT = "744 / 1054";
const WOW_TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;

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

function MenuDotsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-4 w-4", className)}
      aria-hidden
    >
      <circle cx="12" cy="5.5" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="18.5" r="1.7" fill="currentColor" />
    </svg>
  );
}

function RoutinesHomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", className)} aria-hidden>
      <rect
        x="4.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="13.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="4.5"
        y="13.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M15.2 16.5h3.6M17 14.7v3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function splitWowTitle(raw: string): [string] | [string, string] {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [raw];

  let bestIndex = 1;
  let bestScore = Number.POSITIVE_INFINITY;
  for (let index = 1; index < words.length; index += 1) {
    const left = words.slice(0, index).join(" ");
    const right = words.slice(index).join(" ");
    const score =
      Math.abs(left.length - right.length) +
      (left.split(" ").length === 1 ? 2 : 0) +
      (right.split(" ").length === 1 ? 2 : 0);
    if (score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
}

function MiniDigitalWowCard({ card }: { card: GeneratedPixtoCardProps }) {
  const titleLines = splitWowTitle(card.title);
  const titleStyle =
    titleLines.length === 1
      ? { fontSize: "19px", lineHeight: 0.92, letterSpacing: "-0.018em" }
      : { fontSize: "14px", lineHeight: 0.96, letterSpacing: "-0.016em" };

  return (
    <article
      className="relative grid h-full w-full overflow-hidden rounded-[1rem] bg-white"
      style={{
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${GENERATED_PIXTO_WOW_TOP_LAYOUT_H}fr ${GENERATED_PIXTO_WOW_TITLE_ZONE_H}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
        border: `3px solid ${card.categoryColour}`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)",
      }}
    >
      <div className="relative bg-white">
        <div
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
          style={{
            top: `${(GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION / GENERATED_PIXTO_WOW_TOP_LAYOUT_H) * 100}%`,
            width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${GENERATED_PIXTO_ILLUSTRATION_FRAME.h}`,
          }}
        >
          <Image
            src={card.illustrationUrl}
            alt=""
            fill
            className="object-contain object-center"
            sizes="220px"
            unoptimized
          />
        </div>

        {card.iconUrl ? (
          <div
            className="absolute rounded-[0.9rem] bg-white"
            style={{
              right: "5.4%",
              top: "3.8%",
              width: `${(GENERATED_PIXTO_WOW_COMPANY_MARK.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
              aspectRatio: "1 / 1",
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src={card.iconUrl}
                alt=""
                fill
                className="object-contain"
                sizes={`${GENERATED_PIXTO_WOW_COMPANY_MARK.w}px`}
                unoptimized
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-y border-white bg-white px-3 py-1">
        <div className="flex h-full min-h-0 w-full items-center justify-center">
          <div
            className={cn(
              "flex shrink-0 flex-col items-center justify-center text-center font-semibold lowercase text-ink",
              titleLines.length > 1 ? "gap-[0.14em]" : "gap-0",
            )}
            style={{
              width: `min(100%, ${WOW_TEXT_BOX_SIZE.w}px)`,
              height: `min(100%, ${WOW_TEXT_BOX_SIZE.h}px)`,
              ...titleStyle,
            }}
          >
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block w-full whitespace-nowrap">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center px-3"
        style={{ backgroundColor: card.categoryColour }}
      >
        <span
          className="block w-full overflow-hidden whitespace-nowrap text-center font-semibold lowercase text-white/95"
          style={{ fontSize: "11px", lineHeight: 1, letterSpacing: "-0.012em" }}
        >
          {card.category}
        </span>
      </div>
    </article>
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
      <div className="flex items-center justify-center gap-2 border-b-2 border-[#BCC5CC] bg-[#E2E7EB] py-2.5">
        <div className="grayscale">{icon}</div>
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
          {label}
        </span>
      </div>
      <div className="relative aspect-[10/13] w-full overflow-hidden bg-[#E2E7EB] p-[10px]">
        <div
          className="relative mx-auto flex h-full max-h-[88%] w-[84%] items-center justify-center"
          style={{ aspectRatio: WOW_CARD_ASPECT }}
        >
          <MiniDigitalWowCard card={generatedCard} />
        </div>
      </div>
    </article>
  );
}

function IntroStepLabel({
  label,
  icon,
}: {
  label: "First" | "Then";
  icon: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
      <div className="grayscale">{icon}</div>
      <span className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-ink">
        {label}
      </span>
    </div>
  );
}

function IntroCueChip() {
  return (
    <div className="pointer-events-none absolute left-[6.025rem] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D7DDE2] bg-white px-2 py-1 shadow-soft">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-ink-subtle" aria-hidden>
        <path
          d="M5 12h11M12 7l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function FirstThenDemoPage() {
  const [viewport, setViewport] = useState({ w: 402, h: 874 });
  const [showFocusMode, setShowFocusMode] = useState(false);

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

  const first = HOTEL_GENERATED_CARD_PROPS[3];
  const second = HOTEL_GENERATED_CARD_PROPS[4];
  const shortSide = Math.min(viewport.w, viewport.h);
  const longSide = Math.max(viewport.w, viewport.h);
  const sceneScale = Math.min(viewport.w / shortSide, viewport.h / longSide);
  const sceneStyle: CSSProperties = {
    width: `${longSide}px`,
    height: `${shortSide}px`,
    transform: `translate(-50%, -50%) rotate(90deg) scale(${sceneScale})`,
    transformOrigin: "center center",
  };

  if (!showFocusMode) {
    return (
      <div className="h-[100dvh] w-full overflow-hidden overscroll-none bg-canvas px-[max(0.75rem,env(safe-area-inset-left))] py-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.65rem,env(safe-area-inset-bottom))]">
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-2.5">
          <div className="flex items-center justify-center gap-2 pt-0.5 text-center">
            <PixtoLearnIconMark className="h-9 w-9 rounded-[0.95rem]" />
            <h1 className="text-[1.16rem] font-semibold tracking-tight text-ink">
              First &amp; Then
            </h1>
          </div>

          <div className="grid min-h-0 grid-rows-2 gap-2">
            <div className="relative grid min-h-0 grid-cols-[5.15rem_minmax(0,1fr)] items-center gap-2 rounded-[1.3rem] border border-[#C8D0D6] bg-[#E6EBEF] px-2.5 py-2">
              <div className="pointer-events-none absolute bottom-2 left-[6.025rem] top-2 w-px -translate-x-1/2 bg-[#BCC5CC]" />
              <IntroCueChip />
              <IntroStepLabel label="First" icon={<IconFirst className="h-7 w-7" />} />
              <div className="flex min-h-0 items-center justify-center">
                <div className="w-[min(100%,calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-9.65rem)/2.72))] max-w-[15.3rem]">
                  <MiniDigitalWowCard card={first} />
                </div>
              </div>
            </div>

            <div className="relative grid min-h-0 grid-cols-[5.15rem_minmax(0,1fr)] items-center gap-2 rounded-[1.3rem] border border-[#C8D0D6] bg-[#E6EBEF] px-2.5 py-2">
              <div className="pointer-events-none absolute bottom-2 left-[6.025rem] top-2 w-px -translate-x-1/2 bg-[#BCC5CC]" />
              <IntroCueChip />
              <IntroStepLabel label="Then" icon={<IconThen className="h-7 w-7" />} />
              <div className="flex min-h-0 items-center justify-center">
                <div className="w-[min(100%,calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-9.65rem)/2.72))] max-w-[15.3rem]">
                  <MiniDigitalWowCard card={second} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <button
              type="button"
              onClick={() => setShowFocusMode(true)}
              className="inline-flex h-8 items-center justify-center rounded-[0.9rem] border border-ink/10 bg-white px-3 text-[10px] font-semibold text-ink shadow-soft transition active:scale-[0.99]"
            >
              Focus mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full overflow-hidden overscroll-none bg-canvas touch-manipulation">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute left-1/2 top-1/2" style={sceneStyle}>
          <div className="relative h-full w-full bg-canvas pl-[max(0.65rem,env(safe-area-inset-top))] pr-[max(4.4rem,env(safe-area-inset-bottom))] py-[max(0.5rem,env(safe-area-inset-left))]">
            <div className="grid h-full min-h-0 grid-cols-2 items-center gap-1.5 px-[0.35rem]">
              <div className="flex h-full min-h-0 items-center justify-center">
                <div className="aspect-[10/13] h-full max-h-full max-w-[18.2rem]">
                  <StepVisualCard
                    generatedCard={first}
                    label="First"
                    icon={<IconFirst className="h-6 w-6" />}
                    className="h-full"
                  />
                </div>
              </div>

              <div className="flex h-full min-h-0 items-center justify-center">
                <div className="aspect-[10/13] h-full max-h-full max-w-[18.2rem]">
                  <StepVisualCard
                    generatedCard={second}
                    label="Then"
                    icon={<IconThen className="h-6 w-6" />}
                    className="h-full"
                  />
                </div>
              </div>
            </div>

            <div className="absolute bottom-[max(0.65rem,env(safe-area-inset-left))] right-[max(0.7rem,env(safe-area-inset-bottom))] z-20 flex flex-col items-center gap-4">
              <Link
                href="/menu"
                className="flex items-center gap-1.5 text-ink transition active:scale-[0.99]"
              >
                <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/72">
                  Menu
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white/72 text-ink shadow-soft backdrop-blur-sm">
                  <MenuDotsIcon className="rotate-90" />
                </span>
              </Link>

              <Link
                href="/player/brushing-teeth"
                className="flex items-center gap-1.5 text-ink transition active:scale-[0.99]"
              >
                <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/72">
                  Routines
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white/88 text-ink shadow-soft backdrop-blur-sm">
                  <RoutinesHomeIcon className="rotate-90" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
