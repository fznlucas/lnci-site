import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { useSearchParams } from "react-router-dom";
import { Bouton } from "@/components/ui/Bouton";
import { HERO_CONTACT } from "@/data/contenu";
import { ContactFormulaire } from "@/sections/ContactFormulaire";
import { Equipe } from "@/sections/Equipe";
import { Faq } from "@/sections/Faq";
import { HeroPage } from "@/sections/HeroPage";

/**
 * /contact. Figma : Pages du site, Contact (hero, equipe, FAQ). Le
 * formulaire de contact (sans maquette) est pose sous le hero : le bouton
 * "Nous ecrire" y mene. ?sujet=partenariat preselectionne le sujet.
 */
export function Contact() {
  useTitre(REFERENCEMENT.contact);
  const [parametres] = useSearchParams();

  return (
    <>
      <HeroPage
        pastille={HERO_CONTACT.pastille}
        titre={HERO_CONTACT.titre}
        texte={HERO_CONTACT.texte}
        actions={
          <Bouton
            to={{ search: parametres.toString() && `?${parametres}`, hash: "#formulaire" }}
            ton="nuit"
            className="w-full sm:w-auto"
          >
            {HERO_CONTACT.action}
          </Bouton>
        }
      />
      <ContactFormulaire sujet={parametres.get("sujet") ?? undefined} />
      <Equipe />
      <Faq />
    </>
  );
}
