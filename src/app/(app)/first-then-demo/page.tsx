"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function FirstThenDemoRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.toString();
    router.replace(q ? `/first-then?${q}` : "/first-then?pack=ikram-home");
  }, [router, searchParams]);

  return null;
}

/** Legacy route — always uses the unified First & Then experience. */
export default function FirstThenDemoPage() {
  return (
    <Suspense fallback={null}>
      <FirstThenDemoRedirectClient />
    </Suspense>
  );
}
