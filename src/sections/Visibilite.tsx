import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import type { Ton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { VISIBILITE as V } from "@/data/partenaires";
import { cn } from "@/lib/cn";
import { ACCENT, CARTE, FOND, PLEIN } from "@/lib/tons";

/**
 * Visibilite et rapport. Figma : Site / Visibilite. Ton reglable : Nuit sur
 * /partenaires, l'encart du rapport passe alors en panneau Clair (et en
 * panneau Nuit sur fond Clair).
 *
 * Trois cartes blanches de relais, quel que soit le ton (concept : cartes
 * Clair sur Nuit ; noms en pastilles tant que les logos medias ne sont pas
 * fournis), puis l'encart "Ce que vous recevez apres
 * l'evenement" : six elements numerotes sous filets pointilles.
 */
export function Visibilite({ ton = "nuit" }: { ton?: Ton }) {
  /* L'encart prend le ton oppose a celui de la section. */
  const tonRapport: Ton = ton === "clair" ? "nuit" : "clair";

  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={648}
        style={{ left: -137, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton={ton} pastille={V.pastille} titre={V.titre} chapeau={V.chapeau} />

        <ul className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {V.medias.map((m) => (
            <li
              key={m.surtitre}
              className={cn("rounded-panneau flex flex-col gap-4 p-6 sm:p-8", CARTE.clair)}
            >
              <p className={cn("text-w-surtitre uppercase", ACCENT.clair)}>{m.surtitre}</p>
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

        <div
          className={cn(
            "rounded-panneau relative flex flex-col gap-6 overflow-hidden p-7 sm:p-12",
            tonRapport === "nuit" ? "bg-nuit" : "bg-white",
          )}
        >
          <Halo ton={tonRapport} taille={648} style={{ left: 84, top: -46 }} />
          <h3 className={cn("text-d-sous-titre relative", PLEIN[tonRapport])}>{V.rapport.titre}</h3>
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {V.rapport.elements.map((e, i) => (
              <li
                key={e}
                className={cn(
                  "text-w-courant flex gap-3.5 border-t border-dashed pt-4",
                  PLEIN[tonRapport],
                  tonRapport === "nuit" ? "border-white/20" : "border-filet",
                )}
              >
                <span className={cn("num w-[26px] shrink-0 font-bold", ACCENT[tonRapport])}>
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
