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
  loadOfflineStaffAccess,
  saveOfflineStaffAccess,
} from "@/lib/offline/offline-staff-access-cache";
import {
  isCoreClimbOnlyStaffAccess,
  isRestrictedStaffAccess,
  staffAllowedLibrarySections,
  staffCanAccessTailoredParticipant,
  staffMayOpenRoutine,
  staffPlayerBackHref,
} from "@/lib/staff/staff-app-access";
import { isStaffPortalSession } from "@/lib/staff/staff-portal-session";
import type { TailoredParticipantId } from "@/lib/routines/tailored-participants";
import type { Routine } from "@/lib/types/routine";
import type { PlannerLibrarySectionId } from "@/lib/staff/planner-access";

type StaffAccessContextValue = {
  status: "loading" | "none" | "ready";
  access: StaffPlannerAccess | null;
  /** Entered via Portal Vic Plan / handoff (sessionStorage flag). */
  fromStaffPortal: boolean;
  isRestricted: boolean;
  /** Alex / Andres — Core + Climbing only. */
  isCoreClimbOnly: boolean;
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
  const [portalSession, setPortalSession] = useState(false);

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

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        setAccess(null);
        setStatus("none");
        return;
      }

      const result = await fetchStaffPlannerAccess(supabase, userId);
      if (!result.ok) {
        const cached = loadOfflineStaffAccess();
        if (!navigator.onLine && cached) {
          setAccess(cached);
          setStatus("ready");
          return;
        }
        setAccess(null);
        setStatus("none");
        return;
      }

      saveOfflineStaffAccess(result.access);
      setAccess(result.access);
      setStatus("ready");
    } catch {
      const cached = loadOfflineStaffAccess();
      if (!navigator.onLine && cached) {
        setAccess(cached);
        setStatus("ready");
        return;
      }
      setAccess(null);
      setStatus("none");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    setPortalSession(isStaffPortalSession());
  }, []);

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
    const staffUiActive =
      portalSession && isRestrictedStaffAccess(access);
    const coreClimbOnly =
      staffUiActive && isCoreClimbOnlyStaffAccess(access);
    return {
      status,
      access,
      fromStaffPortal: portalSession,
      isRestricted: staffUiActive,
      isCoreClimbOnly: coreClimbOnly,
      allowedLibrarySections: staffUiActive
        ? staffAllowedLibrarySections(access)
        : undefined,
      canAccessTailoredParticipant: (participantId) =>
        staffUiActive
          ? staffCanAccessTailoredParticipant(access, participantId)
          : true,
      mayOpenRoutine: (routine) =>
        staffUiActive ? staffMayOpenRoutine(access, routine) : true,
      playerBackHref: staffUiActive ? staffPlayerBackHref(access) : "/player",
      refresh,
    };
  }, [access, portalSession, refresh, status]);

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
      fromStaffPortal: false,
      isRestricted: false,
      isCoreClimbOnly: false,
      allowedLibrarySections: undefined,
      canAccessTailoredParticipant: () => true,
      mayOpenRoutine: () => true,
      playerBackHref: "/player",
      refresh: async () => {},
    };
  }
  return ctx;
}
