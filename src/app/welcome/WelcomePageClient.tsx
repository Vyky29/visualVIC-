"use client";

import Image from "next/image";
import { PixtoLearnLockup } from "@/components/brand/PixtoLearnLockup";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { CardLanguageMenuButton } from "@/components/preferences/CardLanguageMenuButton";
import { WelcomeFooter } from "@/app/welcome/WelcomeFooter";
import {
  BRAND_ICON_AMBER,
  BRAND_ICON_PINK,
} from "@/lib/constants/brand";
import {
  welcomeFeatureBody,
  welcomeFeaturePreviewAlt,
  welcomeFeatureTitle,
  welcomeHeroSubtitle,
  welcomeHeroTitle,
  type WelcomeFeatureSlot,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

const FEATURES: readonly {
  slot: WelcomeFeatureSlot;
  from: string;
  to: string;
  previewSrc: string;
  previewFit: "contain" | "cover";
}[] = [
  {
    slot: "home",
    from: BRAND_ICON_PINK,
    to: "#E873B0",
    previewSrc: "/welcome/home-screen.png",
    previewFit: "cover",
  },
  {
    slot: "focus",
    from: BRAND_ICON_AMBER,
    to: "#F5C84D",
    previewSrc: "/welcome/focus-mode.png",
    previewFit: "contain",
  },
];

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

export function WelcomePageClient() {
  const lang = useCardUiLanguage();

  return (
    <MobileScreen className="flex min-h-dvh w-full flex-col gap-4 bg-white !pb-[max(1rem,env(safe-area-inset-bottom))] !pt-0">
      <header
        className="sticky top-0 z-20 flex shrink-0 justify-end border-b border-ink/5 bg-white/90 px-4 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
        style={{
          paddingTop: "max(0.5rem, env(safe-area-inset-top))",
        }}
      >
        <CardLanguageMenuButton afterSelect="stay" />
      </header>

      <div className="flex flex-1 flex-col gap-4 px-4 pt-1">
        <div className="shrink-0 space-y-2 text-center">
          <PixtoLearnLockup
            variant="hero"
            layout="stacked"
            className="mx-auto w-full max-w-sm [@media(max-height:700px)]:gap-2"
          />
          <div className="mx-auto w-full max-w-[16.25rem] space-y-1.5 text-center sm:max-w-[17.5rem]">
            <h1 className="text-balance text-[clamp(1.2rem,4.8vw,1.7rem)] font-semibold leading-[1.12] tracking-tight text-ink [@media(max-height:700px)]:text-[clamp(1.05rem,4vw,1.35rem)]">
              {welcomeHeroTitle(lang)}
            </h1>
            <p className="text-pretty text-[13px] leading-[1.45] text-ink-subtle sm:text-[14px] [@media(max-height:700px)]:text-[12px]">
              {welcomeHeroSubtitle(lang)}
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 py-0.5 sm:gap-3">
          {FEATURES.map((feature) => (
            <section
              key={feature.slot}
              className="flex min-w-0 flex-col rounded-[1.1rem] border border-ink/[0.06] bg-white px-2 py-2.5 shadow-soft sm:rounded-[1.25rem] sm:px-2.5 sm:py-3"
            >
              <div className="shrink-0 text-center">
                <div
                  className="mx-auto mb-1.5 h-1 w-12 rounded-full opacity-95 sm:mb-2 sm:w-14"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${feature.from}, ${feature.to})`,
                  }}
                />
                <p className="text-balance text-[0.8rem] font-semibold leading-tight text-ink sm:text-[0.88rem]">
                  {welcomeFeatureTitle(feature.slot, lang)}
                </p>
                <p className="mx-auto mt-1 max-w-[11.5rem] text-pretty text-[0.68rem] leading-[1.4] text-ink-subtle sm:max-w-[12.5rem] sm:text-[0.74rem]">
                  {welcomeFeatureBody(feature.slot, lang)}
                </p>
              </div>
              <div className="mt-2 flex w-full justify-center sm:mt-2.5">
                <WelcomePreview
                  src={feature.previewSrc}
                  alt={welcomeFeaturePreviewAlt(feature.slot, lang)}
                  fit={feature.previewFit}
                />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-auto shrink-0 pt-1">
          <WelcomeFooter />
        </div>
      </div>
    </MobileScreen>
  );
}
