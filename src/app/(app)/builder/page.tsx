import { BuilderClient } from "@/components/builder/BuilderClient";
import { Header } from "@/components/navigation/Header";

type Props = {
  searchParams: Promise<{ from?: string }>;
};

export default async function BuilderPage({ searchParams }: Props) {
  const sp = await searchParams;
  const fromId = sp.from;

  return (
    <div>
      <Header title="Routine builder" />
      <BuilderClient key={fromId ?? "default"} templateId={fromId} />
    </div>
  );
}
