import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Logo } from "@/data/partenaires";

/**
 * Logo partenaire. Composant Post / Emplacement logo du kit Figma.
 *
 * Deux fonds :
 *   plaque       plaque blanche, logo couleur centre (mur, arc du hero)
 *   transparent  logo pose directement sur le fond (logos blancs du pied)
 *
 * Le composant remplit son conteneur : c'est l'appelant qui fixe la
 * taille de la plaque. Le logo occupe au plus 72 % de la largeur et 60 %
 * de la hauteur sur l'arc du hero, 70 % et 52 % sur le mur (`mur`),
 * comme dans le Figma.
 *
 * Si le fichier est absent ou ne se charge pas, le nom du partenaire
 * s'affiche en texte a la place : jamais d'image cassee.
 *
 * Performance : largeur et hauteur du fichier declarees (data), WebP sans
 * perte ; chargement differe et decodage asynchrone, sauf `prioritaire`
 * (logos du hero, visibles des l'arrivee).
 */
export function LogoPartenaire({
  logo,
  fond = "plaque",
  mur = false,
  prioritaire = false,
  className,
}: {
  logo: Logo;
  fond?: "plaque" | "transparent";
  mur?: boolean;
  /** Logo visible au chargement (hero) : charge tout de suite. */
  prioritaire?: boolean;
  className?: string;
}) {
  const [echec, setEchec] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fond === "plaque" && "rounded-plaque bg-white",
        className,
      )}
    >
      {echec ? (
        <span
          className={cn(
            "text-w-legende px-3 text-center leading-tight font-semibold",
            fond === "plaque" ? "text-encre" : "text-sur-nuit",
          )}
        >
          {logo.nom}
        </span>
      ) : (
        <img
          src={`/logos/${logo.fichier}`}
          alt={logo.nom}
          width={logo.largeur}
          height={logo.hauteur}
          loading={prioritaire ? "eager" : "lazy"}
          decoding={prioritaire ? "auto" : "async"}
          onError={() => setEchec(true)}
          className={cn(
            "object-contain",
            fond === "transparent"
              ? "h-full w-full"
              : mur
                ? "max-h-[52%] max-w-[70%]"
                : "max-h-[60%] max-w-[72%]",
          )}
        />
      )}
    </div>
  );
}
