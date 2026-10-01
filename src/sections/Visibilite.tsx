import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { Pastille } from "@/components/ui/Pastille";
import { VISIBILITE as V } from "@/data/partenaires";

/**
 * Visibilite et rapport. Figma : Site / Visibilite, ton Clair, encart Nuit.
 * Trois cartes de relais (noms en pastilles tant que les logos medias ne
 * sont pas fournis), puis l'encart "Ce que vous recevez apres
 * l'evenement" : six elements numerotes sous filets pointilles.
 */
export function Visibilite() {
  return (
    <section className="rythme-section bg-page relative overflow-hidden">
      <Halo ton="clair" taille={648} style={{ left: -137, top: 0 }} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection pastille={V.pastille} titre={V.titre} chapeau={V.chapeau} />

        <ul className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {V.medias.map((m) => (
            <li
              key={m.surtitre}
              className="rounded-panneau border-bordure flex flex-col gap-4 border bg-white p-6 sm:p-8"
            >
              <p className="text-w-surtitre text-accent uppercase">{m.surtitre}</p>
              <ul className="flex flex-wrap gap-2">
                {m.noms.map((n) => (
                  <li key={n}>
                    <Pastille ton="clair" point={false}>
                      {n}
                    </Pastille>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="bg-nuit rounded-panneau relative flex flex-col gap-6 overflow-hidden p-7 sm:p-12">
          <Halo ton="nuit" taille={648} style={{ left: 84, top: -46 }} />
          <h3 className="text-d-sous-titre relative text-white">{V.rapport.titre}</h3>
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {V.rapport.elements.map((e, i) => (
              <li
                key={e}
                className="text-w-courant flex gap-3.5 border-t border-dashed border-white/20 pt-4 text-white"
              >
                <span className="num text-accent-clair w-[26px] shrink-0 font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {e}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
