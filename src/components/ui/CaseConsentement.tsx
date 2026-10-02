import { useId, type ComponentPropsWithoutRef } from "react";

// rgpd : l'api attend `consentement: true`, donc une vraie case à cocher
// texte de la mention figma (site / formulaire)
export function CaseConsentement({
  texte,
  erreur,
  ...reste
}: { texte: string; erreur?: string } & Omit<ComponentPropsWithoutRef<"input">, "type">) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          {...reste}
          id={id}
          type="checkbox"
          aria-invalid={erreur ? true : undefined}
          aria-describedby={erreur ? `${id}-erreur` : undefined}
          className="accent-accent mt-0.5 size-4 shrink-0 cursor-pointer"
        />
        <span className="text-w-legende text-legende">{texte}</span>
      </label>
      {erreur && (
        <p id={`${id}-erreur`} className="text-w-legende text-erreur mt-2 font-semibold">
          {erreur}
        </p>
      )}
    </div>
  );
}
