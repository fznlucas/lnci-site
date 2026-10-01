import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Pastille } from "@/components/ui/Pastille";
import { CONCEPT } from "@/data/contenu";

/**
 * Le concept. Figma : Site / Concept, ton Clair ; le manifeste est un
 * panneau Nuit (arbitrage "Tons par page" : pas d'Electrique hors du
 * hackathon).
 *
 * En-tete (pastille et titre a gauche, chapeau a droite en desktop),
 * trois cartes numerotees de meme hauteur, puis le manifeste : deux
 * lignes attenuees et une ligne pleine, sur le panneau nuit avec son halo
 * et ses arcs.
 */
export function Concept() {
  return (
    <section className="rythme-section bg-page relative overflow-hidden">
      <Halo ton="clair" taille={622} style={{ right: -81, top: 3 }} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-5">
            <Pastille ton="clair">{CONCEPT.pastille}</Pastille>
            <TitreBicolore attenue={CONCEPT.titre.attenue} plein={CONCEPT.titre.plein} />
          </div>
          <p className="text-w-courant text-texte-courant sm:text-w-chapeau lg:w-[460px]">
            {CONCEPT.chapeau}
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {CONCEPT.cartes.map((c, i) => (
            <li
              key={c.titre}
              className="rounded-panneau border-bordure flex flex-col gap-4 border bg-white p-6 sm:p-8 lg:min-h-[258px]"
            >
              <span className="num text-d-chiffre text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-d-bloc text-encre">{c.titre}</h3>
                <p className="text-w-dense text-texte-courant">{c.texte}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="bg-nuit rounded-panneau relative overflow-hidden p-7 sm:p-12">
          <Halo ton="nuit" taille={648} style={{ left: 92, top: 118 }} />
          <Arcs
            rx={800}
            ry={350}
            haut={192}
            decalage={0}
            opacites={[0.35, 0.18]}
            className="left-[856px]"
          />
          <p className="sm:text-d-sous-titre relative max-w-[860px] text-[1.375rem] leading-[1.2] font-bold tracking-[-0.015em] text-white">
            {CONCEPT.manifeste.map((ligne, i) => (
              <span key={ligne} className={i < 2 ? "block text-white/60" : "block"}>
                {ligne}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
