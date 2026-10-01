import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { Pastille } from "@/components/ui/Pastille";
import { RELAIS_ECOLES as R } from "@/data/contenu";

/**
 * Ecoles relais du hackathon. Figma : Site / Relais ecoles, ton Clair.
 * En-tete centre, puis le nom des ecoles en pastilles pleines (arbitrage :
 * toutes les pastilles du site sont pleines).
 */
export function RelaisEcoles() {
  return (
    <section className="rythme-section bg-page relative overflow-hidden">
      <Halo ton="clair" taille={609} style={{ right: -16, top: 0 }} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection centre pastille={R.pastille} titre={R.titre} chapeau={R.chapeau} />
        <ul className="flex flex-wrap justify-center gap-2.5">
          {R.ecoles.map((e) => (
            <li key={e}>
              <Pastille ton="clair" point={false} className="text-w-courant px-5 py-3 font-bold">
                {e}
              </Pastille>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
