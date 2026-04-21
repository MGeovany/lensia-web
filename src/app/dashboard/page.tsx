"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  DotsHorizontalIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { commissionHnl, formatDateISO, formatHnl, useLensia } from "@/lib/local-store";
import { Topbar } from "@/components/shell/topbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function statusLabel(status: string) {
  if (status === "Listo") return "Listo";
  if (status === "Procesando") return "Procesando";
  if (status === "Subiendo") return "Subiendo";
  if (status === "Con errores") return "Con errores";
  return "Borrador";
}

export default function DashboardPage() {
  const { events, orders, actions } = useLensia();
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const totals = React.useMemo(() => {
    return events.reduce(
      (acc, e) => {
        acc.photos += e.photosUploaded;
        acc.searches += e.selfieSearches;
        acc.orders += e.orders;
        acc.gross += e.revenueGrossHnl;
        return acc;
      },
      { photos: 0, searches: 0, orders: 0, gross: 0 }
    );
  }, [events]);

  const fee = commissionHnl(totals.gross);
  const net = Math.max(0, totals.gross - fee);

  async function onCopyPublicLink(slug: string) {
    const url = `${window.location.origin}/e/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  }

  return (
    <>
      <Topbar
        title="Dashboard"
        right={
          <Button asChild>
            <Link href="/dashboard/events/new">
              <PlusIcon /> Nuevo evento
            </Link>
          </Button>
        }
      />

      <div className="w-full px-6 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Fotos subidas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-zinc-950">
                {totals.photos.toLocaleString("es-HN")}
              </p>
              <p className="mt-1 text-sm text-zinc-700">En todos tus eventos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Busquedas por selfie</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-zinc-950">
                {totals.searches.toLocaleString("es-HN")}
              </p>
              <p className="mt-1 text-sm text-zinc-700">Coincidencias por rostro</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ventas / solicitudes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-zinc-950">
                {totals.orders.toLocaleString("es-HN")}
              </p>
              <p className="mt-1 text-sm text-zinc-700">Ordenes totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ingresos (estimado)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight text-zinc-950">
                {formatHnl(net)}
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                Bruto {formatHnl(totals.gross)} · Comision Lensia {formatHnl(fee)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="mt-8">
          <TabsList>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="orders">Ordenes</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="grid gap-4 lg:grid-cols-2">
              {events.map((e) => (
                <Card key={e.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <CardTitle className="truncate">{e.name}</CardTitle>
                        <p className="mt-1 text-sm text-zinc-700">
                          {e.city} · {formatDateISO(e.date)} · {e.type} · {statusLabel(e.status)}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center text-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none"
                            aria-label="Acciones"
                          >
                            <DotsHorizontalIcon />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => void onCopyPublicLink(e.slug)}>
                            <CopyIcon />
                            <span className="ml-2">Copiar link</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => {}}>
                            <DownloadIcon />
                            <span className="ml-2">Descargar QR</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${e.id}/edit`}>
                              <Pencil1Icon />
                              <span className="ml-2">Editar</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setDeleteId(e.id)}>
                            <TrashIcon />
                            <span className="ml-2">Borrar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-zinc-500">Fotos</p>
                        <p className="mt-1 text-sm font-semibold text-zinc-950">
                          {e.photosUploaded.toLocaleString("es-HN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Procesadas</p>
                        <p className="mt-1 text-sm font-semibold text-zinc-950">
                          {e.photosProcessed.toLocaleString("es-HN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Selfies</p>
                        <p className="mt-1 text-sm font-semibold text-zinc-950">
                          {e.selfieSearches.toLocaleString("es-HN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Ordenes</p>
                        <p className="mt-1 text-sm font-semibold text-zinc-950">
                          {e.orders.toLocaleString("es-HN")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Button asChild>
                          <Link href={`/dashboard/events/${e.id}/upload`}>
                            Subir fotos <ArrowRightIcon />
                          </Link>
                        </Button>
                        <Button asChild variant="secondary">
                          <Link href={`/e/${e.slug}`}>
                            <ExternalLinkIcon /> Ver publico
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {events.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Sin eventos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-700">
                      Crea tu primer evento para publicar la galeria.
                    </p>
                    <div className="mt-4">
                      <Button asChild>
                        <Link href="/dashboard/events/new">Crear evento</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid gap-4 lg:grid-cols-2">
              {orders.map((o) => (
                <Card key={o.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle>Orden {o.id}</CardTitle>
                        <p className="mt-1 text-sm text-zinc-700">{o.clientName}</p>
                      </div>
                      <Badge
                        variant={
                          o.status === "Pagado"
                            ? "success"
                            : o.status === "Entregado"
                              ? "neutral"
                              : "warning"
                        }
                      >
                        {o.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-zinc-700">
                        {o.photoIds.length} fotos · Total {formatHnl(o.grossTotalHnl)}
                      </p>
                      <Button asChild variant="secondary">
                        <Link href={`/dashboard/orders/${o.id}`}>Ver detalle</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!deleteId} onOpenChange={(o) => (!o ? setDeleteId(null) : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrar evento</DialogTitle>
            <DialogDescription>
              Se borraran tambien las fotos y ordenes asociadas guardadas localmente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!deleteId) return;
                actions.deleteEvent(deleteId);
                setDeleteId(null);
              }}
            >
              Borrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
