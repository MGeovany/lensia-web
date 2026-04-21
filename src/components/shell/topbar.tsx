"use client";

import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { useLensia } from "@/lib/local-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar({ title, right }: { title: string; right?: React.ReactNode }) {
  const { session, users } = useLensia();
  const me = users.find((u) => u.id === session.userId);

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-6">
        <div className="min-w-0">
          <p className="text-sm text-zinc-700">{me?.name ?? "Lensia"}</p>
          <h1 className="truncate text-lg font-semibold tracking-tight text-zinc-950">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {right}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-10 w-10 p-0" aria-label="Menu">
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/events/new">Crear evento</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>{me?.email ?? ""}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
