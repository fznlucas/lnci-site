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
        "flex items-center gap-5 rounded-carte border border-bordure bg-white p-5",
        className,
      )}
    >
      <div className="size-20 shrink-0 overflow-hidden rounded-[14px] bg-champ">
        {portrait && (
          <img src={portrait} alt="" className="size-full object-cover" loading="lazy" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-bloc text-encre">{nom}</p>
        <p className="mt-0.5 text-legende text-courant">
          {fonction} · {societe}
        </p>
        {rattachement && (
          <p className="mt-2 text-surtitre uppercase text-accent">{rattachement}</p>
        )}
      </div>
    </article>
  );
}
