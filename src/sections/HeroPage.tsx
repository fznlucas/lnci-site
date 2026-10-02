import type { ReactNode } from "react";
import { Arcs } from "@/components/brand/Arcs";
import { HaloHero } from "@/components/brand/HaloHero";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";
import { cn } from "@/lib/cn";
import { COURANT, FOND } from "@/lib/tons";

// figma : site / hero de page, ton nuit
// le padding haut réserve la place de l'en-tête transparent posé par-dessus
export function HeroPage({
  ton = "nuit",
  pastille,
  titre,
  texte,
  actions,
  children,
}: {
  /** électrique seulement sur /hackathon */
  ton?: "nuit" | "electrique";
  pastille: string;
  titre: { attenue: string; plein: string };
  texte: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "plein-ecran relative overflow-hidden pt-36 pb-20 sm:pt-[160px] sm:pb-24 lg:pt-[176px] lg:pb-[88px]",
        FOND[ton],
      )}
    >
      <HaloHero ton={ton} />
      <Arcs rx={1296} ry={576} depuisLeBas={90} decalage={50} />
      {/* mobile : seul arc de la page, figma 702 x 312, sommet à 78px du bas */}
      <Arcs rx={351} ry={156} depuisLeBas={78} enHero className="sm:hidden" />

      <div className="contenu relative flex flex-col items-start gap-7">
        <Pastille ton={ton}>{pastille}</Pastille>
        <TitreBicolore
          as="h1"
          taille="display"
          ton={ton}
          attenue={titre.attenue}
          plein={titre.plein}
        />
        <p className={cn("text-w-courant sm:text-w-chapeau max-w-[640px]", COURANT[ton])}>
          {texte}
        </p>
        {actions && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">{actions}</div>
        )}
        {children}
      </div>
    </section>
  );
}
