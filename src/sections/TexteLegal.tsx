import type { Bloc } from "@/data/legal";

/**
 * Corps des pages legales. Figma : Site / Texte legal, ton Clair.
 * Colonne de lecture de 760px : date de mise a jour, puis un bloc par
 * rubrique (carte blanche, titre et texte). Les champs entre crochets
 * sont a completer par l'equipe dans data/legal.ts.
 */
export function TexteLegal({ miseAJour, blocs }: { miseAJour: string; blocs: readonly Bloc[] }) {
  return (
    <section className="rythme-section bg-page">
      <div className="contenu">
        <div className="flex max-w-[760px] flex-col gap-3">
          <p className="text-w-legende text-legende">Dernière mise à jour : {miseAJour}</p>
          {blocs.map((b) => (
            <section
              key={b.titre}
              className="rounded-carte border-bordure flex flex-col gap-2.5 border bg-white px-5 py-5 sm:px-7 sm:py-6"
            >
              <h2 className="text-d-bloc text-encre">{b.titre}</h2>
              <p className="text-w-courant text-texte-courant">{b.texte}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
