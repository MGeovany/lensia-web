import Link from "next/link";

export function Footer({ variant = "default" }: { variant?: "default" | "dashboard" }) {
  const containerClassName =
    variant === "dashboard" ? "w-full px-10" : "mx-auto w-full max-w-6xl px-4 lg:px-8";

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 text-white">
      <div className={`${containerClassName} py-14 lg:py-16`}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-lg font-semibold tracking-tight">Lensia</p>
            <p className="mt-3 text-sm font-medium text-white">Una selfie. Sus fotos.</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-white">
              Busqueda por rostro para fotos de eventos. Publica tu galeria, comparte un link o QR y
              deja que cada asistente encuentre sus coincidencias.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Carreras", "Graduaciones", "Bodas", "Torneos", "Corporativo"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white">Producto</p>
              <div className="mt-4 space-y-2">
                <Link href="/dashboard" className="block text-sm text-white hover:underline">
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/events/new"
                  className="block text-sm text-white hover:underline"
                >
                  Crear evento
                </Link>
                <Link
                  href="/e/carrera-10k-san-pedro-sula"
                  className="block text-sm text-white hover:underline"
                >
                  Ver evento publico
                </Link>
                {variant === "default" ? (
                  <a href="#pricing" className="block text-sm text-white hover:underline">
                    Comision
                  </a>
                ) : null}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Privacidad</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm leading-6 text-white">
                  Selfies solo para coincidencias. No se publican en la galeria.
                </p>
                <p className="text-sm leading-6 text-white">
                  Controlas el tiempo online de cada evento.
                </p>
                <a href="#" className="block text-sm text-white hover:underline">
                  Politica de privacidad
                </a>
                <a href="#" className="block text-sm text-white hover:underline">
                  Terminos de servicio
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Soporte</p>
              <div className="mt-4 space-y-2">
                <a
                  href="mailto:hola@lensia.app"
                  className="block text-sm text-white hover:underline"
                >
                  hola@lensia.app
                </a>
                <p className="text-sm text-white">20% por venta. Tu defines el precio.</p>
                <a href="#" className="block text-sm text-white hover:underline">
                  Centro de ayuda
                </a>
                <a href="#" className="block text-sm text-white hover:underline">
                  Soporte por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold text-white">Cobro</p>
            <p className="mt-2 text-sm text-white">Comision del 20% por venta</p>
            <p className="mt-1 text-xs text-white">Sin suscripciones por ahora</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Entrega</p>
            <p className="mt-2 text-sm text-white">Link y QR para compartir</p>
            <p className="mt-1 text-xs text-white">Galeria publica con watermark</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Confianza</p>
            <p className="mt-2 text-sm text-white">Selfie privada, solo coincidencias</p>
            <p className="mt-1 text-xs text-white">Control del tiempo online por evento</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-white">© {year} Lensia. Todos los derechos reservados.</p>
          <p className="text-xs text-white">Hecho para fotografos de eventos en Centroamerica.</p>
        </div>
      </div>
    </footer>
  );
}
