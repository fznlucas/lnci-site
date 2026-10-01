import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { HACKATHON_DEROULE as D } from "@/data/contenu";

/**
 * Deroule du hackathon. Figma : Site / Hackathon (deroule), ton Nuit.
 * En-tete, quatre etapes numerotees de meme hauteur, puis le livrable sur
 * un panneau Electrique : texte a gauche, trois pieces en cartes nuit.
 */
export function HackathonDeroule() {
  return (
    <section className="rythme-section bg-nuit text-sur-nuit relative overflow-hidden">
      <Halo ton="nuit" taille={778} style={{ left: -173, top: 50 }} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton="nuit" pastille={D.pastille} titre={D.titre} chapeau={D.chapeau} />

        <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {D.etapes.map((e, i) => (
            <li
              key={e.titre}
              className="rounded-panneau bg-nuit-haut flex flex-col gap-3 p-6 sm:p-8 lg:min-h-[258px]"
            >
              <span className="num text-d-chiffre text-accent-clair">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-d-bloc text-sur-nuit">{e.titre}</h3>
              <p className="text-w-dense text-sur-nuit-body">{e.texte}</p>
            </li>
          ))}
        </ol>

        <div className="fond-electrique rounded-panneau relative flex flex-col gap-8 overflow-hidden p-7 sm:p-12 lg:flex-row lg:items-center lg:gap-12">
          <Halo ton="electrique" taille={648} style={{ left: 561, top: 169 }} />
          <div className="relative flex flex-col gap-3 lg:w-[380px] lg:shrink-0">
            <p className="text-w-surtitre text-white uppercase">{D.livrable.surtitre}</p>
            <p className="text-d-sous-titre text-white">{D.livrable.titre}</p>
          </div>
          <ol className="relative grid flex-1 gap-3 sm:grid-cols-3">
            {D.livrable.pieces.map((p, i) => (
              <li
                key={p}
                className="rounded-piece bg-nuit text-w-courant flex flex-col gap-2 p-6 font-bold text-white sm:min-h-[158px] sm:p-8"
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
