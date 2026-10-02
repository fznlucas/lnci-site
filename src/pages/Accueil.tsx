import { ACCUEIL } from "@/data/referencement";
import { useCadre } from "@/lib/cadre";
import { useTitre } from "@/lib/useTitre";
import { BandeauAction } from "@/sections/BandeauAction";
import { Concept } from "@/sections/Concept";
import { HackathonApercu } from "@/sections/HackathonApercu";
import { Hero } from "@/sections/Hero";
import { MurPartenaires } from "@/sections/MurPartenaires";
import { Programme } from "@/sections/Programme";
import { BANDEAUX } from "@/data/contenu";

// ordre et tons du figma : hero N, concept C, programme N, hackathon N, partenaires C, bandeau N
// tons par page : voir docs/CHARTE-ET-MAQUETTE.md
export function Accueil() {
  useTitre(ACCUEIL);
  // bandeau final en nuit, le pied de page suit
  useCadre({ pied: "nuit" });
  return (
    <>
      <Hero />
      <Concept />
      <Programme />
      <HackathonApercu ton="nuit" filetHaut />
      <MurPartenaires ton="clair" />
      <BandeauAction ton="nuit" bandeau={BANDEAUX.accueil} />
    </>
  );
}
