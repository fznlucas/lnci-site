import { ArcSoiree } from "@/components/ArcSoiree";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { PROGRAMME } from "@/data/contenu";
import { page } from "@/data/pages";

/**
 * Section programme. Figma : Site / Programme (arc), ton Nuit.
 *
 * Sert sur l'accueil et en tete de /programme. Sur /programme, le lien
 * "Voir le programme complet" disparait (`avecLien={false}`) et le titre
 * devient le h1 de la page.
 *
 * La pastille, le titre, le lien et la legende sont passes a ArcSoiree :
 * ils prennent place dans le bloc epingle et restent immobiles pendant
 * que l'arc se trace. Le texte vient de data/contenu.ts.
 */
export function Programme({
  avecLien = true,
  titrePage = false,
}: {
  avecLien?: boolean;
  titrePage?: boolean;
}) {
  const cible = page("programme");

  return (
    <section className="bg-nuit text-sur-nuit">
      <ArcSoiree
        enTete={
          <div className="flex flex-col items-start gap-5">
            <Pastille ton="nuit">{PROGRAMME.pastille}</Pastille>
            <TitreBicolore
              ton="nuit"
              as={titrePage ? "h1" : "h2"}
              attenue={PROGRAMME.titre.attenue}
              plein={PROGRAMME.titre.plein}
            />
          </div>
        }
        pied={
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            {avecLien && cible?.publiee && (
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
        }
      />
    </section>
  );
}
