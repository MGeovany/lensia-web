"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  GraduationCap,
  Heart,
  Menu,
  QrCode,
  Search,
  Shield,
  Trophy,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <header className="border-border/40 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">Lensia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#como-funciona"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Cómo funciona
            </Link>
            <Link
              href="#comision"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Comisión
            </Link>
            <Link
              href="#eventos"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Eventos
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Empezar gratis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-border/40 bg-background border-t px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="#como-funciona" className="text-muted-foreground text-sm">
                Cómo funciona
              </Link>
              <Link href="#comision" className="text-muted-foreground text-sm">
                Comisión
              </Link>
              <Link href="#eventos" className="text-muted-foreground text-sm">
                Eventos
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard">Empezar gratis</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="from-muted/50 via-background to-background absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Encuentra y vende fotos de eventos con una selfie
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl">
              Sube las fotos de tu evento, comparte un link y deja que tus clientes encuentren sus
              fotos en segundos con una selfie.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/dashboard">
                  Crear mi primer evento
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/evento/1">Ver ejemplo</Link>
              </Button>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Sin tarjeta de crédito • Sin suscripción
            </p>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="border-border/50 bg-card rounded-2xl border p-2 shadow-2xl shadow-black/5">
              <div className="bg-muted aspect-video overflow-hidden rounded-xl">
                <div className="flex h-full items-center justify-center">
                  <div className="grid grid-cols-3 gap-3 p-8 sm:grid-cols-4 md:grid-cols-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="from-muted-foreground/10 to-muted-foreground/5 aspect-square rounded-lg bg-gradient-to-br"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform">
              <div className="border-border bg-background flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg">
                <div className="bg-muted h-8 w-8 rounded-full" />
                <span className="text-sm font-medium">12 fotos encontradas</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="border-border/40 bg-muted/30 border-t py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Así de simple funciona
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Tres pasos para transformar la entrega de fotos de tus eventos
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Upload,
                step: "01",
                title: "Sube tus fotos",
                description:
                  "Arrastra y suelta las fotos de tu evento. Lensia las organiza en una galeria lista para compartir.",
              },
              {
                icon: QrCode,
                step: "02",
                title: "Comparte el link",
                description:
                  "Genera un QR o link único para tu evento. Compártelo en redes, WhatsApp o impreso en el venue.",
              },
              {
                icon: Search,
                step: "03",
                title: "Tus clientes buscan",
                description:
                  "Cada persona sube una selfie y ve coincidencias sugeridas. Tu recibes las solicitudes de compra.",
              },
            ].map((item) => (
              <Card key={item.step} className="border-border/50 bg-card relative overflow-hidden">
                <CardContent className="p-8">
                  <span className="text-muted absolute top-6 right-6 text-6xl font-bold">
                    {item.step}
                  </span>
                  <div className="bg-foreground mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                    <item.icon className="text-background h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Por qué los fotógrafos eligen Lensia
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Ahorra tiempo, vende más y ofrece una experiencia increíble
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Ahorra horas de trabajo",
                description:
                  "Olvídate de organizar y enviar fotos manualmente. Tus clientes encuentran las suyas solos.",
              },
              {
                icon: Users,
                title: "Más ventas, menos esfuerzo",
                description:
                  "Cuando es fácil encontrar sus fotos, más personas las compran. Así de simple.",
              },
              {
                icon: Shield,
                title: "Privacidad garantizada",
                description:
                  "Las selfies solo se usan para la búsqueda y se eliminan inmediatamente después.",
              },
              {
                icon: QrCode,
                title: "Tu marca, tu estilo",
                description:
                  "Personaliza la galería con tu logo y colores. Los clientes te recuerdan.",
              },
              {
                icon: CheckCircle,
                title: "Sin conocimientos técnicos",
                description:
                  "Si puedes subir una foto a WhatsApp, puedes usar Lensia. Es así de fácil.",
              },
              {
                icon: Search,
                title: "Busqueda por selfie",
                description:
                  "Tus clientes suben una selfie y ven coincidencias sugeridas dentro del evento.",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="group border-border/50 bg-card hover:border-border rounded-2xl border p-6 transition-all hover:shadow-lg"
              >
                <div className="bg-muted mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                  <benefit.icon className="text-foreground h-5 w-5" />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section id="eventos" className="border-border/40 bg-muted/30 border-t py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Perfecto para todo tipo de eventos
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Desde carreras hasta bodas, Lensia se adapta a cualquier ocasión
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Trophy,
                name: "Carreras y maratones",
                example: "Carrera 10K San Pedro Sula",
                tag: "Deporte",
                tint: "from-emerald-500/15 via-transparent to-transparent dark:from-emerald-400/10",
                iconBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
              },
              {
                icon: GraduationCap,
                name: "Graduaciones",
                example: "Graduación Unitec 2026",
                tag: "Academia",
                tint: "from-sky-500/15 via-transparent to-transparent dark:from-sky-400/10",
                iconBg: "bg-sky-500/10 text-sky-700 dark:text-sky-200",
              },
              {
                icon: Heart,
                name: "Bodas y celebraciones",
                example: "Boda Ana & Luis",
                tag: "Social",
                tint: "from-rose-500/15 via-transparent to-transparent dark:from-rose-400/10",
                iconBg: "bg-rose-500/10 text-rose-700 dark:text-rose-200",
              },
              {
                icon: Building2,
                name: "Eventos corporativos",
                example: "Conferencia TechHN 2026",
                tag: "Marca",
                tint: "from-violet-500/15 via-transparent to-transparent dark:from-violet-400/10",
                iconBg: "bg-violet-500/10 text-violet-700 dark:text-violet-200",
              },
            ].map((event) => (
              <Card
                key={event.name}
                className="group border-border/50 bg-card/70 hover:border-border relative overflow-hidden py-0 transition-all hover:-translate-y-0.5"
              >
                <div
                  className={`pointer-events-none absolute -inset-px bg-gradient-to-br ${event.tint}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.07)_1px,transparent_0)] [background-size:18px_18px] opacity-20 dark:opacity-10" />
                <CardContent className="relative p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`border-border/60 flex h-12 w-12 items-center justify-center rounded-xl border ${event.iconBg}`}
                    >
                      <event.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="bg-background/60">
                      {event.tag}
                    </Badge>
                  </div>
                  <h3 className="mt-6 font-semibold">{event.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{event.example}</p>
                  <div className="text-muted-foreground mt-6 flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-2">
                      <span className="bg-foreground/30 h-1.5 w-1.5 rounded-full" />
                      Link compartible
                    </span>
                    <span className="bg-foreground/20 h-1 w-1 rounded-full" />
                    <span className="inline-flex items-center gap-2">
                      <span className="bg-foreground/30 h-1.5 w-1.5 rounded-full" />
                      Venta por foto
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl">
            <Card className="border-border/50 bg-card overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 lg:p-12">
                    <div className="bg-foreground mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                      <Shield className="text-background h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      Tu privacidad es nuestra prioridad
                    </h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      Las selfies que suben las personas se usan únicamente para la búsqueda y se
                      eliminan inmediatamente después. No almacenamos datos biométricos ni
                      compartimos información con terceros.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "Selfies eliminadas después de cada búsqueda",
                        "Uso limitado a la búsqueda en el evento",
                        "No vendemos tu información",
                        "Soporte para solicitudes de eliminación",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/50 flex items-center justify-center p-8 lg:p-12">
                    <div className="relative">
                      <div className="border-background bg-muted h-48 w-48 rounded-full border-4 shadow-xl" />
                      <div className="border-background absolute -right-2 -bottom-2 rounded-full border-2 bg-green-600 p-2">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commission */}
      <section id="comision" className="border-border/40 bg-muted/30 border-t py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ganamos cuando tú ganas
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              No te cobramos nada adicional. Simplemente ganamos cuando tú vendes.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
            <Card className="border-border/50 bg-card">
              <CardContent className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Comisión del 20%</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Tú defines el precio por foto. Nosotros tomamos el 20% de cada venta.
                    </p>
                  </div>
                  <Badge className="bg-foreground text-background">20%</Badge>
                </div>

                <div className="border-border/60 bg-background/60 mt-6 rounded-xl border p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground text-sm">Ejemplo</span>
                    <span className="text-muted-foreground text-sm">Por foto</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Precio</div>
                      <div className="mt-1 font-semibold">$5.00</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Comisión</div>
                      <div className="mt-1 font-semibold">$1.00</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Recibes</div>
                      <div className="mt-1 font-semibold">$4.00</div>
                    </div>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {[
                    "Sin suscripción ni contratos",
                    "Sin costo de configuración",
                    "Sin cobros extra por evento",
                    "Te quedas con el control del precio",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold">Empieza hoy</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Crea tu evento, sube tus fotos y comparte el link. Si hay ventas, nos va bien a
                  ambos.
                </p>
                <div className="mt-8 grid gap-3">
                  <Button asChild>
                    <Link href="/dashboard">Crear mi primer evento</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#como-funciona">Ver cómo funciona</Link>
                  </Button>
                </div>

                <div className="border-border/60 bg-muted/40 mt-8 rounded-xl border p-5 text-sm">
                  <div className="font-medium">Transparencia</div>
                  <div className="text-muted-foreground mt-2">
                    La comisión se aplica solo a ventas completadas. Si no vendes, no pagas.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Transforma la forma en que entregas fotos
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Convierte tus galerías en una experiencia rápida para tus clientes y en ventas para
              ti.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Crear mi primer evento
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/evento/1">Ver ejemplo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/40 bg-muted/30 border-t py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Lensia</span>
            </div>
            <div className="text-muted-foreground flex gap-6 text-sm">
              <Link href="/terminos" className="hover:text-foreground transition-colors">
                Términos
              </Link>
              <Link href="/privacidad" className="hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link href="/contacto" className="hover:text-foreground transition-colors">
                Contacto
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 Lensia. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
