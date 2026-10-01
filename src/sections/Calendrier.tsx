import { cn } from "@/lib/cn";
import { CALENDRIER } from "@/data/contenu";
import { Bouton } from "@/components/ui/Bouton";

/**
 * Calendrier de decision, puis contact.
 *
 * Derniere section. Elle porte l'echeance commerciale du 30 septembre,
 * qui est l'information la plus utile a un partenaire arrivant sur le
 * site, et oriente vers un contact nominatif plutot que vers un
 * formulaire de masse. Charte page 11.
 */
export function Calendrier() {
  return (
    <section className="bg-page-alt text-encre">
      <div className="contenu py-24">
        <div className="grid gap-x-6 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-w-surtitre uppercase text-accent">Décider</p>
            <h2 className="mt-6 max-w-[16ch] text-[1.875rem] font-extrabold leading-[1.16] text-encre text-balance lg:text-d-titre">
              Le calendrier de décision
            </h2>
          </div>
          <p className="max-w-[46ch] text-w-courant text-texte-courant lg:col-span-5 lg:col-start-8 lg:pt-3">
            Le programme part en publication début octobre. Au-delà du
            30 septembre, un créneau de prise de parole et un sujet réservé ne
            peuvent plus être garantis.
          </p>
        </div>

        <ol className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4">
          {CALENDRIER.map((e, i) => (
            <li
              key={e.date}
              /* Le filet gauche suivait l'index sans tenir compte du point de
                 rupture : en deux colonnes, le troisieme item ouvrait une
                 rangee tout en gardant un filet a gauche. */
              className={cn(
                "border-t border-dotted border-filet/50 py-8 pr-8",
                i === 1 && "sm:border-l sm:pl-8",
                i === 2 && "lg:border-l lg:pl-8",
                i === 3 && "sm:border-l sm:pl-8",
              )}
            >
              <p className="text-[1.375rem] font-extrabold leading-none text-encre">{e.date}</p>
              <p className="mt-3 max-w-[26ch] text-w-legende text-texte-courant">{e.texte}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Bouton to="/partenaires" className="w-full sm:w-auto">
            Offres et contreparties
          </Bouton>
          <Bouton variante="secondaire" to="/contact" className="w-full sm:w-auto">
            Contact direct
          </Bouton>
        </div>
      </div>
    </section>
  );
}
