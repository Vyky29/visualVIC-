import { BuilderClient } from "@/components/builder/BuilderClient";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";

type Props = {
  searchParams: Promise<{ from?: string }>;
};

export default async function BuilderPage({ searchParams }: Props) {
  const sp = await searchParams;
  const fromId = sp.from;

  return (
    <div>
      <TranslatedHeader titleKey="routineBuilder" />
      <BuilderClient key={fromId ?? "default"} templateId={fromId} />
    </div>
  );
}
