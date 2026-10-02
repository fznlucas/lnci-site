import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { Bouton } from "@/components/ui/Bouton";
import { INTROUVABLE } from "@/data/contenu";
import { Ecran } from "@/sections/Ecran";

export function Introuvable() {
  useTitre(REFERENCEMENT.introuvable);
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
