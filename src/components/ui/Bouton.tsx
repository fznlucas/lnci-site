import type { ComponentPropsWithoutRef } from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

// figma : bouton du kit
// une seule taille (40px de haut), seuls la variante et le ton du fond changent
// pas d'icône ni de flèche, la charte les interdit dans un bouton

export type Variante = "primaire" | "secondaire" | "tertiaire" | "lien" | "nu";
export type Ton = "clair" | "nuit" | "electrique";

type Commun = {
  variante?: Variante;
  /** ton du fond sous le bouton */
  ton?: Ton;
  className?: string;
};

type ProprietesBouton = Commun & ComponentPropsWithoutRef<"button"> & { to?: never; href?: never };
type ProprietesRoute = Commun & Omit<NavLinkProps, "className" | "style"> & { href?: never };
type ProprietesExterne = Commun & ComponentPropsWithoutRef<"a"> & { to?: never; href: string };

type ProprietesToutes = ProprietesBouton | ProprietesRoute | ProprietesExterne;

const SOCLE =
  "inline-flex items-center justify-center no-underline " +
  "transition-[color,background-color,border-color,translate] duration-200 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent";

// style `bouton` du kit (15px, 600), sauf pour `nu`
const LETTRAGE = "font-sans text-[0.9375rem] font-semibold leading-none whitespace-nowrap";

const GABARIT =
  "h-10 shrink-0 rounded-bouton border border-transparent px-5 " +
  "motion-safe:hover:-translate-y-px active:translate-y-0 " +
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

export function Bouton(proprietes: ProprietesToutes) {
  const { variante = "primaire", ton = "clair", className, ...reste } = proprietes;

  const classes = cn(
    SOCLE,
    variante !== "nu" && LETTRAGE,
    variante === "primaire" && [GABARIT, PRIMAIRE[ton]],
    variante === "secondaire" && [GABARIT, SECONDAIRE[ton]],
    variante === "tertiaire" && ["lien-glisse", TERTIAIRE[ton]],
    variante === "lien" && [
      "underline decoration-1 underline-offset-[3px] hover:underline",
      LIEN[ton],
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
