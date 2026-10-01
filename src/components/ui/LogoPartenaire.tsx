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
 * de la hauteur, comme dans le Figma.
 *
 * Si le fichier est absent ou ne se charge pas, le nom du partenaire
 * s'affiche en texte a la place : jamais d'image cassee.
 */
export function LogoPartenaire({
  logo,
  fond = "plaque",
  className,
}: {
  logo: Logo;
  fond?: "plaque" | "transparent";
  className?: string;
}) {
  const [echec, setEchec] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fond === "plaque" && "rounded-bouton bg-white",
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
          loading="lazy"
          decoding="async"
          onError={() => setEchec(true)}
          className={cn(
            "object-contain",
            fond === "plaque" ? "max-h-[60%] max-w-[72%]" : "h-full w-full",
          )}
        />
      )}
    </div>
  );
}
