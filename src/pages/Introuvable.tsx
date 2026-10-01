import { Bouton } from "@/components/ui/Bouton";
import { INTROUVABLE } from "@/data/contenu";
import { Ecran } from "@/sections/Ecran";

/** Page 404. Figma : Site / Ecran, 404. */
export function Introuvable() {
  return (
    <Ecran
      grand={INTROUVABLE.grand}
      pastille={INTROUVABLE.pastille}
      titre={INTROUVABLE.titre}
      texte={INTROUVABLE.texte}
      actions={
        <Bouton to="/" ton="nuit" className="w-full sm:w-auto">
          {INTROUVABLE.retour}
        </Bouton>
      }
    />
  );
}
