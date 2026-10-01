import { ArcSoiree } from "@/components/ArcSoiree";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { PROGRAMME } from "@/data/contenu";
import { page } from "@/data/pages";

/**
 * Section programme. Figma : Site / Programme (arc), ton Nuit.
 *
 * Sert sur l'accueil et en tete de /programme (`enTetePage`) : le titre
 * devient alors le h1, le lien "Voir le programme complet" et sa legende
 * disparaissent et le halo passe en haut a droite, comme sur les heros.
 *
 * La pastille, le titre, le lien et la legende sont passes a ArcSoiree :
 * ils prennent place dans le bloc epingle et restent immobiles pendant
 * que l'arc se trace. Le texte vient de data/contenu.ts.
 */
export function Programme({ enTetePage = false }: { enTetePage?: boolean }) {
  const cible = page("programme");

  return (
    <section className="bg-nuit text-sur-nuit">
      <ArcSoiree
        haloHero={enTetePage}
        enTete={
          <div className="flex flex-col items-start gap-5">
            <Pastille ton="nuit">{PROGRAMME.pastille}</Pastille>
            <TitreBicolore
              ton="nuit"
              as={enTetePage ? "h1" : "h2"}
              attenue={PROGRAMME.titre.attenue}
              plein={PROGRAMME.titre.plein}
            />
          </div>
        }
        pied={
          !enTetePage && (
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              {cible?.publiee && (
                <Bouton
                  variante="secondaire"
                  ton="nuit"
                  to={cible.chemin}
                  className="w-full sm:w-auto"
                >
                  {PROGRAMME.lien}
                </Bouton>
              )}
              <p className="text-w-legende text-sur-nuit-legende">{PROGRAMME.legende}</p>
            </div>
          )
        }
      />
    </section>
  );
}
