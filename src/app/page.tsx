"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Menu,
  Search,
  Shield,
  Sparkles,
  Upload,
  X,
  QrCode,
  Camera,
  Trophy,
  GraduationCap,
  Heart,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border/60 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">Lensia</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#como-funciona"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors"
            >
              Como funciona
            </Link>
            <Link
              href="#eventos"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors"
            >
              Eventos
            </Link>
            <Link
              href="#comision"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors"
            >
              Comision
            </Link>
            <Link
              href="#privacidad"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors"
            >
              Privacidad
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard/events/new">Crear evento</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {mobileMenuOpen ? (
          <div className="border-border/60 bg-background border-t px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="#como-funciona" className="text-foreground text-sm">
                Como funciona
              </Link>
              <Link href="#eventos" className="text-foreground text-sm">
                Eventos
              </Link>
              <Link href="#comision" className="text-foreground text-sm">
                Comision
              </Link>
              <Link href="#privacidad" className="text-foreground text-sm">
                Privacidad
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard/events/new">Crear evento</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="from-muted via-background to-background absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Busqueda por rostro
              </Badge>

              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Una selfie. Sus fotos.
              </h1>
              <p className="text-foreground/70 mt-6 text-lg leading-relaxed text-pretty sm:text-xl">
                Sube las fotos del evento, comparte un link o QR y deja que la gente encuentre sus
                coincidencias al instante.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/dashboard/events/new">
                    Crear mi primer evento
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/e/carrera-10k-san-pedro-sula">Ver evento publico</Link>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
              {[
                {
                  icon: Upload,
                  title: "Sube tus fotos",
                  desc: "Arrastra y suelta. Lensia organiza el evento.",
                },
                {
                  icon: QrCode,
                  title: "Comparte un QR",
                  desc: "En la salida, el podio o la recepcion.",
                },
                {
                  icon: Search,
                  title: "Matches con selfie",
                  desc: "La gente se encuentra sola. Tu vendes mas.",
                },
              ].map((x) => (
                <Card key={x.title} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                      <x.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold">{x.title}</p>
                    <p className="text-foreground/70 mt-2 text-sm leading-6">{x.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="border-border/60 border-t py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tres pasos</h2>
              <p className="text-foreground/70 mt-4 text-lg">
                Diseñado para fotografos: simple, rapido y listo para evento.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Crea el evento",
                  d: "Define precio, ciudad y contacto.",
                },
                {
                  n: "02",
                  t: "Sube las fotos",
                  d: "Escaneamos rostros y preparamos la galeria.",
                },
                {
                  n: "03",
                  t: "Publica y vende",
                  d: "Los asistentes buscan con selfie y compran.",
                },
              ].map((s) => (
                <Card key={s.n} className="border-border/60">
                  <CardContent className="p-6">
                    <p className="text-foreground/60 text-xs font-semibold">{s.n}</p>
                    <p className="mt-3 text-lg font-semibold">{s.t}</p>
                    <p className="text-foreground/70 mt-2 text-sm leading-6">{s.d}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="eventos" className="border-border/60 bg-muted/40 border-t py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Hecho para eventos
              </h2>
              <p className="text-foreground/70 mt-4 text-lg">
                Cuando hay muchas personas y muchas fotos, Lensia brilla.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Trophy, title: "Carreras", desc: "Miles de fotos, busqueda instantanea." },
                {
                  icon: GraduationCap,
                  title: "Graduaciones",
                  desc: "Entrega facil para familias.",
                },
                { icon: Heart, title: "Bodas", desc: "Galeria privada, ventas simples." },
                { icon: Camera, title: "Torneos", desc: "Acceso rapido por selfie." },
                {
                  icon: Building2,
                  title: "Corporativo",
                  desc: "Experiencia moderna para equipos.",
                },
              ].map((e) => (
                <Card key={e.title} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="bg-background flex h-10 w-10 items-center justify-center rounded-lg">
                      <e.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold">{e.title}</p>
                    <p className="text-foreground/70 mt-2 text-sm leading-6">{e.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="privacidad" className="border-border/60 border-t py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-5xl">
              <Card className="border-border/60">
                <CardContent className="p-8">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Privacidad y confianza
                      </h2>
                      <p className="text-foreground/70 mt-4">
                        La selfie se usa solo para encontrar coincidencias. No se publica.
                      </p>
                      <ul className="mt-6 space-y-3">
                        {[
                          "Selfies eliminadas despues de cada busqueda",
                          "Sin almacenamiento de datos biometricos",
                          "Control del tiempo online por evento",
                          "Comparticion simple con link o QR",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm">
                            <CheckCircle className="h-4 w-4 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted/40 flex items-center justify-center p-8">
                      <div className="relative">
                        <div className="border-background bg-muted h-40 w-40 rounded-full border-4" />
                        <div className="border-background bg-foreground absolute -right-2 -bottom-2 rounded-full border-2 p-2">
                          <Shield className="text-background h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="comision" className="border-border/60 bg-muted/40 border-t py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Solo comision</h2>
              <p className="text-foreground/70 mt-4 text-lg">
                Publicar es gratis. Pagas cuando vendes.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
              <Card className="border-border/60">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">Gratis para publicar</h3>
                  <p className="text-foreground/70 mt-2 text-sm">
                    Crea eventos, sube fotos y comparte link o QR.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {["Galeria publica", "Busqueda por selfie", "Link y QR"].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-foreground/20">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">20% por venta</h3>
                  <p className="text-foreground/70 mt-2 text-sm">
                    Tu defines el precio por foto. Lensia cobra 20% solo cuando vendes.
                  </p>
                  <Button className="mt-8 w-full" asChild>
                    <Link href="/dashboard/events/new">Empezar</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Entrega moderna. Ventas mas faciles.
              </h2>
              <p className="text-foreground/70 mt-4 text-lg">
                Publica tu galeria y deja que la gente se encuentre.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/dashboard/events/new">
                    Crear mi primer evento <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/dashboard">Ver dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
