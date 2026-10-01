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

/**
 * Page d'accueil. Figma : Pages du site, Accueil.
 *
 * Six sections, dans l'ordre du Figma, tons du concept B (docs/HANDOFF.md,
 * "Tons par page") : hero N, concept C, programme N, apercu du hackathon N
 * (colle au programme, filet en haut), mur des partenaires C, bandeau N
 * (colle au pied de page).
 */
export function Accueil() {
  useTitre(ACCUEIL);
  /* Le bandeau final est Nuit : le pied de page prend le meme fond. */
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
