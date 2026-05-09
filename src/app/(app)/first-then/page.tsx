import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { getRoutineById } from "@/lib/mock/routines";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionClass,
} from "@/lib/utils/visual-card-url";

const miniCard =
  "mx-auto w-full max-w-[min(100%,13rem)] overflow-hidden rounded-[1.35rem] p-0 shadow-[0_6px_22px_-12px_rgba(42,86,58,0.2)] ring-2 ring-sage/75";

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
        d="M12 5v14M7 10l5 5 5-5"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FirstThenPage() {
  const brushing = getRoutineById("brushing-teeth");
  const first = brushing?.steps[0];
  const second = brushing?.steps[1];

  return (
    <div>
      <Header title="First & Then" />
      <div className="space-y-8 px-4 pb-12 pt-3">
        <p className="px-1 text-[15px] leading-relaxed text-ink-subtle">
          Two cards, one transition — pairs naturally with brushing or any short
          pairing from your routines.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Card className={cn("border-0 bg-transparent shadow-none", miniCard)}>
            <div className="flex items-center justify-center gap-2.5 border-b border-ink/8 bg-sage-mist/85 py-3.5">
              <IconFirst />
              <span className="text-[14px] font-bold uppercase tracking-[0.14em] text-ink">
                First
              </span>
            </div>
            <div className="relative aspect-[10/13] w-full overflow-hidden bg-transparent">
              {first?.imageUrl ? (
                <Image
                  src={first.imageUrl}
                  alt={first.title ?? "First step"}
                  fill
                  className={cn(
                    "object-cover",
                    isPixtoLearnBundledCardUrl(first.imageUrl)
                      ? pixtoBundledCardObjectPositionClass
                      : "object-center",
                  )}
                  sizes="220px"
                  priority
                />
              ) : null}
            </div>
          </Card>

          <div className="flex items-center justify-center gap-2 rounded-full bg-canvas-muted px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-subtle ring-1 ring-ink/10">
            <IconThenConnector />
            <span>Then</span>
          </div>

          <Card className={cn("border-0 bg-transparent shadow-none", miniCard)}>
            <div className="flex items-center justify-center gap-2.5 border-b border-ink/8 bg-accent-soft/55 py-3.5">
              <IconThen />
              <span className="text-[14px] font-bold uppercase tracking-[0.14em] text-ink">
                Then
              </span>
            </div>
            <div className="relative aspect-[10/13] w-full overflow-hidden bg-transparent">
              {second?.imageUrl ? (
                <Image
                  src={second.imageUrl}
                  alt={second.title ?? "Then step"}
                  fill
                  className={cn(
                    "object-cover",
                    isPixtoLearnBundledCardUrl(second.imageUrl)
                      ? pixtoBundledCardObjectPositionClass
                      : "object-center",
                  )}
                  sizes="220px"
                />
              ) : null}
            </div>
          </Card>
        </div>

        <Link
          href="/player/brushing-teeth"
          className={cn(
            "flex min-h-touch w-full items-center justify-center rounded-2xl bg-ink px-5 py-4 text-center text-[16px] font-semibold text-cream shadow-soft transition active:scale-[0.99]",
          )}
        >
          Open full brushing routine
        </Link>
      </div>
    </div>
  );
}
