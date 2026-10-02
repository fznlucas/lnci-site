// faq de /preinscription et /contact
// une question avec une réponse vide n'est pas affichée

export type Question = { question: string; reponse: string };

export const FAQ = {
  pastille: "FAQ",
  titre: { attenue: "Questions", plein: "fréquentes" },
  intro: "Une autre question ? Écrivez-nous, on répond vite.",
  lien: "Nous écrire",
  questions: [
    {
      question: "Quand et où a lieu l’événement ?",
      reponse:
        "Mi-janvier 2027 à Lyon, sur deux jours : le jeudi en fin de journée et le vendredi jusque tard. Le lieu et les dates exactes seront annoncés en priorité aux pré-inscrits.",
    },
    {
      question: "À qui s’adresse l’événement ?",
      reponse:
        "Aux fonds, banques, conseils, dirigeants et étudiants en finance. Le jeudi est réservé aux professionnels, le vendredi est ouvert plus largement.",
    },
    // TODO(LNCI): réponses absentes du figma pour ces quatre questions
    { question: "Combien coûte la participation ?", reponse: "" },
    { question: "Comment participer au hackathon ?", reponse: "" },
    { question: "Comment devenir partenaire ?", reponse: "" },
    { question: "Le programme est-il définitif ?", reponse: "" },
  ] satisfies Question[],
} as const;
