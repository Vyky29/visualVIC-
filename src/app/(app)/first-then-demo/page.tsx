import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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
}: {
  imageUrl?: string;
  alt: string;
  tone: "sage" | "accent";
  label: "First" | "Then";
  icon: ReactNode;
}) {
  return (
    <article
      className={cn(
        cardShell,
        tone === "sage" ? "ring-2 ring-sage/75" : "ring-2 ring-accent/55",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center gap-2 border-b border-ink/8 py-2.5",
          tone === "sage" ? "bg-sage-mist/85" : "bg-accent-soft/55",
        )}
      >
        {icon}
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
          {label}
        </span>
      </div>
      <div className="relative aspect-[10/13] w-full overflow-hidden bg-transparent">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className={cn(
              "object-cover",
              isPixtoLearnBundledCardUrl(imageUrl)
                ? pixtoBundledCardObjectPositionClass
                : "object-center",
            )}
            sizes="(orientation: landscape) 42vw, 84vw"
            priority={tone === "sage"}
          />
        ) : null}
      </div>
    </article>
  );
}

export default function FirstThenDemoPage() {
  const brushing = getRoutineById("brushing-teeth");
  const first = brushing?.steps[0];
  const second = brushing?.steps[1];

  return (
    <div className="box-border h-[100dvh] max-h-[100dvh] overflow-hidden overscroll-none bg-canvas px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="grid h-full max-h-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden">
        <div className="flex min-h-0 items-center justify-center pb-4 [@media(orientation:landscape)]:pb-5">
          <div className="flex min-h-0 w-full flex-col items-center justify-center gap-3 [@media(orientation:landscape)]:flex-row [@media(orientation:landscape)]:gap-4">
            <div className="w-[min(calc(100%-1rem),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-6.75rem)/2.72))] shrink-0 [@media(orientation:landscape)]:w-[min(calc((100%-6rem)/2),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-5.5rem)/1.32))]">
              <StepVisualCard
                imageUrl={first?.imageUrl}
                alt={first?.title ?? "First step"}
                tone="sage"
                label="First"
                icon={<IconFirst className="h-6 w-6" />}
              />
            </div>

            <div className="flex shrink-0 items-center justify-center">
              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-canvas-muted ring-1 ring-ink/10">
                <IconConnector className="h-4 w-4 rotate-90 [@media(orientation:landscape)]:rotate-0" />
                <span className="mt-[-1px] text-[11px] font-semibold text-ink-subtle">
                  &amp;
                </span>
              </div>
            </div>

            <div className="w-[min(calc(100%-1rem),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-6.75rem)/2.72))] shrink-0 [@media(orientation:landscape)]:w-[min(calc((100%-6rem)/2),calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-5.5rem)/1.32))]">
              <StepVisualCard
                imageUrl={second?.imageUrl}
                alt={second?.title ?? "Then step"}
                tone="accent"
                label="Then"
                icon={<IconThen className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2">
            <Link
              href="/menu"
              className="flex h-10 items-center justify-center rounded-[1rem] border border-ink/10 bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink shadow-soft transition active:scale-[0.99]"
            >
              Menu
            </Link>
            <Link
              href="/player/brushing-teeth"
              className="flex h-10 items-center justify-center rounded-[1rem] bg-ink px-3.5 text-center text-[12px] font-semibold text-cream shadow-soft transition active:scale-[0.99]"
            >
              Open full routine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
