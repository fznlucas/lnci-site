import { CHIFFRES } from "@/data/contenu";

/**
 * Ce que l'edition engage.
 *
 * Grille de six valeurs en graisse 800, chacune sous un filet, avec sa
 * qualification en dessous. C'est la structure des pages de societes
 * de gestion : le chiffre d'abord, la definition ensuite, et une note
 * qui permet de le verifier.
 *
 * Chaque valeur presente ici est soutenable si un partenaire la
 * verifie. Le total de participants attendus en est absent.
 */
export function Chiffres() {
  return (
    <section className="bg-nuit text-sur-nuit">
      <div className="contenu py-24">
        <div className="grid gap-x-6 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-w-surtitre uppercase text-accent-clair">Engagements</p>
            <h2 className="mt-6 max-w-[16ch] text-[1.875rem] font-extrabold leading-[1.16] text-sur-nuit text-balance lg:text-d-titre">
              Ce que l'édition engage
            </h2>
          </div>
          <p className="max-w-[46ch] text-w-courant text-sur-nuit-body lg:col-span-5 lg:col-start-8 lg:pt-3">
            Chaque valeur est vérifiable et fait l'objet d'un rapport nominatif
            remis aux partenaires six jours après l'événement.
          </p>
        </div>

        <dl className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {CHIFFRES.map((c) => (
            <div key={c.libelle}>
              <hr className="filet-sur-nuit" />
              <dt className="num mt-6 text-[2.5rem] font-black leading-none text-sur-nuit lg:text-d-chiffre">
                {c.valeur}
              </dt>
              <dd className="mt-4">
                <p className="max-w-[30ch] text-w-courant text-sur-nuit">{c.libelle}</p>
                <p className="mt-2 max-w-[34ch] text-w-legende text-sur-nuit-body">{c.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
