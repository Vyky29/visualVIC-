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
    body: "Finished steps fade back while the current step stays clear and easy to follow.",
    from: BRAND_ICON_PINK,
    to: "#E873B0",
    previewSrc: "/welcome/schedule-player.png",
    previewAlt: "Schedule Player screenshot",
  },
  {
    title: "Focus Mode",
    body: "A larger single-card view that cuts distractions when the routine needs full attention.",
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
    <div className="mx-auto w-full max-w-[9.75rem] [@media(max-height:700px)]:max-w-[8.5rem]">
      <div className="rounded-[1.7rem] border border-ink/[0.08] bg-[#121916] p-1.5 shadow-[0_18px_32px_-20px_rgba(27,38,32,0.42)]">
        <div className="relative overflow-hidden rounded-[1.3rem] border border-black/10 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-1.5">
            <span className="h-1 w-10 rounded-full bg-black/15" />
          </div>
          <div className="relative aspect-[37/60] w-full bg-[#f6f6f4]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain object-top"
              sizes="(max-width: 640px) 38vw, 240px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <MobileScreen className="grid h-dvh max-h-dvh grid-rows-[auto_minmax(0,1fr)_auto] gap-3 overflow-hidden bg-white px-4 !pb-[max(0.55rem,env(safe-area-inset-bottom))] !pt-[max(0.55rem,env(safe-area-inset-top))]">
      <header className="min-h-0 shrink-0 space-y-2 text-center">
        <PixtoLearnLockup
          variant="hero"
          layout="stacked"
          className="mx-auto w-full max-w-sm [@media(max-height:700px)]:gap-2"
        />
        <div className="mx-auto w-full max-w-[16.25rem] space-y-1.5 text-center sm:max-w-[17.5rem]">
          <h1 className="text-balance text-[clamp(1.2rem,4.8vw,1.7rem)] font-semibold leading-[1.12] tracking-tight text-ink [@media(max-height:700px)]:text-[clamp(1.05rem,4vw,1.35rem)]">
            Visual schedules that feel steady on the phone
          </h1>
          <p className="text-pretty text-[13px] leading-[1.45] text-ink-subtle sm:text-[14px] [@media(max-height:700px)]:text-[12px]">
            One calm column — routines, steps, and Focus Mode — built for
            clarity, not clutter.
          </p>
        </div>
      </header>

      <div className="grid min-h-0 grid-cols-2 gap-2 overflow-hidden py-0.5 sm:gap-3">
        {features.map((feature) => (
          <section
            key={feature.title}
            className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.1rem] border border-ink/[0.06] bg-white px-2 py-2.5 shadow-soft sm:rounded-[1.25rem] sm:px-2.5 sm:py-3"
          >
            <div className="shrink-0 text-left">
              <div
                className="mb-1.5 h-1 w-12 rounded-full opacity-95 sm:mb-2 sm:w-14"
                style={{
                  backgroundImage: `linear-gradient(to right, ${feature.from}, ${feature.to})`,
                }}
              />
              <p className="text-[0.8rem] font-semibold leading-tight text-ink sm:text-[0.88rem]">
                {feature.title}
              </p>
              <p className="mt-1 line-clamp-4 text-[0.68rem] leading-[1.35] text-ink-subtle sm:text-[0.74rem]">
                {feature.body}
              </p>
            </div>
            <div className="mt-1.5 flex min-h-0 min-w-0 flex-1 items-end justify-center sm:mt-2">
              <WelcomePreview src={feature.previewSrc} alt={feature.previewAlt} />
            </div>
          </section>
        ))}
      </div>

      <footer className="shrink-0 space-y-1.5 pt-0.5">
        <div className="grid grid-cols-2 gap-2">
          <Link href="/dashboard" className="block w-full">
            <Button className="min-h-[40px] w-full whitespace-nowrap px-3 py-1.5 text-[13px]">
              Enter home
            </Button>
          </Link>
          <Link href="/auth" className="block w-full">
            <Button
              variant="secondary"
              className="min-h-[40px] w-full whitespace-nowrap px-3 py-1.5 text-[13px]"
            >
              Sign in
            </Button>
          </Link>
        </div>
        <p className="text-center text-[11px] leading-tight text-ink-faint sm:text-[12px] [@media(max-height:700px)]:text-[10px]">
          No backend or AI in this build — layout and flow only.
        </p>
      </footer>
    </MobileScreen>
  );
}
