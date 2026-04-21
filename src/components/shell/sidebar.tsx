"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, PlusIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useLensia } from "@/lib/local-store";
import { Brand } from "@/components/brand";

type NavId = "home" | "new";

const NAV: { id: NavId; href: string; label: string; icon: React.ReactNode }[] = [
  { id: "home", href: "/dashboard", label: "Inicio", icon: <HomeIcon /> },
  { id: "new", href: "/dashboard/events/new", label: "Crear evento", icon: <PlusIcon /> },
];

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        "focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
        active ? "bg-zinc-100 text-zinc-950" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
      )}
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center transition-colors",
          active ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-700"
        )}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function UserPill() {
  const { session, users } = useLensia();
  const me = users.find((u) => u.id === session.userId);
  if (!me) return null;

  const initials = me.name
    .split(" ")
    .flatMap((p) => (p[0] ? [p[0]] : []))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2">
      <span className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
        {initials}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-zinc-950">{me.name}</p>
        <p className="truncate text-xs text-zinc-500">{me.email}</p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  const activeId: NavId = pathname?.startsWith("/dashboard/events/new") ? "new" : "home";

  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-zinc-200 lg:bg-white">
      <div className="px-5 pt-6 pb-4">
        <Brand href="/dashboard" />
      </div>
      <nav className="flex flex-col gap-0.5 px-3">
        {NAV.map((item) => (
          <NavItem
            key={item.id}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={activeId === item.id}
          />
        ))}
      </nav>
      <div className="mt-auto border-t border-zinc-100 p-3">
        <UserPill />
      </div>
    </aside>
  );
}
