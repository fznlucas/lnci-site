import { REFERENCEMENT } from "@/data/referencement";
import { useMobile } from "@/lib/useMobile";
import { useTitre } from "@/lib/useTitre";
import { BANDEAUX } from "@/data/contenu";
import { BandeauAction } from "@/sections/BandeauAction";
import { LeOff } from "@/sections/LeOff";
import { Programme as SectionProgramme } from "@/sections/Programme";
import { ProgrammeDetail } from "@/sections/ProgrammeDetail";

// l'arc animé sert d'en-tête de page
export function Programme() {
  useTitre(REFERENCEMENT.programme);
  // en mobile le détail est masqué et l'arc nuit touche le off :
  // les tons s'inversent (off clair, bandeau nuit), cf. figma refonte mobile
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
