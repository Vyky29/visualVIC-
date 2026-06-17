"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStaffAccess } from "@/contexts/StaffAccessContext";

/** Sends restricted staff back to Home — they only use Day centre + Tailored schedules. */
export function StaffRestrictedRedirect({
  children,
  to = "/dashboard",
}: {
  children?: ReactNode;
  to?: string;
}) {
  const router = useRouter();
  const { isRestricted, status } = useStaffAccess();

  useEffect(() => {
    if (status === "loading") return;
    if (isRestricted) router.replace(to);
  }, [isRestricted, router, status, to]);

  if (status === "loading" || isRestricted) {
    return (
      <div className="flex min-h-[40dvh] items-center justify-center px-6 text-[14px] text-ink-subtle">
        …
      </div>
    );
  }

  return children ? <>{children}</> : null;
}
