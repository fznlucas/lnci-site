import { TitreBicolore } from "@/components/brand/TitreBicolore";

/** Gabarit provisoire des pages non encore construites. */
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
