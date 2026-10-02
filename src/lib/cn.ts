import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// sans ça tailwind-merge prend les corps du projet (text-d-*, text-w-*) pour des
// couleurs : `text-w-legende text-white` perdait le corps
// à compléter à chaque nouveau corps ajouté dans les tokens
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "d-hero",
            "d-hero-s",
            "d-display",
            "d-display-l",
            "d-titre",
            "d-section",
            "d-sous-titre",
            "d-bloc",
            "d-chiffre",
            "w-chapeau",
            "w-courant",
            "w-dense",
            "w-legende",
            "w-surtitre",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
