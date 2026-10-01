import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { EVENEMENT } from "@/data/evenement";
import { NIVEAUX as N, OBJET_GRILLE } from "@/data/partenaires";
import { cn } from "@/lib/cn";

/**
 * Niveaux d'engagement. Figma : Site / Paliers, ton Nuit, le niveau mis en
 * avant (Platine) en ton Electrique. AUCUN PRIX : la grille tarifaire
 * s'envoie sur demande (e-mail). Cartes de meme hauteur, avantages separes
 * par des filets pointilles.
 */
export function Paliers() {
  const grille = `mailto:${EVENEMENT.email}?subject=${encodeURIComponent(OBJET_GRILLE)}`;

  return (
    <section className="rythme-section bg-nuit text-sur-nuit relative overflow-hidden">
      <Halo ton="nuit" taille={778} style={{ left: 115, top: 108 }} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection ton="nuit" pastille={N.pastille} titre={N.titre} chapeau={N.chapeau} />

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {N.liste.map((n) => (
            <li
              key={n.nom}
              className={cn(
                "rounded-panneau flex flex-col gap-4 p-6 sm:p-8",
                n.misEnAvant ? "fond-electrique" : "bg-nuit-haut",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-d-sous-titre text-white">{n.nom}</h3>
                {n.etiquette && (
                  <Pastille ton="electrique" point={false}>
                    {n.etiquette}
                  </Pastille>
                )}
              </div>
              <ul className="flex flex-col gap-4">
                {n.avantages.map((a) => (
                  <li
                    key={a}
                    className={cn(
                      "text-w-dense border-t border-dashed pt-3 text-white",
                      n.misEnAvant ? "border-white/35" : "border-white/[0.18]",
                    )}
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-w-legende text-sur-nuit-legende">{N.note}</p>
          <Bouton
            variante="secondaire"
            ton="nuit"
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
