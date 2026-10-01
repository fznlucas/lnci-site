import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton } from "@/components/ui/Bouton";
import { Pastille } from "@/components/ui/Pastille";
import { LE_OFF } from "@/data/partenaires";

/**
 * Le Off. Figma : Site / Le Off, ton Nuit. Sert sur /programme et sur
 * /partenaires, avec un titre propre a chaque page (`titre`).
 *
 * A gauche : pastille, titre, chapeau et formats du matin en pastilles.
 * A droite : quatre cartes numerotees en grille 2 x 2, alignees en haut et
 * en bas avec la colonne de gauche. `lien` ajoute un renvoi sous les
 * formats (ex. "Proposer un format" vers /partenaires).
 */
export function LeOff({
  titre = LE_OFF.titre,
  lien,
}: {
  titre?: { attenue: string; plein: string };
  lien?: { libelle: string; to: string };
}) {
  return (
    <section className="rythme-section bg-nuit text-sur-nuit relative overflow-hidden">
      <Halo ton="nuit" taille={648} style={{ right: -36, top: 44 }} />

      <div className="contenu relative flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-6">
        <div className="flex flex-col items-start gap-6 lg:w-[480px] lg:shrink-0">
          <Pastille ton="nuit">{LE_OFF.pastille}</Pastille>
          <TitreBicolore ton="nuit" attenue={titre.attenue} plein={titre.plein} />
          <p className="text-w-courant text-sur-nuit-body sm:text-w-chapeau">{LE_OFF.chapeau}</p>
          <ul className="flex flex-wrap gap-2">
            {LE_OFF.formats.map((f) => (
              <li key={f}>
                <Pastille ton="nuit">{f}</Pastille>
              </li>
            ))}
          </ul>
          {lien && (
            <Bouton variante="secondaire" ton="nuit" to={lien.to} className="w-full sm:w-auto">
              {lien.libelle}
            </Bouton>
          )}
        </div>

        <ol className="grid flex-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:max-w-[720px]">
          {LE_OFF.cartes.map((c, i) => (
            <li
              key={c.titre}
              className="rounded-carte bg-nuit-haut flex flex-col gap-2.5 p-6 sm:p-8"
            >
              <span className="num text-w-courant text-accent-clair font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-d-bloc text-sur-nuit sm:min-h-[52px]">{c.titre}</h3>
              <p className="text-w-dense text-sur-nuit-body">{c.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
