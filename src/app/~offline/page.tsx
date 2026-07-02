import Link from "next/link";

export default function OfflineFallbackPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 py-12 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        PixToLearn
      </p>
      <h1 className="mt-3 text-[22px] font-semibold text-ink">Sin conexión</h1>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-subtle">
        No hay red ahora mismo. Abre una rutina que ya hayas usado en Schedule
        Player — las tarjetas guardadas en este dispositivo siguen disponibles.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Link
          href="/player"
          className="rounded-full bg-sage px-6 py-3 text-[15px] font-semibold text-white"
        >
          Ir a Schedule Player
        </Link>
        <Link
          href="/dashboard"
          className="text-[14px] font-medium text-sage underline-offset-4 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
