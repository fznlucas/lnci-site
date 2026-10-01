import { EnTeteSection } from "@/components/EnTeteSection";
import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import type { Ton } from "@/components/ui/Bouton";
import { STATUT_FONDATEUR as S } from "@/data/partenaires";
import { cn } from "@/lib/cn";
import { CARTE, COURANT, FOND, PLEIN } from "@/lib/tons";

/**
 * Statut de partenaire fondateur. Figma : Site / Statut fondateur ; ton
 * reglable, Nuit sur /partenaires. En-tete, puis quatre avantages en
 * cartes de meme hauteur (titres alignes sur deux lignes). Arc en bas de
 * section.
 */
export function StatutFondateur({ ton = "nuit" }: { ton?: Ton }) {
  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={587}
        style={{ right: -42, top: "50%", transform: "translateY(-50%)" }}
      />
      <Arcs
        rx={1224}
        ry={504}
        depuisLeBas={98}
        decalage={0}
        opacites={[0.35, 0]}
        clair={ton === "clair"}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton={ton} pastille={S.pastille} titre={S.titre} chapeau={S.chapeau} />

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {S.cartes.map((c) => (
            <li
              key={c.titre}
              className={cn(
                "rounded-panneau flex flex-col gap-3 p-6 sm:p-8 lg:min-h-[202px]",
                CARTE[ton],
              )}
            >
              <h3
                className={cn(
                  "text-d-bloc sm:min-h-[52px]",
                  PLEIN[ton === "electrique" ? "clair" : ton],
                )}
              >
                {c.titre}
              </h3>
              <p className={cn("text-w-dense", COURANT[ton === "electrique" ? "clair" : ton])}>
                {c.texte}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
