import { Accordeon } from "@/components/Accordeon";
import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { EVENEMENT } from "@/data/evenement";
import { FAQ } from "@/data/faq";

/**
 * Questions frequentes. Figma : Site / FAQ, ton Clair. Sur /preinscription
 * (ancre #faq) et /contact. Texte et lien e-mail a gauche, accordeon a
 * droite ; les questions sans reponse ne s'affichent pas.
 */
export function Faq() {
  return (
    <section id="faq" className="rythme-section bg-page relative scroll-mt-20 overflow-hidden">
      <Halo
        ton="clair"
        taille={648}
        style={{ left: -180, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-5">
        {/* Pastille seule au-dessus des deux colonnes. */}
        <Pastille ton="clair" className="self-start">
          {FAQ.pastille}
        </Pastille>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex flex-col items-start gap-5 lg:w-[380px] lg:shrink-0">
            <TitreBicolore attenue={FAQ.titre.attenue} plein={FAQ.titre.plein} />
            <p className="text-w-courant text-texte-courant">{FAQ.intro}</p>
            <Bouton variante="lien" href={`mailto:${EVENEMENT.email}`}>
              {FAQ.lien}
            </Bouton>
          </div>
          <div className="flex-1">
            <Accordeon questions={FAQ.questions} />
          </div>
        </div>
      </div>
    </section>
  );
}
