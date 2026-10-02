import { REFERENCEMENT } from "@/data/referencement";
import { useCadre } from "@/lib/cadre";
import { useTitre } from "@/lib/useTitre";
import { Bouton } from "@/components/ui/Bouton";
import { BANDEAUX, HACKATHON, HERO_HACKATHON } from "@/data/contenu";
import { ACTION, page } from "@/data/pages";
import { BandeauAction } from "@/sections/BandeauAction";
import { HackathonDeroule } from "@/sections/HackathonDeroule";
import { HeroPage } from "@/sections/HeroPage";
import { RelaisEcoles } from "@/sections/RelaisEcoles";

// les liens de préinscription présélectionnent le poste « Étudiant·e »
export function Hackathon() {
  useTitre(REFERENCEMENT.hackathon);
  useCadre({ entete: "electrique", pied: "electrique" });
  const partenaires = page("partenaires");
  const etudiant = `${ACTION.chemin}?poste=etudiant`;

  return (
    <>
      <HeroPage
        ton="electrique"
        pastille={HERO_HACKATHON.pastille}
        titre={HERO_HACKATHON.titre}
        texte={HERO_HACKATHON.chapeau}
        actions={
          <>
            <Bouton to={etudiant} ton="electrique" className="w-full sm:w-auto">
              {HACKATHON.actions.prevenir}
            </Bouton>
            {partenaires && (
              <Bouton
                variante="secondaire"
                ton="electrique"
                to={partenaires.chemin}
                className="w-full sm:w-auto"
              >
                {HACKATHON.actions.coacher}
              </Bouton>
            )}
          </>
        }
      />
      <HackathonDeroule ton="clair" />
      <RelaisEcoles ton="electrique" />
      <BandeauAction
        ton="clair"
        bandeau={BANDEAUX.hackathon}
        actions={
          <Bouton to={etudiant} ton="clair" className="w-full sm:w-auto">
            {ACTION.libelle}
          </Bouton>
        }
      />
    </>
  );
}
