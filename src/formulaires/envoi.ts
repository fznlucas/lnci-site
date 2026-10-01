/**
 * Envoi des formulaires. LE SEUL endroit du site qui parle au serveur.
 *
 * Pour brancher le back-end : renseigner VITE_API_URL (fichier .env, ou
 * secrets du depot au build) avec l'adresse de l'API, sans barre finale.
 * Les formulaires postent alors en JSON sur :
 *
 *   ${VITE_API_URL}/preinscriptions
 *   ${VITE_API_URL}/contacts
 *
 * Contrat attendu (docs/HANDOFF.md, section 8.3) :
 *   201 { ok: true }                          succes
 *   400 { ok: false, erreurs: { champ: msg } } erreurs affichees sous les champs
 *   409 { ok: false, message }                 message affiche en tete
 *   5xx                                        message generique
 *
 * Tant que VITE_API_URL est vide, rien n'est envoye : le formulaire
 * affiche le message de repli avec l'adresse de contact. Aucune saisie
 * n'est perdue en silence.
 */
import { EVENEMENT } from "@/data/evenement";
import type { Contact, Erreurs, PreInscription, Resultat } from "@/formulaires/types";

const API = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

const REPLI = `Le formulaire ouvre très vite. En attendant\u00a0: ${EVENEMENT.email}`;
const PANNE = `L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez-nous\u00a0: ${EVENEMENT.email}`;

/** Un back-end est-il configure ? */
export const apiDisponible = API !== "";

async function poster(chemin: string, donnees: PreInscription | Contact): Promise<Resultat> {
  if (!apiDisponible) return { etat: "indisponible", message: REPLI };

  let reponse: Response;
  try {
    reponse = await fetch(`${API}${chemin}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(donnees),
    });
  } catch {
    /* Reseau coupe, serveur injoignable. */
    return { etat: "indisponible", message: PANNE };
  }

  if (reponse.ok) return { etat: "ok" };

  /* Le corps peut etre absent ou ne pas etre du JSON : on ne s'y fie que
     s'il a la forme attendue. */
  const corps = (await reponse.json().catch(() => null)) as {
    erreurs?: Erreurs;
    message?: string;
  } | null;

  if (reponse.status === 400 && corps?.erreurs) return { etat: "erreurs", erreurs: corps.erreurs };
  if (reponse.status < 500 && corps?.message) return { etat: "message", message: corps.message };
  return { etat: "indisponible", message: PANNE };
}

export function envoyerPreInscription(donnees: PreInscription) {
  return poster("/preinscriptions", donnees);
}

export function envoyerContact(donnees: Contact) {
  return poster("/contacts", donnees);
}

/**
 * Source d'un envoi : le chemin de la page, suivi des parametres utm_* et
 * du parametre poste s'il y en a (ils disent quel lien a ete suivi). Les
 * autres parametres ne sont pas transmis.
 */
export function sourceDeLaPage(): string {
  const { pathname, search } = window.location;
  const gardes = new URLSearchParams();
  new URLSearchParams(search).forEach((valeur, cle) => {
    if (cle.startsWith("utm_") || cle === "poste") gardes.append(cle, valeur);
  });
  const requete = gardes.toString();
  return requete ? `${pathname}?${requete}` : pathname;
}
