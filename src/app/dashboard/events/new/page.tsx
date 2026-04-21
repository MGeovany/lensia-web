"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";

import { Topbar } from "@/components/shell/topbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLensia, type EventType } from "@/lib/local-store";
import { DatePicker } from "@/components/forms/date-picker";

export default function NewEventPage() {
  const router = useRouter();
  const { actions } = useLensia();

  const [name, setName] = React.useState("");
  const [type, setType] = React.useState<EventType>("Carrera");
  const [date, setDate] = React.useState("2026-04-20");
  const [city, setCity] = React.useState("");
  const [price, setPrice] = React.useState<number>(80);
  const [onlineDays, setOnlineDays] = React.useState<number>(14);
  const [whatsapp, setWhatsapp] = React.useState("+504 9999-1234");

  return (
    <>
      <Topbar
        title="Crear evento"
        right={
          <Button asChild variant="secondary">
            <Link href="/dashboard">
              <ArrowLeftIcon /> Volver
            </Link>
          </Button>
        }
      />
      <div className="min-h-[calc(100vh-4rem)] w-full px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Informacion del evento</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const id = actions.createEvent({
                    name: name.trim() || "Nuevo evento",
                    type,
                    date,
                    city: city.trim() || "Tegucigalpa",
                    pricePerPhotoHnl: Number.isFinite(price) ? price : 80,
                    onlineDays: Number.isFinite(onlineDays) ? onlineDays : 14,
                    whatsapp: whatsapp.trim() || "+504 9999-1234",
                    coverHint: "",
                  });
                  router.push(`/dashboard/events/${id}/upload`);
                }}
              >
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Nombre del evento</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Carrera 10K San Pedro Sula"
                    className="mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Tipo de evento</Label>
                  <Select value={type} onValueChange={(v) => setType(v as EventType)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Carrera">Carrera</SelectItem>
                      <SelectItem value="Graduacion">Graduacion</SelectItem>
                      <SelectItem value="Boda">Boda</SelectItem>
                      <SelectItem value="Torneo">Torneo</SelectItem>
                      <SelectItem value="Corporativo">Corporativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <DatePicker label="Fecha" value={date} onChange={setDate} />
                </div>
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    placeholder="Ej: Tegucigalpa"
                    className="mt-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio estimado por foto (HNL)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Ej: 80"
                    className="mt-2"
                    value={Number.isFinite(price) ? String(price) : ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="online">Duracion online (dias)</Label>
                  <Input
                    id="online"
                    type="number"
                    placeholder="Ej: 14"
                    className="mt-2"
                    value={Number.isFinite(onlineDays) ? String(onlineDays) : ""}
                    onChange={(e) => setOnlineDays(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp / contacto de ventas</Label>
                  <Input
                    id="whatsapp"
                    placeholder="+504 9999-1234"
                    className="mt-2"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
                <div className="mt-2 flex items-center justify-end gap-2 sm:col-span-2">
                  <Button type="submit">
                    Crear y subir fotos <ArrowRightIcon />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Usa un nombre claro para el QR.",
                "Configura precio por foto para el estimado.",
                "Define cuantos dias estara el evento en linea.",
                "Verifica tu WhatsApp para solicitudes.",
              ].map((t) => (
                <div key={t} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm text-zinc-700">{t}</p>
                </div>
              ))}
              <p className="text-xs leading-5 text-zinc-500">
                Guardado local en tu navegador (por ahora).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
