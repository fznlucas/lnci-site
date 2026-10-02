import { useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { CadreChamp, SAISIE } from "@/components/ui/Champ";

// select natif exprès : clavier, lecteur d'écran et sélecteur mobile sans script
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
