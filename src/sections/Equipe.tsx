import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { EQUIPE as E } from "@/data/equipe";

/**
 * L'equipe. Figma : Site / Equipe, ton Clair. Quatre referents en cartes :
 * avatar (initiales sur degrade Electrique, ou photo carree si fournie),
 * role en sur-titre, nom, structure. Aucun telephone, aucun e-mail perso.
 */
export function Equipe() {
  return (
    <section className="rythme-section bg-page relative overflow-hidden">
      <Halo
        ton="clair"
        taille={622}
        style={{ right: -52, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection pastille={E.pastille} titre={E.titre} chapeau={E.chapeau} />

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {E.membres.map((m) => (
            <li
              key={m.nom}
              className="rounded-panneau border-bordure flex flex-col items-start gap-4 border bg-white p-6 sm:p-8"
            >
              {m.photo ? (
                <img
                  src={m.photo}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  className="size-16 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="fond-electrique text-d-bloc flex size-16 items-center justify-center rounded-full text-white"
                >
                  {m.initiales}
                </span>
              )}
              <p className="text-w-surtitre text-accent uppercase">{m.role}</p>
              <h3 className="text-d-bloc text-encre">{m.nom}</h3>
              <p className="text-w-dense text-texte-courant">{m.structure}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
