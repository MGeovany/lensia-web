"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { Brand } from "@/components/brand";
import { Footer } from "@/components/footer";
import { useLensia } from "@/lib/local-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResultsClient, type ResultPhoto } from "@/components/search/results-client";

function buildResultPhotos(ids: string[]): ResultPhoto[] {
  return ids.map((id, idx) => {
    const n = idx + 1;
    const score = n <= 8 ? 0.94 - n * 0.03 : n <= 14 ? 0.72 - (n - 8) * 0.03 : undefined;
    return {
      id,
      label: n <= 8 ? "Posible coincidencia" : n <= 14 ? "Similar" : "Explorar",
      matchScore: score,
    };
  });
}

export default function ResultsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const { events, photos, actions } = useLensia();
  const event = events.find((e) => e.slug === slug) ?? null;

  const eventPhotos = React.useMemo(
    () => photos.filter((p) => p.eventId === event?.id),
    [photos, event?.id]
  );

  React.useEffect(() => {
    if (!event) return;
    actions.incrementSelfieSearch(event.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.id]);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <Brand />
        <p className="mt-6 text-lg font-semibold text-zinc-950">Evento no encontrado</p>
        <p className="mt-2 text-sm text-zinc-700">Slug: {slug}</p>
        <div className="mt-6">
          <Button asChild variant="secondary">
            <Link href="/">Volver</Link>
          </Button>
        </div>
      </div>
    );
  }

  const ids =
    eventPhotos.length > 0
      ? eventPhotos.map((p) => p.id).slice(0, 24)
      : Array.from({ length: 24 }).map((_, i) => `g_${event.slug}_${i + 1}`);

  const results = buildResultPhotos(ids);

  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Brand />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-zinc-950">{event.name}</p>
              <p className="text-xs text-zinc-700">Resultados de coincidencia</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info">Watermark</Badge>
            <Button asChild variant="secondary">
              <Link href={`/e/${event.slug}`}>
                <ArrowLeftIcon /> Volver
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Tus posibles fotos
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-700">
            Selecciona las que quieres comprar o solicitar por WhatsApp.
          </p>
        </div>

        <div className="mt-6">
          <ResultsClient
            photos={results}
            pricePerPhotoHnl={event.pricePerPhotoHnl}
            whatsapp={event.whatsapp}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
