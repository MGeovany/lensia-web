import { Sidebar } from "@/components/shell/sidebar";
import { Footer } from "@/components/footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex w-full flex-1">
        <Sidebar current="dashboard" />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <Footer variant="dashboard" />
    </div>
  );
}
