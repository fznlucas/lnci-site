import type { ReactNode } from "react";
import { Arcs } from "@/components/brand/Arcs";
import { HaloHero } from "@/components/brand/HaloHero";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";

/**
 * Hero des pages interieures. Figma : Site / Hero de page, ton Nuit.
 *
 * Pastille, titre en deux lignes (h1, 64px, 42 en mobile), texte, puis les
 * actions et, si la page en a, un complement (`children`) : rangee de
 * logos, lignes de contact... Meme halo que le hero de l'accueil (HaloHero), arcs en
 * bas. L'en-tete transparent se pose par-dessus.
 */
export function HeroPage({
  pastille,
  titre,
  texte,
  actions,
  children,
}: {
  pastille: string;
  titre: { attenue: string; plein: string };
  texte: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-nuit text-sur-nuit relative overflow-hidden pt-[136px] pb-24 sm:pt-[160px] lg:pt-[176px] lg:pb-28">
      <HaloHero />
      <Arcs rx={1296} ry={576} depuisLeBas={90} decalage={50} />

      <div className="contenu relative flex flex-col items-start gap-7">
        <Pastille ton="nuit">{pastille}</Pastille>
        <TitreBicolore
          as="h1"
          taille="display"
          ton="nuit"
          attenue={titre.attenue}
          plein={titre.plein}
        />
        <p className="text-w-courant text-sur-nuit-body sm:text-w-chapeau max-w-[640px]">{texte}</p>
        {actions && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">{actions}</div>
        )}
        {children}
      </div>
    </section>
  );
}
