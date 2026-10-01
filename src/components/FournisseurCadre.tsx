import { useState, type ReactNode } from "react";
import { CADRE_PAR_DEFAUT, ContexteCadre } from "@/lib/cadre";

/** Fournit le cadre de la page (ton de l'en-tete et du pied), lib/cadre.ts. */
export function FournisseurCadre({ children }: { children: ReactNode }) {
  const [cadre, definir] = useState(CADRE_PAR_DEFAUT);
  return <ContexteCadre.Provider value={{ cadre, definir }}>{children}</ContexteCadre.Provider>;
}
