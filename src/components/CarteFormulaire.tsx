import type { FormEvent, ReactNode } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { CHAMP_PIEGE } from "@/formulaires/useFormulaire";

// figma : site / formulaire (rayon 24, padding 48, 28 en mobile)
export function CarteFormulaire({
  titre,
  bouton,
  boutonEnvoi,
  note,
  envoi,
  message,
  piege,
  onPiege,
  onSubmit,
  ombre = false,
  children,
}: {
  titre: string;
  bouton: string;
  boutonEnvoi: string;
  note: string;
  envoi: boolean;
  message: string;
  piege: string;
  onPiege: (valeur: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** l'ombre unique de la page : seulement sur la pré-inscription */
  ombre?: boolean;
  children: ReactNode;
}) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-busy={envoi}
      className={`rounded-panneau flex flex-col gap-4 bg-white p-7 sm:p-12 ${
        ombre ? "shadow-[var(--ombre-panneau)]" : ""
      }`}
    >
      <h2 className="text-d-bloc text-encre">{titre}</h2>

      {children}

      {/* piège anti-spam : hors écran plutôt qu'en display:none, que certains robots savent ignorer */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site web
          <input
            type="text"
            name={CHAMP_PIEGE}
            tabIndex={-1}
            autoComplete="off"
            value={piege}
            onChange={(e) => onPiege(e.target.value)}
          />
        </label>
      </div>

      {message && (
        <p role="alert" className="rounded-champ bg-champ text-w-dense text-encre px-5 py-3">
          {message}
        </p>
      )}

      <Bouton type="submit" disabled={envoi} className="w-full">
        {envoi ? boutonEnvoi : bouton}
      </Bouton>

      <p className="text-w-legende text-legende">{note}</p>
    </form>
  );
}
