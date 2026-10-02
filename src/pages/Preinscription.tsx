import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { useSearchParams } from "react-router-dom";
import { Faq } from "@/sections/Faq";
import { FormulairePreInscription } from "@/sections/FormulairePreInscription";

// ?poste=etudiant présélectionne le poste
export function Preinscription() {
  useTitre(REFERENCEMENT.preinscription);
  const [parametres] = useSearchParams();

  return (
    <>
      <FormulairePreInscription poste={parametres.get("poste") ?? undefined} />
      <Faq />
    </>
  );
}
