import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Apparitions } from "@/components/Apparitions";
import { DefilementRoute } from "@/components/DefilementRoute";
import { EnTete } from "@/components/EnTete";
import { PiedDePage } from "@/components/PiedDePage";
import { PAGES } from "@/data/pages";
import { FournisseurCadre } from "@/components/FournisseurCadre";
import { useCadreCourant } from "@/lib/cadre";
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

// les chemins viennent de data/pages.ts : une page se renomme là-bas, jamais ici
// id sans écran = page d'attente ; /merci et la 404 sont hors registre
const ECRANS: Record<string, ReactNode> = {
  programme: <Programme />,
  hackathon: <Hackathon />,
  partenaires: <Partenaires />,
  preinscription: <Preinscription />,
  contact: <Contact />,
  "mentions-legales": <MentionsLegales />,
  confidentialite: <Confidentialite />,
};

// les entrées qui pointent vers une ancre (faq) n'ont pas de route
const ROUTES = PAGES.filter((p) => !p.chemin.includes("#"));

export default function App() {
  return (
    <FournisseurCadre>
      <Gabarit />
    </FournisseurCadre>
  );
}

// le ton de l'en-tête et du pied vient du cadre déclaré par la page (lib/cadre.ts)
function Gabarit() {
  const cadre = useCadreCourant();
  return (
    <div className="flex min-h-svh flex-col">
      <DefilementRoute />
      <EnTete ton={cadre.entete} />
      {/* z-10 + fond opaque : le contenu glisse au-dessus du pied pour le révéler (pied-revele) */}
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
      <PiedDePage ton={cadre.pied} />
      <Apparitions />
    </div>
  );
}
