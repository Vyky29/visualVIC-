import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { OfflineStatusBanner } from "@/components/offline/OfflineStatusBanner";
import { StaffAccessProvider } from "@/contexts/StaffAccessContext";

export default function AppGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StaffAccessProvider>
      <OfflineStatusBanner />
      <AppShell showNav>{children}</AppShell>
    </StaffAccessProvider>
  );
}
