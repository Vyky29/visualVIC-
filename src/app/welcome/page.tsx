import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { PixtoLearnLockup } from "@/components/brand/PixtoLearnLockup";
import {
  BRAND_ICON_AMBER,
  BRAND_ICON_PINK,
  BRAND_ICON_TEAL,
} from "@/lib/constants/brand";

const steps = [
  {
    n: 1,
    title: "Schedule Player",
    body: "Finished steps fade back; Now stays obvious.",
    from: BRAND_ICON_PINK,
    to: "#E873B0",
    badgeShadow: "0 8px 24px -6px rgba(221, 69, 150, 0.4)",
  },
  {
    n: 2,
    title: "Focus Mode",
    body: "One fullscreen card when noise needs to drop away.",
    from: BRAND_ICON_AMBER,
    to: "#F5C84D",
    badgeShadow: "0 8px 24px -6px rgba(233, 174, 46, 0.42)",
  },
  {
    n: 3,
    title: "Library & builder",
    body: "Mock visuals today; your assets tomorrow.",
    from: BRAND_ICON_TEAL,
    to: "#6FD0C8",
    badgeShadow: "0 8px 24px -6px rgba(76, 184, 176, 0.38)",
  },
] as const;

export default function WelcomePage() {
  return (
    <MobileScreen className="grid h-dvh max-h-dvh grid-rows-[auto_minmax(0,1fr)_auto] gap-2 overflow-hidden bg-white px-4 !pb-[max(0.35rem,env(safe-area-inset-bottom))] !pt-[max(0.35rem,env(safe-area-inset-top))]">
      <header className="min-h-0 shrink-0 space-y-1.5 text-center">
        <PixtoLearnLockup
          variant="hero"
          className="mx-auto [@media(max-height:640px)]:scale-[0.92]"
        />
        <h1 className="text-balance px-0.5 text-[clamp(1.05rem,4.2vw,1.45rem)] font-semibold leading-[1.15] tracking-tight text-ink [@media(max-height:640px)]:text-[clamp(0.95rem,3.8vw,1.2rem)]">
          Visual schedules that feel steady on the phone
        </h1>
        <p className="mx-auto line-clamp-2 max-w-sm text-[12px] leading-snug text-ink-subtle sm:text-[13px]">
          One calm column — routines, steps, and Focus Mode — built for clarity,
          not clutter.
        </p>
      </header>

      <div className="flex min-h-0 flex-col justify-center gap-1.5 overflow-hidden py-0.5">
        {steps.map((step) => (
          <div
            key={step.n}
            className="shrink-0 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-soft"
          >
            <div
              className="h-0.5 w-full opacity-95"
              style={{
                backgroundImage: `linear-gradient(to right, ${step.from}, ${step.to})`,
              }}
            />
            <div className="flex gap-2.5 px-2.5 py-2">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold text-white"
                style={{
                  backgroundColor: step.from,
                  boxShadow: step.badgeShadow,
                }}
              >
                {step.n}
              </div>
              <div className="min-w-0 flex-1 space-y-0.5 text-left">
                <p className="text-[13px] font-semibold leading-tight text-ink sm:text-[14px]">
                  {step.title}
                </p>
                <p className="line-clamp-2 text-[11px] leading-snug text-ink-subtle sm:text-[12px]">
                  {step.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="shrink-0 space-y-1.5 pt-0.5">
        <Link href="/dashboard" className="block w-full">
          <Button className="min-h-[42px] w-full py-2 text-[14px]">
            Enter home
          </Button>
        </Link>
        <Link href="/auth" className="block w-full">
          <Button
            variant="secondary"
            className="min-h-[42px] w-full py-2 text-[14px]"
          >
            Preview sign-in layout
          </Button>
        </Link>
        <p className="line-clamp-2 text-center text-[10px] leading-tight text-ink-faint sm:text-[11px]">
          No backend or AI in this build — layout and flow only.
        </p>
      </footer>
    </MobileScreen>
  );
}
