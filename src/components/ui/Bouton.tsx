import type { ComponentPropsWithoutRef } from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

/**
 * Bouton unique du systeme. Composant Bouton du kit Figma.
 *
 * Il rend un NavLink si `to` est donne, une ancre si `href` est donne,
 * un <button> sinon. Les trois passent par le meme gabarit : hauteur fixe
 * de 40px, remplissage horizontal de 20px, libelle en style `bouton` du
 * kit (15px, 600). Deux boutons ont donc toujours la meme hauteur.
 *
 * Ce qui varie d'un emploi a l'autre est la variante et le ton du fond
 * sur lequel le bouton est pose, jamais la taille.
 *
 *   primaire     l'action principale, en aplat
 *   secondaire   l'action de second rang, contour pointille
 *   tertiaire    un lien de navigation, sans cadre (barre d'en-tete)
 *   lien         une action rendue comme un lien souligne
 *   onglet       un choix parmi plusieurs, etat porte par aria-pressed
 *   nu           une cible sans gabarit : bascule, libelle survolable
 *
 * Couleurs du primaire selon le ton (variables action/fond et
 * action/texte du kit) :
 *
 *   clair        accent, texte blanc, survol accent-survol
 *   nuit         accent-survol, plus lumineux, survol accent-detail
 *   electrique   blanc, texte accent, survol champ
 *
 * Aucune icone, aucune fleche : la charte les interdit dans un bouton.
 */

export type Variante = "primaire" | "secondaire" | "tertiaire" | "lien" | "onglet" | "nu";
export type Ton = "clair" | "nuit" | "electrique";

type Commun = {
  variante?: Variante;
  /** Ton du fond sur lequel le bouton est pose. */
  ton?: Ton;
  className?: string;
};

type ProprietesBouton = Commun & ComponentPropsWithoutRef<"button"> & { to?: never; href?: never };
type ProprietesRoute = Commun & Omit<NavLinkProps, "className" | "style"> & { href?: never };
type ProprietesExterne = Commun & ComponentPropsWithoutRef<"a"> & { to?: never; href: string };

type ProprietesToutes = ProprietesBouton | ProprietesRoute | ProprietesExterne;

/* Ce que portent toutes les variantes : mise en ligne, pas de
   soulignement par defaut, anneau de focus. */
const SOCLE =
  "inline-flex items-center justify-center no-underline transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent";

/* Style `bouton` du kit. `nu` ne le porte pas. */
const LETTRAGE = "font-sans text-[0.9375rem] font-semibold leading-none whitespace-nowrap";

/* Gabarit des deux variantes cadrees. */
const GABARIT =
  "h-10 shrink-0 rounded-bouton border border-transparent px-5 " +
  "active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-40 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";

const PRIMAIRE: Record<Ton, string> = {
  clair: "bg-accent text-white hover:bg-accent-survol",
  nuit: "bg-accent-survol text-white hover:bg-accent-detail",
  electrique: "bg-white text-accent hover:bg-champ",
};

const SECONDAIRE: Record<Ton, string> = {
  clair: "border-dashed border-bordure text-accent hover:bg-champ",
  nuit: "border-dashed border-sur-nuit/25 text-accent-clair hover:bg-nuit-haut",
  electrique: "border-dashed border-bordure-sur-electrique text-white hover:bg-white/10",
};

const TERTIAIRE: Record<Ton, string> = {
  clair: "text-encre hover:text-accent",
  nuit: "text-sur-nuit hover:text-accent-clair",
  electrique: "text-white hover:text-white/75",
};

const LIEN: Record<Ton, string> = {
  clair: "text-accent hover:text-encre",
  nuit: "text-accent-clair hover:text-sur-nuit",
  electrique: "text-white hover:text-white/75",
};

/* Onglets du programme : pilules, l'actif en aplat blanc. L'etat est lu
   sur aria-pressed, ce qui se voit et ce qui s'annonce ne divergent pas. */
const ONGLET =
  "rounded-pastille px-[18px] py-2.5 text-sur-nuit hover:bg-white/10 " +
  "aria-pressed:bg-white aria-pressed:text-nuit";

export function Bouton(proprietes: ProprietesToutes) {
  const { variante = "primaire", ton = "clair", className, ...reste } = proprietes;

  const classes = cn(
    SOCLE,
    variante !== "nu" && LETTRAGE,
    variante === "primaire" && [GABARIT, PRIMAIRE[ton]],
    variante === "secondaire" && [GABARIT, SECONDAIRE[ton]],
    variante === "tertiaire" && TERTIAIRE[ton],
    variante === "lien" && [
      "underline decoration-1 underline-offset-[3px] hover:underline",
      LIEN[ton],
    ],
    variante === "onglet" && ONGLET,
    className,
  );

  if ("to" in reste && reste.to !== undefined) {
    return <NavLink {...(reste as NavLinkProps)} className={classes} />;
  }

  if ("href" in reste && reste.href !== undefined) {
    const { rel = "noopener noreferrer", ...ancre } = reste as ComponentPropsWithoutRef<"a">;
    return <a {...ancre} rel={rel} className={classes} />;
  }

  const { type = "button", ...bouton } = reste as ComponentPropsWithoutRef<"button">;
  return <button {...bouton} type={type} className={classes} />;
}
