import { EnTeteSection } from "@/components/EnTeteSection";
import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import { STATUT_FONDATEUR as S } from "@/data/partenaires";

/**
 * Statut de partenaire fondateur. Figma : Site / Statut fondateur, ton
 * Electrique. En-tete, puis quatre avantages en cartes nuit de meme
 * hauteur (titres alignes sur deux lignes). Arc en bas de section.
 */
export function StatutFondateur() {
  return (
    <section className="fond-electrique rythme-section relative overflow-hidden text-white">
      <Halo ton="electrique" taille={587} style={{ right: -42, top: 46 }} />
      <Arcs rx={1224} ry={504} depuisLeBas={98} decalage={0} opacites={[0.35, 0]} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton="electrique" pastille={S.pastille} titre={S.titre} chapeau={S.chapeau} />

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {S.cartes.map((c) => (
            <li
              key={c.titre}
              className="rounded-panneau bg-nuit flex flex-col gap-3 p-6 sm:p-8 lg:min-h-[202px]"
            >
              <h3 className="text-d-bloc text-white sm:min-h-[52px]">{c.titre}</h3>
              <p className="text-w-dense text-sur-electrique">{c.texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
