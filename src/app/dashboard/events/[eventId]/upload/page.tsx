"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeftIcon, UploadIcon } from "@radix-ui/react-icons";

import { formatDateISO, formatHnl, useLensia } from "@/lib/local-store";
import { Topbar } from "@/components/shell/topbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function statusVariant(status: string) {
  if (status === "Listo") return "success" as const;
  if (status === "Procesando" || status === "Subiendo") return "info" as const;
  if (status === "Con errores") return "danger" as const;
  return "neutral" as const;
}

export default function UploadPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = React.use(params);
  const { events, photos, actions } = useLensia();
  const event = events.find((e) => e.id === eventId) ?? null;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const eventPhotos = React.useMemo(
    () => photos.filter((p) => p.eventId === eventId),
    [photos, eventId]
  );

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-lg font-semibold text-zinc-950">Evento no encontrado</p>
        <p className="mt-2 text-sm text-zinc-700">ID: {eventId}</p>
        <div className="mt-6">
          <Button asChild variant="secondary">
            <Link href="/dashboard">
              <ArrowLeftIcon /> Volver al dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const uploadPct = event.photosUploaded > 0 ? 100 : 0;
  const processingPct =
    event.photosUploaded === 0
      ? 0
      : Math.round((event.photosProcessed / Math.max(1, event.photosUploaded)) * 100);

  const errors = eventPhotos.filter((p) => p.status === "Error").length;

  return (
    <>
      <Topbar
        title="Subida de fotos"
        right={
          <Button asChild variant="secondary">
            <Link href="/dashboard">
              <ArrowLeftIcon /> Volver
            </Link>
          </Button>
        }
      />
      <div className="w-full px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subir fotos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-zinc-200 bg-white text-zinc-700">
                    <UploadIcon />
                  </div>
                  <p className="mt-4 text-sm font-medium text-zinc-950">Drag & drop</p>
                  <p className="mt-1 text-sm text-zinc-700">
                    Selecciona archivos. Se guardan localmente como lista (sin subir a un servidor).
                  </p>
                  <div className="mt-5 flex justify-center gap-2">
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (!e.target.files || e.target.files.length === 0) return;
                        actions.addPhotos(event.id, e.target.files);
                        // reset so selecting same files again triggers change
                        e.target.value = "";
                      }}
                    />
                    <Button variant="secondary" onClick={() => inputRef.current?.click()}>
                      Seleccionar archivos
                    </Button>
                    <Button onClick={() => actions.markProcessed(event.id)}>Procesar ahora</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900">Carga</p>
                    <p className="text-sm text-zinc-700">{uploadPct}%</p>
                  </div>
                  <div className="mt-2">
                    <Progress value={uploadPct} />
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    {event.photosUploaded.toLocaleString("es-HN")} fotos registradas
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900">Procesamiento</p>
                    <p className="text-sm text-zinc-700">{processingPct}%</p>
                  </div>
                  <div className="mt-2">
                    <Progress value={processingPct} />
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                      <p className="text-xs text-zinc-500">Procesadas</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-950">
                        {event.photosProcessed.toLocaleString("es-HN")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                      <p className="text-xs text-zinc-500">Rostros</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-950">
                        {event.facesDetected.toLocaleString("es-HN")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                      <p className="text-xs text-zinc-500">Errores</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-950">{errors}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-900">Ultimos archivos</p>
                  <div className="mt-3 divide-y divide-zinc-200 rounded-2xl border border-zinc-200">
                    {eventPhotos.slice(0, 8).map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-4 p-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-950">{p.filename}</p>
                          <p className="mt-0.5 text-xs text-zinc-500">{p.id}</p>
                        </div>
                        <Badge
                          variant={
                            p.status === "Processed"
                              ? "success"
                              : p.status === "Error"
                                ? "danger"
                                : "info"
                          }
                        >
                          {p.status === "Processed"
                            ? "Procesada"
                            : p.status === "Error"
                              ? "Error"
                              : "Subida"}
                        </Badge>
                      </div>
                    ))}
                    {eventPhotos.length === 0 ? (
                      <div className="p-3">
                        <p className="text-sm text-zinc-700">Aun no has seleccionado fotos.</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-zinc-500">Evento</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-950">{event.name}</p>
                  <p className="mt-1 text-sm text-zinc-700">
                    {event.city} · {formatDateISO(event.date)}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs text-zinc-500">Precio por foto</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-950">
                      {formatHnl(event.pricePerPhotoHnl)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs text-zinc-500">Online</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-950">
                      {event.onlineDays} dias
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-700">Estado</p>
                  <Badge variant={statusVariant(event.status)}>{event.status}</Badge>
                </div>
                <div className="pt-2">
                  <Button asChild className="w-full">
                    <Link href={`/e/${event.slug}`}>Abrir evento publico</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`/dashboard/events/${event.id}/edit`}>Editar evento</Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`/e/${event.slug}`}>Ver publico</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
