import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { Bouton, type Ton } from "@/components/ui/Bouton";
import { Etiquette } from "@/components/ui/Etiquette";
import { EVENEMENT } from "@/data/evenement";
import { NIVEAUX as N, OBJET_GRILLE } from "@/data/partenaires";
import { cn } from "@/lib/cn";
import { CARTE, FOND, LEGENDE, PLEIN } from "@/lib/tons";

// figma : site / paliers, ton clair sur /partenaires
// aucun prix affiché : la grille tarifaire part par e-mail sur demande
export function Paliers({ ton = "clair" }: { ton?: Ton }) {
  const grille = `mailto:${EVENEMENT.email}?subject=${encodeURIComponent(OBJET_GRILLE)}`;

  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={778}
        style={{ left: 115, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton={ton} pastille={N.pastille} titre={N.titre} chapeau={N.chapeau} />

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {N.liste.map((n) => {
            // niveau mis en avant : nuit sur fond clair, électrique sur fond nuit
            const tonCarte: Ton = n.misEnAvant ? (ton === "clair" ? "nuit" : "electrique") : ton;
            const fondCarte = n.misEnAvant
              ? ton === "clair"
                ? "bg-nuit carte-survol carte-survol-sombre"
                : "fond-electrique carte-survol carte-survol-sombre"
              : CARTE[ton];
            return (
              <li
                key={n.nom}
                className={cn("rounded-panneau flex flex-col gap-4 p-6 sm:p-8", fondCarte)}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className={cn("text-d-sous-titre", PLEIN[tonCarte])}>{n.nom}</h3>
                  {n.etiquette && (
                    <Etiquette variante="doux" ton={tonCarte}>
                      {n.etiquette}
                    </Etiquette>
                  )}
                </div>
                <ul className="flex flex-col gap-4">
                  {n.avantages.map((a) => (
                    <li
                      key={a}
                      className={cn(
                        // 61px mini (sauf le dernier) dès sm pour aligner les lignes d'une
                        // carte à l'autre ; empilées en mobile, hauteur naturelle
                        "text-w-dense border-t border-dashed pt-3 sm:min-h-[61px] sm:last:min-h-0",
                        PLEIN[tonCarte],
                        tonCarte === "clair" ? "border-filet" : "border-white/35",
                      )}
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className={cn("text-w-legende", LEGENDE[ton])}>{N.note}</p>
          <Bouton
            variante="secondaire"
            ton={ton}
            href={grille}
            className="w-full shrink-0 sm:w-auto"
          >
            {N.action}
          </Bouton>
        </div>
      </div>
    </section>
  );
}
