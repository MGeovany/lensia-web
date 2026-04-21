import Link from "next/link";

import { Button } from "@/components/ui/button";

function TocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="text-muted-foreground hover:text-foreground block" href={href}>
      {children}
    </a>
  );
}

function Hr() {
  return <div className="bg-border/60 my-10 h-px" />;
}

export default function TerminosPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-border/40 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-xl">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold">
            Lensia
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Volver</Link>
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Términos de servicio
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">Última actualización: 2026-04-21</p>
          <p className="text-muted-foreground mt-6 leading-7">
            Estos términos regulan el uso de Lensia. Son un borrador y deben revisarse con asesoría
            legal antes de publicarse.
          </p>
        </header>

        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr]">
          <aside className="hidden md:block">
            <div className="border-border/50 bg-card sticky top-24 rounded-xl border p-5">
              <p className="text-sm font-semibold">Contenido</p>
              <nav className="mt-4 space-y-2 text-sm">
                <TocLink href="#aceptacion">1. Aceptación</TocLink>
                <TocLink href="#cuentas">2. Cuentas</TocLink>
                <TocLink href="#contenido">3. Contenido y permisos</TocLink>
                <TocLink href="#ventas">4. Ventas y comisión</TocLink>
                <TocLink href="#responsabilidad">5. Responsabilidad</TocLink>
                <TocLink href="#cambios">6. Cambios</TocLink>
                <TocLink href="#contacto">7. Contacto</TocLink>
              </nav>
            </div>
          </aside>

          <article className="mx-auto w-full max-w-3xl">
            <section id="aceptacion" className="scroll-mt-24">
              <h2 className="text-xl font-semibold">1. Aceptación</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                Al usar Lensia aceptas estos términos. Si no estás de acuerdo, no uses la
                plataforma.
              </p>
            </section>

            <Hr />

            <section id="cuentas" className="scroll-mt-24">
              <h2 className="text-xl font-semibold">2. Cuentas</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                Eres responsable de mantener la seguridad de tu cuenta y de la información que
                compartes desde ella.
              </p>
            </section>

            <Hr />

            <section id="contenido" className="scroll-mt-24">
              <h2 className="text-xl font-semibold">3. Contenido y permisos</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                Eres responsable de las fotos que subes y de contar con permisos para publicarlas y
                venderlas. No debes subir contenido ilegal, infractor o que viole derechos de
                terceros.
              </p>
            </section>

            <Hr />

            <section id="ventas" className="scroll-mt-24">
              <h2 className="text-xl font-semibold">4. Ventas y comisión</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                Tú defines el precio por foto. Lensia cobra una comisión del 20% únicamente sobre
                ventas completadas. No hay mensualidades ni cargos adicionales.
              </p>
            </section>

            <Hr />

            <section id="responsabilidad" className="scroll-mt-24">
              <h2 className="text-xl font-semibold">5. Responsabilidad</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                Lensia se ofrece “tal cual”. No garantizamos disponibilidad ininterrumpida. En la
                medida permitida por ley, no seremos responsables por pérdidas indirectas derivadas
                del uso de la plataforma.
              </p>
            </section>

            <Hr />

            <section id="cambios" className="scroll-mt-24">
              <h2 className="text-xl font-semibold">6. Cambios</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                Podemos actualizar estos términos. Publicaremos la fecha de actualización en esta
                misma página.
              </p>
            </section>

            <Hr />

            <section id="contacto" className="scroll-mt-24">
              <h2 className="text-xl font-semibold">7. Contacto</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                Para preguntas sobre estos términos, contáctanos.
              </p>
              <div className="mt-4">
                <Button variant="outline" asChild>
                  <Link href="/contacto">Ir a contacto</Link>
                </Button>
              </div>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
