import type { ReactNode } from "react";
import { Arcs } from "@/components/brand/Arcs";
import { HaloHero } from "@/components/brand/HaloHero";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";

// figma : site / écran (merci, 404), ton nuit
export function Ecran({
  grand,
  pastille,
  titre,
  texte,
  actions,
}: {
  /** très grand libellé au-dessus de la pastille, le "404" */
  grand?: string;
  pastille: string;
  titre: { attenue: string; plein: string };
  texte: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="bg-nuit text-sur-nuit plein-ecran relative flex overflow-hidden pt-[150px] pb-[200px] max-lg:min-h-[640px] sm:max-lg:min-h-[820px] lg:pt-[220px] lg:pb-[240px]">
      <HaloHero />
      <Arcs rx={1368} ry={648} depuisLeBas={150} decalage={70} />
      <Arcs rx={351} ry={156} depuisLeBas={78} enHero className="sm:hidden" />

      <div className="contenu relative flex flex-col items-center gap-6 text-center">
        {grand && (
          <p aria-hidden className="text-d-display-l text-accent-clair num">
            {grand}
          </p>
        )}
        <Pastille ton="nuit">{pastille}</Pastille>
        <TitreBicolore
          as="h1"
          taille="display"
          ton="nuit"
          attenue={titre.attenue}
          plein={titre.plein}
        />
        <p className="text-w-courant text-sur-nuit-body sm:text-w-chapeau max-w-[600px]">{texte}</p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          {actions}
        </div>
      </div>
    </section>
  );
}
