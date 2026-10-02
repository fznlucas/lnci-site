import { useRef, type MouseEvent } from "react";
import type { Question } from "@/data/faq";
import { mouvementReduit } from "@/lib/defilement";

// figma : site / faq (ton clair)
// <details> natif pour le clavier et les lecteurs d'écran sans script
// animé via web animations : la transition css de <details> n'est pas encore supportée partout
const DUREE = 250;

export function Accordeon({ questions }: { questions: readonly Question[] }) {
  // sans réponse = masquée, le temps que l'équipe la rédige dans data/faq.ts
  const visibles = questions.filter((q) => q.reponse.trim() !== "");

  return (
    <div className="flex flex-col gap-4 sm:gap-3">
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
        {/* bascule +/− en css comme dans le figma, cachée : <details> annonce déjà l'état */}
        <span
          aria-hidden
          className="rounded-pastille bg-champ group-open:bg-accent relative flex size-8 shrink-0 items-center justify-center transition-colors"
        >
          <span className="bg-accent h-0.5 w-3 rounded-[1px] group-open:bg-white" />
          <span className="bg-accent absolute h-3 w-0.5 rounded-[1px] group-open:hidden" />
        </span>
      </summary>
      {/* marge du haut dans le bloc animé (pt-3) pour qu'elle se replie avec la réponse */}
      <div ref={reponse} className="overflow-hidden">
        <p className="text-w-courant text-texte-courant pt-3">{question.reponse}</p>
      </div>
    </details>
  );
}
