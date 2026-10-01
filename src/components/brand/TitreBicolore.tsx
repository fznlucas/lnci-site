import { cn } from "@/lib/cn";

type Props = {
  /** Ligne 1, en valeur attenuee. */
  attenue: string;
  /** Ligne 2, en pleine valeur. */
  plein: string;
  /** Rendu sur fond nuit ou sur fond clair. */
  fond?: "clair" | "nuit";
  taille?: "titre" | "intertitre";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

/**
 * Titre bicolore. Charte page 8, la regle.
 *
 * Ligne 1 en valeur attenuee, ligne 2 en pleine valeur. Meme corps,
 * meme graisse, jamais plus de deux lignes.
 */
export function TitreBicolore({
  attenue,
  plein,
  fond = "clair",
  taille = "intertitre",
  className,
  as: Balise = "h2",
}: Props) {
  return (
    <Balise
      className={cn(
        taille === "titre" ? "text-titre" : "text-intertitre",
        "text-balance",
        className,
      )}
    >
      <span className={cn("block", fond === "clair" ? "text-titre-attenue" : "text-titre-attenue/70")}>
        {attenue}
      </span>
      <span className={cn("block", fond === "clair" ? "text-encre" : "text-white")}>{plein}</span>
    </Balise>
  );
}
