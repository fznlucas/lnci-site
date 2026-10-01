import type { Question } from "@/data/faq";

/**
 * Accordeon de questions. Figma : Site / FAQ, ton Clair.
 *
 * Elements natifs <details> / <summary> : ouverture au clavier et lecteur
 * d'ecran sans script. Chaque question est une carte blanche (rayon 20,
 * bordure claire), la premiere est ouverte.
 *
 * Une question sans reponse n'est pas rendue : l'equipe redige les
 * reponses manquantes dans data/faq.ts.
 *
 * Ecart au Figma, impose par CONVENTIONS.md : pas de bascule + / -
 * (pictogramme) ni de bordure accent sur la carte ouverte (bordure pleine
 * de couleur). L'etat ouvert se lit a la question, qui passe en accent.
 */
export function Accordeon({ questions }: { questions: readonly Question[] }) {
  const visibles = questions.filter((q) => q.reponse.trim() !== "");

  return (
    <div className="flex flex-col gap-3">
      {visibles.map((q, i) => (
        <details
          key={q.question}
          open={i === 0}
          className="group rounded-carte border-bordure border bg-white px-5 py-5 sm:px-7 sm:py-6"
        >
          <summary className="text-d-bloc text-encre group-open:text-accent hover:text-accent cursor-pointer list-none transition-colors [&::-webkit-details-marker]:hidden">
            {q.question}
          </summary>
          <p className="text-w-courant text-texte-courant mt-3">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}
