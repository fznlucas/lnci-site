import { useEffect, useState } from "react";

/**
 * Vrai en dessous de 640px (le point de rupture `sm` de Tailwind).
 *
 * Pour les rares choix qu'une classe CSS ne peut pas porter, comme le ton
 * d'une section qui change en mobile (/programme). Juste des le premier
 * rendu (matchMedia lu a l'initialisation), puis suit le redimensionnement.
 */
const REQUETE = "(width < 40rem)";

export function useMobile(): boolean {
  const [mobile, setMobile] = useState(() => window.matchMedia(REQUETE).matches);

  useEffect(() => {
    const mq = window.matchMedia(REQUETE);
    const suivre = () => setMobile(mq.matches);
    suivre();
    mq.addEventListener("change", suivre);
    return () => mq.removeEventListener("change", suivre);
  }, []);

  return mobile;
}
