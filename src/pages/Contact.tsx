import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { useSearchParams } from "react-router-dom";
import { Bouton } from "@/components/ui/Bouton";
import { HERO_CONTACT } from "@/data/contenu";
import { ContactFormulaire } from "@/sections/ContactFormulaire";
import { Equipe } from "@/sections/Equipe";
import { Faq } from "@/sections/Faq";
import { HeroPage } from "@/sections/HeroPage";

// le formulaire n'a pas de maquette, il est posé sous le hero
// ?sujet=partenariat présélectionne le sujet
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
