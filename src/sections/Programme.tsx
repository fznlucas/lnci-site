import { ArcSoiree } from "@/components/ArcSoiree";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { PROGRAMME } from "@/data/contenu";
import { page } from "@/data/pages";

// figma : site / programme (arc), ton nuit
// en-tête et pied passent par ArcSoiree pour rester dans le bloc épinglé pendant le tracé de l'arc
// enTetePage : en tête de /programme, titre en h1, sans lien ni légende, halo des héros
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
