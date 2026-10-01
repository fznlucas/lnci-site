/**
 * Positionnement.
 *
 * Une phrase forte a gauche, le detail a droite en deux colonnes de
 * texte serre. C'est la structure editoriale d'un rapport annuel :
 * l'affirmation d'abord, l'argument ensuite, sans illustration.
 */
export function Positionnement() {
  return (
    <section className="bg-page">
      <div className="contenu grid gap-x-6 gap-y-10 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-w-surtitre uppercase text-accent">Positionnement</p>
          <h2 className="mt-6 max-w-[16ch] text-[1.875rem] font-extrabold leading-[1.16] text-encre text-balance lg:text-d-titre">
            La région fournit la matière, le pays fournit les talents
          </h2>
        </div>

        <div className="grid gap-x-10 gap-y-8 lg:col-span-6 lg:col-start-7 sm:grid-cols-2">
          <div>
            <p className="max-w-[46ch] text-w-courant text-texte-courant">
              Un tissu dense d'ETI familiales et une base industrielle, face à
              une vague de transmission générationnelle. Des dirigeants qui
              envisagent d'ouvrir leur capital, des conseils et des banquiers
              d'affaires de la place, réunis les mêmes soirs.
            </p>
          </div>
          <div>
            <p className="max-w-[46ch] text-w-courant text-texte-courant">
              L'appel à candidatures est relayé par l'Union des Clubs de Finance
              de France et la Confédération Nationale des Junior-Entreprises,
              dans toutes les écoles du pays. Les meilleurs profils viennent,
              quelle que soit leur ville.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
