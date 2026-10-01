import { cn } from "@/lib/cn";

/**
 * Filet pointille. Charte page 9.
 * Le seul separateur du systeme. Aucune bordure pleine, aucun trait de couleur.
 */
export function Filet({
  variante = "bloc",
  className,
}: {
  variante?: "bloc" | "pied";
  className?: string;
}) {
  return (
    <hr
      className={cn(variante === "bloc" ? "filet-bloc" : "filet-pied", "text-filet", className)}
    />
  );
}
