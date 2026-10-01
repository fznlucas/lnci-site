import type { Ton } from "@/components/ui/Bouton";

/**
 * Classes de chaque ton (Nuit, Clair, Electrique), partagees par les
 * sections qui acceptent une prop `ton`. Le ton d'une section se regle page
 * par page (docs/HANDOFF.md, "Tons par page") : Nuit et Clair partout,
 * Electrique uniquement sur /hackathon.
 */

/** Fond de section et couleur de texte par defaut. */
export const FOND: Record<Ton, string> = {
  nuit: "bg-nuit text-sur-nuit",
  clair: "bg-page text-encre",
  electrique: "fond-electrique text-white",
};

/** Texte courant (chapeaux, textes de carte poses sur le fond). */
export const COURANT: Record<Ton, string> = {
  nuit: "text-sur-nuit-body",
  clair: "text-texte-courant",
  electrique: "text-sur-electrique",
};

/** Legendes et notes. */
export const LEGENDE: Record<Ton, string> = {
  nuit: "text-sur-nuit-legende",
  clair: "text-legende",
  electrique: "text-sur-electrique",
};

/** Titre plein (h3 de carte, valeurs chiffrees). */
export const PLEIN: Record<Ton, string> = {
  nuit: "text-sur-nuit",
  clair: "text-encre",
  electrique: "text-white",
};

/** Sur-titre et numeros en couleur d'accent. */
export const ACCENT: Record<Ton, string> = {
  nuit: "text-accent-clair",
  clair: "text-accent",
  electrique: "text-white",
};

/**
 * Carte pleine posee sur le fond (surface/carte du kit) : blanche avec
 * bordure sur Clair, nuit-haut sur Nuit. Sur Electrique, les cartes sont
 * blanches (regle des cartes numerotees du handoff).
 */
export const CARTE: Record<Ton, string> = {
  nuit: "bg-nuit-haut",
  clair: "bg-white border border-bordure",
  electrique: "bg-white",
};

/** Ton du contenu d'une carte : une carte blanche se lit comme du Clair. */
export const TON_CARTE: Record<Ton, Ton> = { nuit: "nuit", clair: "clair", electrique: "clair" };

/** Filet pointille pose sur le fond (chiffres, listes). */
export const FILET: Record<Ton, string> = {
  nuit: "border-white/25",
  clair: "border-accent-detail/60",
  electrique: "border-white/35",
};
