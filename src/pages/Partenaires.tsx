import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { Bouton } from "@/components/ui/Bouton";
import { EVENEMENT } from "@/data/evenement";
import { page } from "@/data/pages";
import { CONTACT_PARTENAIRES, HERO_PARTENAIRES, OBJET_PLAQUETTE } from "@/data/partenaires";
import { BandeauAction } from "@/sections/BandeauAction";
import { Benefices } from "@/sections/Benefices";
import { HeroPage } from "@/sections/HeroPage";
import { LeOff } from "@/sections/LeOff";
import { MurPartenaires } from "@/sections/MurPartenaires";
import { Paliers } from "@/sections/Paliers";
import { StatutFondateur } from "@/sections/StatutFondateur";
import { Visibilite } from "@/sections/Visibilite";

// aucun prix affiché sur cette page
// « recevoir la plaquette » = mail à l'équipe, « télécharger » seulement si le pdf est renseigné
export function Partenaires() {
  useTitre(REFERENCEMENT.partenaires);
  const contact = page("contact");
  const ecrire = contact ? `${contact.chemin}?sujet=partenariat#formulaire` : undefined;
  const plaquette = `mailto:${EVENEMENT.email}?subject=${encodeURIComponent(OBJET_PLAQUETTE)}`;

  return (
    <>
      <HeroPage
        pastille={HERO_PARTENAIRES.pastille}
        titre={HERO_PARTENAIRES.titre}
        texte={HERO_PARTENAIRES.chapeau}
        actions={
          <>
            <Bouton href={plaquette} ton="nuit" className="w-full sm:w-auto">
              {HERO_PARTENAIRES.actions.plaquette}
            </Bouton>
            {ecrire && (
              <Bouton variante="secondaire" ton="nuit" to={ecrire} className="w-full sm:w-auto">
                {HERO_PARTENAIRES.actions.ecrire}
              </Bouton>
            )}
          </>
        }
      />
      <Benefices />
      <StatutFondateur ton="nuit" />
      <LeOff ton="clair" />
      <MurPartenaires
        ton="nuit"
        actionPrincipale={
          ecrire ? { libelle: HERO_PARTENAIRES.actions.ecrire, to: ecrire } : undefined
        }
      />
      <Paliers ton="clair" />
      <Visibilite ton="nuit" />
      <BandeauAction
        ton="clair"
        bandeau={CONTACT_PARTENAIRES}
        actions={
          <>
            {ecrire && (
              <Bouton to={ecrire} ton="clair" className="w-full sm:w-auto">
                {CONTACT_PARTENAIRES.action}
              </Bouton>
            )}
            {CONTACT_PARTENAIRES.plaquettePdf && (
              <Bouton
                variante="secondaire"
                ton="clair"
                href={CONTACT_PARTENAIRES.plaquettePdf}
                download
                className="w-full sm:w-auto"
              >
                {CONTACT_PARTENAIRES.libellePdf}
              </Bouton>
            )}
          </>
        }
      />
    </>
  );
}
