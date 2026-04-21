"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronRightIcon,
  CopyIcon,
  DotsHorizontalIcon,
  DownloadIcon,
  ExternalLinkIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import {
  formatDateISO,
  useLensia,
  type LensiaEvent,
  type ProcessingStatus,
} from "@/lib/local-store";
import { cn } from "@/lib/utils";
import { Topbar } from "@/components/shell/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const STATUS_DOT: Record<ProcessingStatus, string> = {
  Listo: "bg-emerald-500",
  Procesando: "bg-amber-500",
  Subiendo: "bg-sky-500",
  "Con errores": "bg-red-500",
  Borrador: "bg-zinc-300",
};

const STATUS_FILTERS: { id: ProcessingStatus | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "Listo", label: "Listo" },
  { id: "Procesando", label: "Procesando" },
  { id: "Subiendo", label: "Subiendo" },
  { id: "Con errores", label: "Con errores" },
  { id: "Borrador", label: "Borrador" },
];

function formatNumber(n: number) {
  return n.toLocaleString("es-HN");
}

function EventRow({
  event,
  onDelete,
  onCopyLink,
}: {
  event: LensiaEvent;
  onDelete: (id: string) => void;
  onCopyLink: (slug: string) => void;
}) {
  return (
    <div className="group relative flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50">
      <span aria-hidden className={cn("size-2 shrink-0 rounded-full", STATUS_DOT[event.status])} />

      <Link
        href={`/dashboard/events/${event.id}/upload`}
        className="flex min-w-0 flex-1 items-center gap-4 focus-visible:outline-none"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-950 decoration-zinc-300 underline-offset-4 group-hover:underline">
            {event.name}
          </p>
          <p className="mt-0.5 truncate text-xs text-zinc-500">
            {event.city} · {formatDateISO(event.date)} · {event.type} · {event.status}
          </p>
        </div>

        <div className="hidden items-center gap-5 text-right sm:flex">
          <div className="w-16">
            <p className="text-sm font-medium text-zinc-950 tabular-nums">
              {formatNumber(event.photosUploaded)}
            </p>
            <p className="text-xs text-zinc-500">fotos</p>
          </div>
          <div className="w-16">
            <p className="text-sm font-medium text-zinc-950 tabular-nums">
              {formatNumber(event.orders)}
            </p>
            <p className="text-xs text-zinc-500">órdenes</p>
          </div>
          <ChevronRightIcon className="size-4 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500" />
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={`Acciones para ${event.name}`}
            className="inline-flex size-8 items-center justify-center rounded-md text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:outline-none data-[state=open]:opacity-100"
          >
            <DotsHorizontalIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onCopyLink(event.slug)}>
            <CopyIcon />
            <span className="ml-2">Copiar link</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>
            <DownloadIcon />
            <span className="ml-2">Descargar QR</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/e/${event.slug}`}>
              <ExternalLinkIcon />
              <span className="ml-2">Ver público</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/events/${event.id}/edit`}>
              <Pencil1Icon />
              <span className="ml-2">Editar</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onDelete(event.id)}>
            <TrashIcon />
            <span className="ml-2">Borrar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function EventsListPage() {
  const { events, actions } = useLensia();
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<ProcessingStatus | "all">("all");
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.slug.toLowerCase().includes(q)
      );
    });
  }, [events, query, statusFilter]);

  const onCopyLink = React.useCallback(async (slug: string) => {
    try {
      const url = `${window.location.origin}/e/${slug}`;
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  }, []);

  return (
    <>
      <Topbar
        title="Eventos"
        subtitle={`${events.length} en total`}
        right={
          <Button size="sm" asChild>
            <Link href="/dashboard/events/new">
              <PlusIcon /> Nuevo evento
            </Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, ciudad o link"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStatusFilter(s.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  statusFilter === s.id
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                )}
              >
                {s.id !== "all" ? (
                  <span className={cn("size-1.5 rounded-full", STATUS_DOT[s.id])} />
                ) : null}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
              {events.length === 0 ? (
                <>
                  <p className="text-sm text-zinc-700">Aún no tienes eventos.</p>
                  <Button size="sm" asChild>
                    <Link href="/dashboard/events/new">Crear mi primer evento</Link>
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-zinc-700">Ningún evento coincide con los filtros.</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setQuery("");
                      setStatusFilter("all");
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {filtered.map((event) => (
                <li key={event.id}>
                  <EventRow event={event} onDelete={setDeleteId} onCopyLink={onCopyLink} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {filtered.length > 0 ? (
          <p className="mt-3 text-xs text-zinc-500">
            Mostrando {filtered.length} de {events.length}
          </p>
        ) : null}
      </div>

      <Dialog open={!!deleteId} onOpenChange={(o) => (!o ? setDeleteId(null) : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrar evento</DialogTitle>
            <DialogDescription>
              Se borrarán también las fotos y órdenes asociadas guardadas localmente.
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
