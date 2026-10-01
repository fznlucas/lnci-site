import { EnTeteSection } from "@/components/EnTeteSection";
import { Halo } from "@/components/brand/Halo";
import { BENEFICES as B } from "@/data/partenaires";

/**
 * Benefices partenaires. Figma : Site / Benefices, ton Clair.
 * Trois cartes de meme hauteur : sur-titre numerote, titre, texte, puis la
 * preuve chiffree sous un filet pointille accent, calee en bas de carte.
 */
export function Benefices() {
  return (
    <section className="rythme-section bg-page relative overflow-hidden">
      <Halo
        ton="clair"
        taille={622}
        style={{ right: -81, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col gap-10 sm:gap-14">
        <EnTeteSection pastille={B.pastille} titre={B.titre} chapeau={B.chapeau} />

        <ol className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {B.cartes.map((c, i) => (
            <li
              key={c.titre}
              className="rounded-panneau border-bordure carte-survol flex flex-col gap-3 border bg-white p-6 sm:p-8"
            >
              <p className="text-w-surtitre text-accent whitespace-pre uppercase">
                {`${String(i + 1).padStart(2, "0")}  ·  ${c.surtitre}`}
              </p>
              <h3 className="text-d-bloc text-encre">{c.titre}</h3>
              <p className="text-w-dense text-texte-courant">{c.texte}</p>
              <div className="border-accent-detail/60 mt-auto flex flex-col gap-1 border-t border-dashed pt-5">
                <p className="num text-d-chiffre text-encre">{c.preuve.valeur}</p>
                <p className="text-w-legende text-legende">{c.preuve.libelle}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
