import { cn } from "@/lib/cn";
import { Monogramme } from "./Monogramme";

type Props = {
  /** "bloc" pour les en-tetes, "ligne" pour les bandeaux etroits. Charte page 3. */
  variante?: "bloc" | "ligne";
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
        {avecMonogramme && <Monogramme taille={18} />}
        {/* Sous sm, le nom lettre large mesure plus de 370 px et imposait
            une largeur minimale a toute la page. Le monogramme tient seul,
            c'est son emploi prevu en format etroit. Charte page 3. */}
        <span className="hidden text-[0.8125rem] font-bold tracking-[0.2em] uppercase leading-tight sm:inline">
          Les Nuits du Capital Investissement
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {avecMonogramme && <Monogramme taille={34} />}
      <span className="flex flex-col leading-none">
        <span className="flex items-center gap-2">
          <span className="text-[0.6875rem] font-bold tracking-[var(--ls-logo-surtitre)] uppercase whitespace-nowrap">
            Les Nuits du
          </span>
          {/* Filet pointille de la charte, a pleine valeur : sur fond nuit
              il herite de --text-sur-nuit par currentColor, comme les deux
              lignes de texte. */}
          <span
            aria-hidden
            className="flex-1"
            style={{ borderTop: "var(--filet-logotype)" }}
          />
        </span>
        <span className="text-[1.6875rem] font-black tracking-[var(--ls-logo-nom)] uppercase leading-none">
          Capital Investissement
        </span>
      </span>
    </span>
  );
}
