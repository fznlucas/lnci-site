import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Champ de formulaire. Composant Champ du kit Figma (etats Repos et Actif).
 *
 * Le libelle est DANS la boite, en sur-titre, au-dessus de la saisie :
 * fond champ, bordure claire, rayon 8. Actif (focus) : bordure et libelle
 * en accent. En erreur : bordure encre et message sous le champ, relie
 * par aria-describedby.
 *
 * `CadreChamp` porte la boite et le message ; `Champ` y pose un <input>,
 * `ZoneDeTexte` un <textarea>. ListeDeroulante reutilise le cadre.
 */

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
          erreur ? "border-encre" : "border-bordure",
        )}
      >
        <span className="text-w-surtitre text-legende group-focus-within:text-accent uppercase transition-colors">
          {libelle}
          {facultatif && <span className="ml-2 tracking-normal normal-case">(facultatif)</span>}
        </span>
        {children}
      </label>
      {erreur && (
        <p id={`${id}-erreur`} className="text-w-legende text-encre mt-2 font-semibold">
          {erreur}
        </p>
      )}
    </div>
  );
}

/* Saisie nue, posee dans le cadre : pas de bordure ni de fond propres. */
export const SAISIE =
  "w-full bg-transparent text-w-courant text-encre placeholder:text-titre-attenue focus:outline-none";

type Commun = {
  libelle: string;
  facultatif?: boolean;
  erreur?: string;
  className?: string;
};

/* Attributs d'accessibilite communs : l'erreur est annoncee avec le champ. */
function attributs(id: string, erreur?: string) {
  return {
    id,
    "aria-invalid": erreur ? true : undefined,
    "aria-describedby": erreur ? `${id}-erreur` : undefined,
  };
}

/** Champ d'une ligne. */
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

/** Zone de texte sur plusieurs lignes (message). */
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
