import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { Etiquette } from "@/components/ui/Etiquette";
import type { Ton } from "@/components/ui/Bouton";
import { RELAIS_ECOLES as R } from "@/data/contenu";
import { cn } from "@/lib/cn";
import { FOND } from "@/lib/tons";

/**
 * Ecoles relais du hackathon. Figma : Site / Relais ecoles ; ton reglable,
 * Electrique sur /hackathon.
 * En-tete centre, puis le nom des ecoles en etiquettes douces (pastille =
 * plein, etiquette de liste = doux).
 */
export function RelaisEcoles({ ton = "electrique" }: { ton?: Ton }) {
  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={609}
        style={{ right: -16, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton={ton} centre pastille={R.pastille} titre={R.titre} chapeau={R.chapeau} />
        <ul className="flex flex-wrap justify-center gap-2.5">
          {R.ecoles.map((e) => (
            <li key={e}>
              <Etiquette variante="doux" ton={ton} taille="grande">
                {e}
              </Etiquette>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
