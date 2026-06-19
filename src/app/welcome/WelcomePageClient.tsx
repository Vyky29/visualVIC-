"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PixtoLearnLockup } from "@/components/brand/PixtoLearnLockup";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { CardLanguageFlagButtons } from "@/components/preferences/CardLanguageMenuButton";
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
  welcomeHeroTitle,
  welcomePreviewExpandHint,
  welcomePreviewLightboxCloseAria,
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

/** Text band above previews — compact so phones sit closer to the copy. */
const WELCOME_TEXT_BAND =
  "flex h-[6.1rem] shrink-0 flex-col items-center px-1 pb-0.5 pt-0.5 text-center sm:h-[6.45rem] tablet:h-[4.6rem]";

/** Shared “phone” chrome so zoom lightbox matches the small preview outline. */
function WelcomePhoneDeviceChrome({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.85rem] border border-ink/[0.08] bg-[#121916] p-[0.4rem] shadow-[0_18px_32px_-20px_rgba(27,38,32,0.42)] sm:p-1.5",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.35rem] border border-black/10 bg-white sm:rounded-[1.4rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-1.5">
          <span className="h-1 w-10 rounded-full bg-black/15" />
        </div>
        {children}
      </div>
    </div>
  );
}

function WelcomeZoomablePreview({
  src,
  alt,
  fit,
  expandHint,
  onOpen,
  className,
}: {
  src: string;
  alt: string;
  fit: "contain" | "cover";
  expandHint: string;
  onOpen: () => void;
  className?: string;
}) {
  const lastTapRef = useRef(0);
  const imageClass =
    fit === "cover"
      ? "object-cover object-top"
      : "object-contain object-top";

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.detail === 2) onOpen();
    },
    [onOpen],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "mouse") return;
      const now = Date.now();
      if (now - lastTapRef.current < 400 && lastTapRef.current > 0) {
        onOpen();
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    },
    [onOpen],
  );

  return (
    <button
      type="button"
      className={cn(
        "mx-auto block w-full max-w-[min(100%,15.5rem)] cursor-zoom-in touch-manipulation appearance-none border-0 bg-transparent p-0 text-left [@media(max-height:700px)]:max-w-[13.5rem] sm:max-w-[17.25rem] tablet:max-w-[7.5rem]",
        className,
      )}
      aria-label={expandHint}
      title={expandHint}
      onClick={handleClick}
      onDoubleClick={(e) => {
        e.preventDefault();
        onOpen();
      }}
      onPointerUp={handlePointerUp}
    >
      <WelcomePhoneDeviceChrome className="w-full">
        <div className="relative w-full aspect-[37/72] bg-[#f6f6f4]">
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            className={imageClass}
            sizes="(max-width: 768px) 50vw, min(52vw, 640px)"
            priority
          />
        </div>
      </WelcomePhoneDeviceChrome>
    </button>
  );
}

function WelcomePreviewLightbox({
  src,
  alt,
  closeLabel,
  fit,
  onClose,
}: {
  src: string;
  alt: string;
  closeLabel: string;
  fit: "contain" | "cover";
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const imageClass =
    fit === "cover"
      ? "object-cover object-top"
      : "object-contain object-top";

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/82 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/68"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-[max(0.6rem,env(safe-area-inset-top))] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-[22px] font-light leading-none text-white shadow-lg transition active:scale-95 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/20"
        aria-label={closeLabel}
      >
        ×
      </button>

      <div
        className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 pt-[calc(3.25rem+env(safe-area-inset-top))]"
        onClick={onClose}
      >
        <div
          className="mx-auto w-full max-w-[min(72vw,17.5rem)] sm:max-w-[18.25rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <WelcomePhoneDeviceChrome>
            <div className="relative aspect-[37/72] w-full max-h-[min(64dvh,calc(100dvh-8rem))] min-h-0 bg-[#f6f6f4]">
              <Image
                src={src}
                alt={alt}
                fill
                className={imageClass}
                sizes="(max-width: 640px) 280px, 320px"
                priority
              />
            </div>
          </WelcomePhoneDeviceChrome>
        </div>
      </div>
    </div>
  );
}

export function WelcomePageClient() {
  const lang = useCardUiLanguage();
  const [zoomSlot, setZoomSlot] = useState<WelcomeFeatureSlot | null>(null);
  const zoomFit =
    FEATURES.find((f) => f.slot === zoomSlot)?.previewFit ?? "cover";
  const [heroLine1, heroLine2] = (() => {
    const parts = welcomeHeroTitle(lang).split("\n");
    return [parts[0]?.trim() ?? "", parts[1]?.trim() ?? ""] as const;
  })();

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  return (
    <MobileScreen
      withChrome={false}
      className="flex h-dvh max-h-dvh w-full !max-w-2xl flex-col gap-0 overflow-hidden bg-white !px-3 !pb-[max(0.5rem,env(safe-area-inset-bottom))] !pt-0 sm:!px-5"
    >
      <header
        className="flex shrink-0 justify-end border-b border-ink/5 bg-white/90 px-1 py-1.5 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 tablet:py-1"
        style={{
          paddingTop: "max(0.35rem, env(safe-area-inset-top))",
        }}
      >
        <CardLanguageFlagButtons afterSelect="stay" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-1 pt-1 sm:gap-2 sm:px-0 sm:pt-1.5 tablet:justify-between tablet:gap-2">
        <div className="shrink-0 space-y-1.5 text-center tablet:space-y-1">
          <PixtoLearnLockup
            variant="hero"
            layout="stacked"
            className="mx-auto w-full max-w-sm [@media(max-height:700px)]:gap-2"
          />
          <div className="mx-auto w-full max-w-[16.25rem] text-center sm:max-w-[17.5rem] tablet:max-w-[15rem]">
            <h1 className="text-[clamp(1.2rem,4.8vw,1.7rem)] font-semibold leading-[1.12] tracking-tight text-ink tablet:text-[1.15rem] [@media(max-height:700px)]:text-[clamp(1.05rem,4vw,1.35rem)]">
              <span className="block">{heroLine1}</span>
              {heroLine2 ? <span className="block">{heroLine2}</span> : null}
            </h1>
          </div>
        </div>

        <div className="grid min-h-0 w-full flex-1 grid-cols-2 gap-1.5 overflow-hidden sm:gap-2 tablet:flex-none tablet:gap-2">
          {FEATURES.map((feature) => (
            <section
              key={feature.slot}
              className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.1rem] border border-ink/[0.06] bg-white shadow-soft sm:rounded-[1.25rem] tablet:h-auto"
            >
              <div className={WELCOME_TEXT_BAND}>
                <div
                  className="mb-1 h-1 w-11 shrink-0 rounded-full opacity-95 sm:mb-1.5 sm:w-12 tablet:mb-0.5"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${feature.from}, ${feature.to})`,
                  }}
                />
                <p className="line-clamp-2 shrink-0 text-balance text-[0.78rem] font-semibold leading-tight text-ink sm:text-[0.86rem] tablet:text-[0.72rem]">
                  {welcomeFeatureTitle(feature.slot, lang)}
                </p>
                <p className="mx-auto mt-0.5 line-clamp-3 max-h-[3.6rem] min-h-0 w-full max-w-[11.75rem] text-pretty text-[0.64rem] leading-[1.35] text-ink-subtle sm:mt-1 sm:max-h-[3.85rem] sm:max-w-[12.5rem] sm:text-[0.72rem] sm:leading-[1.38] tablet:mt-0.5 tablet:max-h-[2.35rem] tablet:text-[0.62rem] tablet:leading-[1.3]">
                  {welcomeFeatureBody(feature.slot, lang)}
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col items-center justify-end overflow-hidden px-1 pb-1 pt-0 sm:px-1.5 sm:pb-1.5 tablet:flex-none tablet:justify-center tablet:py-1.5">
                <WelcomeZoomablePreview
                  src={welcomeFeaturePreviewSrc(feature.slot, lang)}
                  alt={welcomeFeaturePreviewAlt(feature.slot, lang)}
                  fit={feature.previewFit}
                  expandHint={welcomePreviewExpandHint(lang)}
                  onOpen={() => setZoomSlot(feature.slot)}
                />
              </div>
            </section>
          ))}
        </div>

        <div className="shrink-0 pt-0">
          <WelcomeFooter />
        </div>
      </div>

      {zoomSlot ? (
        <WelcomePreviewLightbox
          src={welcomeFeaturePreviewSrc(zoomSlot, lang)}
          alt={welcomeFeaturePreviewAlt(zoomSlot, lang)}
          closeLabel={welcomePreviewLightboxCloseAria(lang)}
          fit={zoomFit}
          onClose={() => setZoomSlot(null)}
        />
      ) : null}
    </MobileScreen>
  );
}
