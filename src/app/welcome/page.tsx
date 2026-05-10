import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MobileScreen } from "@/components/layout/MobileScreen";
import {
  BRAND_ICON_AMBER,
  BRAND_ICON_PINK,
  BRAND_ICON_TEAL,
  BRAND_WORDMARK_LOGO_SRC,
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
    <MobileScreen className="relative flex min-h-dvh flex-col gap-10 bg-white pb-24 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="relative space-y-5 text-center">
        <div className="mx-auto w-full max-w-md px-1">
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
            className="overflow-hidden rounded-[1.35rem] border border-ink/[0.06] bg-white shadow-soft"
          >
            <div
              className="h-1 w-full bg-gradient-to-r opacity-95"
              style={{
                backgroundImage: `linear-gradient(to right, ${step.from}, ${step.to})`,
              }}
            />
            <div className="flex gap-4 p-4 pr-5">
              <div
                className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-2xl text-[17px] font-bold text-white"
                style={{
                  backgroundColor: step.from,
                  boxShadow: step.badgeShadow,
                }}
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
