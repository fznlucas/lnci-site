import { REFERENCEMENT } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { MENTIONS_LEGALES as M } from "@/data/legal";
import { HeroPage } from "@/sections/HeroPage";
import { TexteLegal } from "@/sections/TexteLegal";

export function MentionsLegales() {
  useTitre(REFERENCEMENT["mentions-legales"]);
  return (
    <>
      <HeroPage pastille={M.pastille} titre={M.titre} texte={M.texte} />
      <TexteLegal miseAJour={M.miseAJour} blocs={M.blocs} />
    </>
  );
}
