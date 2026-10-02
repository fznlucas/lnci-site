import { degradeHalo, PROFIL_HERO } from "@/components/brand/degradeHalo";

// figma : halo des propositions de hero (cadre VD)
// tout en cqw, proportionnel à la largeur de la section :
// diamètre 62,5 % (900px à 1440), centre x 91 % / y 6,25 %,
// flou 11 % du diamètre (100px à 1440, le flou css vaut la moitié du flou figma)
// le masque l'efface avant le bas du hero, même sur les heros courts

// rayon 31,25cqw porté à l'étendue du flou (1 + 3 x 0,22)
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
