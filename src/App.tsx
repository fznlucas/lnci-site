import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { DefilementRoute } from "@/components/DefilementRoute";
import { EnTete } from "@/components/EnTete";
import { PiedDePage } from "@/components/PiedDePage";
import { PAGES } from "@/data/pages";
import { Accueil } from "@/pages/Accueil";
import { Confidentialite } from "@/pages/Confidentialite";
import { Contact } from "@/pages/Contact";
import { EnConstruction } from "@/pages/EnConstruction";
import { Hackathon } from "@/pages/Hackathon";
import { Introuvable } from "@/pages/Introuvable";
import { MentionsLegales } from "@/pages/MentionsLegales";
import { Merci } from "@/pages/Merci";
import { Partenaires } from "@/pages/Partenaires";
import { Preinscription } from "@/pages/Preinscription";
import { Programme } from "@/pages/Programme";

/**
 * Routes du site. Les chemins viennent du registre (data/pages.ts) : une
 * page se renomme la-bas, jamais ici. Chaque identifiant du registre est
 * associe a son ecran ; une page non publiee sans ecran affiche la page
 * d'attente. /merci et la 404 sont hors registre (aucun lien n'y mene).
 */
const ECRANS: Record<string, ReactNode> = {
  programme: <Programme />,
  hackathon: <Hackathon />,
  partenaires: <Partenaires />,
  preinscription: <Preinscription />,
  contact: <Contact />,
  "mentions-legales": <MentionsLegales />,
  confidentialite: <Confidentialite />,
};

/* Les entrees qui pointent vers une ancre d'une autre page (faq) n'ont pas
   de route propre. */
const ROUTES = PAGES.filter((p) => !p.chemin.includes("#"));

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <DefilementRoute />
      <EnTete />
      {/* Le contenu passe au-dessus du pied de page (z-10, fond opaque) : la
          derniere section remonte pour le decouvrir (PiedDePage, pied-revele). */}
      <main className="bg-page relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Accueil />} />
          {ROUTES.map((p) => (
            <Route
              key={p.id}
              path={p.chemin}
              element={ECRANS[p.id] ?? <EnConstruction titre="est en construction" />}
            />
          ))}
          <Route path="/merci" element={<Merci />} />
          <Route path="*" element={<Introuvable />} />
        </Routes>
      </main>
      <PiedDePage />
    </div>
  );
}
