"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/navigation/Header";
import { mockRoutines } from "@/lib/mock/routines";
import { mockTemplates } from "@/lib/mock/templates";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionTopClass,
} from "@/lib/utils/visual-card-url";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { useProfile } from "@/contexts/ProfileContext";
import { cn } from "@/lib/utils/cn";
import { routineDashboardHomeGridTileClass } from "@/lib/utils/routine-accent";

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
  const primary = mockRoutines[0];
  /** Same set as Schedule Player index — includes locally saved custom routines first. */
  const dashboardRoutines = useMemo(() => {
    const base = [...mockRoutines, ...mockTemplates];
    return customHydrated ? [...customRoutines, ...base] : base;
  }, [customRoutines, customHydrated]);
  const frameScale = profile?.avatarFrameScale ?? 1;

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
          <div className="flex items-baseline justify-between px-1">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Schedule Player
            </h2>
            <Link
              href="/player"
              className="text-[13px] font-medium text-sage underline-offset-4 hover:underline"
            >
              All routines
            </Link>
          </div>
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
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            Routines
          </h2>
          <div className="grid grid-cols-2 gap-3 [grid-auto-rows:1fr]">
            {dashboardRoutines.map((r) => {
              const previewUrl =
                r.homePreviewImageUrl ?? r.steps[0]?.imageUrl;
              return (
                <Link
                  key={r.id}
                  href={`/player/${r.id}`}
                  className="group flex h-full min-h-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/45 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  <Card
                    omitInsetRing
                    className={cn(
                      "flex h-full min-h-[15.75rem] w-full flex-col overflow-hidden border-0 p-0 shadow-card transition-shadow duration-200",
                      routineDashboardHomeGridTileClass(r),
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
                        {r.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-ink-subtle">
                        {r.steps.length} steps
                      </p>
                    </div>
                  </Card>
                </Link>
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
