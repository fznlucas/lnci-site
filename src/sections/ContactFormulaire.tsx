import { FormulaireContact } from "@/sections/FormulaireContact";

// pas de maquette figma pour cette section
// ancre #formulaire visée par le hero de /contact et par /partenaires (sujet "partenariat")
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
