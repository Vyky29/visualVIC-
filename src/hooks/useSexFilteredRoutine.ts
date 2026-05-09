"use client";

import { useMemo } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import type { Routine } from "@/lib/types/routine";
import { filterGettingDressRoutineByProfileSex } from "@/lib/cards/getting-dress-undress-registry";

export function useSexFilteredRoutine(routine: Routine): Routine {
  const { profile } = useProfile();
  return useMemo(
    () => filterGettingDressRoutineByProfileSex(routine, profile?.sex),
    [routine, profile?.sex],
  );
}
