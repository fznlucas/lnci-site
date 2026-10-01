import { PUBLICS } from "@/data/contenu";
import { page } from "@/data/pages";
import { Bouton } from "@/components/ui/Bouton";

/**
 * Les quatre publics.
 *
 * Une ligne par public, sur la grille de douze colonnes : l'intitule tient
 * les quatre premieres, le texte les huit suivantes. Aucune carte, aucun
 * cadre : ce sont des filets pointilles qui separent les lignes, comme le
 * bandeau du hero et la grille des chiffres. Le filet est porte par chaque
 * ligne, plus un dernier en pied, de sorte que le bloc est ferme des deux
 * cotes sans qu'aucune ligne ne porte deux filets.
 *
 * Fond nuit : entre Positionnement et Programme, tous deux clairs, c'est le
 * seul fond qui laisse la section distincte de ses deux voisines et qui
 * conserve l'alternance de la page.
 *
 * Le lien de fin de ligne lit le registre de pages : une cible non publiee
 * ne rend rien du tout, jamais un lien inerte. La ligne se termine alors
 * sur son texte, ce qui est la lecture correcte tant que la page n'existe
 * pas.
 */
export function Publics() {
  return (
    <section className="bg-nuit text-sur-nuit">
      <div className="contenu py-24">
        <div className="grid gap-x-6 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-w-surtitre uppercase text-accent-clair">Publics</p>
            <h2 className="mt-6 max-w-[16ch] text-[1.875rem] font-extrabold leading-[1.16] text-sur-nuit text-balance lg:text-d-titre">
              Quatre publics, un même lieu
            </h2>
          </div>
          <p className="max-w-[46ch] text-w-courant text-sur-nuit-body lg:col-span-5 lg:col-start-8 lg:pt-3">
            Le même événement ne se lit pas de la même façon selon d'où l'on
            vient. Chaque public y trouve un objet différent.
          </p>
        </div>

        <dl className="mt-16">
          {PUBLICS.map((p) => {
            const cible = page(p.page);
            return (
              <div
                key={p.intitule}
                className="filet-sur-nuit grid gap-x-6 gap-y-3 py-6 sm:grid-cols-12"
              >
                <dt className="text-d-bloc text-sur-nuit sm:col-span-4">
                  {p.intitule}
                </dt>
                <dd className="sm:col-span-8 sm:col-start-5">
                  <p className="max-w-[60ch] text-w-courant text-sur-nuit-body">
                    {p.texte}
                  </p>
                  {cible?.publiee && (
                    /* Lien d'action de la charte, repose sur fond nuit :
                       l'accent y tombe a 2,8:1, la teinte claire du meme
                       accent y tient 8,2:1. Le survol part vers le blanc,
                       et non vers l'encre, invisible ici. */
                    <Bouton
                      variante="lien"
                      to={cible.chemin}
                      className="mt-4 text-accent-clair hover:text-sur-nuit"
                    >
                      {p.lien}
                    </Bouton>
                  )}
                </dd>
              </div>
            );
          })}
          <hr className="filet-sur-nuit" />
        </dl>
      </div>
    </section>
  );
}
