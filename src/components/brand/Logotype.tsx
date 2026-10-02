import { cn } from "@/lib/cn";
import { Monogramme } from "./Monogramme";

type Props = {
  /** ligne : en-tête (logo / ligne), bloc : documents, pied : pied de page (logo / typo) */
  variante?: "bloc" | "ligne" | "pied";
  avecMonogramme?: boolean;
  className?: string;
};

// charte page 3
// alignement à ne pas défaire : la colonne prend la largeur du nom, et le filet
// (seul élément flexible de la ligne du sur-titre) remplit le reste, donc il
// tombe pile sur le bord du nom sans aucune largeur fixée
// corps 11 et 27px : couple d'entiers le plus proche du rapport 2,45 de la charte
export function Logotype({ variante = "bloc", avecMonogramme = true, className }: Props) {
  if (variante === "ligne") {
    return (
      <span className={cn("inline-flex items-center gap-3", className)}>
        {avecMonogramme && <Monogramme taille={20} />}
        {/* sous sm le nom fait plus de 370px et élargissait toute la page,
            le monogramme seul suffit (prévu par la charte en format étroit) */}
        <span className="hidden text-[0.72rem] leading-tight font-bold tracking-[0.2em] uppercase sm:inline">
          Les Nuits du Capital Investissement
        </span>
      </span>
    );
  }

  // pied : 14 et 30px en desktop (figma site / pied de page), un cinquième de moins en mobile
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
          <span aria-hidden className="flex-1" style={{ borderTop: "var(--filet-logotype)" }} />
        </span>
        <span
          className={cn(
            "leading-none font-black tracking-[var(--ls-logo-nom)] whitespace-nowrap uppercase",
            // mobile : 24px plafonné à 6,1vw pour tenir dans 320px utiles à 360
            pied ? "text-[length:min(1.5rem,6.1vw)] sm:text-[1.875rem]" : "text-[1.6875rem]",
          )}
        >
          Capital Investissement
        </span>
      </span>
    </span>
  );
}
