import type { Ton } from "@/components/ui/Bouton";

// Nuit et Clair partout, Électrique uniquement sur /hackathon
// (docs/CHARTE-ET-MAQUETTE.md, « Tons par page »)

export const FOND: Record<Ton, string> = {
  nuit: "bg-nuit text-sur-nuit",
  clair: "bg-page text-encre",
  electrique: "fond-electrique text-white",
};

export const COURANT: Record<Ton, string> = {
  nuit: "text-sur-nuit-body",
  clair: "text-texte-courant",
  electrique: "text-sur-electrique",
};

export const LEGENDE: Record<Ton, string> = {
  nuit: "text-sur-nuit-legende",
  clair: "text-legende",
  electrique: "text-sur-electrique",
};

export const PLEIN: Record<Ton, string> = {
  nuit: "text-sur-nuit",
  clair: "text-encre",
  electrique: "text-white",
};

export const ACCENT: Record<Ton, string> = {
  nuit: "text-accent-clair",
  clair: "text-accent",
  electrique: "text-white",
};

// figma : surface/carte ; cartes blanches sur Électrique (règle des cartes numérotées)
export const CARTE: Record<Ton, string> = {
  nuit: "bg-nuit-haut carte-survol carte-survol-sombre",
  clair: "bg-white border border-bordure carte-survol",
  electrique: "bg-white carte-survol",
};

export const FILET: Record<Ton, string> = {
  nuit: "border-white/25",
  clair: "border-accent-detail/60",
  electrique: "border-white/35",
};
