import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MobileScreen } from "@/components/layout/MobileScreen";

export default function WelcomePage() {
  return (
    <MobileScreen className="relative flex flex-col justify-center gap-12 overflow-hidden pb-20 pt-[max(2.5rem,env(safe-area-inset-top))]">
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-sage-mist/80 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-32 h-56 w-56 rounded-full bg-accent-soft/50 blur-3xl"
        aria-hidden
      />

      <div className="relative space-y-5 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-ink-faint">
          PixtoLearn Routines
        </p>
        <h1 className="text-balance text-[34px] font-semibold leading-[1.12] tracking-tight text-ink">
          Visual schedules that feel steady on the phone
        </h1>
        <p className="mx-auto max-w-sm text-[16px] leading-relaxed text-ink-subtle">
          One calm column — routines, steps, and Focus Mode — built for clarity,
          not clutter.
        </p>
      </div>

      <Card className="relative space-y-4 border-0 bg-white/85 shadow-soft ring-1 ring-ink/5 backdrop-blur-sm">
        <ul className="space-y-4 text-[14px] leading-snug text-ink-subtle">
          <li className="flex gap-4 text-left">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-mist text-[12px] font-semibold text-ink">
              1
            </span>
            <span>
              <strong className="font-medium text-ink">Schedule Player</strong>{" "}
              — finished steps fade back; Now stays obvious.
            </span>
          </li>
          <li className="flex gap-4 text-left">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-mist text-[12px] font-semibold text-ink">
              2
            </span>
            <span>
              <strong className="font-medium text-ink">Focus Mode</strong> —
              one fullscreen card when noise needs to drop away.
            </span>
          </li>
          <li className="flex gap-4 text-left">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-mist text-[12px] font-semibold text-ink">
              3
            </span>
            <span>
              <strong className="font-medium text-ink">Library & builder</strong>{" "}
              — mock visuals today; your assets tomorrow.
            </span>
          </li>
        </ul>
      </Card>

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
