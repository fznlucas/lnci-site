import type { ReactNode } from "react";
import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";

/**
 * Ecran plein de fin de parcours. Figma : Site / Ecran (Merci, 404), ton
 * Nuit. Tout est centre ; `grand` affiche un tres grand libelle au-dessus
 * de la pastille (le "404"). Halo des heros, arcs en bas.
 */
export function Ecran({
  grand,
  pastille,
  titre,
  texte,
  actions,
}: {
  grand?: string;
  pastille: string;
  titre: { attenue: string; plein: string };
  texte: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="bg-nuit text-sur-nuit relative flex min-h-[640px] overflow-hidden pt-[150px] pb-[200px] sm:min-h-[820px] lg:pt-[220px] lg:pb-[240px]">
      <Halo ton="nuit" taille={295} className="sm:hidden" style={{ right: -89, top: -103 }} />
      <Halo
        ton="nuit"
        taille={630}
        className="hidden sm:flex lg:hidden"
        style={{ right: -190, top: -221 }}
      />
      <Halo ton="nuit" taille={932} className="hidden lg:flex" style={{ right: -250, top: -326 }} />
      <Arcs rx={1368} ry={648} depuisLeBas={150} decalage={70} />

      <div className="contenu relative flex flex-col items-center gap-6 text-center">
        {grand && (
          <p aria-hidden className="text-d-hero-s text-accent-clair sm:text-d-display-l num">
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
