import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import type { Bandeau } from "@/data/contenu";
import { ACTION, page } from "@/data/pages";

/**
 * Bandeau d'action de fin de page. Figma : Site / Bandeau d'action, ton
 * Nuit, avec halo central et arcs en bas.
 *
 * Le texte vient de data/contenu.ts (BANDEAUX), une variante par page.
 * Actions : se pre-inscrire, puis devenir partenaire.
 */
export function BandeauAction({ bandeau }: { bandeau: Bandeau }) {
  const partenaires = page("partenaires");

  return (
    <section className="rythme-section bg-nuit text-sur-nuit relative overflow-hidden">
      <Halo ton="nuit" taille={557} className="left-1/2 -translate-x-[52%]" style={{ top: 48 }} />
      <Arcs rx={1152} ry={450} depuisLeBas={98} />

      <div className="contenu relative flex flex-col items-center gap-7 text-center">
        <Pastille ton="nuit">{bandeau.pastille}</Pastille>
        <TitreBicolore
          taille="display"
          ton="nuit"
          attenue={bandeau.titre.attenue}
          plein={bandeau.titre.plein}
        />
        <p className="text-w-courant text-sur-nuit-body sm:text-w-chapeau max-w-[640px]">
          {bandeau.texte}
        </p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Bouton to={ACTION.chemin} ton="nuit" className="w-full sm:w-auto">
            {ACTION.libelle}
          </Bouton>
          {partenaires && (
            <Bouton
              variante="secondaire"
              ton="nuit"
              to={partenaires.chemin}
              className="w-full sm:w-auto"
            >
              {partenaires.libelle}
            </Bouton>
          )}
        </div>
      </div>
    </section>
  );
}
