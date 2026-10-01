import type { ComponentPropsWithoutRef } from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variante =
  | "primaire"
  | "secondaire"
  | "sur-clair"
  | "lien"
  | "onglet"
  | "nu";

type Commun = {
  variante?: Variante;
  /**
   * Bouton secondaire pose sur fond nuit. Ne change que la teinte de
   * survol : le contour et le texte suivent deja currentColor.
   */
  sombre?: boolean;
  className?: string;
};

type ProprietesBouton = Commun & ComponentPropsWithoutRef<"button"> & { to?: never; href?: never };
type ProprietesRoute = Commun & Omit<NavLinkProps, "className" | "style"> & { href?: never };
type ProprietesExterne = Commun & ComponentPropsWithoutRef<"a"> & { to?: never; href: string };

type ProprietesToutes = ProprietesBouton | ProprietesRoute | ProprietesExterne;

/**
 * Bouton unique du systeme. Charte pages 9 et 12.
 *
 * Il rend un NavLink si `to` est donne, une ancre si `href` est donne,
 * un <button> sinon. Les trois passent par le meme gabarit, donc deux
 * boutons de meme taille ont exactement la meme hauteur : la hauteur
 * est fixe, le remplissage est horizontal seulement, et toutes les
 * variantes portent une bordure de 1px, transparente par defaut. Le
 * corps du texte n'entre plus dans le calcul de la hauteur.
 *
 * Une seule geometrie, partout : 40px de haut, 18px de remplissage
 * horizontal. Le bouton de la barre de navigation, celui du hero et
 * celui du formulaire de pied sont donc rigoureusement le meme objet.
 * Il y avait auparavant trois tailles, xs, sm et md : le meme libelle,
 * "Reserver sa place", se presentait a 34px dans la barre et a 40px
 * dans le hero, deux boutons differents pour une seule action. Et 34
 * comme 36 sortaient du rythme vertical de 8px.
 *
 * Ce qui varie d'un emploi a l'autre est la variante, c'est a dire la
 * couleur, jamais la taille. Un bouton reste secondaire par sa teinte,
 * pas en retrecissant.
 *
 * Aucune icone, aucun pictogramme, aucune fleche : la charte les
 * interdit dans un bouton. Le libelle reste en casse normale.
 *
 * Six variantes, une par TYPE de commande, et rien d'autre. Elles
 * couvrent toutes les commandes du site, y compris celles qui ne
 * ressemblent pas a un bouton : le lien d'action de fin de section,
 * l'onglet de selection, la cible nue. Ecrites a la main la ou elles
 * servaient, elles divergeaient d'un fichier a l'autre et aucune
 * n'avait d'anneau de focus.
 *
 *   primaire     l'action principale, en aplat d'accent
 *   secondaire   l'action de second rang, contour pointille
 *   sur-clair    l'action principale posee sur un fond clair
 *   lien         une action rendue comme un lien de texte
 *   onglet       un choix parmi plusieurs, etat porte par aria-pressed
 *   nu           une cible sans gabarit : bascule, libelle survolable
 */

/* Ce que portent TOUTES les variantes : la mise en ligne, l'absence de
   soulignement et l'anneau de focus. Aucune commande n'y echappe. */
const SOCLE =
  "inline-flex items-center justify-center " +
  "no-underline hover:no-underline transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent";

/* Le lettrage du bouton. `nu` ne le porte pas : sa typographie lui vient
   de l'endroit ou il se pose, un libelle d'heure ou deux traits. */
const LETTRAGE =
  "font-sans font-semibold leading-none tracking-[0.01em] whitespace-nowrap";

/* Le gabarit du bouton proprement dit. Seules les trois variantes
   pleines le portent. Hauteur fixe, remplissage horizontal seulement :
   deux boutons ont toujours la meme hauteur, quel que soit le corps de
   leur libelle. */
const GABARIT =
  "shrink-0 rounded-bouton border border-solid border-transparent " +
  "h-[40px] px-[18px] text-[0.8125rem] " +
  "active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-40 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";

/* Lien d'action : le renvoi qui ferme une section. Il n'est pas
   souligne parce qu'il est seul sur sa ligne et jamais pris dans une
   phrase ; c'est la couleur d'accent et la graisse qui le designent. */
const LIEN = "text-w-legende font-semibold text-accent hover:text-encre";

/* Onglet : l'etat n'est pas une prop, il est lu sur `aria-pressed`, de
   sorte que ce qui se voit et ce qui s'annonce ne peuvent pas diverger.
   Le filet pointille de l'actif est le seul separateur admis. */
const ONGLET =
  "text-w-legende font-semibold text-legende " +
  "border-b border-dotted border-transparent pb-2 " +
  "aria-pressed:text-encre aria-pressed:border-accent";

export function Bouton(proprietes: ProprietesToutes) {
  const {
    variante = "primaire",
    sombre = false,
    className,
    ...reste
  } = proprietes;

  const classes = cn(
    SOCLE,
    variante !== "nu" && LETTRAGE,
    variante === "lien" && LIEN,
    variante === "onglet" && ONGLET,
    (variante === "primaire" || variante === "secondaire" || variante === "sur-clair") && [
      GABARIT,
      variante === "primaire" && "bg-accent text-sur-nuit hover:bg-accent-survol",
      variante === "secondaire" && [
        "border-dotted border-current/30 hover:border-current/60",
        sombre ? "hover:bg-nuit-haut" : "hover:bg-champ",
      ],
      variante === "sur-clair" && "bg-encre text-sur-nuit hover:bg-nuit",
    ],
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
