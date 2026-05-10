import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { BRAND_LOGO_SRC } from "@/lib/constants/brand";
import { Card } from "@/components/ui/Card";

const sections: {
  title: string;
  links: { href: string; label: string; hint: string }[];
}[] = [
  {
    title: "Routines",
    links: [
      {
        href: "/player",
        label: "Schedule Player",
        hint: "Pick a routine · vertical flow",
      },
      {
        href: "/builder",
        label: "Routine builder",
        hint: "Mock steps & titles",
      },
      {
        href: "/first-then",
        label: "First & Then",
        hint: "Two-card strip",
      },
    ],
  },
  {
    title: "Prototype flows",
    links: [
      {
        href: "/welcome",
        label: "Welcome",
        hint: "Entry screen",
      },
      {
        href: "/auth",
        label: "Sign in / Sign up",
        hint: "UI only · no backend",
      },
      {
        href: "/onboarding/profile",
        label: "Profile setup",
        hint: "Name & avatar preview",
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="min-h-dvh bg-white">
      <Header title="Menu" logoSrc={BRAND_LOGO_SRC} />
      <div className="space-y-8 px-4 pb-8 pt-2">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          Visual prototype — every link is navigable; no authentication or
          server logic yet.
        </p>

        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="px-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              {section.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Card className="transition hover:shadow-soft">
                      <p className="text-[16px] font-semibold text-ink">
                        {link.label}
                      </p>
                      <p className="mt-1 text-[13px] text-ink-subtle">
                        {link.hint}
                      </p>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Card className="bg-sage-mist/50">
          <p className="text-[14px] leading-relaxed text-ink-subtle">
            <strong className="font-semibold text-ink">Focus Mode</strong> opens
            from an active routine in Schedule Player (fullscreen, fewer tabs).
            Saved routines live under the{" "}
            <Link
              href="/saved"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              Saved
            </Link>{" "}
            tab.
          </p>
        </Card>
      </div>
    </div>
  );
}
