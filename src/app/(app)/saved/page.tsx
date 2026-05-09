import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { SavedListClient } from "@/components/saved/SavedListClient";

export default function SavedPage() {
  return (
    <div>
      <Header title="Saved library" />
      <div className="space-y-4 px-4 pb-8 pt-2">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          Star routines from mock data or your builder drafts — stored locally in
          V1 until Supabase sync lands.
        </p>
        <SavedListClient />
        <Card className="bg-sage-mist/50">
          <p className="text-[14px] leading-relaxed text-ink-subtle">
            Want more structure? Browse{" "}
            <Link href="/templates" className="font-medium text-ink underline-offset-4 hover:underline">
              templates
            </Link>{" "}
            or open the{" "}
            <Link href="/builder" className="font-medium text-ink underline-offset-4 hover:underline">
              routine builder
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}
