import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { CarteFormulaire } from "@/components/CarteFormulaire";
import { CaseConsentement } from "@/components/ui/CaseConsentement";
import { Champ } from "@/components/ui/Champ";
import { ListeDeroulante } from "@/components/ui/ListeDeroulante";
import { Pastille } from "@/components/ui/Pastille";
import { FORMULAIRE_PREINSCRIPTION as F, SECTION_PREINSCRIPTION as S } from "@/data/formulaires";
import { envoyerPreInscription } from "@/formulaires/envoi";
import { POSTES, type Poste } from "@/formulaires/types";
import { useFormulaire } from "@/formulaires/useFormulaire";
import { validerPreInscription } from "@/formulaires/validation";

/**
 * Section de pre-inscription. Figma : Site / Formulaire, ton Nuit.
 *
 * A gauche : pastille, titre (h1 de la page /preinscription), chapeau et
 * trois avantages. A droite : la carte du formulaire. Les deux colonnes
 * sont alignees en haut et en bas.
 *
 * `poste` presélectionne la liste : /preinscription?poste=etudiant arrive
 * avec "Etudiant·e" deja choisi. Une valeur inconnue est ignoree.
 */
export function FormulairePreInscription({ poste }: { poste?: string }) {
  const posteInitial = POSTES.some((p) => p.id === poste) ? (poste as Poste) : "";

  const f = useFormulaire({
    initiales: {
      prenom: "",
      nom: "",
      email: "",
      poste: posteInitial,
      organisation: "",
      consentement: false,
    },
    valider: validerPreInscription,
    envoyer: (s, contexte) =>
      envoyerPreInscription({
        prenom: s.prenom.trim(),
        nom: s.nom.trim(),
        email: s.email.trim(),
        poste: s.poste as Poste,
        organisation: s.organisation.trim(),
        consentement: true,
        ...contexte,
      }),
  });

  return (
    <section className="bg-nuit text-sur-nuit plein-ecran relative overflow-hidden pt-[136px] pb-20 sm:pt-[176px] sm:pb-[104px] lg:pb-32">
      <Halo ton="nuit" taille={800} style={{ right: -160, top: -255 }} />

      <div className="contenu relative grid gap-12 lg:grid-cols-[500px_1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-6">
          <Pastille ton="nuit">{S.pastille}</Pastille>
          <TitreBicolore
            as="h1"
            taille="hero"
            ton="nuit"
            attenue={S.titre.attenue}
            plein={S.titre.plein}
          />
          <p className="text-w-courant text-sur-nuit-body sm:text-w-chapeau">{S.chapeau}</p>
          <ul className="flex w-full flex-col gap-3.5">
            {S.avantages.map((a) => (
              <li key={a} className="filet-sur-nuit flex items-center gap-3.5 pt-3.5">
                <span aria-hidden className="bg-accent-clair size-2 shrink-0 rounded-full" />
                <span className="text-w-courant text-sur-nuit font-bold">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <CarteFormulaire
          titre={F.titre}
          bouton={F.bouton}
          boutonEnvoi={F.boutonEnvoi}
          note={F.note}
          envoi={f.envoi}
          message={f.message}
          piege={f.piege}
          onPiege={f.setPiege}
          onSubmit={f.soumettre}
          ombre
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Champ
              libelle={F.champs.prenom}
              name="prenom"
              autoComplete="given-name"
              placeholder="Camille"
              value={f.saisie.prenom}
              onChange={(e) => f.changer("prenom", e.target.value)}
              erreur={f.erreurs.prenom}
            />
            <Champ
              libelle={F.champs.nom}
              name="nom"
              autoComplete="family-name"
              placeholder="Martin"
              value={f.saisie.nom}
              onChange={(e) => f.changer("nom", e.target.value)}
              erreur={f.erreurs.nom}
            />
          </div>
          <Champ
            libelle={F.champs.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="camille.martin@fonds.fr"
            value={f.saisie.email}
            onChange={(e) => f.changer("email", e.target.value)}
            erreur={f.erreurs.email}
          />
          <ListeDeroulante
            libelle={F.champs.poste}
            name="poste"
            options={POSTES}
            value={f.saisie.poste}
            onChange={(e) => f.changer("poste", e.target.value)}
            erreur={f.erreurs.poste}
          />
          <Champ
            libelle={F.champs.organisation}
            facultatif
            name="organisation"
            autoComplete="organization"
            value={f.saisie.organisation}
            onChange={(e) => f.changer("organisation", e.target.value)}
          />
          <CaseConsentement
            texte={F.consentement}
            name="consentement"
            checked={f.saisie.consentement}
            onChange={(e) => f.changer("consentement", e.target.checked)}
            erreur={f.erreurs.consentement}
          />
        </CarteFormulaire>
      </div>
    </section>
  );
}
