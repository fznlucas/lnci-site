import Lenis from "lenis";

// lenis fait défiler la fenêtre elle-même : window.scrollY reste juste,
// l'épinglage d'ArcSoiree marche tel quel
// un seul écouteur de défilement pour tout le site, les composants passent par surDefilement
// mouvement réduit : pas de lenis, défilement natif
let lenis: Lenis | null = null;
const abonnes = new Set<() => void>();
const diffuser = () => abonnes.forEach((rappel) => rappel());

export function surDefilement(rappel: () => void): () => void {
  abonnes.add(rappel);
  return () => abonnes.delete(rappel);
}

export function mouvementReduit(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function demarrerDefilementFluide(): () => void {
  if (mouvementReduit()) {
    window.addEventListener("scroll", diffuser, { passive: true });
    return () => window.removeEventListener("scroll", diffuser);
  }
  lenis = new Lenis({ duration: 1.1, autoRaf: true, stopInertiaOnNavigate: true });
  lenis.on("scroll", diffuser);
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

// à utiliser pour les ancres (#faq, #formulaire) : respecte le scroll-mt-20 des
// sections, sinon on finit sous l'en-tête
export function defilerVers(cible: HTMLElement | number, { immediat = false } = {}) {
  if (lenis) {
    lenis.scrollTo(cible, { immediate: immediat, force: true });
    return;
  }
  if (typeof cible === "number") window.scrollTo(0, cible);
  else cible.scrollIntoView();
}

// menu mobile ouvert
export function bloquerDefilement(bloque: boolean) {
  if (bloque) lenis?.stop();
  else lenis?.start();
}
