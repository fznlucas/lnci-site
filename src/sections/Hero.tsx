import { ArcPartenaires } from "@/components/ArcPartenaires";
import { Arcs } from "@/components/brand/Arcs";
import { HaloHero } from "@/components/brand/HaloHero";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { FAITS } from "@/data/contenu";
import { EVENEMENT } from "@/data/evenement";
import { ACTION, page } from "@/data/pages";

/**
 * Hero de l'accueil. Figma : Site / Hero, version A2 (retenue), ton Nuit.
 *
 * Fixe, sans animation (arbitrage de l'equipe). De haut en bas :
 *   - deux colonnes en desktop : pastille et titre (4 lignes) a gauche,
 *     chapeau, infos a points, appui et actions a droite, alignes en haut
 *     et en bas ; une seule colonne en dessous ;
 *   - l'arc des sept partenaires ;
 *   - les quatre chiffres, filet pointille au-dessus de chacun ; en
 *     mobile, les arcs passent dessous, tout en bas du hero.
 *
 * L'en-tete transparent se pose par-dessus : le haut du hero reserve sa
 * hauteur. Le halo est celui de tous les heros (HaloHero), en haut a droite.
 */
export function Hero() {
  const partenaires = page("partenaires");

  return (
    <section className="bg-nuit text-sur-nuit plein-ecran relative overflow-hidden pt-[120px] pb-24 sm:pt-[148px] lg:pt-[168px]">
      <HaloHero />
      {/* Mobile : les arcs passent tout en bas du hero, sous les chiffres
          (Figma). Au-dela, ArcPartenaires les dessine sous les logos. */}
      <Arcs rx={429} ry={176} depuisLeBas={32} decalage={40} enHero className="sm:hidden" />

      <div className="contenu relative">
        <Pastille ton="nuit">
          <span className="sm:hidden">{EVENEMENT.surTitreCourt}</span>
          <span className="hidden sm:inline">{EVENEMENT.surTitre}</span>
        </Pastille>

        {/* Deux colonnes alignees sur les lettres : le h1 et le chapeau sont
            rognes (haut des capitales, ligne de base), la colonne de droite
            prend la hauteur du h1 et repartit son contenu, si bien que le
            haut du "L" tombe sur le haut du "D" et le bas des boutons sur la
            ligne de base de "investissement". */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_470px] lg:gap-12">
          <TitreBicolore
            as="h1"
            taille="hero"
            ton="nuit"
            className="rogne [--rogne-interligne:1.1] lg:max-w-[440px]"
            attenue={EVENEMENT.titreAccueil.attenue}
            plein={EVENEMENT.titreAccueil.plein}
          />

          <div className="flex flex-col items-start gap-6 lg:justify-between lg:gap-0">
            <p className="rogne text-w-courant text-sur-nuit-body [--rogne-interligne:1.65]">
              {EVENEMENT.chapeauAccueil}
            </p>

            <div className="flex flex-col gap-3">
              <ul
                className="flex flex-wrap items-center gap-x-3 gap-y-1.5"
                aria-label="L’essentiel"
              >
                {EVENEMENT.infosAccueil.map((info, i) => (
                  <li
                    key={info}
                    className="text-w-courant text-sur-nuit flex items-center gap-3 font-bold"
                  >
                    {i > 0 && <span aria-hidden className="bg-accent-clair size-1 rounded-full" />}
                    {info}
                  </li>
                ))}
              </ul>
              <p className="text-w-legende text-sur-nuit-legende">{EVENEMENT.appui}</p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Bouton to={ACTION.chemin} ton="nuit" className="w-full sm:w-auto">
                {ACTION.libelle}
              </Bouton>
              {partenaires && (
                <Bouton
                  variante="secondaire"
                  ton="nuit"
                  to={partenaires.chemin}
                  className="w-full sm:w-auto"
                >
                  {partenaires.libelle}
                </Bouton>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-6 sm:mt-[72px] lg:mt-[110px]">
        <ArcPartenaires />
      </div>

      <dl className="contenu relative mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-14 sm:gap-x-0 lg:mt-[90px] lg:grid-cols-4 lg:gap-y-0">
        {FAITS.map((f) => (
          <div
            key={f.libelle}
            className="flex flex-col gap-1.5 border-t border-dashed border-white/25 pt-5"
          >
            <dt className="text-w-legende text-sur-nuit-legende order-2">{f.libelle}</dt>
            <dd className="num text-d-chiffre text-sur-nuit order-1">{f.valeur}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
