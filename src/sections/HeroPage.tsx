import type { ReactNode } from "react";
import { Arcs } from "@/components/brand/Arcs";
import { HaloHero } from "@/components/brand/HaloHero";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";
import { cn } from "@/lib/cn";
import { COURANT, FOND } from "@/lib/tons";

/**
 * Hero des pages interieures. Figma : Site / Hero de page, ton Nuit.
 *
 * Pastille, titre en deux lignes (h1, 64px, 42 en mobile), texte, puis les
 * actions et, si la page en a, un complement (`children`) : rangee de
 * logos, lignes de contact... Meme halo que le hero de l'accueil (HaloHero), arcs en
 * bas. L'en-tete transparent se pose par-dessus.
 */
export function HeroPage({
  ton = "nuit",
  pastille,
  titre,
  texte,
  actions,
  children,
}: {
  /** Nuit partout, Electrique sur /hackathon. */
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
