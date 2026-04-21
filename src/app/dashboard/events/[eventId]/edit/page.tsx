"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

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

export default function EditEventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { events } = useLensia();
  const { eventId } = React.use(params);
  const event = events.find((e) => e.id === eventId) ?? null;

  if (!event) {
    return (
      <>
        <Topbar
          title="Editar evento"
          right={
            <Button asChild variant="secondary">
              <Link href="/dashboard">
                <ArrowLeftIcon /> Volver
              </Link>
            </Button>
          }
        />
        <div className="w-full px-6 py-10">
          <p className="text-sm text-zinc-700">Evento no encontrado.</p>
        </div>
      </>
    );
  }

  return <EditEventForm key={event.id} eventId={event.id} />;
}

function EditEventForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { events, actions } = useLensia();
  const event = events.find((e) => e.id === eventId)!;

  const [name, setName] = React.useState(event.name);
  const [type, setType] = React.useState<EventType>(event.type);
  const [date, setDate] = React.useState(event.date);
  const [city, setCity] = React.useState(event.city);
  const [price, setPrice] = React.useState<number>(event.pricePerPhotoHnl);
  const [onlineDays, setOnlineDays] = React.useState<number>(event.onlineDays);
  const [whatsapp, setWhatsapp] = React.useState(event.whatsapp);

  return (
    <>
      <Topbar
        title="Editar evento"
        right={
          <Button asChild variant="secondary">
            <Link href="/dashboard">
              <ArrowLeftIcon /> Volver
            </Link>
          </Button>
        }
      />
      <div className="w-full px-6 py-6">
        <Card>
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                actions.updateEvent(event.id, {
                  name: name.trim() || event.name,
                  type,
                  date,
                  city: city.trim() || event.city,
                  pricePerPhotoHnl: Number.isFinite(price) ? price : event.pricePerPhotoHnl,
                  onlineDays: Number.isFinite(onlineDays) ? onlineDays : event.onlineDays,
                  whatsapp: whatsapp.trim() || event.whatsapp,
                });
                router.push("/dashboard");
              }}
            >
              <div className="sm:col-span-2">
                <Label htmlFor="name">Nombre del evento</Label>
                <Input
                  id="name"
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
                  className="mt-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="price">Precio por foto (HNL)</Label>
                <Input
                  id="price"
                  type="number"
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
                  className="mt-2"
                  value={Number.isFinite(onlineDays) ? String(onlineDays) : ""}
                  onChange={(e) => setOnlineDays(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  className="mt-2"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 sm:col-span-2">
                <Button variant="secondary" asChild>
                  <Link href={`/dashboard/events/${event.id}/upload`}>Ir a subida</Link>
                </Button>
                <Button type="submit">Guardar cambios</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
