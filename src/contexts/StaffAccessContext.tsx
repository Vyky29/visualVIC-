"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  fetchStaffPlannerAccess,
  type StaffPlannerAccess,
} from "@/lib/staff/fetch-staff-planner-access";
import {
  isRestrictedStaffAccess,
  staffAllowedLibrarySections,
  staffCanAccessTailoredParticipant,
  staffMayOpenRoutine,
  staffPlayerBackHref,
} from "@/lib/staff/staff-app-access";
import type { TailoredParticipantId } from "@/lib/routines/tailored-participants";
import type { Routine } from "@/lib/types/routine";
import type { PlannerLibrarySectionId } from "@/lib/staff/planner-access";

type StaffAccessContextValue = {
  status: "loading" | "none" | "ready";
  access: StaffPlannerAccess | null;
  isRestricted: boolean;
  allowedLibrarySections: ReadonlySet<PlannerLibrarySectionId> | undefined;
  canAccessTailoredParticipant: (participantId: TailoredParticipantId) => boolean;
  mayOpenRoutine: (routine: Routine) => boolean;
  playerBackHref: string;
  refresh: () => Promise<void>;
};

const StaffAccessContext = createContext<StaffAccessContextValue | null>(null);

export function StaffAccessProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<StaffPlannerAccess | null>(null);
  const [status, setStatus] = useState<StaffAccessContextValue["status"]>("loading");

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setAccess(null);
      setStatus("none");
      return;
    }

    const supabase = createBrowserSupabase();
    if (!supabase) {
      setAccess(null);
      setStatus("none");
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) {
      setAccess(null);
      setStatus("none");
      return;
    }

    const result = await fetchStaffPlannerAccess(supabase, userId);
    if (!result.ok) {
      setAccess(null);
      setStatus("none");
      return;
    }

    setAccess(result.access);
    setStatus("ready");
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createBrowserSupabase();
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void refresh();
    });

    return () => subscription.unsubscribe();
  }, [refresh]);

  const value = useMemo<StaffAccessContextValue>(() => {
    const isRestricted = isRestrictedStaffAccess(access);
    return {
      status,
      access,
      isRestricted,
      allowedLibrarySections: staffAllowedLibrarySections(access),
      canAccessTailoredParticipant: (participantId) =>
        staffCanAccessTailoredParticipant(access, participantId),
      mayOpenRoutine: (routine) => staffMayOpenRoutine(access, routine),
      playerBackHref: staffPlayerBackHref(access),
      refresh,
    };
  }, [access, refresh, status]);

  return (
    <StaffAccessContext.Provider value={value}>{children}</StaffAccessContext.Provider>
  );
}

export function useStaffAccess(): StaffAccessContextValue {
  const ctx = useContext(StaffAccessContext);
  if (!ctx) {
    return {
      status: "none",
      access: null,
      isRestricted: false,
      allowedLibrarySections: undefined,
      canAccessTailoredParticipant: () => true,
      mayOpenRoutine: () => true,
      playerBackHref: "/player",
      refresh: async () => {},
    };
  }
  return ctx;
}
