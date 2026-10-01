import { useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { CadreChamp, SAISIE } from "@/components/ui/Champ";

/**
 * Liste deroulante. Meme boite que le Champ du kit Figma (libelle dans la
 * boite, etat actif en accent), avec un <select> natif : clavier, lecteur
 * d'ecran et selecteur mobile fonctionnent sans script.
 *
 * La premiere option, vide, porte le texte d'invite du Figma ("Choisir
 * dans la liste") ; tant qu'elle est selectionnee, le texte est attenue.
 */
export function ListeDeroulante({
  libelle,
  options,
  invite = "Choisir dans la liste",
  erreur,
  className,
  value,
  ...reste
}: {
  libelle: string;
  options: readonly { id: string; libelle: string }[];
  invite?: string;
  erreur?: string;
  className?: string;
} & ComponentPropsWithoutRef<"select">) {
  const id = useId();

  return (
    <CadreChamp id={id} libelle={libelle} erreur={erreur} className={className}>
      <select
        {...reste}
        id={id}
        value={value}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={erreur ? `${id}-erreur` : undefined}
        className={cn(SAISIE, "cursor-pointer appearance-none", !value && "text-titre-attenue")}
      >
        <option value="">{invite}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id} className="text-encre">
            {o.libelle}
          </option>
        ))}
      </select>
    </CadreChamp>
  );
}
