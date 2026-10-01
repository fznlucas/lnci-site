import { FormulaireContact } from "@/sections/FormulaireContact";

/**
 * Section du formulaire de contact sur /contact (ancre #formulaire).
 * Pas de maquette dans le Figma : la carte du formulaire, centree, sur le
 * fond clair d'alternance. Le bouton "Nous ecrire" du hero y mene, comme
 * "Ecrire a l'equipe" depuis /partenaires (sujet "partenariat").
 */
export function ContactFormulaire({ sujet }: { sujet?: string }) {
  return (
    <section id="formulaire" className="rythme-section bg-page-alt scroll-mt-20">
      <div className="contenu">
        <div className="mx-auto max-w-[760px]">
          <FormulaireContact sujet={sujet} />
        </div>
      </div>
    </section>
  );
}
