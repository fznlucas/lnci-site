import { Halo } from "@/components/brand/Halo";
import { Pastille } from "@/components/ui/Pastille";
import { PROGRAMME, SOIREES } from "@/data/contenu";
import { cn } from "@/lib/cn";

/**
 * Programme detaille de /programme. Figma : Site / Programme (detail),
 * ton Clair.
 *
 * Un bloc par jour : a gauche la pastille, le titre et les infos du jour ;
 * a droite les creneaux en cartes (heure, intitule et detail, pastille de
 * format). Les "Temps fort" passent en ton Electrique. Note indicative en
 * bas. Tout vient de SOIREES (data/contenu.ts), comme l'arc.
 */
export function ProgrammeDetail() {
  return (
    <section className="rythme-section bg-page relative overflow-hidden">
      <Halo ton="clair" taille={583} style={{ right: -68, top: 20 }} />

      <div className="contenu relative flex flex-col gap-16 lg:gap-24">
        {SOIREES.map((jour) => (
          <div key={jour.id} className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="flex flex-col items-start gap-4 lg:w-[340px] lg:shrink-0">
              <Pastille ton="clair">{jour.pastille}</Pastille>
              <h2 className="text-d-sous-titre text-encre md:text-d-titre">{jour.titre}</h2>
              <div className="flex flex-col gap-1">
                <p className="text-w-courant text-encre font-bold">{jour.horaires}</p>
                <p className="text-w-legende text-legende">{jour.affluence}</p>
              </div>
            </div>

            <ol className="flex flex-1 flex-col gap-3">
              {jour.creneaux.map((c) => {
                const fort = c.format === "Temps fort";
                return (
                  <li
                    key={c.heure}
                    className={cn(
                      "rounded-carte flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-start sm:gap-6 sm:px-7 sm:py-6",
                      fort ? "panneau-electrique text-white" : "border-bordure border bg-white",
                    )}
                  >
                    <p
                      className={cn(
                        "num text-d-sous-titre sm:w-24 sm:shrink-0",
                        fort ? "text-white" : "text-accent",
                      )}
                    >
                      {c.heure}
                    </p>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <h3 className={cn("text-d-bloc", fort ? "text-white" : "text-encre")}>
                        {c.intitule}
                      </h3>
                      <p
                        className={cn(
                          "text-w-dense",
                          fort ? "text-sur-electrique" : "text-texte-courant",
                        )}
                      >
                        {c.detail}
                      </p>
                    </div>
                    <Pastille
                      ton={fort ? "electrique" : "clair"}
                      point={false}
                      className="self-start"
                    >
                      {c.format}
                    </Pastille>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}

        <p className="text-w-legende text-legende">{PROGRAMME.note}</p>
      </div>
    </section>
  );
}
