import { cn } from "@/lib/cn";
import { Monogramme } from "./Monogramme";

type Props = {
  /**
   * "ligne" pour la barre d'en-tete (Logo / Ligne du Figma), "bloc" pour
   * les en-tetes de document, "pied" pour le pied de page (Logo / Typo du
   * Figma, en plus grand). Charte page 3.
   */
  variante?: "bloc" | "ligne" | "pied";
  /** Affiche le monogramme a gauche du bloc typographique. */
  avecMonogramme?: boolean;
  className?: string;
};

/**
 * Bloc logotype. Charte page 3.
 *
 * Le sur-titre est lettre large et ferme par un filet pointille qui rejoint
 * le bord du nom. C'est ce filet, et non un alignement force, qui tient le bloc.
 * Le rapport des corps entre sur-titre et nom est de 1 pour 2,45.
 *
 * La mecanique de l'alignement, a ne pas defaire : la colonne est dimensionnee
 * par le nom, qui est la plus large de ses deux lignes. La ligne du sur-titre
 * s'y etire, et le filet, seul element flexible de cette ligne, occupe tout ce
 * qui reste. Son bord droit tombe donc exactement sur celui du nom, sans
 * qu'aucune largeur ne soit posee nulle part.
 *
 * Corps : 11px et 27px, soit un rapport de 2,4545. C'est le couple d'entiers
 * de pixels le plus proche du 2,45 de la charte, a 0,19 pres.
 */
export function Logotype({ variante = "bloc", avecMonogramme = true, className }: Props) {
  if (variante === "ligne") {
    return (
      <span className={cn("inline-flex items-center gap-3", className)}>
        {avecMonogramme && <Monogramme taille={20} />}
        {/* Sous sm, le nom lettre large mesure plus de 370 px et imposait
            une largeur minimale a toute la page. Le monogramme tient seul,
            c'est son emploi prevu en format etroit. Charte page 3. */}
        <span className="hidden text-[0.72rem] leading-tight font-bold tracking-[0.2em] uppercase sm:inline">
          Les Nuits du Capital Investissement
        </span>
      </span>
    );
  }

  /* Corps du pied de page, releves sur Site / Pied de page : 14 et 30px
     en desktop, reduits d'un cinquieme en mobile. */
  const pied = variante === "pied";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {avecMonogramme && <Monogramme taille={34} />}
      <span className="flex flex-col leading-none">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "font-bold tracking-[var(--ls-logo-surtitre)] whitespace-nowrap uppercase",
              pied ? "text-[0.75rem] sm:text-[0.875rem]" : "text-[0.6875rem]",
            )}
          >
            Les Nuits du
          </span>
          {/* Filet pointille de la charte, a pleine valeur : sur fond nuit
              il herite de --text-sur-nuit par currentColor, comme les deux
              lignes de texte. */}
          <span aria-hidden className="flex-1" style={{ borderTop: "var(--filet-logotype)" }} />
        </span>
        <span
          className={cn(
            "leading-none font-black tracking-[var(--ls-logo-nom)] whitespace-nowrap uppercase",
            /* Mobile : 24px, ramene a la largeur de l'ecran (6,1vw) pour tenir
               en 320px utiles a 360. */
            pied ? "text-[length:min(1.5rem,6.1vw)] sm:text-[1.875rem]" : "text-[1.6875rem]",
          )}
        >
          Capital Investissement
        </span>
      </span>
    </span>
  );
}
