import { REFERENCEMENT } from "@/data/referencement";
import { useMobile } from "@/lib/useMobile";
import { useTitre } from "@/lib/useTitre";
import { BANDEAUX } from "@/data/contenu";
import { BandeauAction } from "@/sections/BandeauAction";
import { LeOff } from "@/sections/LeOff";
import { Programme as SectionProgramme } from "@/sections/Programme";
import { ProgrammeDetail } from "@/sections/ProgrammeDetail";

/**
 * /programme. Figma : Pages du site, Programme. L'arc anime sert d'en-tete
 * de page, puis le programme detaille, Le Off et le bandeau d'action.
 */
export function Programme() {
  useTitre(REFERENCEMENT.programme);
  /* Mobile : le programme detaille est masque, l'arc (Nuit) touche donc le
     Off. Les tons alternent autrement (Figma, Refonte mobile) : Off en
     Clair, bandeau en Nuit. */
  const mobile = useMobile();
  return (
    <>
      <SectionProgramme enTetePage />
      <ProgrammeDetail />
      <LeOff ton={mobile ? "clair" : "nuit"} />
      <BandeauAction ton={mobile ? "nuit" : "clair"} bandeau={BANDEAUX.programme} />
    </>
  );
}
