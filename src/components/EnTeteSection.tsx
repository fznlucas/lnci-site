import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";
import type { Ton } from "@/components/ui/Bouton";

/**
 * En-tete de section commun aux composants du Figma : pastille seule en
 * haut, puis titre bicolore a gauche et chapeau a droite (460px), alignes
 * sur le bas en desktop ; tout empile en dessous. `centre` centre le tout (mur des
 * partenaires, relais ecoles).
 */
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
          centre ? "items-center" : "lg:flex-row lg:items-end lg:justify-between",
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
