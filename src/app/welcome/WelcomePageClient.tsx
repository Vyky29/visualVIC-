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
  welcomeFeaturePreviewSrc,
  welcomeFeatureTitle,
  welcomeHeroSubtitle,
  welcomeHeroTitle,
  type WelcomeFeatureSlot,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";

const FEATURES: readonly {
  slot: WelcomeFeatureSlot;
  from: string;
  to: string;
  previewFit: "contain" | "cover";
}[] = [
  {
    slot: "home",
    from: BRAND_ICON_PINK,
    to: "#E873B0",
    previewFit: "cover",
  },
  {
    slot: "focus",
    from: BRAND_ICON_AMBER,
    to: "#F5C84D",
    previewFit: "cover",
  },
];

/** Fixed text band so both columns stay visually paired; previews start on the same baseline. */
const WELCOME_TEXT_BAND =
  "flex h-[6.75rem] shrink-0 flex-col items-center px-1 pb-1 pt-0.5 text-center sm:h-[7rem]";

function WelcomePreview({
  src,
  alt,
  fit,
  className,
}: {
  src: string;
  alt: string;
  fit: "contain" | "cover";
  className?: string;
}) {
  const imageClass =
    fit === "cover"
      ? "object-cover object-top"
      : "object-contain object-top";

  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col items-stretch",
        className,
      )}
    >
      <div className="mx-auto flex h-full w-full min-h-[10rem] flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col rounded-[1.25rem] border border-ink/[0.08] bg-[#121916] p-[3px] shadow-[0_18px_32px_-20px_rgba(27,38,32,0.42)] sm:rounded-[1.55rem] sm:p-[5px]">
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.05rem] border border-black/10 bg-white sm:rounded-[1.25rem]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex shrink-0 justify-center pt-1 sm:pt-1.5">
              <span className="h-1 w-9 rounded-full bg-black/15 sm:w-10" />
            </div>
            <div className="relative mt-4 min-h-0 flex-1 bg-[#f6f6f4] sm:mt-5">
              <Image
                key={src}
                src={src}
                alt={alt}
                fill
                className={imageClass}
                sizes="(max-width: 640px) 50vw, 280px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WelcomePageClient() {
  const lang = useCardUiLanguage();

  return (
    <MobileScreen className="flex min-h-dvh w-full max-w-lg flex-col gap-0 bg-white !px-3 !pb-[max(1rem,env(safe-area-inset-bottom))] !pt-0 sm:!px-4">
      <header
        className="sticky top-0 z-20 flex shrink-0 justify-end border-b border-ink/5 bg-white/90 px-1 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
        style={{
          paddingTop: "max(0.5rem, env(safe-area-inset-top))",
        }}
      >
        <CardLanguageMenuButton afterSelect="stay" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-1 pt-2 sm:gap-4 sm:px-0 sm:pt-3">
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

        <div className="grid min-h-0 w-full flex-1 grid-cols-2 gap-2 sm:min-h-[min(52svh,520px)] sm:gap-3">
          {FEATURES.map((feature) => (
            <section
              key={feature.slot}
              className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.1rem] border border-ink/[0.06] bg-white shadow-soft sm:rounded-[1.25rem]"
            >
              <div className={WELCOME_TEXT_BAND}>
                <div
                  className="mb-1.5 h-1 w-11 shrink-0 rounded-full opacity-95 sm:w-12"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${feature.from}, ${feature.to})`,
                  }}
                />
                <p className="line-clamp-2 shrink-0 text-balance text-[0.78rem] font-semibold leading-tight text-ink sm:text-[0.86rem]">
                  {welcomeFeatureTitle(feature.slot, lang)}
                </p>
                <p className="mx-auto mt-1 line-clamp-4 max-h-[3.6rem] min-h-0 w-full max-w-[11.75rem] text-pretty text-[0.64rem] leading-[1.35] text-ink-subtle sm:max-h-[3.85rem] sm:max-w-[12.5rem] sm:text-[0.72rem] sm:leading-[1.38]">
                  {welcomeFeatureBody(feature.slot, lang)}
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col px-1 pb-2 pt-0 sm:px-1.5 sm:pb-2.5">
                <WelcomePreview
                  src={welcomeFeaturePreviewSrc(feature.slot, lang)}
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
