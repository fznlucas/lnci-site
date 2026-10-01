import Lenis from "lenis";

/**
 * Defilement fluide de la page (Lenis, duree 1,1 s).
 *
 * Lenis fait defiler la fenetre elle-meme : window.scrollY et l'evenement
 * scroll restent justes, l'epinglage de l'arc du programme (ArcSoiree)
 * fonctionne donc tel quel. Les ancres (#faq, #formulaire) passent par
 * defilerVers, qui tient compte de scroll-margin-top (scroll-mt-20 sur les
 * sections) pour ne pas finir sous l'en-tete.
 *
 * prefers-reduced-motion: reduce : Lenis n'est pas demarre, le defilement
 * reste celui du navigateur et les sauts d'ancre sont immediats.
 */
let lenis: Lenis | null = null;

export function mouvementReduit(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Demarre Lenis ; renvoie la fonction d'arret. */
export function demarrerDefilementFluide(): () => void {
  if (mouvementReduit()) return () => {};
  lenis = new Lenis({ duration: 1.1, autoRaf: true, stopInertiaOnNavigate: true });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

/** Defile jusqu'a un element ou une position ; `immediat` saute sans animation. */
export function defilerVers(cible: HTMLElement | number, { immediat = false } = {}) {
  if (lenis) {
    lenis.scrollTo(cible, { immediate: immediat, force: true });
    return;
  }
  if (typeof cible === "number") window.scrollTo(0, cible);
  else cible.scrollIntoView();
}

/** Bloque ou rend le defilement (menu mobile ouvert). */
export function bloquerDefilement(bloque: boolean) {
  if (bloque) lenis?.stop();
  else lenis?.start();
}
