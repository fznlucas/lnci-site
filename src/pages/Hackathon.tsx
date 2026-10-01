import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { Bouton } from "@/components/ui/Bouton";
import { BANDEAUX, HACKATHON, HERO_HACKATHON } from "@/data/contenu";
import { ACTION, page } from "@/data/pages";
import { BandeauAction } from "@/sections/BandeauAction";
import { HackathonDeroule } from "@/sections/HackathonDeroule";
import { HeroPage } from "@/sections/HeroPage";
import { RelaisEcoles } from "@/sections/RelaisEcoles";

/**
 * /hackathon. Figma : Pages du site, Hackathon. Hero de page, deroule et
 * livrable, ecoles relais, bandeau. Les liens de pre-inscription
 * preselectionnent le poste "Etudiant·e".
 */
export function Hackathon() {
  useTitre(REFERENCEMENT.hackathon);
  const partenaires = page("partenaires");
  const etudiant = `${ACTION.chemin}?poste=etudiant`;

  return (
    <>
      <HeroPage
        pastille={HERO_HACKATHON.pastille}
        titre={HERO_HACKATHON.titre}
        texte={HERO_HACKATHON.chapeau}
        actions={
          <>
            <Bouton to={etudiant} ton="nuit" className="w-full sm:w-auto">
              {HACKATHON.actions.prevenir}
            </Bouton>
            {partenaires && (
              <Bouton
                variante="secondaire"
                ton="nuit"
                to={partenaires.chemin}
                className="w-full sm:w-auto"
              >
                {HACKATHON.actions.coacher}
              </Bouton>
            )}
          </>
        }
      />
      <HackathonDeroule />
      <RelaisEcoles />
      <BandeauAction
        bandeau={BANDEAUX.hackathon}
        actions={
          <Bouton to={etudiant} ton="nuit" className="w-full sm:w-auto">
            {ACTION.libelle}
          </Bouton>
        }
      />
    </>
  );
}
