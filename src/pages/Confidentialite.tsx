import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { CONFIDENTIALITE as C } from "@/data/legal";
import { HeroPage } from "@/sections/HeroPage";
import { TexteLegal } from "@/sections/TexteLegal";

/** /confidentialite. Figma : Hero de page et Site / Texte legal. */
export function Confidentialite() {
  useTitre(REFERENCEMENT.confidentialite);
  return (
    <>
      <HeroPage pastille={C.pastille} titre={C.titre} texte={C.texte} />
      <TexteLegal miseAJour={C.miseAJour} blocs={C.blocs} />
    </>
  );
}
