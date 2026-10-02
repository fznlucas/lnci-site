import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";

type Props = {
  attenue: string;
  plein: string;
  ton?: Ton;
  /** hero 56px (42 mobile), display 64px (42 mobile), section 40px (28 tablette, 24 mobile) */
  taille?: "hero" | "display" | "section";
  /** les deux lignes en pleine valeur (aperçu du hackathon) */
  uni?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

// charte page 8 : ligne 1 atténuée, ligne 2 pleine, même corps, même graisse
// text-balance en mobile seulement, en desktop les retours suivent figma
// couleurs : variables figma texte/attenue et texte/titre
const ATTENUE: Record<Ton, string> = {
  clair: "text-titre-attenue",
  nuit: "text-sur-nuit-legende",
  electrique: "text-white/60",
};

const PLEIN: Record<Ton, string> = {
  clair: "text-encre",
  nuit: "text-sur-nuit",
  electrique: "text-white",
};

const TAILLES = {
  hero: "text-d-hero-s sm:text-d-hero",
  display: "text-d-hero-s md:text-d-display",
  section: "text-d-section sm:text-d-sous-titre md:text-d-titre",
};

export function TitreBicolore({
  attenue,
  plein,
  ton = "clair",
  taille = "section",
  uni = false,
  className,
  as: Balise = "h2",
}: Props) {
  return (
    <Balise className={cn(TAILLES[taille], "text-balance lg:text-wrap", className)}>
      <span className={cn("block", uni ? PLEIN[ton] : ATTENUE[ton])}>{attenue}</span>
      <span className={cn("block", PLEIN[ton])}>{plein}</span>
    </Balise>
  );
}
