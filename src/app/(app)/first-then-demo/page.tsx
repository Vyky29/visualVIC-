import Image from "next/image";
import { Header } from "@/components/navigation/Header";
import {
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_WOW_COMPANY_MARK,
  GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
} from "@/components/experimental/GeneratedPixtoCard";
import { GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR } from "@/lib/experimental/generated-pixto-demo-routine";
import { atTheHotelPackMarkUrl } from "@/lib/cards/at-the-hotel-cards";
import { cn } from "@/lib/utils/cn";

const HOTEL_RIBBON_TEXT = "at the hotel";
const HOTEL_LIGHT_BLOCK_COLOUR = "#E8C9CE";
const HOTEL_LOGO_URL = atTheHotelPackMarkUrl();
const TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;
const IPHONE_16_PRO_LANDSCAPE = { w: 874, h: 402 } as const;

const DIGITAL_WOW_GEOMETRY = {
  titleH: GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  illustrationH: GENERATED_PIXTO_ILLUSTRATION_FRAME.h,
  topLayoutH: GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  topGapH: GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
} as const;

const LOCKED_TEXT_STYLE = {
  textSizeClassName: "text-[23px]",
  lineHeightClassName: "leading-[0.94]",
  trackingClassName: "tracking-[-0.02em]",
  lineGapClassName: "gap-[0.18em]",
  wordSpacing: "0",
} as const;

function IconBadge({
  number,
  label,
  tone,
}: {
  number: "1" | "2";
  label: string;
  tone: "sage" | "accent";
}) {
  const circleClass =
    tone === "sage"
      ? "bg-sage text-white ring-sage/15"
      : "bg-accent text-white ring-accent/15";

  return (
    <div className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center gap-3 rounded-[1.3rem] bg-white px-2 py-3 ring-1 ring-ink/8">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-bold ring-1",
          circleClass,
        )}
      >
        {number}
      </div>
      <div className="text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink">
          {label}
        </p>
      </div>
    </div>
  );
}

function HotelLogo({ size }: { size: number }) {
  return (
    <div
      className="absolute right-[5.4%] top-[3.8%] rounded-[0.9rem] bg-white"
      style={{
        width: `${(size / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
        aspectRatio: "1 / 1",
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src={HOTEL_LOGO_URL}
          alt=""
          fill
          className="object-contain"
          sizes={`${size}px`}
          unoptimized
        />
      </div>
    </div>
  );
}

function WowPreviewCard({
  lines,
  widthPx,
}: {
  lines: [string] | [string, string];
  widthPx: number;
}) {
  return (
    <article
      className="relative grid overflow-hidden rounded-[1.35rem] bg-white"
      style={{
        width: `min(100%, ${widthPx}px)`,
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${DIGITAL_WOW_GEOMETRY.topLayoutH}fr ${DIGITAL_WOW_GEOMETRY.titleH}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
        border: `3px solid ${GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR}`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.45)`,
      }}
    >
      <div className="relative bg-white">
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[1rem]"
          style={{
            top: `${(DIGITAL_WOW_GEOMETRY.topGapH / DIGITAL_WOW_GEOMETRY.topLayoutH) * 100}%`,
            width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${DIGITAL_WOW_GEOMETRY.illustrationH}`,
            backgroundColor: HOTEL_LIGHT_BLOCK_COLOUR,
          }}
        />
        <HotelLogo size={GENERATED_PIXTO_WOW_COMPANY_MARK.w} />
      </div>

      <div className="border-y border-white bg-white px-3 py-1">
        <div className="flex h-full min-h-0 w-full items-center justify-center">
          <div
            className={cn(
              "flex shrink-0 flex-col items-center justify-center text-center font-semibold lowercase text-ink",
              lines.length > 1 ? LOCKED_TEXT_STYLE.lineGapClassName : "gap-0",
              LOCKED_TEXT_STYLE.textSizeClassName,
              LOCKED_TEXT_STYLE.lineHeightClassName,
              LOCKED_TEXT_STYLE.trackingClassName,
            )}
            style={{
              width: `min(100%, ${TEXT_BOX_SIZE.w}px)`,
              height: `min(100%, ${TEXT_BOX_SIZE.h}px)`,
              wordSpacing: LOCKED_TEXT_STYLE.wordSpacing,
            }}
          >
            {lines.map((line, index) => (
              <span key={`${line}-${index}`} className="block w-full whitespace-nowrap">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center px-3"
        style={{ backgroundColor: GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR }}
      >
        <span className="text-center text-[23px] font-semibold lowercase leading-[0.88] tracking-tight text-white/95">
          {HOTEL_RIBBON_TEXT}
        </span>
      </div>
    </article>
  );
}

function FirstThenFlow({ phoneFrame = false }: { phoneFrame?: boolean }) {
  const cardWidth = phoneFrame ? 154 : 184;
  const shell = (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-3">
        <IconBadge number="1" label="First" tone="sage" />
        <WowPreviewCard lines={["breakfast time"]} widthPx={cardWidth} />
      </div>
      <div className="h-24 w-px bg-ink/10" />
      <div className="flex items-center gap-3">
        <IconBadge number="2" label="Then" tone="accent" />
        <WowPreviewCard lines={["receive your", "room key"]} widthPx={cardWidth} />
      </div>
    </div>
  );

  if (!phoneFrame) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-ink/[0.08] bg-canvas p-5 shadow-soft">
        {shell}
      </div>
    );
  }

  return (
    <div
      className="mx-auto overflow-hidden rounded-[2rem] border border-ink/[0.08] bg-canvas shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      style={{
        width: `min(100%, ${IPHONE_16_PRO_LANDSCAPE.w}px)`,
        aspectRatio: `${IPHONE_16_PRO_LANDSCAPE.w} / ${IPHONE_16_PRO_LANDSCAPE.h}`,
      }}
    >
      <div className="flex h-full flex-col px-4 py-3">
        <div className="rounded-full bg-ink/6 px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          iphone 16 pro landscape
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center py-3">
          {shell}
        </div>
      </div>
    </div>
  );
}

export default function FirstThenDemoPage() {
  return (
    <div className="pb-10">
      <Header title="First & Then demo" backHref="/menu" />

      <div className="space-y-3 px-4 pt-3">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          Horizontal First &amp; Then study using the locked digital wow card
          measurements.
        </p>
      </div>

      <section className="mx-auto mt-8 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          First &amp; Then
        </h2>

        <div className="grid gap-4">
          <div className="rounded-[1.5rem] border border-ink/[0.08] bg-white p-4 shadow-soft">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Layout preview
            </h3>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-subtle">
              Small icon/name column on the left, wow card on the right, repeated for
              First and Then.
            </p>
            <div className="mt-4">
              <FirstThenFlow />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-ink/[0.08] bg-white p-4 shadow-soft">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              iPhone 16 Pro
            </h3>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-subtle">
              Same flow framed to the iPhone 16 Pro in landscape.
            </p>
            <div className="mt-4">
              <FirstThenFlow phoneFrame />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
