/**
 * Etat commun des formulaires : saisie, erreurs, envoi, message, anti-spam.
 *
 * Un formulaire fournit ses valeurs de depart, sa fonction de validation
 * et sa fonction d'envoi ; le hook s'occupe du reste :
 *
 *   saisie      valeurs courantes, `changer(champ, valeur)` pour les modifier
 *   erreurs     message par champ, efface des que le champ est corrige
 *   envoi       vrai pendant la requete : le bouton est desactive
 *   message     erreur generale (serveur, repli sans back-end), la saisie
 *               est conservee
 *   succes      redirection vers /merci
 *
 * Anti-spam, sans dependance :
 *   - champ piege `site_web`, cache aux humains : s'il est rempli, rien
 *     n'est envoye (et le robot est redirige comme si tout allait bien) ;
 *   - temps minimum de 3 s entre l'affichage et l'envoi : un envoi plus
 *     rapide est simplement differe jusqu'aux 3 s.
 */
import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { sourceDeLaPage } from "@/formulaires/envoi";
import type { Contexte, Erreurs, Resultat, Saisie } from "@/formulaires/types";

const DELAI_MINIMUM = 3000;

export const CHAMP_PIEGE = "site_web";

type Options<S extends Saisie> = {
  initiales: S;
  valider: (saisie: Saisie) => Erreurs;
  envoyer: (saisie: S, contexte: Contexte) => Promise<Resultat>;
};

export function useFormulaire<S extends Saisie>({ initiales, valider, envoyer }: Options<S>) {
  const navigate = useNavigate();
  const [saisie, setSaisie] = useState<S>(initiales);
  const [piege, setPiege] = useState("");
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState("");
  /* Instant d'affichage, fixe au premier rendu. */
  const [affiche] = useState(() => Date.now());
  const enCours = useRef(false);

  function changer(champ: keyof S & string, valeur: string | boolean) {
    setSaisie((s) => ({ ...s, [champ]: valeur }));
    if (erreurs[champ]) {
      setErreurs((e) => {
        const reste = { ...e };
        delete reste[champ];
        return reste;
      });
    }
  }

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enCours.current) return;
    setMessage("");

    if (piege !== "") {
      navigate("/merci");
      return;
    }

    const trouvees = valider(saisie);
    setErreurs(trouvees);
    if (Object.keys(trouvees).length > 0) return;

    enCours.current = true;
    setEnvoi(true);

    const attente = DELAI_MINIMUM - (Date.now() - affiche);
    if (attente > 0) await new Promise((r) => setTimeout(r, attente));

    const resultat = await envoyer(saisie, {
      source: sourceDeLaPage(),
      envoyeLe: new Date().toISOString(),
    });

    enCours.current = false;
    setEnvoi(false);

    if (resultat.etat === "ok") navigate("/merci");
    else if (resultat.etat === "erreurs") setErreurs(resultat.erreurs);
    else setMessage(resultat.message);
  }

  return { saisie, changer, erreurs, envoi, message, soumettre, piege, setPiege };
}
