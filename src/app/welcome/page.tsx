import Image from "next/image";
import Link from "next/link";
import { PixtoLearnLockup } from "@/components/brand/PixtoLearnLockup";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { Button } from "@/components/ui/Button";
import {
  BRAND_ICON_AMBER,
  BRAND_ICON_PINK,
} from "@/lib/constants/brand";

const features = [
  {
    title: "Schedule Player",
    body: "Finished steps fade back; Now stays obvious.",
    from: BRAND_ICON_PINK,
    to: "#E873B0",
    previewSrc: "/welcome/schedule-player.png",
    previewAlt: "Schedule Player screenshot",
  },
  {
    title: "Focus Mode",
    body: "One fullscreen card when noise needs to drop away.",
    from: BRAND_ICON_AMBER,
    to: "#F5C84D",
    previewSrc: "/welcome/focus-mode.png",
    previewAlt: "Focus Mode screenshot",
  },
] as const;

function WelcomePreview({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="mt-1.5 overflow-hidden rounded-[1rem] border border-ink/[0.08] bg-white shadow-[0_14px_26px_-18px_rgba(27,38,32,0.32)]">
      <div className="relative aspect-[37/60] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-top"
          sizes="(max-width: 640px) 30vw, 220px"
          priority
        />
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <MobileScreen className="grid h-dvh max-h-dvh grid-rows-[auto_minmax(0,1fr)_auto] gap-2 overflow-hidden bg-white px-4 !pb-[max(0.35rem,env(safe-area-inset-bottom))] !pt-[max(0.35rem,env(safe-area-inset-top))]">
      <header className="min-h-0 shrink-0 space-y-2.5 text-center">
        <PixtoLearnLockup
          variant="hero"
          layout="stacked"
          className="mx-auto w-full max-w-sm [@media(max-height:640px)]:gap-2"
        />
        <h1 className="text-balance px-1 text-[clamp(1.05rem,4.2vw,1.45rem)] font-semibold leading-[1.15] tracking-tight text-ink [@media(max-height:640px)]:text-[clamp(0.95rem,3.8vw,1.2rem)]">
          Visual schedules that feel steady on the phone
        </h1>
        <p className="mx-auto line-clamp-2 max-w-sm text-[12px] leading-snug text-ink-subtle sm:text-[13px]">
          One calm column — routines, steps, and Focus Mode — built for clarity,
          not clutter.
        </p>
      </header>

      <div className="grid min-h-0 grid-cols-2 gap-2 overflow-hidden py-0.5">
        {features.map((feature) => (
          <section
            key={feature.title}
            className="flex min-w-0 min-h-0 flex-col overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-soft"
          >
            <div
              className="h-0.5 w-full opacity-95"
              style={{
                backgroundImage: `linear-gradient(to right, ${feature.from}, ${feature.to})`,
              }}
            />
            <div className="flex min-h-0 flex-1 flex-col px-2 py-2 text-left">
              <p className="text-[10px] font-semibold leading-tight text-ink sm:text-[11px]">
                {feature.title}
              </p>
              <p className="mt-1 text-[8px] leading-[1.25] text-ink-subtle sm:text-[9px]">
                {feature.body}
              </p>
              <div className="mt-1 min-h-0 flex-1">
                <WelcomePreview
                  src={feature.previewSrc}
                  alt={feature.previewAlt}
                />
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="shrink-0 space-y-1 pt-0.5">
        <Link href="/dashboard" className="block w-full">
          <Button className="min-h-[38px] w-full whitespace-nowrap px-4 py-1.5 text-[13px]">
            Enter home
          </Button>
        </Link>
        <Link href="/auth" className="block w-full">
          <Button
            variant="secondary"
            className="min-h-[38px] w-full whitespace-nowrap px-4 py-1.5 text-[13px]"
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
