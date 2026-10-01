import { REFERENCEMENT } from "@/data/referencement";
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
  return (
    <>
      <SectionProgramme enTetePage />
      <ProgrammeDetail />
      <LeOff ton="nuit" />
      <BandeauAction ton="clair" bandeau={BANDEAUX.programme} />
    </>
  );
}
