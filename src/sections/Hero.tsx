import { ArcPartenaires } from "@/components/ArcPartenaires";
import { Arcs } from "@/components/brand/Arcs";
import { HaloHero } from "@/components/brand/HaloHero";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { FAITS } from "@/data/contenu";
import { EVENEMENT } from "@/data/evenement";
import { ACTION, page } from "@/data/pages";

// figma : site / hero, version a2, ton nuit
// fixe, sans animation : choix de l'équipe
// le padding haut réserve la place de l'en-tête transparent posé par-dessus
export function Hero() {
  const partenaires = page("partenaires");

  return (
    <section className="bg-nuit text-sur-nuit plein-ecran relative overflow-hidden pt-[120px] pb-24 sm:pt-[148px] lg:pt-[168px]">
      <HaloHero />
      {/* en mobile les arcs vont tout en bas, sous les chiffres ; au-delà c'est ArcPartenaires qui les dessine */}
      <Arcs rx={429} ry={176} depuisLeBas={32} decalage={40} enHero className="sm:hidden" />

      <div className="contenu relative">
        <Pastille ton="nuit">
          <span className="sm:hidden">{EVENEMENT.surTitreCourt}</span>
          <span className="hidden sm:inline">{EVENEMENT.surTitre}</span>
        </Pastille>

        {/* h1 et chapeau rognés aux capitales et à la ligne de base : le haut du "L"
            tombe sur le haut du "D", le bas des boutons sur la base de "investissement" */}
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
              {/* chaque point est dans la marge gauche de son info (12 + 4 + 12px) ; la liste
                  est décalée de cette marge sous un overflow-hidden, donc l'info qui ouvre
                  une ligne perd son point : jamais de point en début ni en fin de ligne */}
              <div className="overflow-hidden">
                <ul
                  className="-ml-7 flex flex-wrap items-center gap-y-1.5"
                  aria-label="L’essentiel"
                >
                  {EVENEMENT.infosAccueil.map((info) => (
                    <li key={info} className="text-w-courant text-sur-nuit relative pl-7 font-bold">
                      <span
                        aria-hidden
                        className="bg-accent-clair absolute top-1/2 left-3 size-1 -translate-y-1/2 rounded-full"
                      />
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
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
