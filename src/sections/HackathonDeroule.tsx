import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import type { Ton } from "@/components/ui/Bouton";
import { HACKATHON_DEROULE as D } from "@/data/contenu";
import { cn } from "@/lib/cn";
import { CARTE, COURANT, FOND, PLEIN } from "@/lib/tons";

/**
 * Deroule du hackathon. Figma : Site / Hackathon (deroule) ; ton reglable,
 * Clair sur /hackathon.
 * En-tete, quatre etapes numerotees de meme hauteur, puis le livrable sur
 * un panneau Electrique : texte a gauche, trois pieces en cartes blanches
 * (numero accent, titre encre).
 */
export function HackathonDeroule({ ton = "clair" }: { ton?: Ton }) {
  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={778}
        style={{ left: -173, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton={ton} pastille={D.pastille} titre={D.titre} chapeau={D.chapeau} />

        <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {D.etapes.map((e, i) => (
            <li
              key={e.titre}
              className={cn(
                "rounded-panneau flex flex-col gap-3 p-6 sm:p-8 lg:min-h-[258px]",
                CARTE[ton],
              )}
            >
              <span
                className={cn(
                  "num text-d-chiffre",
                  ton === "nuit" ? "text-accent-clair" : "text-accent",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={cn("text-d-bloc", PLEIN[ton === "electrique" ? "clair" : ton])}>
                {e.titre}
              </h3>
              <p className={cn("text-w-dense", COURANT[ton === "electrique" ? "clair" : ton])}>
                {e.texte}
              </p>
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
                className="rounded-piece text-w-courant carte-survol flex flex-col gap-2 bg-white p-6 font-bold sm:min-h-[158px] sm:p-8"
              >
                {/* Carte numerotee sur Electrique : fond blanc, numero accent,
                    titre encre (docs/HANDOFF.md, "Tons par page"). */}
                <span className="num text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-encre">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
