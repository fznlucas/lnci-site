import { Hero } from "@/sections/Hero";
import { Positionnement } from "@/sections/Positionnement";
import { Publics } from "@/sections/Publics";
import { Programme } from "@/sections/Programme";

/**
 * Page d'accueil.
 *
 * Six sections, alternance nuit et clair, aucune photographie.
 * La densite vient du programme detaille et des chiffres verifiables,
 * qui sont la matiere reellement disponible aujourd'hui.
 */
export function Accueil() {
  return (
    <>
      <Hero />
      <Positionnement />
      <Publics />
      <Programme />
    </>
  );
}
