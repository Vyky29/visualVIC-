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
  "w-full max-w-[8.9rem] overflow-hidden rounded-[1.15rem] p-0 shadow-[0_6px_22px_-12px_rgba(42,86,58,0.2)]";

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

export default function FirstThenPage() {
  const brushing = getRoutineById("brushing-teeth");
  const first = brushing?.steps[0];
  const second = brushing?.steps[1];

  return (
    <div>
      <Header
        title="First & Then"
        rightSlot={
          <Link
            href="/menu"
            className="flex min-h-touch min-w-touch touch-manipulation items-center justify-center rounded-2xl px-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink active:bg-ink/10 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/5"
          >
            Menu
          </Link>
        }
      />
      <div className="flex min-h-[calc(100dvh-5rem)] flex-col px-3 pb-4 pt-3">
        <p className="px-1 text-center text-[13px] leading-relaxed text-ink-subtle">
          First on the left, Then on the right, sized to fit the iPhone landscape view.
        </p>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full items-center justify-center gap-2.5">
            <Card className={cn("border-0 bg-transparent shadow-none ring-2 ring-sage/75", miniCard)}>
              <div className="flex items-center justify-center gap-2 border-b border-ink/8 bg-sage-mist/85 py-2.5">
                <IconFirst className="h-6 w-6" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
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
                    sizes="160px"
                    priority
                  />
                ) : null}
              </div>
            </Card>

            <div className="flex shrink-0 flex-col items-center justify-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas-muted ring-1 ring-ink/10">
                <IconThenConnector className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                Then
              </span>
            </div>

            <Card className={cn("border-0 bg-transparent shadow-none ring-2 ring-accent/55", miniCard)}>
              <div className="flex items-center justify-center gap-2 border-b border-ink/8 bg-accent-soft/55 py-2.5">
                <IconThen className="h-6 w-6" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
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
                    sizes="160px"
                  />
                ) : null}
              </div>
            </Card>
          </div>
        </div>

        <Link
          href="/player/brushing-teeth"
          className={cn(
            "mx-auto flex min-h-touch w-full max-w-sm items-center justify-center rounded-2xl bg-ink px-5 py-3.5 text-center text-[15px] font-semibold text-cream shadow-soft transition active:scale-[0.99]",
          )}
        >
          Open full brushing routine
        </Link>
      </div>
    </div>
  );
}
