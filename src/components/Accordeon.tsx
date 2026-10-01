import { useRef, type MouseEvent } from "react";
import type { Question } from "@/data/faq";
import { mouvementReduit } from "@/lib/defilement";

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
 * Ouverture et fermeture animees en hauteur, 250 ms (Web Animations : la
 * transition CSS de <details> n'est pas encore prise en charge partout).
 * Sans script ou en mouvement reduit, <details> s'ouvre d'un coup.
 *
 * Une question sans reponse n'est pas rendue : l'equipe redige les
 * reponses manquantes dans data/faq.ts.
 */
const DUREE = 250;

export function Accordeon({ questions }: { questions: readonly Question[] }) {
  const visibles = questions.filter((q) => q.reponse.trim() !== "");

  return (
    <div className="flex flex-col gap-3">
      {visibles.map((q, i) => (
        <QuestionRepliable key={q.question} question={q} ouverte={i === 0} />
      ))}
    </div>
  );
}

function QuestionRepliable({ question, ouverte }: { question: Question; ouverte: boolean }) {
  const details = useRef<HTMLDetailsElement>(null);
  const reponse = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);

  function basculer(e: MouseEvent) {
    const d = details.current;
    const r = reponse.current;
    if (!d || !r || mouvementReduit()) return;
    e.preventDefault();

    animation.current?.cancel();
    const ouvrir = !d.open;
    if (ouvrir) d.open = true;
    const hauteur = `${r.scrollHeight}px`;
    animation.current = r.animate(
      ouvrir ? [{ height: "0px" }, { height: hauteur }] : [{ height: hauteur }, { height: "0px" }],
      { duration: DUREE, easing: "ease-out" },
    );
    animation.current.onfinish = () => {
      if (!ouvrir) d.open = false;
      animation.current = null;
    };
  }

  return (
    <details
      ref={details}
      open={ouverte}
      className="group rounded-carte border-bordure open:border-accent-detail border bg-white px-5 py-5 sm:px-7 sm:py-6"
    >
      <summary
        onClick={basculer}
        className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden"
      >
        <span className="text-d-bloc text-encre flex-1">{question.question}</span>
        <span
          aria-hidden
          className="rounded-pastille bg-champ group-open:bg-accent relative flex size-8 shrink-0 items-center justify-center transition-colors"
        >
          <span className="bg-accent h-0.5 w-3 rounded-[1px] group-open:bg-white" />
          <span className="bg-accent absolute h-3 w-0.5 rounded-[1px] group-open:hidden" />
        </span>
      </summary>
      {/* La marge du haut est dans le bloc anime (pt-3) : elle se replie
          avec la reponse. */}
      <div ref={reponse} className="overflow-hidden">
        <p className="text-w-courant text-texte-courant pt-3">{question.reponse}</p>
      </div>
    </details>
  );
}
