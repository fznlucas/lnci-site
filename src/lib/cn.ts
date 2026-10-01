import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge ne connait pas les corps du projet (text-d-*, text-w-*,
 * echelle de la charte). Sans cette declaration, il les prend pour des
 * couleurs : `text-w-legende text-white` perdait le corps, seul le
 * dernier "text-*" survivait. Ils sont declares ici comme tailles de
 * police, donc ils ne se fusionnent qu'entre eux.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "d-hero",
            "d-hero-s",
            "d-titre",
            "d-sous-titre",
            "d-bloc",
            "d-chiffre",
            "w-chapeau",
            "w-courant",
            "w-dense",
            "w-legende",
            "w-surtitre",
            "affiche",
            "hero",
            "titre",
            "intertitre",
            "bloc",
            "courant",
            "legende",
            "surtitre",
          ],
        },
      ],
    },
  },
});

/** Fusionne des classes Tailwind sans conflit de specificite. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
