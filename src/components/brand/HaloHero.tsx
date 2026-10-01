import { degradeHalo, PROFIL_HERO } from "@/components/brand/degradeHalo";

/**
 * Halo des heros : accueil, heros de page, Merci, 404, en-tete de
 * /programme. Figma : halo des propositions de hero (cadre VD).
 *
 * Un disque plein accent (#2B48E0) a 85 % d'opacite, tres flou, en haut a
 * droite. Tout est proportionnel a la largeur de la section (unites cqw,
 * la couche est un conteneur de requete) :
 *
 *   diametre  62,5 %   (900px a 1440, 521 a 834, 244 a 390)
 *   centre    x 91 %, y 6,25 % de la largeur
 *   flou      11 % du diametre (100px a 1440 : le flou CSS vaut la moitie
 *             du flou Figma)
 *
 * Sur un hero Electrique (/hackathon), meme geometrie, en cyan (accent
 * clair), la couleur des halos de ce ton.
 *
 * Il passe sous l'en-tete transparent. Un masque en degrade progressif
 * (plein jusqu'a 50 % de la hauteur, puis s'efface jusqu'au bas) garantit
 * qu'il s'estompe avant le bas du hero, sans coupure nette, meme sur les
 * heros courts.
 *
 * Performance : pas de filter: blur(). Le disque floute est un
 * radial-gradient au profil identique (degradeHalo.ts), couche isolee.
 */

/* Rayon du disque 31,25cqw, porte a l'etendue du flou (1 + 3 x 0,22). */
const ETENDUE = 31.25 * PROFIL_HERO.etendue;

export function HaloHero({ ton = "nuit" }: { ton?: "nuit" | "electrique" }) {
  return (
    <div
      aria-hidden
      className="[container-type:inline-size] pointer-events-none absolute inset-0 overflow-hidden [contain:paint]"
      style={{
        maskImage: "linear-gradient(to bottom, #000 50%, rgb(0 0 0 / 0.6) 75%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 50%, rgb(0 0 0 / 0.6) 75%, transparent 100%)",
      }}
    >
      <div
        className="absolute opacity-85"
        style={{
          width: `${ETENDUE * 2}cqw`,
          height: `${ETENDUE * 2}cqw`,
          left: `calc(91cqw - ${ETENDUE}cqw)`,
          top: `calc(6.25cqw - ${ETENDUE}cqw)`,
          backgroundImage: degradeHalo(
            ton === "electrique" ? "var(--accent-clair)" : "var(--accent)",
            PROFIL_HERO,
          ),
        }}
      />
    </div>
  );
}
