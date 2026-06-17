"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { parsePlannerHandoffHash } from "@/lib/staff/planner-portal-handoff";
import {
  plannerHandoffFailed,
  plannerHandoffSigningIn,
  plannerSupabaseMissing,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

function PlannerAuthHandoffInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = useCardUiLanguage();
  const [error, setError] = useState<string | null>(null);

  const returnTo = searchParams.get("return") ?? "/planner";

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createBrowserSupabase();
    if (!supabase) return;

    let cancelled = false;

    async function run() {
      const tokens = parsePlannerHandoffHash(window.location.hash);
      if (!tokens) {
        const { data } = await supabase!.auth.getSession();
        if (cancelled) return;
        if (data.session) {
          router.replace(returnTo.startsWith("/") ? returnTo : "/planner");
          return;
        }
        router.replace(
          `/planner/login?return=${encodeURIComponent(returnTo)}`,
        );
        return;
      }

      const { error: sessionError } = await supabase!.auth.setSession(tokens);
      if (cancelled) return;

      window.history.replaceState(null, "", window.location.pathname);

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      router.replace(returnTo.startsWith("/") ? returnTo : "/planner");
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [returnTo, router]);

  if (!isSupabaseConfigured()) {
    return (
      <Card className="p-4 text-[14px] leading-relaxed text-ink-subtle">
        {plannerSupabaseMissing(lang)}
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="space-y-3 p-4">
        <p className="text-[14px] text-ink" role="alert">
          {plannerHandoffFailed(lang)}
        </p>
        <p className="text-[13px] text-ink-faint">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 text-center text-[14px] text-ink-subtle">
      {plannerHandoffSigningIn(lang)}
    </Card>
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
