"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChatBubbleIcon,
  DownloadIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

import { formatHnl, useLensia } from "@/lib/local-store";
import { photoGradient } from "@/lib/photo";
import { Topbar } from "@/components/shell/topbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = React.use(params);
  const { orders, events, actions } = useLensia();
  const order = orders.find((o) => o.id === orderId) ?? null;
  const event = order ? (events.find((e) => e.id === order.eventId) ?? null) : null;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-lg font-semibold text-zinc-950">Orden no encontrada</p>
        <p className="mt-2 text-sm text-zinc-700">ID: {orderId}</p>
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

  return (
    <>
      <Topbar
        title={`Orden ${order.id}`}
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
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>Cliente</CardTitle>
                  <p className="mt-1 text-sm text-zinc-700">{order.clientName}</p>
                  <p className="mt-1 text-sm text-zinc-700">{order.whatsapp}</p>
                  {event ? (
                    <p className="mt-2 text-sm text-zinc-700">
                      Evento: <span className="font-medium text-zinc-950">{event.name}</span>
                    </p>
                  ) : null}
                </div>
                <Badge
                  variant={
                    order.status === "Pagado"
                      ? "success"
                      : order.status === "Entregado"
                        ? "neutral"
                        : "warning"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-zinc-900">Fotos seleccionadas</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {order.photoIds.map((pid) => (
                  <div
                    key={pid}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                  >
                    <div className="aspect-[4/3]" style={{ backgroundImage: photoGradient(pid) }} />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-zinc-950">
                        Foto {pid.toUpperCase()}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">Seleccion del cliente</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs text-zinc-500">Total</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                    {formatHnl(order.grossTotalHnl)}
                  </p>
                  <p className="mt-1 text-sm text-zinc-700">{order.photoIds.length} fotos</p>
                </div>

                <Button asChild className="w-full">
                  <Link
                    href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                  >
                    <ChatBubbleIcon /> Abrir WhatsApp
                  </Link>
                </Button>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    actions.updateOrder(order.id, { status: "Pagado" });
                  }}
                >
                  <CheckCircledIcon /> Marcar como pagado
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    actions.updateOrder(order.id, { status: "Entregado" });
                  }}
                >
                  <DownloadIcon /> Marcar como entregado
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
