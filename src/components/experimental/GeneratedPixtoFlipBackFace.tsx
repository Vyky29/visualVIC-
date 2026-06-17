"use client";

import Image from "next/image";
import {
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_FOCUS_CARD_SIZE,
} from "@/components/experimental/GeneratedPixtoCard";
import {
  GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
  GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
  generatedPixtoCategoryOutlineStyle,
} from "@/lib/constants/generated-pixto-card-sizes";
import { cn } from "@/lib/utils/cn";
import { isPixtoLearnBundledCardUrl } from "@/lib/utils/visual-card-url";

type Props = {
  backImageUrl: string;
  variant: "focus" | "schedule";
  categoryColour?: string;
};

/**
 * Flip back face — same design frame as the front GeneratedPixto card shell
 * (Focus 384×560 or schedule 744×1054), with rounded corners and object-contain.
 */
export function GeneratedPixtoFlipBackFace({
  backImageUrl,
  variant,
  categoryColour,
}: Props) {
  const size =
    variant === "focus"
      ? GENERATED_PIXTO_FOCUS_CARD_SIZE
      : GENERATED_PIXTO_CARD_SIZE;

  return (
    <article
      className={cn(
        "relative overflow-hidden bg-white",
        GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
      )}
      style={{
        width: size.w,
        height: size.h,
        ...GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
        ...(categoryColour
          ? generatedPixtoCategoryOutlineStyle(categoryColour, {
              cardShadow: false,
            })
          : {}),
      }}
    >
      <Image
        src={backImageUrl}
        alt=""
        fill
        unoptimized={isPixtoLearnBundledCardUrl(backImageUrl)}
        className="object-contain object-center select-none"
        sizes={`${size.w}px`}
        draggable={false}
      />
    </article>
  );
}
