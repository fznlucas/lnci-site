import { useState, type ReactNode } from "react";
import { CADRE_PAR_DEFAUT, ContexteCadre } from "@/lib/cadre";

// ton de l'en-tête et du pied choisi par chaque page, voir lib/cadre.ts
export function FournisseurCadre({ children }: { children: ReactNode }) {
  const [cadre, definir] = useState(CADRE_PAR_DEFAUT);
  return <ContexteCadre.Provider value={{ cadre, definir }}>{children}</ContexteCadre.Provider>;
}
