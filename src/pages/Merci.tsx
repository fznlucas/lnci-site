import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { Bouton } from "@/components/ui/Bouton";
import { MERCI } from "@/data/contenu";
import { EVENEMENT } from "@/data/evenement";
import { Ecran } from "@/sections/Ecran";

/**
 * /merci, apres une pre-inscription reussie. Figma : Site / Ecran, Merci.
 * Le bouton LinkedIn n'apparait que si l'URL est renseignee ; le retour a
 * l'accueil devient alors l'action principale. Page non indexee.
 */
export function Merci() {
  useTitre(REFERENCEMENT.merci);
  return (
    <Ecran
      pastille={MERCI.pastille}
      titre={MERCI.titre}
      texte={MERCI.texte}
      actions={
        <>
          {EVENEMENT.linkedin && (
            <Bouton
              href={EVENEMENT.linkedin}
              target="_blank"
              ton="nuit"
              className="w-full sm:w-auto"
            >
              {MERCI.linkedin}
            </Bouton>
          )}
          <Bouton
            to="/"
            ton="nuit"
            variante={EVENEMENT.linkedin ? "secondaire" : "primaire"}
            className="w-full sm:w-auto"
          >
            {MERCI.retour}
          </Bouton>
        </>
      }
    />
  );
}
