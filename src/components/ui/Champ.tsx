import { cn } from "@/lib/cn";
import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Champ de formulaire. Charte page 12.
 * Libelle en sur-titre au dessus du champ, etat actif marque par la bordure accent.
 */
export function Champ({
  libelle,
  className,
  ...props
}: ComponentPropsWithoutRef<"input"> & { libelle: string }) {
  const id = useId();
  return (
    <div className={cn("group", className)}>
      <label
        htmlFor={id}
        className="block text-surtitre uppercase text-legende group-focus-within:text-accent"
      >
        {libelle}
      </label>
      <input
        id={id}
        className={
          "mt-1.5 w-full rounded-bouton border border-bordure bg-white px-4 py-3 " +
          "text-[1.0625rem] text-encre placeholder:text-legende/70 " +
          "focus:border-accent focus:outline-none"
        }
        {...props}
      />
    </div>
  );
}
