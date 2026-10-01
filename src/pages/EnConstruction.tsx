import { TitreBicolore } from "@/components/brand/TitreBicolore";

/** Gabarit provisoire des pages non encore construites. */
export function EnConstruction({ titre }: { titre: string }) {
  return (
    <section className="contenu py-28">
      <TitreBicolore as="h1" taille="titre" attenue="Cette page" plein={titre} />
      <p className="mt-8 max-w-[60ch] text-courant">
        Contenu en cours de cadrage. Les intitules, les horaires et les
        intervenants sont arretes avant la publication du programme.
      </p>
    </section>
  );
}
