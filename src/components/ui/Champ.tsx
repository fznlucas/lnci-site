import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// figma : champ du kit (états repos et actif)
// le libellé est dans la boîte, au-dessus de la saisie ; ListeDeroulante réutilise le cadre

type Cadre = {
  id: string;
  libelle: string;
  facultatif?: boolean;
  erreur?: string;
  className?: string;
  children: ReactNode;
};

export function CadreChamp({ id, libelle, facultatif, erreur, className, children }: Cadre) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={cn(
          "group rounded-champ bg-champ flex cursor-text flex-col gap-2 border px-5 py-3 transition-colors",
          "focus-within:border-accent",
          erreur ? "border-erreur" : "border-bordure",
        )}
      >
        <span className="text-w-surtitre text-legende group-focus-within:text-accent uppercase transition-colors">
          {libelle}
          {facultatif && <span className="ml-2 tracking-normal normal-case">(facultatif)</span>}
        </span>
        {children}
      </label>
      {erreur && (
        <p id={`${id}-erreur`} className="text-w-legende text-erreur mt-2 font-semibold">
          {erreur}
        </p>
      )}
    </div>
  );
}

// la bordure et le fond sont portés par le cadre
export const SAISIE =
  "w-full bg-transparent text-w-courant text-encre placeholder:text-titre-attenue focus:outline-none";

type Commun = {
  libelle: string;
  facultatif?: boolean;
  erreur?: string;
  className?: string;
};

function attributs(id: string, erreur?: string) {
  return {
    id,
    "aria-invalid": erreur ? true : undefined,
    "aria-describedby": erreur ? `${id}-erreur` : undefined,
  };
}

export function Champ({
  libelle,
  facultatif,
  erreur,
  className,
  ...saisie
}: Commun & ComponentPropsWithoutRef<"input">) {
  const id = useId();
  return (
    <CadreChamp
      id={id}
      libelle={libelle}
      facultatif={facultatif}
      erreur={erreur}
      className={className}
    >
      <input {...saisie} {...attributs(id, erreur)} className={SAISIE} />
    </CadreChamp>
  );
}

export function ZoneDeTexte({
  libelle,
  facultatif,
  erreur,
  className,
  rows = 5,
  ...saisie
}: Commun & ComponentPropsWithoutRef<"textarea">) {
  const id = useId();
  return (
    <CadreChamp
      id={id}
      libelle={libelle}
      facultatif={facultatif}
      erreur={erreur}
      className={className}
    >
      <textarea
        {...saisie}
        {...attributs(id, erreur)}
        rows={rows}
        className={cn(SAISIE, "resize-y")}
      />
    </CadreChamp>
  );
}
