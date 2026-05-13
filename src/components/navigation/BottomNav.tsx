"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNavLabel, type BottomNavKey } from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";

type NavItem = {
  href: string;
  labelKey: BottomNavKey;
  icon: string;
  groupPrefixes?: readonly string[];
};

const items: NavItem[] = [
  {
    href: "/welcome",
    labelKey: "home",
    icon: "⌂",
    groupPrefixes: ["/welcome", "/dashboard", "/"],
  },
  { href: "/library", labelKey: "library", icon: "◎" },
  { href: "/templates", labelKey: "templates", icon: "☷" },
  { href: "/saved", labelKey: "saved", icon: "✦" },
  {
    href: "/menu",
    labelKey: "menu",
    icon: "⋯",
    groupPrefixes: [
      "/menu",
      "/builder",
      "/first-then",
      "/player",
      "/auth",
      "/onboarding",
      "/library/routine-new",
    ],
  },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.groupPrefixes?.length) {
    return item.groupPrefixes.some((prefix) => {
      if (prefix === "/") return pathname === "/";
      return pathname === prefix || pathname.startsWith(`${prefix}/`);
    });
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function BottomNav() {
  const pathname = usePathname();
  const lang = useCardUiLanguage();

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
              "flex min-h-touch min-w-0 max-w-[20%] flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 rounded-2xl px-0.5 py-2 text-[9px] font-medium leading-tight transition-colors active:opacity-90 sm:px-1 sm:text-[10px]",
              isActive(pathname, item)
                ? "text-ink"
                : "text-ink-faint active:text-ink-subtle [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink-subtle",
            )}
          >
            <span className="text-[17px] leading-none sm:text-lg" aria-hidden>
              {item.icon}
            </span>
            <span className="line-clamp-2 w-full min-w-0 max-w-full break-words text-center hyphens-auto">
              {bottomNavLabel(item.labelKey, lang)}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
