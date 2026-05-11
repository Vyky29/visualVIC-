import Image from "next/image";
import Link from "next/link";
import { GeneratedPixtoCard } from "@/components/experimental/GeneratedPixtoCard";
import { PixtoLearnLockup } from "@/components/brand/PixtoLearnLockup";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { Button } from "@/components/ui/Button";
import { brushingTeethImageUrl } from "@/lib/cards/brushing-teeth-cards";
import { climbingImageUrl } from "@/lib/cards/climbing-cards";
import { coreImageUrl } from "@/lib/cards/core-cards";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import { swimmingImageUrl } from "@/lib/cards/swimming-cards";
import {
  BRAND_ICON_AMBER,
  BRAND_ICON_PINK,
  BRAND_ICON_TEAL,
} from "@/lib/constants/brand";
import { AIRPORT_GENERATED_CARD_PROPS } from "@/lib/experimental/generated-pixto-demo-routine";

const features = [
  {
    title: "Schedule Player",
    body: "Finished steps fade back; Now stays obvious.",
    from: BRAND_ICON_PINK,
    to: "#E873B0",
    preview: "schedule" as const,
  },
  {
    title: "Focus Mode",
    body: "One fullscreen card when noise needs to drop away.",
    from: BRAND_ICON_AMBER,
    to: "#F5C84D",
    preview: "focus" as const,
  },
  {
    title: "Library View",
    body: "Browse packs, objects and steps in one view.",
    from: BRAND_ICON_TEAL,
    to: "#6FD0C8",
    preview: "library" as const,
  },
] as const;

const focusPreviewCard =
  AIRPORT_GENERATED_CARD_PROPS.find((card) => card.title === "take your seat") ??
  AIRPORT_GENERATED_CARD_PROPS[0];

const schedulePreviewItems = [
  {
    title: "Shower",
    steps: "24 steps",
    imageUrl: showerImageUrl("shower"),
    ringClass: "ring-[#8CB7FF]/85",
  },
  {
    title: "Climbing",
    steps: "22 steps",
    imageUrl: climbingImageUrl("climbing-wall"),
    ringClass: "ring-[#E4B130]/92",
  },
  {
    title: "Swimming",
    steps: "18 steps",
    imageUrl: swimmingImageUrl("goggles-on"),
    ringClass: "ring-[#8CB7FF]/85",
  },
] as const;

const libraryPreviewSections = [
  {
    title: "Brushing",
    meta: "12 steps",
    imageUrl: brushingTeethImageUrl("toothbrush"),
  },
  {
    title: "Core",
    meta: "18 steps",
    imageUrl: coreImageUrl("wash-hands"),
  },
  {
    title: "Swimming",
    meta: "18 steps",
    imageUrl: swimmingImageUrl("goggles-on"),
  },
] as const;

const libraryPreviewTiles = [
  { title: "Toothbrush", imageUrl: brushingTeethImageUrl("toothbrush") },
  { title: "Toothpaste", imageUrl: brushingTeethImageUrl("toothpaste") },
  { title: "Wash hands", imageUrl: coreImageUrl("wash-hands") },
  { title: "Walk", imageUrl: coreImageUrl("walk") },
] as const;

function PhoneFrame({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`mt-1.5 overflow-hidden rounded-[1rem] border shadow-[0_14px_26px_-18px_rgba(27,38,32,0.32)] ${
        dark ? "border-white/10 bg-[#060807]" : "border-ink/[0.08] bg-[#F6F4EE]"
      }`}
    >
      <div className="aspect-[9/18.8] h-full w-full">{children}</div>
    </div>
  );
}

function SchedulePreview() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-[#F6F4EE]">
        <div className="flex items-center gap-1 border-b border-ink/[0.06] bg-white/72 px-1.5 py-1.5">
          <span className="text-[7px] text-ink-subtle">←</span>
          <span className="truncate text-[7px] font-semibold text-ink">
            Schedule
          </span>
        </div>
        <div className="flex-1 space-y-1 px-1 py-1.5">
          {schedulePreviewItems.map((item) => (
            <div
              key={item.title}
              className={`rounded-[0.72rem] bg-white/90 p-1 shadow-[0_8px_18px_-16px_rgba(27,38,32,0.35)] ring-1 ${item.ringClass}`}
            >
              <div className="flex items-center gap-1">
                <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-[0.55rem] bg-canvas-muted">
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover object-center"
                    sizes="24px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[6.5px] font-semibold leading-tight text-ink">
                    {item.title}
                  </p>
                  <p className="text-[5.5px] leading-tight text-ink-subtle">
                    {item.steps}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 border-t border-ink/[0.06] bg-white/82 px-1 py-1 text-center text-[5px] text-ink-faint">
          <span>Home</span>
          <span>Library</span>
          <span>Saved</span>
          <span>Menu</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function FocusPreview() {
  if (!focusPreviewCard) return null;

  return (
    <PhoneFrame dark>
      <div className="flex h-full flex-col bg-[#060807] px-1 py-1.5">
        <div className="mx-auto rounded-full bg-white/12 px-1.5 py-0.5 text-[5.5px] font-semibold tracking-tight text-white/90 ring-1 ring-white/12">
          11 / 19
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center py-1.5">
          <div className="w-[84%] max-w-[6.2rem]">
            <GeneratedPixtoCard
              illustrationUrl={focusPreviewCard.illustrationUrl}
              title={focusPreviewCard.title}
              category={focusPreviewCard.category}
              categoryColour={focusPreviewCard.categoryColour}
              iconUrl={focusPreviewCard.iconUrl}
              focusPresentation
              suppressNeutralRing
              className="h-full w-full max-w-none"
            />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function LibraryPreview() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-[#F6F4EE]">
        <div className="flex items-center justify-between border-b border-ink/[0.06] bg-white/72 px-1.5 py-1.5">
          <span className="truncate text-[7px] font-semibold text-ink">
            Library
          </span>
          <span className="rounded-full bg-white px-1 py-0.5 text-[5px] font-medium text-ink-subtle ring-1 ring-ink/[0.08]">
            New
          </span>
        </div>
        <div className="flex-1 space-y-1 px-1 py-1.5">
          {libraryPreviewSections.map((section, index) => (
            <div
              key={section.title}
              className="overflow-hidden rounded-[0.72rem] border border-ink/[0.06] bg-white/90"
            >
              <div className="flex items-center gap-1.5 px-1 py-1">
                <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-[0.55rem] bg-white ring-1 ring-ink/[0.08]">
                  <Image
                    src={section.imageUrl}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover object-center"
                    sizes="20px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[6px] font-semibold leading-tight text-ink">
                    {section.title}
                  </p>
                  <p className="text-[5px] leading-tight text-ink-faint">
                    {section.meta}
                  </p>
                </div>
                <span className="text-[6px] text-ink-faint">
                  {index === 0 ? "▾" : "▸"}
                </span>
              </div>
              {index === 0 ? (
                <div className="border-t border-ink/[0.05] bg-[#FBFAF6] p-1">
                  <div className="mb-1 text-[4.8px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Objects + steps
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {libraryPreviewTiles.map((tile) => (
                      <div
                        key={tile.title}
                        className="overflow-hidden rounded-[0.55rem] bg-white ring-1 ring-ink/[0.06]"
                      >
                        <div className="relative aspect-square w-full bg-canvas-muted">
                          <Image
                            src={tile.imageUrl}
                            alt=""
                            fill
                            unoptimized
                            className="object-cover object-center"
                            sizes="40px"
                          />
                        </div>
                        <div className="px-1 py-0.5 text-[5px] font-medium leading-tight text-ink">
                          {tile.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 border-t border-ink/[0.06] bg-white/82 px-1 py-1 text-center text-[5px] text-ink-faint">
          <span>Home</span>
          <span>Library</span>
          <span>Saved</span>
          <span>Menu</span>
        </div>
      </div>
    </PhoneFrame>
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

      <div className="grid min-h-0 grid-cols-3 gap-1.5 overflow-hidden py-0.5">
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
              <div className="mt-1.5 min-h-0 flex-1">
                {feature.preview === "schedule" ? (
                  <SchedulePreview />
                ) : feature.preview === "focus" ? (
                  <FocusPreview />
                ) : (
                  <LibraryPreview />
                )}
              </div>
            </div>
          </section>
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
