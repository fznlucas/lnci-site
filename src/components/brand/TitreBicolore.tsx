import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";

type Props = {
  /** Ligne 1, en valeur attenuee. */
  attenue: string;
  /** Ligne 2, en pleine valeur. */
  plein: string;
  /** Ton du fond. */
  ton?: Ton;
  /**
   * "hero" : h1 des heros (titre/h1, 56px, 42 en mobile).
   * "display" : bandeau d'action (web/display-m, 64px, 42 en mobile).
   * "section" : titres de section (titre/h2, 40px ; 28 en tablette, 24 en mobile).
   */
  taille?: "hero" | "display" | "section";
  /** Les deux lignes en pleine valeur (apercu du hackathon). */
  uni?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

/**
 * Titre bicolore. Charte page 8, la regle.
 *
 * Ligne 1 en valeur attenuee, ligne 2 en pleine valeur, meme corps, meme
 * graisse. Equilibre des lignes en mobile seulement : en desktop, les
 * retours suivent le Figma. Couleurs du Figma (variables texte/attenue et texte/titre) :
 *
 *   clair        titre-ligne1, puis encre
 *   nuit         legende sur nuit, puis blanc
 *   electrique   blanc a 62 %, puis blanc
 */
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
