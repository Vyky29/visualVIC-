"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { parsePlannerHandoffHash } from "@/lib/staff/planner-portal-handoff";
import { markStaffPortalSession } from "@/lib/staff/staff-portal-session";
import {
  plannerHandoffFailed,
  plannerHandoffSigningIn,
  plannerSupabaseMissing,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

const CLUB_MARK = "/assets/clubsensational-logo-mark.png";

/** Portal opens this page first, then appends #tokens — wait briefly for that hash. */
function waitForHandoffHash(ms = 2800): Promise<ReturnType<typeof parsePlannerHandoffHash>> {
  const existing = parsePlannerHandoffHash(
    typeof window !== "undefined" ? window.location.hash : "",
  );
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve) => {
    let settled = false;
    const finish = (value: ReturnType<typeof parsePlannerHandoffHash>) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("hashchange", onHash);
      window.clearTimeout(timer);
      resolve(value);
    };
    const onHash = () => {
      const tokens = parsePlannerHandoffHash(window.location.hash);
      if (tokens) finish(tokens);
    };
    window.addEventListener("hashchange", onHash);
    const timer = window.setTimeout(() => {
      finish(parsePlannerHandoffHash(window.location.hash));
    }, ms);
  });
}

function HandoffBrandCard({ children }: { children: ReactNode }) {
  return (
    <Card className="space-y-3 p-5 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CLUB_MARK}
        alt=""
        width={40}
        height={40}
        className="mx-auto h-10 w-10 object-contain"
        decoding="async"
        aria-hidden
      />
      {children}
    </Card>
  );
}

function PlannerAuthHandoffInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = useCardUiLanguage();
  const [error, setError] = useState<string | null>(null);

  /** Portal Plan opens Home; Library still available for building routines. */
  const returnTo = searchParams.get("return") ?? "/dashboard";

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createBrowserSupabase();
    if (!supabase) return;

    let cancelled = false;

    async function run() {
      let tokens = await waitForHandoffHash();
      if (cancelled) return;

      if (!tokens) {
        const { data } = await supabase!.auth.getSession();
        if (cancelled) return;
        if (data.session) {
          markStaffPortalSession();
          router.replace(returnTo.startsWith("/") ? returnTo : "/dashboard");
          return;
        }
        router.replace(
          `/planner/login?return=${encodeURIComponent(returnTo)}`,
        );
        return;
      }

      const { error: sessionError } = await supabase!.auth.setSession(tokens);
      if (cancelled) return;

      window.history.replaceState(null, "", window.location.pathname + window.location.search);

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      markStaffPortalSession();
      router.replace(returnTo.startsWith("/") ? returnTo : "/dashboard");
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [returnTo, router]);

  if (!isSupabaseConfigured()) {
    return (
      <HandoffBrandCard>
        <p className="text-[14px] leading-relaxed text-ink-subtle">
          {plannerSupabaseMissing(lang)}
        </p>
      </HandoffBrandCard>
    );
  }

  if (error) {
    return (
      <HandoffBrandCard>
        <p className="text-[14px] text-ink" role="alert">
          {plannerHandoffFailed(lang)}
        </p>
        <p className="text-[13px] text-ink-faint">{error}</p>
      </HandoffBrandCard>
    );
  }

  return (
    <HandoffBrandCard>
      <p className="text-[14px] text-ink-subtle">{plannerHandoffSigningIn(lang)}</p>
    </HandoffBrandCard>
  );
}

export function PlannerAuthHandoffClient() {
  return (
    <div className="min-h-dvh w-full bg-black">
      <div className="mx-auto min-h-dvh w-full max-w-lg bg-canvas">
        <MobileScreen withChrome={false} className="px-6 pb-12 pt-10">
          <Suspense fallback={null}>
            <PlannerAuthHandoffInner />
          </Suspense>
        </MobileScreen>
      </div>
    </div>
  );
}
