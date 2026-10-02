import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";

// figma : pastille du kit, style accent
// toujours pleine, mêmes couleurs que le bouton primaire du ton
const TONS: Record<Ton, string> = {
  clair: "bg-accent text-white",
  nuit: "bg-accent-survol text-white",
  electrique: "bg-white text-accent",
};

export function Pastille({
  ton = "clair",
  point = true,
  children,
  className,
}: {
  ton?: Ton;
  point?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-pastille text-w-legende inline-flex items-center gap-2.5 px-3.5 py-[7px] whitespace-nowrap",
        TONS[ton],
        className,
      )}
    >
      {point && <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-current" />}
      {children}
    </span>
  );
}
