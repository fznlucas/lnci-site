import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Ton = "date" | "invitation" | "complet" | "ouvert";

/**
 * Pastille de date et de statut. Charte page 12, rayon 999.
 */
export function Pastille({
  ton = "date",
  children,
  className,
}: {
  ton?: Ton;
  children: ReactNode;
  className?: string;
}) {
  const tons: Record<Ton, string> = {
    date: "bg-nuit text-white",
    invitation: "bg-champ text-accent",
    complet: "bg-accent text-white",
    ouvert: "border border-dashed border-filet text-legende",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pastille px-3.5 py-1.5 text-[0.9375rem] font-bold",
        tons[ton],
        className,
      )}
    >
      {children}
    </span>
  );
}
