"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { getRoutineById } from "@/lib/mock/routines";
import {
  bottomNavLabel,
  firstThenConnectorSymbol,
  firstThenOpenFullRoutine,
  firstThenSlotLabel,
} from "@/lib/i18n/app-shell-locale";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { GENERATED_PIXTO_SCHEDULE_NEXT_W } from "@/lib/constants/generated-pixto-card-sizes";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionClass,
} from "@/lib/utils/visual-card-url";

const miniCard =
  "w-full overflow-hidden rounded-[1.15rem] p-0 shadow-[0_6px_22px_-12px_rgba(42,86,58,0.2)]";

/** Portrait stack: same visible width as Schedule NEXT (bus card). */
const portraitCardWidthClass = `w-[min(100%,${GENERATED_PIXTO_SCHEDULE_NEXT_W}px)]`;

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

function IconThenConnector({ className }: { className?: string }) {
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

export function FirstThenPageClient() {
  const lang = useCardUiLanguage();
  const brushing = getRoutineById("brushing-teeth");
  const first = brushing?.steps[0];
  const second = brushing?.steps[1];
  const routineLabel = brushing
    ? stockRoutineDisplayName(brushing.id, brushing.name, lang)
    : "";

  return (
    <div className="box-border h-[100dvh] max-h-[100dvh] overflow-hidden overscroll-none px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="relative flex h-full max-h-full flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 items-center justify-center pb-[calc(4rem+env(safe-area-inset-bottom))] [@media(orientation:landscape)]:pb-[calc(4.25rem+env(safe-area-inset-bottom))] [@media(orientation:landscape)_and_(max-height:500px)]:pb-[calc(3.6rem+env(safe-area-inset-bottom))]">
          <div className="flex min-h-0 w-full flex-col items-center justify-center gap-3 [@media(orientation:landscape)]:flex-row [@media(orientation:landscape)]:gap-4 [@media(orientation:landscape)_and_(max-height:500px)]:gap-5">
            <Card
              omitInsetRing
              className={cn(
                "shrink-0 border-0 bg-transparent shadow-none",
                miniCard,
                portraitCardWidthClass,
                "[@media(orientation:landscape)]:w-[min(calc((100%-5.75rem)/2),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-5.75rem)/1.3))]",
                "[@media(orientation:landscape)_and_(max-height:500px)]:w-[min(calc((100%-6.25rem)/2),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-4.75rem)/1.3))]",
              )}
            >
              <div className="flex items-center justify-center gap-2 border-b border-ink/8 bg-sage-mist/85 py-2.5">
                <IconFirst className="h-6 w-6" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
                  {firstThenSlotLabel("first", lang)}
                </span>
              </div>
              <div className="relative aspect-[510/676] w-full overflow-hidden bg-transparent">
                {first?.imageUrl ? (
                  <Image
                    src={first.imageUrl}
                    alt={
                      first.title
                        ? `${firstThenSlotLabel("first", lang)} — ${first.title}`
                        : `${firstThenSlotLabel("first", lang)} — ${routineLabel}`
                    }
                    fill
                    className={cn(
                      "object-contain",
                      isPixtoLearnBundledCardUrl(first.imageUrl)
                        ? pixtoBundledCardObjectPositionClass
                        : "object-center",
                    )}
                    sizes="160px"
                    priority
                  />
                ) : null}
              </div>
            </Card>

            <div className="flex shrink-0 items-center justify-center">
              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-canvas-muted ring-1 ring-ink/10 [@media(orientation:landscape)_and_(max-height:500px)]:h-10 [@media(orientation:landscape)_and_(max-height:500px)]:w-10">
                <IconThenConnector className="h-4 w-4 rotate-90 [@media(orientation:landscape)]:rotate-0 [@media(orientation:landscape)_and_(max-height:500px)]:h-3.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-3.5" />
                <span className="mt-[-1px] text-[11px] font-semibold text-ink-subtle [@media(orientation:landscape)_and_(max-height:500px)]:text-[10px]">
                  {firstThenConnectorSymbol(lang)}
                </span>
              </div>
            </div>

            <Card
              omitInsetRing
              className={cn(
                "shrink-0 border-0 bg-transparent shadow-none",
                miniCard,
                portraitCardWidthClass,
                "[@media(orientation:landscape)]:w-[min(calc((100%-5.75rem)/2),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-5.75rem)/1.3))]",
                "[@media(orientation:landscape)_and_(max-height:500px)]:w-[min(calc((100%-6.25rem)/2),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-4.75rem)/1.3))]",
              )}
            >
              <div className="flex items-center justify-center gap-2 border-b border-ink/8 bg-accent-soft/55 py-2.5">
                <IconThen className="h-6 w-6" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
                  {firstThenSlotLabel("then", lang)}
                </span>
              </div>
              <div className="relative aspect-[510/676] w-full overflow-hidden bg-transparent">
                {second?.imageUrl ? (
                  <Image
                    src={second.imageUrl}
                    alt={
                      second.title
                        ? `${firstThenSlotLabel("then", lang)} — ${second.title}`
                        : `${firstThenSlotLabel("then", lang)} — ${routineLabel}`
                    }
                    fill
                    className={cn(
                      "object-contain",
                      isPixtoLearnBundledCardUrl(second.imageUrl)
                        ? pixtoBundledCardObjectPositionClass
                        : "object-center",
                    )}
                    sizes="160px"
                  />
                ) : null}
              </div>
            </Card>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-10 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href="/menu"
              className="flex h-10 items-center justify-center rounded-[1rem] border border-ink/10 bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink shadow-soft transition active:scale-[0.99] [@media(orientation:landscape)_and_(max-height:500px)]:h-9 [@media(orientation:landscape)_and_(max-height:500px)]:px-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:text-[10px]"
            >
              {bottomNavLabel("menu", lang)}
            </Link>
            <Link
              href="/player/brushing-teeth"
              className={cn(
                "flex h-10 items-center justify-center rounded-[1rem] bg-ink px-3.5 text-center text-[12px] font-semibold text-cream shadow-soft transition active:scale-[0.99] [@media(orientation:landscape)_and_(max-height:500px)]:h-9 [@media(orientation:landscape)_and_(max-height:500px)]:px-3 [@media(orientation:landscape)_and_(max-height:500px)]:text-[11px]",
              )}
            >
              {firstThenOpenFullRoutine(lang)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
