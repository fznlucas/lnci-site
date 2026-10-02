import { createContext, useContext, useLayoutEffect } from "react";

// ton de l'en-tête et du pied, posés par App.tsx et non par les pages
// une page qui veut un autre ton appelle useCadre, ex. useCadre({ pied: "nuit" })
export type TonEnTete = "nuit" | "electrique";
export type TonPied = "nuit-bas" | "nuit" | "electrique";
export type Cadre = { entete: TonEnTete; pied: TonPied };

export const CADRE_PAR_DEFAUT: Cadre = { entete: "nuit", pied: "nuit-bas" };

// fourni par components/FournisseurCadre.tsx
export const ContexteCadre = createContext<{ cadre: Cadre; definir: (c: Cadre) => void }>({
  cadre: CADRE_PAR_DEFAUT,
  definir: () => {},
});

export function useCadreCourant(): Cadre {
  return useContext(ContexteCadre).cadre;
}

export function useCadre({ entete, pied }: Partial<Cadre>) {
  const { definir } = useContext(ContexteCadre);
  // layout effect : le ton change avant l'affichage, pas de clignotement entre deux pages
  useLayoutEffect(() => {
    definir({ ...CADRE_PAR_DEFAUT, ...(entete && { entete }), ...(pied && { pied }) });
    return () => definir(CADRE_PAR_DEFAUT);
  }, [definir, entete, pied]);
}
