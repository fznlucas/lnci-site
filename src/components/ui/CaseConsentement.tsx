import { useId, type ComponentPropsWithoutRef } from "react";

/**
 * Case de consentement (RGPD). Le texte est celui de la mention du Figma
 * (Site / Formulaire) ; la case rend l'accord explicite, comme le demande
 * le contrat d'API (`consentement: true`). Case native, teintee en accent.
 */
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
        <p id={`${id}-erreur`} className="text-w-legende text-encre mt-2 font-semibold">
          {erreur}
        </p>
      )}
    </div>
  );
}
