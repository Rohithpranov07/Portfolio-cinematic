"use client";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

export function SectionWrapper({ children, className, id, fullHeight }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full px-6 md:px-12 lg:px-20 xl:px-28",
        fullHeight && "min-h-screen",
        className
      )}
    >
      {children}
    </section>
  );
}
