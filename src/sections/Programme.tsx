import { ArcSoiree } from "@/components/ArcSoiree";
import { Bouton } from "@/components/ui/Bouton";

/**
 * Section programme de la page d'accueil.
 *
 * L'arc deborde du gabarit de contenu : la section n'a donc pas de
 * padding lateral, c'est le composant qui gere lui-meme ce qui reste
 * dans la colonne et ce qui traverse la page.
 *
 * Le titre, le chapeau et le lien de fin sont passes a ArcSoiree plutot que
 * rendus autour de lui : ils prennent place dans le bloc epingle et restent
 * immobiles pendant toute la course. Rendus autour, ils defilaient avant que
 * l'arc n'arrive et laissaient une hauteur d'ecran de vide de chaque cote.
 *
 * Le tableau complet des trois soirees reste sur la page /programme.
 * Les deux lisent le meme fichier de donnees.
 */
export function Programme() {
  return (
    <section className="bg-page-alt text-encre">
      <ArcSoiree
        enTete={
          <div className="grid gap-x-6 gap-y-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-w-surtitre uppercase text-accent">Le programme</p>
              <h2 className="mt-4 max-w-[16ch] text-d-titre text-encre text-balance">
                Trois soirées, un déroulé en construction
              </h2>
            </div>
            <p className="max-w-[60ch] text-w-courant text-texte-courant lg:col-span-5 lg:col-start-8 lg:pt-2">
              Les créneaux marqués d'un point creux sont encore ouverts : ils
              reviennent aux partenaires de l'édition, qui en choisissent le sujet
              et les intervenants. Le programme est figé début octobre.
            </p>
          </div>
        }
        pied={
          <Bouton variante="lien" to="/programme">
            Le programme complet des trois soirées
          </Bouton>
        }
      />
    </section>
  );
}
