import { createContext, useContext, useLayoutEffect } from "react";

/**
 * Cadre de la page : le ton de l'en-tete et du pied de page.
 *
 * L'en-tete et le pied de page sont poses par le gabarit (App.tsx), pas
 * par les pages. Une page qui veut un autre ton le declare en tete de son
 * composant, et le gabarit le transmet aux props `ton` :
 *
 *   useCadre({ entete: "electrique", pied: "electrique" })   // /hackathon
 *   useCadre({ pied: "nuit" })                               // accueil
 *
 * En quittant la page, le cadre revient aux valeurs par defaut (en-tete
 * Nuit, pied de page Nuit bas). Le changement se fait avant l'affichage
 * (useLayoutEffect) : aucun clignotement d'une page a l'autre.
 */
export type TonEnTete = "nuit" | "electrique";
export type TonPied = "nuit-bas" | "nuit" | "electrique";
export type Cadre = { entete: TonEnTete; pied: TonPied };

export const CADRE_PAR_DEFAUT: Cadre = { entete: "nuit", pied: "nuit-bas" };

/** Contexte du cadre, fourni par components/FournisseurCadre.tsx. */
export const ContexteCadre = createContext<{ cadre: Cadre; definir: (c: Cadre) => void }>({
  cadre: CADRE_PAR_DEFAUT,
  definir: () => {},
});

/** Le cadre courant, lu par le gabarit. */
export function useCadreCourant(): Cadre {
  return useContext(ContexteCadre).cadre;
}

/** Declare le cadre de la page courante. */
export function useCadre({ entete, pied }: Partial<Cadre>) {
  const { definir } = useContext(ContexteCadre);
  useLayoutEffect(() => {
    definir({ ...CADRE_PAR_DEFAUT, ...(entete && { entete }), ...(pied && { pied }) });
    return () => definir(CADRE_PAR_DEFAUT);
  }, [definir, entete, pied]);
}
