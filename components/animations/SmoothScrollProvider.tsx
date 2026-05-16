"use client";

import { useLenis } from "@/hooks/useLenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
