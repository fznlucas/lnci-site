import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";
import { degradeHalo, PROFIL_SECTION } from "@/components/brand/degradeHalo";

// figma : decor / halo du kit
// dans figma le disque fait 70 % du cadre (`taille`) avec un flou de ~14 % du cadre
// (932px de cadre : disque de 652px flouté à 128px)
// pas de filter: blur(), trop coûteux : radial-gradient précalculé (degradeHalo.ts)
const COULEURS: Record<Ton, string> = {
  nuit: "var(--halo-nuit)",
  electrique: "var(--halo-electrique)",
  clair: "var(--halo-clair)",
};

export function Halo({
  ton = "nuit",
  taille,
  style,
  className,
}: {
  ton?: Ton;
  /** côté du cadre du halo dans figma, en px */
  taille: number;
  style?: CSSProperties;
  className?: string;
}) {
  // rayon du disque (35 % du cadre) porté à l'étendue du flou
  const etendue = Math.round(taille * 0.35 * PROFIL_SECTION.etendue);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [contain:paint]"
      style={MASQUE}
    >
      <div
        className={cn("absolute flex items-center justify-center", className)}
        style={{ width: taille, height: taille, ...style }}
      >
        <div
          className="shrink-0"
          style={{
            width: etendue * 2,
            height: etendue * 2,
            backgroundImage: degradeHalo(COULEURS[ton], PROFIL_SECTION),
          }}
        />
      </div>
    </div>
  );
}

// efface le halo sur 12 % en haut et en bas : jamais de coupure nette,
// ni de halo visible à la jonction de deux sections du même ton
const DEGRADE = "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)";
const MASQUE: CSSProperties = { maskImage: DEGRADE, WebkitMaskImage: DEGRADE };
