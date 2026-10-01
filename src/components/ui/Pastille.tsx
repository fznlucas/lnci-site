import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";

/**
 * Pastille. Composant Pastille du kit Figma, style Accent.
 *
 * Toutes les pastilles du site sont pleines, de la couleur du bouton
 * primaire du ton ou elles se posent (variables action/fond et
 * action/texte) : accent sur Clair, accent-survol sur Nuit, blanc sur
 * Electrique. Un point de 7px, de la couleur du texte, ouvre le libelle.
 * Rayon 999, legende 13px en 500.
 */
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
