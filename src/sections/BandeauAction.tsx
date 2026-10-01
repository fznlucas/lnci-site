import type { ReactNode } from "react";
import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton, type Ton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import type { Bandeau } from "@/data/contenu";
import { ACTION, page } from "@/data/pages";
import { cn } from "@/lib/cn";
import { COURANT, FOND } from "@/lib/tons";

/**
 * Bandeau d'action de fin de page. Figma : Site / Bandeau d'action, avec
 * halo central et arcs en bas. Ton reglable : Nuit sur l'accueil (colle au
 * pied de page), Clair sur les autres pages. Les actions passees par la
 * page doivent utiliser le meme ton.
 *
 * Le texte vient de data/contenu.ts (BANDEAUX), une variante par page.
 * Actions par defaut : se pre-inscrire, puis devenir partenaire ; une page
 * peut passer les siennes (`actions`).
 */
export function BandeauAction({
  bandeau,
  actions,
  ton = "nuit",
}: {
  bandeau: Bandeau;
  actions?: ReactNode;
  ton?: Ton;
}) {
  const partenaires = page("partenaires");

  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={557}
        style={{ left: "50%", top: "50%", transform: "translate(-52%, -50%)" }}
      />
      <Arcs rx={1152} ry={450} depuisLeBas={98} clair={ton === "clair"} />

      <div className="contenu relative flex flex-col items-center gap-7 text-center">
        <Pastille ton={ton}>{bandeau.pastille}</Pastille>
        <TitreBicolore
          taille="display"
          ton={ton}
          attenue={bandeau.titre.attenue}
          plein={bandeau.titre.plein}
        />
        <p className={cn("text-w-courant sm:text-w-chapeau max-w-[640px]", COURANT[ton])}>
          {bandeau.texte}
        </p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          {actions ?? (
            <>
              <Bouton to={ACTION.chemin} ton={ton} className="w-full sm:w-auto">
                {ACTION.libelle}
              </Bouton>
              {partenaires && (
                <Bouton
                  variante="secondaire"
                  ton={ton}
                  to={partenaires.chemin}
                  className="w-full sm:w-auto"
                >
                  {partenaires.libelle}
                </Bouton>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
