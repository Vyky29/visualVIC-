"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
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
  routineDashboardScheduleContinueCardClass,
} from "@/lib/utils/routine-accent";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import {
  accordionOpenCloseAria,
  bottomNavLabel,
  dashboardAllRoutinesLink,
  dashboardContinueLabel,
  dashboardExtrasSectionTitle,
  dashboardFeaturedStepsHint,
  dashboardFirstThenCardEyebrow,
  dashboardFirstThenCardTitle,
  dashboardFirstThenMuchieHomeHint,
  dashboardFirstThenMuchieHomeTitle,
  dashboardNoPreview,
  dashboardPackCategoryTitle,
  dashboardQuickBuilderEyebrow,
  dashboardQuickBuilderTitle,
  dashboardQuickLibraryTitle,
  dashboardQuickTemplatesTitle,
  dashboardRoutineCountLabel,
  dashboardRoutinesSectionTitle,
  dashboardSchedulePlayerTitle,
  dashboardStepsWord,
  profileAddAvatarHint,
  profileDisplayNamePlaceholder,
} from "@/lib/i18n/app-shell-locale";
import { dayCentrePackMarkUrl } from "@/lib/cards/day-centre-shared";
import { firstThenDemoPackPreviewUrl } from "@/lib/experimental/first-then-demo-packs";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { usePrefersFineHover } from "@/lib/hooks/usePrefersFineHover";

const groups = ["self-care", "home", "activity"] as const;
type DashboardCategory = (typeof groups)[number];

const HOME_CATEGORY_HEADER_RING_CLASS: Record<DashboardCategory, string> = {
  "self-care": "ring-[#91C24C]/80",
  home: "ring-[#6b8f9e]/75",
  activity: "ring-[#E9AE2E]/85",
};

const HIDE_FROM_HOME_FEATURED_IDS = new Set([
  "demo-climbing-preparation",
  "tpl-morning-mini",
]);

/** Day centre packs — grouped under Home “Day centre” accordion (not Home / Activity). */
const HOME_EXTRA_PACK_ROUTINE_IDS = new Set([
  "at-the-day-centre",
  "physical",
  "ikram-day-centre",
]);

const HOME_EXTRAS_ACCORDION_KEY = "home::extras";
const HOME_EXTRAS_RING_CLASS = "ring-[#E05C9A]/80";

function dashboardCategoryForRoutine(
  routine: Routine,
): DashboardCategory | null {
  if (HOME_EXTRA_PACK_ROUTINE_IDS.has(routine.id)) return null;
  const tags = routine.tags ?? [];
  if (tags.includes("self-care")) return "self-care";
  if (tags.includes("home")) return "home";
  if (tags.includes("activity")) return "activity";
  return null;
}

function ScheduleSectionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
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

function SelfCareSectionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M12 6.25c.86-1.46 2.08-2.25 3.7-2.25 2.22 0 3.8 1.63 3.8 3.93 0 4.4-4.54 7.27-7.5 9.82-2.96-2.55-7.5-5.42-7.5-9.82C4.5 5.63 6.08 4 8.3 4c1.62 0 2.84.79 3.7 2.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 10.35h5.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeSectionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M5.25 10.4 12 5l6.75 5.4v7.1a1.5 1.5 0 0 1-1.5 1.5h-2.9v-4.65a1.2 1.2 0 0 0-1.2-1.2h-2.3a1.2 1.2 0 0 0-1.2 1.2V19H6.75a1.5 1.5 0 0 1-1.5-1.5v-7.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuilderQuickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M5.5 18.5h13M8.25 15.75 16.5 7.5l2 2L10.25 17.75l-3.5.75.75-3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActivitySectionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <circle cx="14.9" cy="5.4" r="1.9" fill="currentColor" />
      <path
        d="m10.2 19.25 2.1-5 2.3 1.75 1.55 3.25M11.1 8.55l2.8 1.4 2.95-.9M8.1 13.15l2.55-2.75 1.15-2.35M8.35 19.1l2.55-3.15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HOME_CATEGORY_HEADER_ICON: Record<
  DashboardCategory,
  { icon: React.ReactNode; iconClassName: string }
> = {
  "self-care": {
    icon: <SelfCareSectionIcon />,
    iconClassName: "text-[#7fb23c]",
  },
  home: {
    icon: <HomeSectionIcon />,
    iconClassName: "text-[#5f8392]",
  },
  activity: {
    icon: <ActivitySectionIcon />,
    iconClassName: "text-[#cf9a1b]",
  },
};

function DashboardCenteredIntro({
  icon,
  ringClass,
  iconClassName,
  category,
  title,
}: {
  icon: React.ReactNode;
  ringClass: string;
  iconClassName?: string;
  category: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center px-2 pb-1 pt-1 text-center">
      <span
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/95 bg-white shadow-sm ring-[2px] ring-offset-[1.5px] ring-offset-canvas sm:h-11 sm:w-11",
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
      <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        {category}
      </p>
      <p className="mt-1.5 text-[18px] font-semibold leading-tight text-ink sm:text-[19px]">
        {title}
      </p>
    </div>
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
      <div className="flex min-w-0 flex-1 items-center gap-3">
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
        <h2 className="min-w-0 flex-1 break-words text-balance text-[14px] font-semibold uppercase leading-snug tracking-[0.12em] text-ink line-clamp-2 [overflow-wrap:anywhere] sm:text-[15px] sm:tracking-[0.14em]">
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function DashboardRoutineTile({ routine }: { routine: Routine }) {
  const previewUrl = routine.homePreviewImageUrl ?? routine.steps[0]?.imageUrl;
  const cardUiLang = useCardUiLanguage();

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
              {dashboardNoPreview(cardUiLang)}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-end px-2 pb-2 pt-1.5">
          <p className="line-clamp-2 text-[13px] font-semibold leading-tight text-ink">
            {stockRoutineDisplayName(routine.id, routine.name, cardUiLang)}
          </p>
          <p className="mt-0.5 text-[10px] text-ink-subtle">
            {routine.steps.length} {dashboardStepsWord(cardUiLang)}
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
  const extraPackRoutines = useMemo(
    () =>
      dashboardRoutines.filter(
        (r) => isStockPackRoutine(r) && HOME_EXTRA_PACK_ROUTINE_IDS.has(r.id),
      ),
    [dashboardRoutines],
  );
  const [openCategoryKeys, setOpenCategoryKeys] = useState<Set<string>>(
    () => new Set(),
  );
  const [hoverPeekKey, setHoverPeekKey] = useState<string | null>(null);
  const frameScale = profile?.avatarFrameScale ?? 1;
  const cardUiLang = useCardUiLanguage();

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
      <TranslatedHeader titleKey="home" />
      <div className="space-y-8 px-4 pb-8 pt-4">
        <div className="flex justify-center px-2">
          <Link
            href="/onboarding/profile"
            className="flex w-fit max-w-[min(18rem,calc(100vw-2rem))] flex-col items-center gap-2 rounded-2xl py-1 text-center outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-sage/45 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <div className="relative h-[4.75rem] w-[4.75rem] shrink-0 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft ring-1 ring-ink/[0.04]">
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
                <div className="flex h-full items-center justify-center px-1 text-[11px] font-medium leading-snug text-ink-faint">
                  {profileAddAvatarHint(cardUiLang)}
                </div>
              )}
            </div>
            <p className="w-full min-w-0 max-w-[16rem] truncate px-1 text-center text-[17px] font-semibold leading-snug text-ink">
              {profile?.displayName ?? profileDisplayNamePlaceholder(cardUiLang)}
            </p>
          </Link>
        </div>

        <section className="space-y-4">
          <SectionHeader
            title={dashboardSchedulePlayerTitle(cardUiLang)}
            icon={<ScheduleSectionIcon />}
            ringClass="ring-sage/65"
            iconClassName="text-sage"
            action={
              <Link
                href="/player"
                className="text-[13px] font-medium text-sage underline-offset-4 hover:underline"
              >
                {dashboardAllRoutinesLink(cardUiLang)}
              </Link>
            }
          />
          <Link href={`/player/${primary.id}`} className="group block">
            <Card
              omitInsetRing
              className={cn(
                "overflow-hidden border-0 bg-white p-0 shadow-card transition-shadow duration-200",
                routineDashboardScheduleContinueCardClass(primary),
              )}
            >
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
                    {dashboardContinueLabel(cardUiLang)}
                  </p>
                  <p className="truncate text-[19px] font-semibold leading-tight text-ink">
                    {stockRoutineDisplayName(primary.id, primary.name, cardUiLang)}
                  </p>
                  <p className="text-[13px] text-ink-subtle">
                    {primary.steps.length} {dashboardFeaturedStepsHint(cardUiLang)}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </section>

        <section className="space-y-3">
          <SectionHeader
            title={dashboardRoutinesSectionTitle(cardUiLang)}
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
              const iconDef = HOME_CATEGORY_HEADER_ICON[cat];
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
                  <div className="flex min-h-[56px] w-full min-w-0 items-stretch border-b border-ink/6 bg-canvas-muted sm:min-h-[58px]">
                    <button
                      type="button"
                      onClick={() => openAccordion(accordionKey)}
                      className="flex min-h-[56px] min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left transition hover:bg-canvas-muted/90 sm:min-h-[58px] sm:gap-3 sm:px-4 sm:py-2.5"
                    >
                      <span
                        className={cn(
                          "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/95 bg-white shadow-sm ring-[2px] ring-offset-[1.5px] ring-offset-canvas-muted sm:h-11 sm:w-11",
                          ringClass,
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-full w-full items-center justify-center",
                            iconDef.iconClassName,
                          )}
                        >
                          {iconDef.icon}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 break-words text-[12px] font-semibold uppercase leading-snug tracking-[0.1em] text-ink line-clamp-2 [overflow-wrap:anywhere] sm:text-[13px] sm:tracking-[0.12em]">
                        {dashboardPackCategoryTitle(cat, cardUiLang)}
                      </span>
                      <span className="shrink-0 self-center whitespace-nowrap text-[10px] font-medium tabular-nums tracking-wide text-ink-faint sm:text-[11px]">
                        {dashboardRoutineCountLabel(routines.length, cardUiLang)}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAccordionCorner(accordionKey)}
                      className="flex w-12 shrink-0 items-center justify-center border-l border-ink/8 text-[14px] text-ink-subtle transition hover:bg-ink/[0.04] active:bg-ink/[0.06] sm:w-14 sm:text-[15px]"
                      aria-label={accordionOpenCloseAria(open, cardUiLang)}
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

          {extraPackRoutines.length > 0 ? (
            <div
              className="overflow-hidden rounded-2xl border border-ink/8 bg-cream/40"
              onMouseEnter={() => {
                if (prefersFineHover) setHoverPeekKey(HOME_EXTRAS_ACCORDION_KEY);
              }}
              onMouseLeave={() => {
                if (prefersFineHover) setHoverPeekKey(null);
              }}
            >
              <div className="flex min-h-[56px] w-full min-w-0 items-stretch border-b border-ink/6 bg-canvas-muted sm:min-h-[58px]">
                <button
                  type="button"
                  onClick={() => openAccordion(HOME_EXTRAS_ACCORDION_KEY)}
                  className="flex min-h-[56px] min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left transition hover:bg-canvas-muted/90 sm:min-h-[58px] sm:gap-3 sm:px-4 sm:py-2.5"
                >
                  <span
                    className={cn(
                      "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/95 bg-white shadow-sm ring-[2px] ring-offset-[1.5px] ring-offset-canvas-muted sm:h-11 sm:w-11",
                      HOME_EXTRAS_RING_CLASS,
                    )}
                  >
                    <Image
                      src={dayCentrePackMarkUrl()}
                      alt=""
                      fill
                      className="object-contain p-1.5"
                      sizes="44px"
                      unoptimized
                    />
                  </span>
                  <span className="min-w-0 flex-1 break-words text-[12px] font-semibold uppercase leading-snug tracking-[0.1em] text-ink line-clamp-2 [overflow-wrap:anywhere] sm:text-[13px] sm:tracking-[0.12em]">
                    {dashboardExtrasSectionTitle(cardUiLang)}
                  </span>
                  <span className="shrink-0 self-center whitespace-nowrap text-[10px] font-medium tabular-nums tracking-wide text-ink-faint sm:text-[11px]">
                    {dashboardRoutineCountLabel(
                      extraPackRoutines.length + 1,
                      cardUiLang,
                    )}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleAccordionCorner(HOME_EXTRAS_ACCORDION_KEY)}
                  className="flex w-12 shrink-0 items-center justify-center border-l border-ink/8 text-[14px] text-ink-subtle transition hover:bg-ink/[0.04] active:bg-ink/[0.06] sm:w-14 sm:text-[15px]"
                  aria-label={accordionOpenCloseAria(
                    isAccordionOpen(HOME_EXTRAS_ACCORDION_KEY),
                    cardUiLang,
                  )}
                >
                  <span aria-hidden>
                    {isAccordionOpen(HOME_EXTRAS_ACCORDION_KEY) ? "▾" : "▸"}
                  </span>
                </button>
              </div>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isAccordionOpen(HOME_EXTRAS_ACCORDION_KEY)
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="grid grid-cols-2 gap-3 px-2 pb-3 pt-2 [grid-auto-rows:1fr] sm:px-3 sm:pb-4 sm:pt-3">
                    {extraPackRoutines.map((routine) => (
                      <DashboardRoutineTile key={routine.id} routine={routine} />
                    ))}
                    <Link
                      href="/first-then-demo?pack=ikram-home"
                      className="col-span-2 block"
                    >
                      <Card className="overflow-hidden border border-ink/5 p-0 transition hover:shadow-soft">
                        <div className="flex gap-3 p-3">
                          <div className="relative aspect-[10/13] w-[4.25rem] shrink-0 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-[#E05C9A]/35">
                            <Image
                              src={firstThenDemoPackPreviewUrl("ikram-home")}
                              alt=""
                              fill
                              className="object-contain object-center"
                              sizes="68px"
                              unoptimized
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                              {dashboardFirstThenCardEyebrow(cardUiLang)}
                            </p>
                            <p className="text-[15px] font-semibold leading-snug text-ink">
                              {dashboardFirstThenMuchieHomeTitle(cardUiLang)}
                            </p>
                            <p className="text-[12px] leading-snug text-ink-subtle">
                              {dashboardFirstThenMuchieHomeHint(cardUiLang)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link href="/first-then">
            <Card className="flex h-full min-h-[108px] flex-col justify-center border border-ink/5 p-4 transition hover:shadow-soft">
              <p className="line-clamp-2 break-words text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-ink-faint [overflow-wrap:anywhere]">
                {dashboardFirstThenCardEyebrow(cardUiLang)}
              </p>
              <p className="mt-2 line-clamp-2 break-words text-[15px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                {dashboardFirstThenCardTitle(cardUiLang)}
              </p>
            </Card>
          </Link>
          <Link href="/builder">
            <Card className="flex h-full min-h-[128px] flex-col items-center justify-center border border-ink/5 px-3 py-4 transition hover:shadow-soft">
              <DashboardCenteredIntro
                icon={<BuilderQuickIcon />}
                ringClass="ring-[#6b8f9e]/75"
                category={dashboardQuickBuilderEyebrow(cardUiLang)}
                title={dashboardQuickBuilderTitle(cardUiLang)}
              />
            </Card>
          </Link>
          <Link href="/library">
            <Card className="flex h-full min-h-[108px] flex-col justify-center border border-ink/5 p-4 transition hover:shadow-soft">
              <p className="line-clamp-2 break-words text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-ink-faint [overflow-wrap:anywhere]">
                {bottomNavLabel("library", cardUiLang)}
              </p>
              <p className="mt-2 line-clamp-2 break-words text-[15px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                {dashboardQuickLibraryTitle(cardUiLang)}
              </p>
            </Card>
          </Link>
          <Link href="/templates">
            <Card className="flex h-full min-h-[108px] flex-col justify-center border border-ink/5 p-4 transition hover:shadow-soft">
              <p className="line-clamp-2 break-words text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-ink-faint [overflow-wrap:anywhere]">
                {bottomNavLabel("templates", cardUiLang)}
              </p>
              <p className="mt-2 line-clamp-2 break-words text-[15px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                {dashboardQuickTemplatesTitle(cardUiLang)}
              </p>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  );
}
