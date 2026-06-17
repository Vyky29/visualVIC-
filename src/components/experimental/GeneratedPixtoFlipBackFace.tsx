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
 * Flip back face — fills the same shell as the front; category colour behind
 * the PNG so 3D flip never shows white gaps against Focus black.
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
        "relative overflow-hidden",
        GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
      )}
      style={{
        width: size.w,
        height: size.h,
        backgroundColor: categoryColour ?? "#ffffff",
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
        className="object-cover object-center select-none"
        sizes={`${size.w}px`}
        draggable={false}
      />
    </article>
  );
}
