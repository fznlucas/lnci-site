import { cn } from "@/lib/cn";
import { Pastille } from "./Pastille";
import { Filet } from "@/components/brand/Filet";
import type { Soiree } from "@/data/soirees";

/**
 * Carte de soiree. Charte page 12, rayon 20.
 *
 * Regle d'assemblage : une seule carte sombre par groupe, au maximum.
 * La carte mise en avant porte donc le fond nuit, les autres le fond clair.
 */
export function CarteSoiree({ soiree, className }: { soiree: Soiree; className?: string }) {
  const sombre = soiree.miseEnAvant;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-carte p-7",
        sombre ? "panneau-nuit text-white" : "border border-bordure bg-white",
        className,
      )}
    >
      <Pastille ton={sombre ? "complet" : "invitation"}>{soiree.jourCourt}</Pastille>

      <h3
        className={cn(
          "mt-5 text-bloc text-balance",
          sombre ? "text-white" : "text-encre",
        )}
      >
        {soiree.intitule}
      </h3>

      <Filet className={cn("my-5", sombre && "opacity-30")} />

      <ul className="space-y-2.5">
        {soiree.sequences.map((s) => (
          <li key={s.heure} className="flex gap-3 text-[1.0625rem]">
            <span className={cn("font-black tabular-nums", sombre ? "text-accent-clair" : "text-encre")}>
              {s.heure}
            </span>
            <span className={sombre ? "text-white/75" : "text-courant"}>{s.libelle}</span>
          </li>
        ))}
      </ul>

      <p
        className={cn(
          "mt-auto pt-6 text-surtitre uppercase",
          sombre ? "text-accent-clair" : "text-accent",
        )}
      >
        {soiree.mention}
      </p>
    </article>
  );
}
