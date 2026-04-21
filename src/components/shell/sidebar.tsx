import Link from "next/link";
import { DashboardIcon, PlusIcon, ReaderIcon, ImageIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Brand } from "@/components/brand";

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "bg-zinc-100 text-zinc-950"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
        "focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none"
      )}
    >
      <span className="text-zinc-500">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function Sidebar({ current }: { current?: "dashboard" | "new" | "uploads" | "orders" }) {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-zinc-200 lg:bg-white">
      <div className="p-4">
        <Brand href="/dashboard" />
      </div>
      <nav className="space-y-1 px-2 pb-4">
        <NavItem
          href="/dashboard"
          label="Dashboard"
          icon={<DashboardIcon />}
          active={current === "dashboard"}
        />
        <NavItem
          href="/dashboard/events/new"
          label="Crear evento"
          icon={<PlusIcon />}
          active={current === "new"}
        />
        <NavItem
          href="/dashboard"
          label="Ordenes"
          icon={<ReaderIcon />}
          active={current === "orders"}
        />
        <NavItem
          href="/dashboard"
          label="Subidas"
          icon={<ImageIcon />}
          active={current === "uploads"}
        />
      </nav>
      <div className="mt-auto p-4" />
    </aside>
  );
}
