import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { mockTemplates } from "@/lib/mock/templates";

export default function TemplatesPage() {
  return (
    <div>
      <Header title="Routine templates" />
      <div className="space-y-4 px-4 pb-8 pt-2">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          Tap a template to open it in the builder, or run it directly from the
          schedule player when you save.
        </p>
        <ul className="flex flex-col gap-3">
          {mockTemplates.map((t) => (
            <li key={t.id}>
              <Link href={`/builder?from=${encodeURIComponent(t.id)}`}>
                <Card className="transition hover:shadow-soft">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Template
                  </p>
                  <p className="mt-1 text-[17px] font-semibold text-ink">
                    {t.name}
                  </p>
                  {t.description ? (
                    <p className="mt-1 text-[14px] text-ink-subtle">
                      {t.description}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[13px] font-medium text-sage">
                    Customize in builder →
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
