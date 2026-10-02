import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";
import type { FormatCreneau } from "@/data/contenu";

// règle : pastille pleine au-dessus des titres, étiquette de liste douce
// (docs/CHARTE-ET-MAQUETTE.md, « Tons par page »)
// chaque variante fixe fond et texte, rien n'est hérité de la section
export type VarianteEtiquette = "invitation" | "ouvert" | "doux" | "emplacement";

const DOUX: Record<Ton, string> = {
  clair: "bg-[var(--etiquette-doux-clair)] text-accent",
  nuit: "bg-[var(--etiquette-doux-nuit)] text-white",
  electrique: "bg-[var(--etiquette-doux-electrique)] text-white",
};

const TAILLES = {
  statut: "text-w-legende px-3 py-1.5",
  media: "text-w-legende min-h-9 px-3.5 py-2",
  grande: "text-w-courant min-h-[54px] px-5 py-3 font-bold",
};

export function Etiquette({
  variante,
  ton = "clair",
  taille = "statut",
  href,
  children,
  className,
}: {
  variante: VarianteEtiquette;
  /** ton de la surface, ne sert qu'à la variante doux */
  ton?: Ton;
  taille?: keyof typeof TAILLES;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const couleurs = {
    invitation: "bg-[var(--statut-invitation-fond)] text-[var(--statut-invitation-texte)]",
    ouvert: "[border:var(--statut-ouvert-contour)] text-[var(--statut-ouvert-texte)]",
    doux: DOUX[ton],
    emplacement: "bg-[var(--etiquette-emplacement)] text-encre",
  }[variante];

  const classes = cn(
    "rounded-pastille inline-flex items-center whitespace-nowrap no-underline",
    TAILLES[taille],
    className,
    // après className pour qu'un appelant ne les écrase pas par mégarde
    couleurs,
  );

  if (href) {
    const externe = href.startsWith("http");
    return (
      <a
        href={href}
        className={cn(classes, "transition-opacity hover:opacity-80")}
        {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return <span className={classes}>{children}</span>;
}

const PAR_FORMAT: Record<FormatCreneau, VarianteEtiquette> = {
  "Sur invitation": "invitation",
  Ouvert: "ouvert",
  "Temps fort": "doux",
};

// statut d'un créneau du programme, « Temps fort » est posé sur une carte Nuit
export function Statut({ format, className }: { format: FormatCreneau; className?: string }) {
  return (
    <Etiquette
      variante={PAR_FORMAT[format]}
      ton={format === "Temps fort" ? "nuit" : "clair"}
      className={className}
    >
      {format}
    </Etiquette>
  );
}
