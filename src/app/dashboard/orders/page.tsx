"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { formatHnl, useLensia, type OrderStatus } from "@/lib/local-store";
import { cn } from "@/lib/utils";
import { Topbar } from "@/components/shell/topbar";
import { Input } from "@/components/ui/input";

const ORDER_BADGE: Record<OrderStatus, string> = {
  Pagado: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Pendiente: "bg-amber-50 text-amber-700 ring-amber-600/10",
  Entregado: "bg-zinc-100 text-zinc-700 ring-zinc-600/10",
};

const STATUS_FILTERS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "Pendiente", label: "Pendientes" },
  { id: "Pagado", label: "Pagadas" },
  { id: "Entregado", label: "Entregadas" },
];

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-HN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function OrdersListPage() {
  const { orders, events } = useLensia();
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | "all">("all");

  const eventById = React.useMemo(() => {
    const map = new Map<string, string>();
    events.forEach((e) => map.set(e.id, e.name));
    return map;
  }, [events]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.clientName.toLowerCase().includes(q) ||
        (eventById.get(o.eventId) ?? "").toLowerCase().includes(q)
      );
    });
  }, [orders, query, statusFilter, eventById]);

  const totals = React.useMemo(() => {
    const gross = filtered.reduce((acc, o) => acc + o.grossTotalHnl, 0);
    const paid = filtered
      .filter((o) => o.status === "Pagado")
      .reduce((acc, o) => acc + o.grossTotalHnl, 0);
    return { gross, paid };
  }, [filtered]);

  return (
    <>
      <Topbar title="Órdenes" subtitle={`${orders.length} en total`} />

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por cliente, orden o evento"
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
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  statusFilter === s.id
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-8 border-y border-zinc-100 py-4 sm:grid-cols-4">
            <div>
              <p className="text-xs tracking-wide text-zinc-500 uppercase">Órdenes</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{filtered.length}</p>
            </div>
            <div>
              <p className="text-xs tracking-wide text-zinc-500 uppercase">Total bruto</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{formatHnl(totals.gross)}</p>
            </div>
            <div>
              <p className="text-xs tracking-wide text-zinc-500 uppercase">Cobrado</p>
              <p className="mt-1 text-xl font-semibold text-emerald-700 tabular-nums">
                {formatHnl(totals.paid)}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-wide text-zinc-500 uppercase">Pendiente</p>
              <p className="mt-1 text-xl font-semibold text-amber-700 tabular-nums">
                {formatHnl(totals.gross - totals.paid)}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-zinc-500">
              {orders.length === 0
                ? "Cuando tus clientes compren fotos, aparecerán aquí."
                : "Ninguna orden coincide con los filtros."}
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {filtered.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50 focus-visible:outline-none"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-zinc-950 decoration-zinc-300 underline-offset-4 group-hover:underline">
                          {order.clientName}
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                            ORDER_BADGE[order.status]
                          )}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {order.id} · {eventById.get(order.eventId) ?? "Evento eliminado"} ·{" "}
                        {order.photoIds.length} fotos · {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-zinc-950 tabular-nums">
                      {formatHnl(order.grossTotalHnl)}
                    </p>
                    <ChevronRightIcon className="size-4 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
