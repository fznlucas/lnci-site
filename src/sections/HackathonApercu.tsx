import { Arcs } from "@/components/brand/Arcs";
import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { HACKATHON } from "@/data/contenu";
import { page } from "@/data/pages";

/**
 * Apercu du hackathon sur l'accueil. Figma : Site / Hackathon (apercu),
 * ton Electrique.
 *
 * Deux colonnes en desktop, alignees en haut et en bas : le texte et les
 * actions a gauche, les trois etapes (cartes nuit) a droite. Dessous, les
 * quatre chiffres. Les arcs passent sous les chiffres, en bas de section.
 */
export function HackathonApercu() {
  const hackathon = page("hackathon");
  const preinscription = page("preinscription");

  return (
    <section className="fond-electrique rythme-section relative overflow-hidden text-white">
      <Halo ton="electrique" taille={739} style={{ right: -161, top: 41 }} />
      <Arcs rx={1224} ry={504} depuisLeBas={102} decalage={70} opacites={[0.35, 0.18]} />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-start gap-6 lg:w-[520px] lg:justify-between">
            <Pastille ton="electrique">{HACKATHON.pastille}</Pastille>
            <TitreBicolore
              ton="electrique"
              uni
              attenue={HACKATHON.titre.attenue}
              plein={HACKATHON.titre.plein}
            />
            <p className="text-w-courant text-sur-electrique sm:text-w-chapeau">
              {HACKATHON.chapeau}
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {hackathon && (
                <Bouton to={hackathon.chemin} ton="electrique" className="w-full sm:w-auto">
                  {HACKATHON.actions.decouvrir}
                </Bouton>
              )}
              {preinscription && (
                <Bouton
                  variante="secondaire"
                  ton="electrique"
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
                className="rounded-carte bg-nuit flex gap-5 px-5 py-5 sm:px-7 sm:py-6"
              >
                <span className="num text-d-sous-titre w-[39px] shrink-0 text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-d-bloc text-white">{e.titre}</h3>
                  <p className="text-w-dense text-sur-electrique">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-0 lg:grid-cols-4 lg:gap-y-0">
          {HACKATHON.chiffres.map((c) => (
            <div
              key={c.libelle}
              className="flex flex-col gap-1.5 border-t border-dashed border-white/35 pt-5"
            >
              <dt className="text-w-legende text-sur-electrique order-2">{c.libelle}</dt>
              <dd className="num text-d-chiffre order-1 text-white">{c.valeur}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
