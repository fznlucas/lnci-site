import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";
import type { Ton } from "@/components/ui/Bouton";

// desktop : aligner les deux boîtes en haut suffit pour caler le chapeau sur le haut des lettres du titre
// espace au-dessus des capitales = (L - 1,24) / 2 + 0,277 em (métriques de tokens.css),
// soit 9,28px pour le titre (40px, L 1,15) et 9,16px pour le chapeau (19px, L 1,65)
// à revoir si l'un des deux corps change
export function EnTeteSection({
  ton = "clair",
  pastille,
  titre,
  chapeau,
  centre = false,
  uni = false,
  as = "h2",
  className,
}: {
  ton?: Ton;
  pastille: string;
  titre: { attenue: string; plein: string };
  chapeau?: ReactNode;
  /** mur des partenaires, relais écoles */
  centre?: boolean;
  uni?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  const couleurChapeau = {
    clair: "text-texte-courant",
    nuit: "text-sur-nuit-body",
    electrique: "text-sur-electrique",
  }[ton];

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centre ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <Pastille ton={ton}>{pastille}</Pastille>
      <div
        className={cn(
          "flex w-full flex-col gap-6",
          centre ? "items-center" : "lg:flex-row lg:items-start lg:justify-between",
        )}
      >
        <TitreBicolore as={as} ton={ton} uni={uni} attenue={titre.attenue} plein={titre.plein} />
        {chapeau && (
          <p
            className={cn(
              "text-w-courant sm:text-w-chapeau",
              couleurChapeau,
              centre ? "max-w-[680px]" : "lg:w-[460px] lg:shrink-0",
            )}
          >
            {chapeau}
          </p>
        )}
      </div>
    </div>
  );
}
