"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { RoutineStep } from "@/lib/types/routine";
import {
  DEFAULT_ROUTINE_ACCENT_RINGS,
  stepCardAccentRings,
  stepCardVisualTone,
  type RoutineAccentRings,
} from "@/lib/utils/routine-accent";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionClass,
} from "@/lib/utils/visual-card-url";
import type { PlaybackStatus } from "@/hooks/useRoutinePlayback";
import {
  FOCUS_PIXTO_PNG_BOTTOM_STRETCH_PX,
  PIXTO_FOCUS_CARD_REF_HEIGHT_PX,
  PIXTO_FOCUS_CARD_REF_WIDTH_PX,
} from "@/lib/constants/pixto-focus-card";
import {
  GeneratedPixtoCard,
  GENERATED_PIXTO_CARD_SIZE,
} from "@/components/experimental/GeneratedPixtoCard";
import { GeneratedPixtoSlotScale } from "@/components/experimental/GeneratedPixtoSlotScale";

export type TimelineVariant = "compact" | "hero" | "next" | "focus";

type Props = {
  step: RoutineStep;
  status: PlaybackStatus;
  onSwipeComplete: () => void;
  variant?: TimelineVariant;
  /** Double-tap (touch / pen) on image only — hero + now. Single tap does nothing. */
  onDoubleTapOpenFocus?: () => void;
  /** Category back card shown during swipe-to-complete flip (Schedule hero / focus). */
  completionBackImageUrl?: string;
  /**
   * Fallback ring palette when the step `imageUrl` is not a known Pixto path
   * (e.g. remote photo). Otherwise outlines follow **this step’s** card category.
   */
  accentRings?: RoutineAccentRings;
};

const DOUBLE_TAP_MS = 300;
const TAP_PAIR_MAX_DIST = 48;
/** Movement from touch down → up beyond this cancels tap (scroll / stray drag). */
const TAP_CANCEL_SLOP = 14;

/** Zoom bleed Pixto en Schedule NOW. */
const PIXTO_SCHEDULE_NOW_BLEED_SCALE_CLASS =
  "origin-center scale-x-[1.086] scale-y-[1.082]";

/** Pixto Focus margin (PNG only); 0 = image reaches the 400×643.2 design rectangle edge. */
const FOCUS_PIXTO_PNG_INSET_PX = 0;

const easeCalm = [0.22, 1, 0.36, 1] as const;

const focusPixtoPngInsetStyle: CSSProperties = {
  top: FOCUS_PIXTO_PNG_INSET_PX,
  right: FOCUS_PIXTO_PNG_INSET_PX,
  bottom: FOCUS_PIXTO_PNG_INSET_PX,
  left: FOCUS_PIXTO_PNG_INSET_PX,
};

const STEP_OUTLINE_HEX: Record<
  ReturnType<typeof stepCardVisualTone>,
  string
> = {
  brushing: "#D4E1C2",
  shower: "#A6C1F4",
  climbing: "#E9AE2E",
  dress: "#A194BE",
  core: "#CBCBC9",
  swimming: "#B8E3F4",
  airport: "#F9DD9F",
  hotel: "#EBA29C",
  finish: "#9aa3a8",
  custom: "#1c2420",
  default: "#7d9b87",
};

export function SwipeableStepCard({
  step,
  status,
  onSwipeComplete,
  variant = "hero",
  onDoubleTapOpenFocus,
  completionBackImageUrl,
  accentRings = DEFAULT_ROUTINE_ACCENT_RINGS,
}: Props) {
  const rings = useMemo(
    () => stepCardAccentRings(step, accentRings),
    [step.id, step.imageUrl, step.generatedPixto, accentRings],
  );

  const hasGeneratedPixto = Boolean(step.generatedPixto);
  const gp = step.generatedPixto;
  const controls = useAnimation();
  const flipControls = useAnimation();
  const lastTouchTapRef = useRef<{ time: number; x: number; y: number } | null>(
    null,
  );
  const dragLockRef = useRef(false);
  const completionLockRef = useRef(false);
  const gestureRef = useRef<{
    pointerId: number;
    originX: number;
    originY: number;
    maxSlop: number;
  } | null>(null);

  const [completionAnimating, setCompletionAnimating] = useState(false);

  useEffect(() => {
    completionLockRef.current = false;
    void flipControls.set({ rotateY: 0 });
    void controls.set({ opacity: 1, x: 0, y: 0, scale: 1 });
    setCompletionAnimating(false);
  }, [step.id, controls, flipControls]);

  const handleDragStart = useCallback(() => {
    dragLockRef.current = true;
    gestureRef.current = null;
    lastTouchTapRef.current = null;
  }, []);

  const clearDragLock = useCallback(() => {
    window.setTimeout(() => {
      dragLockRef.current = false;
    }, 0);
  }, []);

  const releaseGestureCapture = useCallback(
    (el: HTMLDivElement | null, pointerId: number) => {
      if (!el) return;
      try {
        if (el.hasPointerCapture?.(pointerId)) {
          el.releasePointerCapture(pointerId);
        }
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const focusImagePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (
        !onDoubleTapOpenFocus ||
        variant !== "hero" ||
        status !== "now" ||
        completionAnimating || completionLockRef.current
      ) {
        return;
      }
      if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* Safari may throw for unsupported cases */
      }
      gestureRef.current = {
        pointerId: e.pointerId,
        originX: e.clientX,
        originY: e.clientY,
        maxSlop: 0,
      };
    },
    [onDoubleTapOpenFocus, variant, status, completionAnimating],
  );

  const focusImagePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const g = gestureRef.current;
      if (!g || e.pointerId !== g.pointerId) return;
      const slop = Math.hypot(
        e.clientX - g.originX,
        e.clientY - g.originY,
      );
      g.maxSlop = Math.max(g.maxSlop, slop);
    },
    [],
  );

  const focusImagePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (
        !onDoubleTapOpenFocus ||
        variant !== "hero" ||
        status !== "now" ||
        completionAnimating || completionLockRef.current
      ) {
        return;
      }
      if (e.pointerType === "mouse") {
        gestureRef.current = null;
        return;
      }

      if (dragLockRef.current) {
        releaseGestureCapture(e.currentTarget, e.pointerId);
        gestureRef.current = null;
        return;
      }

      if (e.pointerType === "touch" || e.pointerType === "pen") {
        const g = gestureRef.current;
        if (!g || g.pointerId !== e.pointerId) {
          return;
        }
        releaseGestureCapture(e.currentTarget, e.pointerId);
        gestureRef.current = null;
        if (g.maxSlop > TAP_CANCEL_SLOP) {
          lastTouchTapRef.current = null;
          return;
        }

        const t = Date.now();
        const x = e.clientX;
        const y = e.clientY;
        const prev = lastTouchTapRef.current;
        if (
          prev &&
          t - prev.time <= DOUBLE_TAP_MS &&
          Math.hypot(x - prev.x, y - prev.y) <= TAP_PAIR_MAX_DIST
        ) {
          lastTouchTapRef.current = null;
          onDoubleTapOpenFocus();
          return;
        }
        lastTouchTapRef.current = { time: t, x, y };
      }
    },
    [
      onDoubleTapOpenFocus,
      variant,
      status,
      completionAnimating,
      releaseGestureCapture,
    ],
  );

  const focusImagePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      releaseGestureCapture(e.currentTarget, e.pointerId);
      gestureRef.current = null;
      lastTouchTapRef.current = null;
    },
    [releaseGestureCapture],
  );

  const runSwipeCompleteFeedback = useCallback(async () => {
    completionLockRef.current = true;
    setCompletionAnimating(true);
    await controls.start({
      x: 0,
      y: 0,
      transition: { duration: 0.16, ease: easeCalm },
    });

    if (completionBackImageUrl) {
      await flipControls.start({
        rotateY: 180,
        transition: { duration: 0.42, ease: easeCalm },
      });
      await new Promise((r) =>
        setTimeout(r, variant === "focus" ? 40 : 100),
      );
    } else {
      await new Promise((r) => setTimeout(r, 50));
    }

    await controls.start({
      opacity: variant === "focus" ? 0 : 0.64,
      y: variant === "focus" ? 0 : 12,
      scale: variant === "focus" ? 1 : 0.98,
      transition: { duration: 0.26, ease: easeCalm },
    });

    onSwipeComplete();
  }, [
    controls,
    flipControls,
    completionBackImageUrl,
    onSwipeComplete,
    variant,
  ]);

  const handleDragEnd = useCallback(
    async (_: unknown, info: { offset: { x: number; y: number } }) => {
      const h = 88;
      const v = 64;
      try {
        if (info.offset.x > h || info.offset.y < -v) {
          if ((variant === "hero" || variant === "focus") && status === "now") {
            await runSwipeCompleteFeedback();
          } else {
            await controls.start({
              x: 0,
              y: 0,
              opacity: 1,
              transition: { duration: 0.2 },
            });
            onSwipeComplete();
          }
        } else {
          await controls.start({
            x: 0,
            y: 0,
            transition: { type: "spring", stiffness: 400, damping: 34 },
          });
        }
      } finally {
        window.setTimeout(() => {
          dragLockRef.current = false;
        }, 0);
      }
    },
    [controls, onSwipeComplete, variant, status, runSwipeCompleteFeedback],
  );

  const isFinished = status === "finished";
  const isNow = status === "now";
  const isNext = status === "next";
  const dragEnabled =
    isNow &&
    variant !== "compact" &&
    !completionAnimating;

  if (variant === "compact") {
    const compactPixto =
      isPixtoLearnBundledCardUrl(step.imageUrl) && !hasGeneratedPixto;
    return (
      <div
        aria-label={
          compactPixto || hasGeneratedPixto ? `Done: ${step.title}` : undefined
        }
        className={cn(
          "flex items-center gap-3 rounded-2xl bg-cream/55 px-3 py-2.5 shadow-none",
          "opacity-[0.48] saturate-[0.28]",
          rings.scheduleCompact,
        )}
      >
        <div className="relative aspect-[10/13] w-[3.25rem] shrink-0 overflow-hidden rounded-xl bg-canvas-muted">
          {gp ? (
            <Image
              src={gp.illustrationUrl}
              alt=""
              fill
              unoptimized={
                gp.illustrationUrl.startsWith("/") ||
                gp.illustrationUrl.includes("/cards/")
              }
              className="object-cover object-center brightness-[0.92] grayscale"
              sizes="52px"
            />
          ) : step.imageUrl ? (
            <Image
              src={step.imageUrl}
              alt=""
              fill
              unoptimized={isPixtoLearnBundledCardUrl(step.imageUrl)}
              className={cn(
                "object-contain brightness-[0.92] grayscale",
                compactPixto
                  ? pixtoBundledCardObjectPositionClass
                  : "object-center",
              )}
              sizes="52px"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Done
          </p>
          {!compactPixto || hasGeneratedPixto ? (
            <p className="truncate text-[14px] font-semibold lowercase text-ink/80">
              {step.title}
            </p>
          ) : null}
        </div>
        <span className="text-[13px] text-ink-faint" aria-hidden>
          ✓
        </span>
      </div>
    );
  }

  const imageInteractive =
    Boolean(onDoubleTapOpenFocus) && variant === "hero" && isNow;

  const completionFlip =
    (variant === "hero" || variant === "focus") &&
    Boolean(completionBackImageUrl) &&
    isNow;

  const stepPixtoBundled =
    isPixtoLearnBundledCardUrl(step.imageUrl) && !hasGeneratedPixto;
  const nextPixto =
    variant === "next" && (stepPixtoBundled || hasGeneratedPixto);
  const focusPixto = variant === "focus" && stepPixtoBundled;
  const focusGenerated = variant === "focus" && hasGeneratedPixto;
  const scheduleGeneratedPixto =
    hasGeneratedPixto &&
    (variant === "hero" || variant === "next" || variant === "focus");
  const backPixtoBundled = isPixtoLearnBundledCardUrl(completionBackImageUrl);
  /** Schedule NOW card −6px vs 96% width — only on faces without Pixto bleed wrapper. */
  const heroNowImageScaleClass =
    variant === "hero" && isNow
      ? "origin-center scale-[1.02]"
      : variant === "focus"
        ? "origin-center scale-[1.02]"
        : undefined;
  /** Pixto en Schedule NOW/Next y en Focus (misma receta que Now). */
  const schedulePixtoBleed =
    stepPixtoBundled &&
    (variant === "hero" || variant === "next" || variant === "focus");
  /** NOW: zoom bleed no uniforme. Focus Pixto sin bleed: solo escala uniforme (sin scale-x/y). */
  const schedulePixtoBleedScaleClass = focusPixto
    ? "origin-center"
    : (variant === "hero" && isNow)
      ? PIXTO_SCHEDULE_NOW_BLEED_SCALE_CLASS
      : variant === "next"
        ? "origin-center scale-[1.082]"
        : "origin-center scale-[1.06]";
  const focusGeneratedBorderStyle = undefined;
  const nextOutlineStyle =
    variant === "next" && !hasGeneratedPixto
      ? (() => {
          const tone = stepCardVisualTone(step);
          const stroke = STEP_OUTLINE_HEX[tone];
          return {
            boxShadow: `0 0 0 2px ${stroke}, 0 6px 22px -12px rgba(28,36,32,0.16)`,
          } satisfies CSSProperties;
        })()
      : undefined;
  const cardStyle = nextOutlineStyle ?? focusGeneratedBorderStyle;
  const focusCardAspectRatio =
    variant === "focus"
      ? focusGenerated
        ? `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`
        : focusPixto
          ? `${PIXTO_FOCUS_CARD_REF_WIDTH_PX} / ${PIXTO_FOCUS_CARD_REF_HEIGHT_PX}`
          : undefined
      : undefined;

  return (
    <motion.div
      layout={variant === "focus" ? false : !completionAnimating}
      drag={dragEnabled}
      dragConstraints={{ left: 0, right: 220, top: -200, bottom: 0 }}
      dragElastic={0.14}
      dragMomentum={false}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 480, bounceDamping: 34 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onPointerCancel={clearDragLock}
      animate={controls}
      aria-label={
        variant === "hero"
          ? step.title
          : variant === "focus"
            ? step.title
            : nextPixto
              ? `Next: ${step.title}`
              : variant === "next"
                ? step.title
                : undefined
      }
      className={cn(
        "relative touch-manipulation rounded-[1.35rem] transition-shadow duration-300 touch-pan-y",
        hasGeneratedPixto ? "overflow-visible" : "overflow-hidden shadow-card",
        /** Schedule HTML cards: ring sits flush on the white shell (no canvas “air” from ring-offset). */
        hasGeneratedPixto &&
          (variant === "hero" || variant === "next") &&
          "ring-offset-0",
        variant === "focus" && "outline-none focus:outline-none",
        ((variant === "hero" && isNow) || focusPixto || focusGenerated) &&
          cn(
            "mx-auto max-w-full",
            focusPixto
              ? rings.scheduleFocus
              : hasGeneratedPixto
                ? ""
              : focusGenerated
                ? ""
                : rings.scheduleNow,
            focusPixto || focusGenerated
              ? "h-full min-h-0 w-full"
              : /* ~10px wider than Next at cap — smaller than old 96% for more scroll room */
                "w-[max(0px,min(100%,13.625rem)-4px)]",
          ),
        variant === "next" &&
          cn(
            "mx-auto w-[max(0px,min(100%,13rem)-4px)]",
            hasGeneratedPixto ? "" : rings.scheduleNext,
          ),
        variant === "focus" &&
          !focusPixto &&
          !focusGenerated &&
          cn(
            "flex h-full min-h-0 w-full max-w-full flex-col bg-transparent",
            "overflow-hidden rounded-2xl sm:rounded-3xl",
            rings.scheduleFocus,
          ),
        variant !== "hero" &&
          variant !== "next" &&
          variant !== "focus" &&
          "ring-1 ring-ink/8",
        !isNow && !isFinished && !isNext && variant !== "focus" && "opacity-80",
      )}
      style={cardStyle}
    >
      <div
        className={cn(
          "relative w-full touch-manipulation",
          hasGeneratedPixto && "overflow-hidden rounded-[1.35rem]",
          variant === "focus"
            ? focusPixto || focusGenerated
              ? "relative mx-auto h-full min-h-0 w-full max-w-full overflow-hidden bg-transparent"
              : "relative flex h-full min-h-0 w-full flex-1 flex-col min-w-0 overflow-hidden bg-transparent"
            : cn(
                "relative w-full overflow-hidden bg-transparent",
                /* Generated: native 744×1054 slot (like before). Bundled PNG: catalog aspects. */
                variant === "hero" && isNow
                  ? hasGeneratedPixto
                    ? "aspect-[744/1054]"
                    : "aspect-[48/65]"
                  : variant === "next"
                    ? hasGeneratedPixto
                      ? "aspect-[744/1054]"
                      : "aspect-[510/676]"
                    : "aspect-[10/13]",
              ),
        )}
        onPointerDown={imageInteractive ? focusImagePointerDown : undefined}
        onPointerMove={imageInteractive ? focusImagePointerMove : undefined}
        onPointerUp={imageInteractive ? focusImagePointerUp : undefined}
        onPointerCancel={imageInteractive ? focusImagePointerCancel : undefined}
        style={
          focusCardAspectRatio
            ? {
                aspectRatio: focusCardAspectRatio,
              }
            : undefined
        }
      >
        {completionFlip ? (
          <div
            className="absolute inset-0 [perspective:900px]"
            style={{ perspectiveOrigin: "50% 50%" }}
          >
            <motion.div
              initial={false}
              animate={flipControls}
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
              }}
            >
              <div
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-[1.35rem] bg-white [backface-visibility:hidden]",
                  "[-webkit-backface-visibility:hidden]",
                )}
                style={{
                  transform: "translateZ(1px)",
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                {gp ? (
                  <div
                    className={cn(
                      "absolute inset-0 flex min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white",
                      isFinished && "brightness-[0.9] grayscale",
                    )}
                  >
                    {variant === "focus" ? (
                      <GeneratedPixtoCard
                        illustrationUrl={gp.illustrationUrl}
                        title={gp.title}
                        category={gp.category}
                        categoryColour={gp.categoryColour}
                        iconUrl={gp.iconUrl}
                        cardType={gp.cardType}
                        focusIllustrationScale={gp.focusIllustrationScale}
                        focusPresentation
                        suppressNeutralRing
                        className="h-full w-full max-w-none"
                      />
                    ) : (
                      <GeneratedPixtoSlotScale>
                        <GeneratedPixtoCard
                          illustrationUrl={gp.illustrationUrl}
                          title={gp.title}
                          category={gp.category}
                          categoryColour={gp.categoryColour}
                          iconUrl={gp.iconUrl}
                          cardType={gp.cardType}
                          focusIllustrationScale={gp.focusIllustrationScale}
                          suppressNeutralRing
                          className="h-full w-full max-w-none"
                        />
                      </GeneratedPixtoSlotScale>
                    )}
                  </div>
                ) : step.imageUrl ? (
                  stepPixtoBundled ? (
                    variant === "focus" ? (
                      <div className="absolute inset-0 overflow-hidden rounded-[1.35rem]">
                        <div
                          className={cn(
                            "absolute overflow-hidden rounded-[1.35rem]",
                            FOCUS_PIXTO_PNG_INSET_PX === 0 && "inset-0",
                            FOCUS_PIXTO_PNG_INSET_PX > 0 && "bg-cream",
                          )}
                          style={
                            FOCUS_PIXTO_PNG_INSET_PX > 0
                              ? focusPixtoPngInsetStyle
                              : undefined
                          }
                        >
                          <div className="absolute inset-0 origin-center">
                            <div
                              className="absolute inset-0 h-full w-full"
                              style={{
                                transform: `scaleY(calc(1 + ${FOCUS_PIXTO_PNG_BOTTOM_STRETCH_PX} / ${PIXTO_FOCUS_CARD_REF_HEIGHT_PX}))`,
                                transformOrigin: "top center",
                              }}
                            >
                              <Image
                                src={step.imageUrl}
                                alt={step.title}
                                fill
                                unoptimized={isPixtoLearnBundledCardUrl(step.imageUrl)}
                                className={cn(
                                  "object-cover transition-[filter] select-none object-center",
                                  isFinished && "brightness-[0.9] grayscale",
                                )}
                                sizes="(max-width: 512px) 100vw, 512px"
                                priority
                                draggable={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 overflow-hidden rounded-[1.35rem]">
                        <div
                          className={cn(
                            "absolute inset-0 origin-center",
                            schedulePixtoBleedScaleClass,
                          )}
                        >
                          <Image
                            src={step.imageUrl}
                            alt=""
                            fill
                            unoptimized={isPixtoLearnBundledCardUrl(step.imageUrl)}
                            className={cn(
                              "object-cover transition-[filter] select-none",
                              pixtoBundledCardObjectPositionClass,
                              isFinished && "brightness-[0.9] grayscale",
                            )}
                            sizes="(max-width: 512px) 100vw, 512px"
                            priority={isNow && variant === "hero"}
                            draggable={false}
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <Image
                      src={step.imageUrl}
                      alt=""
                      fill
                      unoptimized={isPixtoLearnBundledCardUrl(step.imageUrl)}
                      className={cn(
                        "object-cover transition-[filter] select-none",
                        "object-center",
                        heroNowImageScaleClass,
                        isFinished && "brightness-[0.9] grayscale",
                      )}
                      sizes="(max-width: 512px) 100vw, 512px"
                      priority={isNow && variant === "hero"}
                      draggable={false}
                    />
                  )
                ) : (
                  <div className="flex h-full min-h-[160px] items-center justify-center text-ink-faint">
                    Visual
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-[1.35rem] bg-white [backface-visibility:hidden]",
                  "[-webkit-backface-visibility:hidden]",
                )}
                style={{
                  transform: "rotateY(180deg) translateZ(1px)",
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                {completionBackImageUrl ? (
                  backPixtoBundled ? (
                    <div className="absolute inset-0 overflow-hidden rounded-[1.35rem]">
                      <div className="absolute inset-0 origin-center scale-[1.06]">
                        <Image
                          src={completionBackImageUrl}
                          alt=""
                          fill
                          unoptimized={isPixtoLearnBundledCardUrl(
                            completionBackImageUrl,
                          )}
                          className={cn(
                            "object-cover select-none",
                            pixtoBundledCardObjectPositionClass,
                          )}
                          sizes="(max-width: 512px) 100vw, 512px"
                          draggable={false}
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={completionBackImageUrl}
                      alt=""
                      fill
                      unoptimized={isPixtoLearnBundledCardUrl(
                        completionBackImageUrl,
                      )}
                      className={cn(
                        "object-cover select-none",
                        "object-center",
                        heroNowImageScaleClass,
                      )}
                      sizes="(max-width: 512px) 100vw, 512px"
                      draggable={false}
                    />
                  )
                ) : null}
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            {scheduleGeneratedPixto && gp ? (
              <div
                className={cn(
                  "absolute inset-0 flex min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white",
                  isFinished && "brightness-[0.9] grayscale",
                )}
              >
                {variant === "focus" ? (
                  <GeneratedPixtoCard
                    illustrationUrl={gp.illustrationUrl}
                    title={gp.title}
                    category={gp.category}
                    categoryColour={gp.categoryColour}
                    iconUrl={gp.iconUrl}
                    cardType={gp.cardType}
                    focusIllustrationScale={gp.focusIllustrationScale}
                    focusPresentation
                    suppressNeutralRing
                    className="h-full w-full max-w-none"
                  />
                ) : (
                  <GeneratedPixtoSlotScale>
                    <GeneratedPixtoCard
                      illustrationUrl={gp.illustrationUrl}
                      title={gp.title}
                      category={gp.category}
                      categoryColour={gp.categoryColour}
                      iconUrl={gp.iconUrl}
                      cardType={gp.cardType}
                      focusIllustrationScale={gp.focusIllustrationScale}
                      focusPresentation={focusGenerated}
                      suppressNeutralRing
                      className="h-full w-full max-w-none"
                    />
                  </GeneratedPixtoSlotScale>
                )}
              </div>
            ) : variant === "focus" && !step.imageUrl ? (
              <div className="flex min-h-[40dvh] w-full flex-1 items-center justify-center text-cream/35">
                Visual
              </div>
            ) : step.imageUrl ? (
              schedulePixtoBleed ? (
                <div className="absolute inset-0 overflow-hidden rounded-[1.35rem]">
                  <div
                    className={cn(
                      "absolute overflow-hidden rounded-[1.35rem]",
                      variant === "focus"
                        ? cn(
                            FOCUS_PIXTO_PNG_INSET_PX === 0 && "inset-0",
                            FOCUS_PIXTO_PNG_INSET_PX > 0 && "bg-cream",
                          )
                        : "inset-0",
                    )}
                    style={
                      variant === "focus" && FOCUS_PIXTO_PNG_INSET_PX > 0
                        ? focusPixtoPngInsetStyle
                        : undefined
                    }
                  >
                    <div
                      className={cn(
                        "absolute inset-0 origin-center",
                        schedulePixtoBleedScaleClass,
                      )}
                    >
                      <div
                        className="absolute inset-0 h-full w-full"
                        style={
                          variant === "focus"
                            ? {
                                transform: `scaleY(calc(1 + ${FOCUS_PIXTO_PNG_BOTTOM_STRETCH_PX} / ${PIXTO_FOCUS_CARD_REF_HEIGHT_PX}))`,
                                transformOrigin: "top center",
                              }
                            : undefined
                        }
                      >
                        <Image
                          src={step.imageUrl}
                          alt={variant === "focus" ? step.title : ""}
                          fill
                          unoptimized={isPixtoLearnBundledCardUrl(step.imageUrl)}
                          className={cn(
                            "object-cover transition-[filter] select-none",
                            variant === "next"
                              ? "object-[49%_center]"
                              : variant === "focus"
                                ? "object-center"
                                : pixtoBundledCardObjectPositionClass,
                            isFinished && "brightness-[0.9] grayscale",
                          )}
                          sizes={
                            variant === "next"
                              ? "220px"
                              : "(max-width: 512px) 100vw, 512px"
                          }
                          priority={
                            (isNow && variant === "hero") || variant === "focus"
                          }
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : variant === "focus" && !focusPixto && !focusGenerated ? (
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <Image
                    src={step.imageUrl}
                    alt={step.title}
                    fill
                    unoptimized={isPixtoLearnBundledCardUrl(step.imageUrl)}
                    className={cn(
                      "object-cover transition-[filter] select-none",
                      "object-center",
                      heroNowImageScaleClass,
                      isFinished && "brightness-[0.9] grayscale",
                    )}
                    sizes="100vw"
                    priority
                    draggable={false}
                  />
                </div>
              ) : (
                <Image
                  src={step.imageUrl}
                  alt=""
                  fill
                  unoptimized={isPixtoLearnBundledCardUrl(step.imageUrl)}
                  className={cn(
                    "object-cover transition-[filter] select-none",
                    "object-center",
                    heroNowImageScaleClass,
                    isFinished && "brightness-[0.9] grayscale",
                  )}
                  sizes={
                    variant === "next"
                      ? "220px"
                      : "(max-width: 512px) 100vw, 512px"
                  }
                  priority={isNow && variant === "hero"}
                  draggable={false}
                />
              )
            ) : (
              <div className="flex h-full min-h-[160px] items-center justify-center text-ink-faint">
                Visual
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
