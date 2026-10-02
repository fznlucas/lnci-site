// seul endroit du site qui parle au serveur
// brancher l'api : VITE_API_URL (.env ou secrets au build), POST json sur
// /preinscriptions et /contacts
// réponses : 201 ok, 400 { erreurs: { champ: msg } }, 409 { message }, 5xx message générique
// sans VITE_API_URL rien n'est envoyé, on affiche le repli avec l'adresse de contact
import { EVENEMENT } from "@/data/evenement";
import type { Contact, Erreurs, PreInscription, Resultat } from "@/formulaires/types";

const API = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

const REPLI = `Le formulaire ouvre très vite. En attendant\u00a0: ${EVENEMENT.email}`;
const PANNE = `L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez-nous\u00a0: ${EVENEMENT.email}`;

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
    // réseau coupé ou serveur injoignable
    return { etat: "indisponible", message: PANNE };
  }

  if (reponse.ok) return { etat: "ok" };

  // le corps peut être vide ou pas du json
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

// chemin + utm_* et poste seulement (quel lien a été suivi), le reste n'est pas transmis
export function sourceDeLaPage(): string {
  const { pathname, search } = window.location;
  const gardes = new URLSearchParams();
  new URLSearchParams(search).forEach((valeur, cle) => {
    if (cle.startsWith("utm_") || cle === "poste") gardes.append(cle, valeur);
  });
  const requete = gardes.toString();
  return requete ? `${pathname}?${requete}` : pathname;
}
