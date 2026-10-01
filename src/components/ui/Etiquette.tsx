import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";
import type { FormatCreneau } from "@/data/contenu";

/**
 * Etiquette de liste. Regle : pastille = plein (au-dessus des titres),
 * etiquette de liste = doux (docs/HANDOFF.md, "Tons par page").
 *
 * Valeurs du Figma (concepts tons et rythme) :
 *
 *   invitation    fond lavande, texte accent          statut "Sur invitation"
 *   ouvert        contour pointille, texte encre      statut "Ouvert"
 *   doux          voile du ton (bleu 10 % sur Clair,  statut "Temps fort",
 *                 blanc 10 % sur Nuit, blanc 18 %     "Exclusif", ecoles
 *                 sur Electrique), texte du ton
 *   emplacement   fond gris clair, texte encre        medias (logos a fournir)
 *
 * Pas de point. Rayon 999. Taille "liste" : legende 13px en 500, 12/6
 * (statuts, "Exclusif") ou 14/8 en 36px de haut (medias) ; taille "grande" :
 * 17px gras, 20/12, 54px de haut (ecoles).
 */
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
  children,
  className,
}: {
  variante: VarianteEtiquette;
  /** Ton de la surface ou se pose l'etiquette (variante "doux"). */
  ton?: Ton;
  taille?: keyof typeof TAILLES;
  children: ReactNode;
  className?: string;
}) {
  const couleurs = {
    invitation: "bg-[var(--statut-invitation-fond)] text-[var(--statut-invitation-texte)]",
    ouvert: "[border:var(--statut-ouvert-contour)] text-[var(--statut-ouvert-texte)]",
    doux: DOUX[ton],
    emplacement: "bg-[var(--etiquette-emplacement)] text-encre",
  }[variante];

  return (
    <span
      className={cn(
        "rounded-pastille inline-flex items-center whitespace-nowrap",
        TAILLES[taille],
        couleurs,
        className,
      )}
    >
      {children}
    </span>
  );
}

const PAR_FORMAT: Record<FormatCreneau, VarianteEtiquette> = {
  "Sur invitation": "invitation",
  Ouvert: "ouvert",
  "Temps fort": "doux",
};

/** Statut d'un creneau du programme. "Temps fort" se pose sur une carte Nuit. */
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
