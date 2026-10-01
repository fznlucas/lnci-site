import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { Ton } from "@/components/ui/Bouton";

/**
 * Halo. Composant Decor / Halo du kit Figma.
 *
 * Un disque plein tres flou qui donne de la profondeur au fond. Sa
 * couleur suit le ton de la section (tokens --halo-*). Dans le Figma, le
 * cadre du halo mesure `taille` et le disque en occupe 70 %, avec un flou
 * d'environ 14 % du cadre : 932px de cadre donnent un disque de 652px
 * flou a 128px. La position se donne en style, sur le cadre.
 *
 * Purement decoratif : aria-hidden, aucun evenement de pointeur. Il peut
 * deborder a gauche ou a droite de sa section, qui doit etre en
 * overflow-hidden.
 *
 * Jamais coupe : le halo est pose dans une couche de la taille de sa
 * section (ou de son panneau), masquee par un degrade qui l'efface sur les
 * 12 % du haut et du bas. Quelle que soit sa position, il s'estompe avant
 * le bord ; deux sections du meme ton qui se touchent n'ont donc jamais de
 * halo visible a leur jonction.
 */
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
  /** Cote du cadre du halo dans le Figma, en pixels. */
  taille: number;
  style?: CSSProperties;
  className?: string;
}) {
  const disque = Math.round(taille * 0.7);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={MASQUE}
    >
      <div
        className={cn("absolute flex items-center justify-center", className)}
        style={{ width: taille, height: taille, ...style }}
      >
        <div
          className="rounded-full"
          style={{
            width: disque,
            height: disque,
            background: COULEURS[ton],
            filter: `blur(${Math.round(taille * 0.1375)}px)`,
          }}
        />
      </div>
    </div>
  );
}

/* Effacement en haut et en bas de la couche : aucune coupure nette. */
const DEGRADE = "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)";
const MASQUE: CSSProperties = { maskImage: DEGRADE, WebkitMaskImage: DEGRADE };
