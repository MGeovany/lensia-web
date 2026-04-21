"use client";

import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LensiaProvider } from "@/lib/local-store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LensiaProvider>
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    </LensiaProvider>
  );
}
