import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { mouvementReduit } from "@/lib/defilement";

// rien à déclarer dans les sections : on anime les enfants directs du .contenu
// de chaque section de premier niveau (styles dans theme-tailwind.css)
const DUREE = 500;
const ECART = 60;

export function Apparitions() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (mouvementReduit() || !("IntersectionObserver" in window)) return;

    const cibles: { el: HTMLElement; delai: number }[] = [];
    const sections = [...document.querySelectorAll<HTMLElement>("main section")].filter(
      (s) => !s.parentElement?.closest("section"),
    );
    // la première section est le hero, jamais animé
    for (const section of sections.slice(1)) {
      const conteneurs = [...section.querySelectorAll<HTMLElement>(".contenu")].filter(
        (c) => !c.parentElement?.closest(".contenu"),
      );
      for (const conteneur of conteneurs) {
        for (const bloc of conteneur.children) {
          if (!(bloc instanceof HTMLElement)) continue;
          const grille =
            /^(OL|UL)$/.test(bloc.tagName) && getComputedStyle(bloc).display === "grid";
          // une grille de cartes arrive carte par carte, pas d'un bloc
          if (grille) {
            [...bloc.children].forEach((carte, i) => {
              if (carte instanceof HTMLElement) cibles.push({ el: carte, delai: i * ECART });
            });
          } else {
            cibles.push({ el: bloc, delai: 0 });
          }
        }
      }
    }

    const minuteries: number[] = [];
    // on retire les classes à l'arrivée pour rendre ses propres transitions (survol) à l'élément
    const terminer = (el: HTMLElement) => {
      el.classList.remove("apparition", "est-visible");
      el.style.transitionDelay = "";
    };

    const auCroisement = (entrees: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        const el = entree.target as HTMLElement;
        obs.unobserve(el);
        el.classList.add("est-visible");
        const delai = parseFloat(el.style.transitionDelay) || 0;
        minuteries.push(window.setTimeout(() => terminer(el), DUREE + delai + 50));
      }
    };
    // pas de marge de 8 % dans une zone épinglée (l'arc) : collée, elle ne bouge plus
    // et un élément dans ses 8 % du bas ne serait jamais révélé
    const observateur = new IntersectionObserver(auCroisement, {
      rootMargin: "0px 0px -8% 0px",
    });
    const observateurEpingle = new IntersectionObserver(auCroisement);

    for (const { el, delai } of cibles) {
      el.classList.add("apparition");
      if (delai) el.style.transitionDelay = `${delai}ms`;
      (el.closest("[data-zone-epinglee]") ? observateurEpingle : observateur).observe(el);
    }

    return () => {
      observateur.disconnect();
      observateurEpingle.disconnect();
      minuteries.forEach(clearTimeout);
      cibles.forEach(({ el }) => terminer(el));
    };
  }, [pathname]);

  return null;
}
