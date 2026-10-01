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
 */
export function HaloHero({ ton = "nuit" }: { ton?: "nuit" | "electrique" }) {
  return (
    <div
      aria-hidden
      className="[container-type:inline-size] pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, #000 50%, rgb(0 0 0 / 0.6) 75%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 50%, rgb(0 0 0 / 0.6) 75%, transparent 100%)",
      }}
    >
      <div
        className={`absolute rounded-full opacity-85 ${ton === "electrique" ? "bg-accent-clair" : "bg-accent"}`}
        style={{
          width: "62.5cqw",
          height: "62.5cqw",
          left: "calc(91cqw - 31.25cqw)",
          top: "calc(6.25cqw - 31.25cqw)",
          filter: "blur(6.875cqw)",
        }}
      />
    </div>
  );
}
