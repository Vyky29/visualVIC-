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
import type { UserProfile } from "@/lib/types/routine";

const STORAGE_KEY = "pixtolearn.profile.prototype.v1";

type ProfileState = {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
};

const ProfileContext = createContext<ProfileState | null>(null);

function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

/**
 * Local profile preview only (display name + avatar blob URL).
 * No authentication — for visual prototyping until Supabase is wired.
 */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfileState(loadProfile());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    else localStorage.removeItem(STORAGE_KEY);
  }, [profile, ready]);

  const setProfile = useCallback((p: UserProfile) => {
    setProfileState(p);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
    }),
    [profile, setProfile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
