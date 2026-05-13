import Image from "next/image";
import { PixtoLearnLockup } from "@/components/brand/PixtoLearnLockup";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { WelcomeFooter } from "@/app/welcome/WelcomeFooter";
import {
  BRAND_ICON_AMBER,
  BRAND_ICON_PINK,
} from "@/lib/constants/brand";

const features = [
  {
    title: "Home",
    body: "Routines by category — quick access to Library, Templates, and more from the tab bar.",
    from: BRAND_ICON_PINK,
    to: "#E873B0",
    previewSrc: "/welcome/home-screen.png",
    previewAlt: "Home screen with routine cards and bottom navigation",
    /** Taller phone frame + wide screenshot: cover removes letterboxing under the tab bar */
    previewFit: "cover" as const,
  },
  {
    title: "Focus Mode",
    body: "A larger single-card view that cuts distractions when the routine needs full attention.",
    from: BRAND_ICON_AMBER,
    to: "#F5C84D",
    previewSrc: "/welcome/focus-mode.png",
    previewAlt: "Focus Mode screenshot",
    previewFit: "contain" as const,
  },
] as const;

function WelcomePreview({
  src,
  alt,
  fit,
}: {
  src: string;
  alt: string;
  fit: "contain" | "cover";
}) {
  const imageClass =
    fit === "cover" ? "object-cover object-top" : "object-contain object-top";

  return (
    <div className="mx-auto w-full max-w-[11.25rem] [@media(max-height:700px)]:max-w-[9.75rem]">
      <div className="rounded-[1.85rem] border border-ink/[0.08] bg-[#121916] p-[0.4rem] shadow-[0_18px_32px_-20px_rgba(27,38,32,0.42)] sm:p-1.5">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-black/10 bg-white sm:rounded-[1.4rem]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-1.5">
            <span className="h-1 w-10 rounded-full bg-black/15" />
          </div>
          <div className="relative aspect-[37/72] w-full bg-[#f6f6f4]">
            <Image
              src={src}
              alt={alt}
              fill
              className={imageClass}
              sizes="(max-width: 640px) 45vw, 280px"
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
            <div className="shrink-0 text-center">
              <div
                className="mx-auto mb-1.5 h-1 w-12 rounded-full opacity-95 sm:mb-2 sm:w-14"
                style={{
                  backgroundImage: `linear-gradient(to right, ${feature.from}, ${feature.to})`,
                }}
              />
              <p className="text-balance text-[0.8rem] font-semibold leading-tight text-ink sm:text-[0.88rem]">
                {feature.title}
              </p>
              <p className="mx-auto mt-1 max-w-[11.5rem] text-pretty text-[0.68rem] leading-[1.4] text-ink-subtle sm:max-w-[12.5rem] sm:text-[0.74rem]">
                {feature.body}
              </p>
            </div>
            <div className="mt-2 flex min-h-0 min-w-0 justify-center sm:mt-2.5">
              <WelcomePreview
                src={feature.previewSrc}
                alt={feature.previewAlt}
                fit={feature.previewFit}
              />
            </div>
          </section>
        ))}
      </div>

      <WelcomeFooter />
    </MobileScreen>
  );
}
