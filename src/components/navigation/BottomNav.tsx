"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  groupPrefixes?: readonly string[];
};

const items: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: "⌂" },
  { href: "/library", label: "Library", icon: "◎" },
  { href: "/templates", label: "Templates", icon: "☷" },
  { href: "/saved", label: "Saved", icon: "✦" },
  {
    href: "/menu",
    label: "Menu",
    icon: "⋯",
    groupPrefixes: [
      "/menu",
      "/builder",
      "/first-then",
      "/player",
      "/welcome",
      "/auth",
      "/onboarding",
      "/library/routine-new",
      "/generated-card-demo",
    ],
  },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.groupPrefixes?.length) {
    return item.groupPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-20 w-full max-w-lg -translate-x-1/2 border-t border-ink/5 bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      aria-label="Primary"
    >
      <div className="flex justify-around px-1 pt-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-h-touch min-w-[64px] max-w-[20%] flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-2 text-[10px] font-medium leading-tight transition-colors active:opacity-90 sm:text-[11px]",
              isActive(pathname, item)
                ? "text-ink"
                : "text-ink-faint active:text-ink-subtle [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink-subtle",
            )}
          >
            <span className="text-[17px] leading-none sm:text-lg" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
