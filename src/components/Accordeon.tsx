import type { Question } from "@/data/faq";

/**
 * Accordeon de questions. Figma : Site / FAQ, ton Clair.
 *
 * Elements natifs <details> / <summary> : ouverture au clavier et lecteur
 * d'ecran sans script. Chaque question est une carte blanche (rayon 20,
 * bordure claire), la premiere est ouverte. Carte ouverte : bordure
 * accent-detail et bascule pleine (un trait, le moins). Carte fermee :
 * bascule lavande avec deux traits, le plus. La bascule est dessinee en
 * CSS, comme dans le Figma, et cachee aux lecteurs d'ecran : l'etat est
 * deja annonce par <details>.
 *
 * Une question sans reponse n'est pas rendue : l'equipe redige les
 * reponses manquantes dans data/faq.ts.
 */
export function Accordeon({ questions }: { questions: readonly Question[] }) {
  const visibles = questions.filter((q) => q.reponse.trim() !== "");

  return (
    <div className="flex flex-col gap-3">
      {visibles.map((q, i) => (
        <details
          key={q.question}
          open={i === 0}
          className="group rounded-carte border-bordure open:border-accent-detail border bg-white px-5 py-5 sm:px-7 sm:py-6"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
            <span className="text-d-bloc text-encre flex-1">{q.question}</span>
            <span
              aria-hidden
              className="rounded-pastille bg-champ group-open:bg-accent relative flex size-8 shrink-0 items-center justify-center transition-colors"
            >
              <span className="bg-accent h-0.5 w-3 rounded-[1px] group-open:bg-white" />
              <span className="bg-accent absolute h-3 w-0.5 rounded-[1px] group-open:hidden" />
            </span>
          </summary>
          <p className="text-w-courant text-texte-courant mt-3">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}
