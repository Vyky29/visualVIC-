"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  LibraryPageClient,
  type LibrarySectionId,
} from "@/app/(app)/library/LibraryPageClient";
import { StaffPortalReturnButton } from "@/components/staff/StaffPortalReturnButton";
import { Button } from "@/components/ui/Button";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  fetchStaffPlannerAccess,
  type StaffPlannerAccess,
} from "@/lib/staff/fetch-staff-planner-access";
import {
  plannerAccessDenied,
  plannerIntroBlurb,
  plannerSignOut,
  plannerSupabaseMissing,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

type GateState =
  | { status: "loading" }
  | { status: "unconfigured" }
  | { status: "unauthenticated" }
  | { status: "denied"; reason: string }
  | { status: "ready"; access: StaffPlannerAccess };

export function PlannerPageClient() {
  const router = useRouter();
  const lang = useCardUiLanguage();
  const [gate, setGate] = useState<GateState>({ status: "loading" });

  const loadAccess = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setGate({ status: "unconfigured" });
      return;
    }

    const supabase = createBrowserSupabase();
    if (!supabase) {
      setGate({ status: "unconfigured" });
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) {
      setGate({ status: "unauthenticated" });
      return;
    }

    const result = await fetchStaffPlannerAccess(supabase, userId);
    if (!result.ok) {
      if (result.reason === "no_session") {
        setGate({ status: "unauthenticated" });
        return;
      }
      setGate({ status: "denied", reason: result.reason });
      return;
    }

    setGate({ status: "ready", access: result.access });
  }, []);

  useEffect(() => {
    void loadAccess();
  }, [loadAccess]);

  useEffect(() => {
    if (gate.status === "unauthenticated") {
      router.replace("/planner/login?return=/planner");
    }
  }, [gate.status, router]);

  const signOut = useCallback(async () => {
    const supabase = createBrowserSupabase();
    if (supabase) await supabase.auth.signOut();
    router.replace("/planner/login");
  }, [router]);

  if (gate.status === "loading" || gate.status === "unauthenticated") {
    return (
      <div className="flex min-h-[40dvh] items-center justify-center px-6 text-[14px] text-ink-subtle">
        …
      </div>
    );
  }

  if (gate.status === "unconfigured") {
    return (
      <div className="px-6 py-10 text-center text-[14px] text-ink-subtle">
        {plannerSupabaseMissing(lang)}
      </div>
    );
  }

  if (gate.status === "denied") {
    return (
      <div className="space-y-4 px-6 py-10 text-center">
        <p className="text-[15px] text-ink">{plannerAccessDenied(lang)}</p>
        <p className="text-[13px] text-ink-faint">{gate.reason}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <StaffPortalReturnButton />
          <Button type="button" variant="secondary" onClick={() => void signOut()}>
            {plannerSignOut(lang)}
          </Button>
        </div>
      </div>
    );
  }

  const allowedSections = gate.access.allowedSections as
    | ReadonlySet<LibrarySectionId>
    | null
    | undefined;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-end gap-2 px-4 pt-2">
        <span className="truncate text-[12px] text-ink-faint">
          {gate.access.profile.full_name ?? gate.access.profile.username ?? ""}
        </span>
        <Button
          type="button"
          variant="ghost"
          className="!min-h-9 !px-3 text-[12px]"
          onClick={() => void signOut()}
        >
          {plannerSignOut(lang)}
        </Button>
      </div>
      <LibraryPageClient
        allowedSections={allowedSections ?? undefined}
        headerTitleKey="planner"
        introBlurbText={plannerIntroBlurb(lang)}
        routineNewHref="/planner/routine-new"
        bottomBarBottomClass="max(0.75rem, env(safe-area-inset-bottom, 0px))"
      />
      <p className="px-4 pb-8 text-center text-[12px] text-ink-faint">
        <Link href="/dashboard" className="underline-offset-4 hover:underline">
          PixtoLearn app
        </Link>
      </p>
    </div>
  );
}
