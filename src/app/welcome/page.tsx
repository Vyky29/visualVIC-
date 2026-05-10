import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { BRAND_WORDMARK_LOGO_SRC } from "@/lib/constants/brand";
import { cn } from "@/lib/utils/cn";

const steps = [
  {
    n: 1,
    title: "Schedule Player",
    body: "Finished steps fade back; Now stays obvious.",
    bar: "from-fuchsia-500 to-fuchsia-400",
    badge: "bg-fuchsia-500 shadow-[0_8px_24px_-6px_rgba(192,38,211,0.55)]",
  },
  {
    n: 2,
    title: "Focus Mode",
    body: "One fullscreen card when noise needs to drop away.",
    bar: "from-amber-400 to-amber-300",
    badge:
      "bg-amber-400 text-ink shadow-[0_8px_24px_-6px_rgba(251,191,36,0.55)]",
  },
  {
    n: 3,
    title: "Library & builder",
    body: "Mock visuals today; your assets tomorrow.",
    bar: "from-teal-500 to-teal-400",
    badge: "bg-teal-500 shadow-[0_8px_24px_-6px_rgba(20,184,166,0.45)]",
  },
] as const;

export default function WelcomePage() {
  return (
    <MobileScreen className="relative flex min-h-dvh flex-col gap-10 overflow-x-clip pb-24 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-sage-mist/80 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-32 h-56 w-56 rounded-full bg-accent-soft/50 blur-3xl"
        aria-hidden
      />

      <div className="relative space-y-5 text-center">
        <div className="mx-auto w-full max-w-md px-1">
          {/* Plain <img>: avoids Next/Image layout quirks; path is always /public */}
          <img
            src={BRAND_WORDMARK_LOGO_SRC}
            alt="PixtoLearn"
            width={560}
            height={180}
            decoding="async"
            fetchPriority="high"
            className="mx-auto block h-auto w-full max-h-[9.5rem] max-w-full object-contain object-center sm:max-h-[11rem]"
          />
        </div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-ink-faint">
          Routines
        </p>
        <h1 className="text-balance text-[34px] font-semibold leading-[1.12] tracking-tight text-ink">
          Visual schedules that feel steady on the phone
        </h1>
        <p className="mx-auto max-w-sm text-[16px] leading-relaxed text-ink-subtle">
          One calm column — routines, steps, and Focus Mode — built for clarity,
          not clutter.
        </p>
      </div>

      <div className="relative space-y-3 px-1">
        {steps.map((step) => (
          <div
            key={step.n}
            className="overflow-hidden rounded-[1.35rem] bg-white/90 shadow-soft ring-1 ring-ink/[0.06] backdrop-blur-sm"
          >
            <div
              className={cn(
                "h-1 w-full bg-gradient-to-r opacity-95",
                step.bar,
              )}
            />
            <div className="flex gap-4 p-4 pr-5">
              <div
                className={cn(
                  "flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-2xl text-[17px] font-bold text-white",
                  step.badge,
                )}
              >
                {step.n}
              </div>
              <div className="min-w-0 flex-1 space-y-1 text-left">
                <p className="text-[16px] font-semibold leading-tight text-ink">
                  {step.title}
                </p>
                <p className="text-[14px] leading-snug text-ink-subtle">
                  {step.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col gap-3">
        <Link href="/dashboard" className="w-full">
          <Button className="min-h-touch w-full text-[16px]">Enter home</Button>
        </Link>
        <Link href="/auth" className="w-full">
          <Button variant="secondary" className="min-h-touch w-full text-[16px]">
            Preview sign-in layout
          </Button>
        </Link>
        <p className="text-center text-[12px] leading-relaxed text-ink-faint">
          No backend or AI in this build — layout and flow only.
        </p>
      </div>
    </MobileScreen>
  );
}
