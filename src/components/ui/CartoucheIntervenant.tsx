import { cn } from "@/lib/cn";

type Props = {
  nom: string;
  fonction: string;
  societe: string;
  /** Rattachement au programme, affiche en sur-titre accent. */
  rattachement?: string;
  portrait?: string;
  className?: string;
};

/**
 * Cartouche d'intervenant. Charte page 12.
 * Portrait au format 1:1, puis nom, puis fonction et societe,
 * puis le rattachement au programme. L'ordre est impose.
 */
export function CartoucheIntervenant({
  nom,
  fonction,
  societe,
  rattachement,
  portrait,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "rounded-carte border-bordure flex items-center gap-5 border bg-white p-5",
        className,
      )}
    >
      <div className="bg-champ size-20 shrink-0 overflow-hidden rounded-[14px]">
        {portrait && (
          <img src={portrait} alt="" className="size-full object-cover" loading="lazy" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-bloc text-encre">{nom}</p>
        <p className="text-legende text-courant mt-0.5">
          {fonction} · {societe}
        </p>
        {rattachement && <p className="text-surtitre text-accent mt-2 uppercase">{rattachement}</p>}
      </div>
    </article>
  );
}
