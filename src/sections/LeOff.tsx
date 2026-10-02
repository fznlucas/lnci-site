import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton, type Ton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { LE_OFF } from "@/data/partenaires";
import { cn } from "@/lib/cn";
import { ACCENT, CARTE, COURANT, FOND, PLEIN } from "@/lib/tons";

// figma : site / le off, ton nuit sur /programme, clair sur /partenaires
export function LeOff({
  ton = "nuit",
  titre = LE_OFF.titre,
  lien,
}: {
  ton?: Ton;
  titre?: { attenue: string; plein: string };
  lien?: { libelle: string; to: string };
}) {
  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={648}
        style={{ right: -36, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-6">
        {/* pastille hors colonnes pour que les cartes démarrent au niveau du titre */}
        <Pastille ton={ton} className="self-start">
          {LE_OFF.pastille}
        </Pastille>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-0">
          <div className="flex flex-col items-start gap-6 lg:w-[480px] lg:shrink-0">
            <TitreBicolore ton={ton} attenue={titre.attenue} plein={titre.plein} />
            <p className={cn("text-w-courant sm:text-w-chapeau", COURANT[ton])}>{LE_OFF.chapeau}</p>
            <ul className="flex flex-wrap gap-2">
              {LE_OFF.formats.map((f) => (
                <li key={f}>
                  <Pastille ton={ton}>{f}</Pastille>
                </li>
              ))}
            </ul>
            {lien && (
              <Bouton variante="secondaire" ton={ton} to={lien.to} className="w-full sm:w-auto">
                {lien.libelle}
              </Bouton>
            )}
          </div>

          <ol className="grid flex-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:w-[720px] lg:flex-none">
            {LE_OFF.cartes.map((c, i) => (
              <li
                key={c.titre}
                className={cn("rounded-carte flex flex-col gap-2.5 p-6 sm:p-8", CARTE[ton])}
              >
                <span className={cn("num text-w-courant font-bold", ACCENT[ton])}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={cn("text-d-bloc sm:min-h-[52px]", PLEIN[ton])}>{c.titre}</h3>
                <p className={cn("text-w-dense", COURANT[ton])}>{c.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
