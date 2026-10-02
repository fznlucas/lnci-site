import { TitreBicolore } from "@/components/brand/TitreBicolore";

// gabarit provisoire des pages pas encore faites
export function EnConstruction({ titre }: { titre: string }) {
  return (
    <section className="bg-nuit pt-[168px] pb-28">
      <div className="contenu">
        <TitreBicolore as="h1" taille="hero" ton="nuit" attenue="Cette page" plein={titre} />
        <p className="text-w-courant text-sur-nuit-body mt-8 max-w-[60ch]">
          Contenu en cours de cadrage. Les intitules, les horaires et les intervenants sont arretes
          avant la publication du programme.
        </p>
      </div>
    </section>
  );
}
