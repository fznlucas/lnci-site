import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Logo } from "@/data/partenaires";

// figma : post / emplacement logo du kit
// la taille de la plaque est fixée par l'appelant
// fichier absent ou en erreur : on affiche le nom, jamais d'image cassée
export function LogoPartenaire({
  logo,
  fond = "plaque",
  mur = false,
  prioritaire = false,
  className,
}: {
  logo: Logo;
  fond?: "plaque" | "transparent";
  /** logo un peu plus petit dans la plaque (valeurs figma du mur) */
  mur?: boolean;
  /** logos du hero, visibles dès l'arrivée : pas de lazy */
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
