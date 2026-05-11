"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/navigation/Header";
import { brushingTeethImageUrl } from "@/lib/cards/brushing-teeth-cards";
import { climbingImageUrl } from "@/lib/cards/climbing-cards";
import { coreImageUrl } from "@/lib/cards/core-cards";
import { mockRoutines } from "@/lib/mock/routines";
import { mockTemplates } from "@/lib/mock/templates";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionTopClass,
} from "@/lib/utils/visual-card-url";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { useProfile } from "@/contexts/ProfileContext";
import type { Routine } from "@/lib/types/routine";
import { cn } from "@/lib/utils/cn";
import {
  isStockPackRoutine,
  routineDashboardHomeGridTileClass,
} from "@/lib/utils/routine-accent";
import { usePrefersFineHover } from "@/lib/hooks/usePrefersFineHover";

const groups = ["self-care", "home", "activity"] as const;
type DashboardCategory = (typeof groups)[number];

const HOME_CATEGORY_HEADER_ICON: Record<DashboardCategory, string> = {
  "self-care": brushingTeethImageUrl("toothbrush"),
  home: coreImageUrl("wash-hands"),
  activity: climbingImageUrl("climbing-wall"),
};

const HOME_CATEGORY_HEADER_RING_CLASS: Record<DashboardCategory, string> = {
  "self-care": "ring-[#91C24C]/80",
  home: "ring-[#6b8f9e]/75",
  activity: "ring-[#E9AE2E]/85",
};

const HIDE_FROM_HOME_FEATURED_IDS = new Set([
  "demo-climbing-preparation",
  "tpl-morning-mini",
]);

function dashboardCategoryForRoutine(
  routine: Routine,
): DashboardCategory | null {
  const tags = routine.tags ?? [];
  if (tags.includes("self-care")) return "self-care";
  if (tags.includes("home")) return "home";
  if (tags.includes("activity")) return "activity";
  return null;
}

function categoryTitle(cat: DashboardCategory): string {
  return cat.replace("-", " ");
}

function ScheduleSectionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <rect
        x="4.25"
        y="5"
        width="15.5"
        height="14"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 9.25h5.75M8 12h8M8 14.75h4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="17" cy="8.75" r="1.3" fill="currentColor" />
    </svg>
  );
}

function RoutinesSectionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <rect
        x="4.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="13.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="4.5"
        y="13.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M14 15.5h5.5M14 18.5h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionHeader({
  title,
  icon,
  ringClass,
  iconClassName,
  action,
}: {
  title: string;
  icon: React.ReactNode;
  ringClass: string;
  iconClassName?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-1">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/95 bg-white shadow-sm ring-[2px] ring-offset-[1.5px] ring-offset-canvas-muted sm:h-11 sm:w-11",
            ringClass,
          )}
        >
          <span
            className={cn(
              "flex h-full w-full items-center justify-center text-ink/78",
              iconClassName,
            )}
          >
            {icon}
          </span>
        </span>
        <h2 className="min-w-0 text-[14px] font-semibold uppercase tracking-[0.14em] text-ink sm:text-[15px]">
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function DashboardRoutineTile({
  routine,
}: {
  routine: Routine;
}) {
  const previewUrl = routine.homePreviewImageUrl ?? routine.steps[0]?.imageUrl;

  return (
    <Link
      key={routine.id}
      href={`/player/${routine.id}`}
      className="group flex h-full min-h-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/45 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <Card
        omitInsetRing
        className={cn(
          "flex h-full min-h-[15.75rem] w-full flex-col overflow-hidden border-0 p-0 shadow-card transition-shadow duration-200",
          routineDashboardHomeGridTileClass(routine),
        )}
      >
        <div className="relative h-[11.25rem] w-full shrink-0 overflow-hidden bg-canvas-muted">
          {previewUrl ? (
            <HomeRoutinePreviewMedia
              imageUrl={previewUrl}
              frameClassName="h-full w-full"
              sizes="(max-width: 512px) 45vw, 240px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-2 text-center text-[11px] text-ink-faint">
              No preview
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-end px-2 pb-2 pt-1.5">
          <p className="line-clamp-2 text-[13px] font-semibold leading-tight text-ink">
            {routine.name}
          </p>
          <p className="mt-0.5 text-[10px] text-ink-subtle">
            {routine.steps.length} steps
          </p>
        </div>
      </Card>
    </Link>
  );
}

/**
 * PixtoLearn assets carry a title strip in the PNG. We crop the bottom by letting
 * the image extend past the frame (`overflow-hidden`) — never `clip-path`, which
 * leaves transparency and shows the wrong background as a gray band.
 */
function HomeRoutinePreviewMedia({
  imageUrl,
  frameClassName,
  sizes,
  priority,
}: {
  imageUrl: string | undefined;
  frameClassName: string;
  sizes: string;
  /** First tile only — faster LCP on Home */
  priority?: boolean;
}) {
  if (!imageUrl) return null;
  const pixto = isPixtoLearnBundledCardUrl(imageUrl);
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        pixto ? "bg-white" : "bg-canvas-muted",
        frameClassName,
      )}
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        decoding="async"
        className={cn(
          "object-cover",
          pixto
            ? cn(
                pixtoBundledCardObjectPositionTopClass,
                "!h-[132%] !max-h-none w-full",
              )
            : "object-center",
        )}
        style={pixto ? { top: 0, bottom: "auto" } : undefined}
      />
    </div>
  );
}

function profileSubtitle(profile: {
  sex?: string;
  heightCm?: number;
} | null): string {
  if (!profile)
    return "Photo, name, and details · stored on this device only";
  const parts: string[] = [];
  if (profile.sex === "male") parts.push("Boy");
  else if (profile.sex === "female") parts.push("Girl");
  if (profile.heightCm != null) parts.push(`${profile.heightCm} cm`);
  if (parts.length === 0)
    return "Photo and name · stored on this device only";
  return `${parts.join(" · ")} · local`;
}

export default function DashboardPage() {
  const { profile } = useProfile();
  const { routines: customRoutines, hydrated: customHydrated } =
    useCustomRoutines();
  const prefersFineHover = usePrefersFineHover();
  const primary = mockRoutines[0];
  /** Same set as Schedule Player index — includes locally saved custom routines first. */
  const dashboardRoutines = useMemo(() => {
    const base = [...mockRoutines, ...mockTemplates];
    return customHydrated ? [...customRoutines, ...base] : base;
  }, [customRoutines, customHydrated]);
  const featuredRoutines = useMemo(
    () =>
      dashboardRoutines.filter(
        (r) =>
          !isStockPackRoutine(r) && !HIDE_FROM_HOME_FEATURED_IDS.has(r.id),
      ),
    [dashboardRoutines],
  );
  const groupedPackRoutines = useMemo(() => {
    const out = new Map<(typeof groups)[number], Routine[]>();
    for (const g of groups) out.set(g, []);
    for (const r of dashboardRoutines) {
      if (!isStockPackRoutine(r)) continue;
      const category = dashboardCategoryForRoutine(r);
      if (!category) continue;
      out.get(category)?.push(r);
    }
    return out;
  }, [dashboardRoutines]);
  const [openCategoryKeys, setOpenCategoryKeys] = useState<Set<string>>(
    () => new Set(),
  );
  const [hoverPeekKey, setHoverPeekKey] = useState<string | null>(null);
  const frameScale = profile?.avatarFrameScale ?? 1;

  const isAccordionOpen = useCallback(
    (key: string) =>
      openCategoryKeys.has(key) || (prefersFineHover && hoverPeekKey === key),
    [openCategoryKeys, prefersFineHover, hoverPeekKey],
  );

  const openAccordion = useCallback((key: string) => {
    setOpenCategoryKeys((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const toggleAccordionCorner = useCallback((key: string) => {
    setHoverPeekKey(null);
    setOpenCategoryKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <div>
      <Header title="Home" />
      <div className="space-y-8 px-4 pb-8 pt-4">
        <Link href="/onboarding/profile">
          <Card className="flex items-center gap-4 border border-ink/5 bg-white/95 p-4 transition hover:shadow-soft">
            <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-2xl bg-canvas-muted ring-1 ring-ink/8">
              {profile?.avatarUrl ? (
                <div
                  className="relative h-full w-full"
                  style={{
                    transform: `scale(${frameScale})`,
                    transformOrigin: "center center",
                  }}
                >
                  <Image
                    src={profile.avatarUrl}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-[11px] font-medium text-ink-faint">
                  Add
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[18px] font-semibold text-ink">
                {profile?.displayName ?? "Your profile"}
              </p>
              <p className="text-[13px] text-ink-subtle">
                {profileSubtitle(profile)}
              </p>
            </div>
            <span className="text-ink-faint" aria-hidden>
              →
            </span>
          </Card>
        </Link>

        <section className="space-y-3">
          <SectionHeader
            title="Schedule Player"
            icon={<ScheduleSectionIcon />}
            ringClass="ring-sage/65"
            iconClassName="text-sage"
            action={
              <Link
                href="/player"
                className="text-[13px] font-medium text-sage underline-offset-4 hover:underline"
              >
                All routines
              </Link>
            }
          />
          <Link href={`/player/${primary.id}`}>
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-sage-mist via-cream to-cream p-0 shadow-soft ring-1 ring-sage/20 transition hover:shadow-[0_12px_40px_-16px_rgba(28,36,32,0.18)]">
              <div className="flex gap-4 p-4">
                <HomeRoutinePreviewMedia
                  imageUrl={
                    primary.homePreviewImageUrl ?? primary.steps[0]?.imageUrl
                  }
                  frameClassName="aspect-[10/13] w-[4.25rem] shrink-0 rounded-2xl bg-white shadow-card"
                  sizes="96px"
                  priority
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                    Continue
                  </p>
                  <p className="truncate text-[19px] font-semibold leading-tight text-ink">
                    {primary.name}
                  </p>
                  <p className="text-[13px] text-ink-subtle">
                    {primary.steps.length} steps · tap for Focus anytime
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </section>

        <section className="space-y-3">
          <SectionHeader
            title="Routines"
            icon={<RoutinesSectionIcon />}
            ringClass="ring-[#6b8f9e]/75"
            iconClassName="text-[#5f8392]"
          />
          {featuredRoutines.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 [grid-auto-rows:1fr]">
              {featuredRoutines.map((r) => (
                <DashboardRoutineTile key={r.id} routine={r} />
              ))}
            </div>
          ) : null}

          <div className="space-y-2">
            {groups.map((cat) => {
              const routines = groupedPackRoutines.get(cat) ?? [];
              if (routines.length === 0) return null;
              const accordionKey = `home::${cat}`;
              const open = isAccordionOpen(accordionKey);
              const iconSrc = HOME_CATEGORY_HEADER_ICON[cat];
              const ringClass = HOME_CATEGORY_HEADER_RING_CLASS[cat];

              return (
                <div
                  key={accordionKey}
                  className="overflow-hidden rounded-2xl border border-ink/8 bg-cream/40"
                  onMouseEnter={() => {
                    if (prefersFineHover) setHoverPeekKey(accordionKey);
                  }}
                  onMouseLeave={() => {
                    if (prefersFineHover) setHoverPeekKey(null);
                  }}
                >
                  <div className="flex h-[56px] w-full min-w-0 items-stretch border-b border-ink/6 bg-canvas-muted sm:h-[58px]">
                    <button
                      type="button"
                      onClick={() => openAccordion(accordionKey)}
                      className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left transition hover:bg-canvas-muted/90 sm:px-4"
                    >
                      <span
                        className={cn(
                          "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/95 bg-white shadow-sm ring-[2px] ring-offset-[1.5px] ring-offset-canvas-muted sm:h-11 sm:w-11",
                          ringClass,
                        )}
                      >
                        <Image
                          src={iconSrc}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover object-top scale-[1.22]"
                          style={{ top: "-4%", bottom: "auto" }}
                        />
                      </span>
                      <span className="min-w-0 flex-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-ink sm:text-[15px]">
                        {categoryTitle(cat)}
                      </span>
                      <span className="shrink-0 whitespace-nowrap text-[11px] font-extralight tabular-nums tracking-wide text-ink-faint sm:text-[12px]">
                        {routines.length}{" "}
                        {routines.length === 1 ? "routine" : "routines"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAccordionCorner(accordionKey)}
                      className="flex w-12 shrink-0 items-center justify-center border-l border-ink/8 text-[14px] text-ink-subtle transition hover:bg-ink/[0.04] active:bg-ink/[0.06] sm:w-14 sm:text-[15px]"
                      aria-label={open ? "Close" : "Open"}
                    >
                      <span aria-hidden>{open ? "▾" : "▸"}</span>
                    </button>
                  </div>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="grid grid-cols-2 gap-3 px-2 pb-3 pt-2 [grid-auto-rows:1fr] sm:px-3 sm:pb-4 sm:pt-3">
                        {routines.map((routine) => (
                          <DashboardRoutineTile
                            key={routine.id}
                            routine={routine}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link href="/first-then">
            <Card className="flex h-full min-h-[108px] flex-col justify-center border border-ink/5 p-4 transition hover:shadow-soft">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                First & Then
              </p>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-ink">
                Two steps only
              </p>
            </Card>
          </Link>
          <Link href="/builder">
            <Card className="flex h-full min-h-[108px] flex-col justify-center border border-ink/5 p-4 transition hover:shadow-soft">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Builder
              </p>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-ink">
                Edit titles
              </p>
            </Card>
          </Link>
          <Link href="/library">
            <Card className="flex h-full min-h-[108px] flex-col justify-center border border-ink/5 p-4 transition hover:shadow-soft">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Library
              </p>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-ink">
                Visual cards
              </p>
            </Card>
          </Link>
          <Link href="/templates">
            <Card className="flex h-full min-h-[108px] flex-col justify-center border border-ink/5 p-4 transition hover:shadow-soft">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Templates
              </p>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-ink">
                Quick starts
              </p>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  );
}
