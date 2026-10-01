import { useSearchParams } from "react-router-dom";
import { Faq } from "@/sections/Faq";
import { FormulairePreInscription } from "@/sections/FormulairePreInscription";

/**
 * /preinscription. Figma : Pages du site, Pre-inscription. Le parametre
 * ?poste=etudiant preselectionne le poste ; la FAQ porte l'ancre #faq.
 */
export function Preinscription() {
  const [parametres] = useSearchParams();

  return (
    <>
      <FormulairePreInscription poste={parametres.get("poste") ?? undefined} />
      <Faq />
    </>
  );
}
