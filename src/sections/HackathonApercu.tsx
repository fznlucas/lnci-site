import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton, type Ton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { HACKATHON } from "@/data/contenu";
import { page } from "@/data/pages";
import { cn } from "@/lib/cn";
import { COURANT, FILET, FOND, LEGENDE } from "@/lib/tons";

/**
 * Apercu du hackathon sur l'accueil. Figma : Site / Hackathon (apercu) ;
 * ton reglable (Nuit sur l'accueil, concept B).
 *
 * Pastille seule au-dessus des deux colonnes. Colonnes alignees en haut et
 * en bas : titre, texte et actions a gauche, les trois etapes (cartes nuit
 * sur Electrique, nuit-haut sur Nuit) a droite. Dessous, les quatre
 * chiffres. Les arcs passent sous les chiffres, en bas de section.
 *
 * `filetHaut` : la section est collee a une section du meme ton (le
 * programme, sur l'accueil) ; un filet pointille marque la jonction.
 */
export function HackathonApercu({
  ton = "nuit",
  filetHaut = false,
}: {
  ton?: Ton;
  filetHaut?: boolean;
}) {
  const hackathon = page("hackathon");
  const preinscription = page("preinscription");
  const carte = ton === "nuit" ? "bg-nuit-haut" : "bg-nuit";

  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      {filetHaut && (
        <div aria-hidden className="contenu absolute inset-x-0 top-0">
          <div className="filet-sur-nuit" />
        </div>
      )}
      <Halo
        ton={ton}
        taille={739}
        style={{ right: -161, top: "50%", transform: "translateY(-50%)" }}
      />
      <Arcs rx={1224} ry={504} depuisLeBas={102} decalage={70} opacites={[0.35, 0.18]} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <div className="flex flex-col gap-6">
          <Pastille ton={ton} className="self-start">
            {HACKATHON.pastille}
          </Pastille>
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="flex flex-col items-start gap-6 lg:w-[520px] lg:justify-between">
              <TitreBicolore
                ton={ton}
                uni={ton === "electrique"}
                attenue={HACKATHON.titre.attenue}
                plein={HACKATHON.titre.plein}
              />
              <p className={cn("text-w-courant sm:text-w-chapeau", COURANT[ton])}>
                {HACKATHON.chapeau}
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                {hackathon && (
                  <Bouton to={hackathon.chemin} ton={ton} className="w-full sm:w-auto">
                    {HACKATHON.actions.decouvrir}
                  </Bouton>
                )}
                {preinscription && (
                  <Bouton
                    variante="secondaire"
                    ton={ton}
                    to={`${preinscription.chemin}?poste=etudiant`}
                    className="w-full sm:w-auto"
                  >
                    {HACKATHON.actions.prevenir}
                  </Bouton>
                )}
              </div>
            </div>

            <ol className="flex flex-col gap-3 lg:w-[560px]">
              {HACKATHON.etapes.map((e, i) => (
                <li
                  key={e.titre}
                  className={cn("rounded-carte flex gap-5 px-5 py-5 sm:px-7 sm:py-6", carte)}
                >
                  <span className="num text-d-sous-titre w-[39px] shrink-0 text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-d-bloc text-white">{e.titre}</h3>
                    <p className={cn("text-w-dense", COURANT[ton])}>{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-0 lg:grid-cols-4 lg:gap-y-0">
          {HACKATHON.chiffres.map((c) => (
            <div
              key={c.libelle}
              className={cn("flex flex-col gap-1.5 border-t border-dashed pt-5", FILET[ton])}
            >
              <dt className={cn("text-w-legende order-2", LEGENDE[ton])}>{c.libelle}</dt>
              <dd className="num text-d-chiffre order-1 text-white">{c.valeur}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
