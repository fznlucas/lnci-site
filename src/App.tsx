import { Route, Routes } from "react-router-dom";
import { EnTete } from "@/components/EnTete";
import { PiedDePage } from "@/components/PiedDePage";
import { Accueil } from "@/pages/Accueil";
import { EnConstruction } from "@/pages/EnConstruction";

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <EnTete />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/programme" element={<EnConstruction titre="est en construction" />} />
          <Route path="/intervenants" element={<EnConstruction titre="est en construction" />} />
          <Route path="/partenaires" element={<EnConstruction titre="est en construction" />} />
          <Route path="/contact" element={<EnConstruction titre="est en construction" />} />
          <Route path="/reserver" element={<EnConstruction titre="est en construction" />} />
          <Route path="*" element={<EnConstruction titre="n'existe pas" />} />
        </Routes>
      </main>
      <PiedDePage />
    </div>
  );
}
