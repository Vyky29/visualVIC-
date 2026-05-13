import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { CustomRoutinesProvider } from "@/contexts/CustomRoutinesContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SavedRoutinesProvider } from "@/contexts/SavedRoutines";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PixtoLearn Routines",
  description:
    "Structured visual sequencing for calm, predictable daily routines.",
  applicationName: "PixtoLearn Routines",
  /** Favicon + “Add to Home Screen” (iOS uses `apple` + `appleWebApp`). */
  icons: {
    icon: [
      {
        url: "/brand/pixtolearn-app-icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: [
      {
        url: "/brand/pixtolearn-app-icon-180.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "PixtoLearn",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f6f4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="touch-manipulation font-[family-name:var(--font-dm-sans)]">
        <ProfileProvider>
          <SavedRoutinesProvider>
            <CustomRoutinesProvider>{children}</CustomRoutinesProvider>
          </SavedRoutinesProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
