import { CarteFormulaire } from "@/components/CarteFormulaire";
import { CaseConsentement } from "@/components/ui/CaseConsentement";
import { Champ, ZoneDeTexte } from "@/components/ui/Champ";
import { ListeDeroulante } from "@/components/ui/ListeDeroulante";
import { FORMULAIRE_CONTACT as F } from "@/data/formulaires";
import { envoyerContact } from "@/formulaires/envoi";
import { SUJETS, type Sujet } from "@/formulaires/types";
import { useFormulaire } from "@/formulaires/useFormulaire";
import { validerContact } from "@/formulaires/validation";

// pas de maquette figma : reprend la carte et les champs de la pré-inscription
// `sujet` présélectionne la liste, une valeur inconnue est ignorée
export function FormulaireContact({ sujet, ombre = false }: { sujet?: string; ombre?: boolean }) {
  const sujetInitial = SUJETS.some((j) => j.id === sujet) ? (sujet as Sujet) : "";

  const f = useFormulaire({
    initiales: {
      prenom: "",
      nom: "",
      email: "",
      organisation: "",
      sujet: sujetInitial,
      message: "",
      consentement: false,
    },
    valider: validerContact,
    envoyer: (s, contexte) =>
      envoyerContact({
        prenom: s.prenom.trim(),
        nom: s.nom.trim(),
        email: s.email.trim(),
        organisation: s.organisation.trim(),
        sujet: s.sujet as Sujet,
        message: s.message.trim(),
        consentement: true,
        ...contexte,
      }),
  });

  return (
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
      ombre={ombre}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Champ
          libelle={F.champs.prenom}
          name="prenom"
          autoComplete="given-name"
          value={f.saisie.prenom}
          onChange={(e) => f.changer("prenom", e.target.value)}
          erreur={f.erreurs.prenom}
        />
        <Champ
          libelle={F.champs.nom}
          name="nom"
          autoComplete="family-name"
          value={f.saisie.nom}
          onChange={(e) => f.changer("nom", e.target.value)}
          erreur={f.erreurs.nom}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Champ
          libelle={F.champs.email}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={f.saisie.email}
          onChange={(e) => f.changer("email", e.target.value)}
          erreur={f.erreurs.email}
        />
        <Champ
          libelle={F.champs.organisation}
          facultatif
          name="organisation"
          autoComplete="organization"
          value={f.saisie.organisation}
          onChange={(e) => f.changer("organisation", e.target.value)}
        />
      </div>
      <ListeDeroulante
        libelle={F.champs.sujet}
        name="sujet"
        options={SUJETS}
        value={f.saisie.sujet}
        onChange={(e) => f.changer("sujet", e.target.value)}
        erreur={f.erreurs.sujet}
      />
      <ZoneDeTexte
        libelle={F.champs.message}
        name="message"
        value={f.saisie.message}
        onChange={(e) => f.changer("message", e.target.value)}
        erreur={f.erreurs.message}
      />
      <CaseConsentement
        texte={F.consentement}
        name="consentement"
        checked={f.saisie.consentement}
        onChange={(e) => f.changer("consentement", e.target.checked)}
        erreur={f.erreurs.consentement}
      />
    </CarteFormulaire>
  );
}
