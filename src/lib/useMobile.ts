import { useEffect, useState } from "react";

// = sous `sm` (640px), seulement quand une classe css ne suffit pas
// (ex. ton d'une section qui change en mobile sur /programme)
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
