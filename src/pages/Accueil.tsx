import { ACCUEIL } from "@/data/referencement";
import { useTitre } from "@/lib/useTitre";
import { BandeauAction } from "@/sections/BandeauAction";
import { Concept } from "@/sections/Concept";
import { HackathonApercu } from "@/sections/HackathonApercu";
import { Hero } from "@/sections/Hero";
import { MurPartenaires } from "@/sections/MurPartenaires";
import { Programme } from "@/sections/Programme";
import { BANDEAUX } from "@/data/contenu";

/**
 * Page d'accueil. Figma : Pages du site, Accueil.
 *
 * Six sections, dans l'ordre du Figma : hero (arc des partenaires),
 * concept, programme (arc anime), apercu du hackathon, mur des
 * partenaires, bandeau d'action.
 */
export function Accueil() {
  useTitre(ACCUEIL);
  return (
    <>
      <Hero />
      <Concept />
      <Programme />
      <HackathonApercu />
      <MurPartenaires />
      <BandeauAction bandeau={BANDEAUX.accueil} />
    </>
  );
}
