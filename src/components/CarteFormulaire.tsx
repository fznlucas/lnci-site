import type { FormEvent, ReactNode } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { CHAMP_PIEGE } from "@/formulaires/useFormulaire";

/**
 * Carte blanche qui porte un formulaire. Figma : Site / Formulaire, carte
 * du formulaire (rayon 24, remplissage 48, 28 en mobile).
 *
 * Elle pose le titre, les champs fournis par l'appelant, le message
 * d'erreur generale, le bouton pleine largeur et la note. Elle contient
 * aussi le champ piege anti-spam, invisible et hors tabulation.
 *
 * L'ombre de la carte est l'ombre unique de la page (`ombre`, a activer
 * sur la page de pre-inscription seulement).
 */
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

      {/* Champ piege : les robots le remplissent, les humains ne le voient
          pas. Hors ecran plutot que display:none, que certains robots
          savent ignorer. */}
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
