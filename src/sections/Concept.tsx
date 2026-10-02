import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { CONCEPT } from "@/data/contenu";

// figma : site / concept, ton clair
// manifeste en panneau nuit et pas électrique : électrique seulement sur /hackathon
// pas de halo ni d'arcs sur le manifeste
export function Concept() {
  return (
    <section className="rythme-section bg-page relative overflow-hidden">
      <Halo
        ton="clair"
        taille={622}
        style={{ right: -81, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection
          ton="clair"
          pastille={CONCEPT.pastille}
          titre={CONCEPT.titre}
          chapeau={CONCEPT.chapeau}
        />

        <ol className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {CONCEPT.cartes.map((c, i) => (
            <li
              key={c.titre}
              className="rounded-panneau border-bordure carte-survol flex flex-col gap-4 border bg-white p-6 sm:p-8 lg:min-h-[258px]"
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

        <div className="bg-nuit rounded-panneau p-7 sm:p-12">
          <p className="text-d-bloc sm:text-d-sous-titre max-w-[860px] text-white">
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
