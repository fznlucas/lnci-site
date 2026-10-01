import { cn } from "@/lib/cn";

/**
 * Arcs de fond. Composant Decor / Arc du kit Figma.
 *
 * Deux ellipses pointillees de meme taille, la seconde decalee vers le
 * bas, centrees horizontalement sur la section. Seul leur sommet est
 * visible : la section qui les accueille est en overflow-hidden.
 *
 * `haut` est la distance entre le haut de la section et le sommet du
 * premier arc ; une valeur negative en partant du bas s'ecrit
 * `depuisLeBas`. Les arcs ne passent jamais sur du texte : on les place
 * dans les zones vides, souvent en bas de section.
 *
 * Trait blanc sur Nuit et Electrique, accent-detail sur Clair (`clair`).
 */
export function Arcs({
  rx,
  ry,
  haut,
  depuisLeBas,
  decalage = 80,
  opacites = [0.28, 0.14],
  clair = false,
  className,
}: {
  rx: number;
  ry: number;
  /** Sommet du premier arc depuis le haut de la section, en px. */
  haut?: number;
  /** Sommet du premier arc depuis le BAS de la section, en px. */
  depuisLeBas?: number;
  /** Ecart vertical entre les deux arcs. */
  decalage?: number;
  /** Opacite du trait blanc de chaque arc. */
  opacites?: [number, number];
  /** Pose sur un fond Clair : trait accent-detail, plus marque. */
  clair?: boolean;
  className?: string;
}) {
  const l = rx * 2 + 4;
  const h = ry * 2 + decalage + 4;
  const position =
    depuisLeBas !== undefined ? { top: `calc(100% - ${depuisLeBas}px)` } : { top: haut ?? 0 };

  return (
    <svg
      aria-hidden
      width={l}
      height={h}
      viewBox={`0 0 ${l} ${h}`}
      className={cn("pointer-events-none absolute left-1/2 -translate-x-1/2", className)}
      style={position}
    >
      {[0, 1].map((i) => (
        <ellipse
          key={i}
          cx={l / 2}
          cy={ry + 2 + i * decalage}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={clair ? "var(--accent-detail)" : "white"}
          strokeOpacity={clair ? opacites[i] * 2 : opacites[i]}
          strokeWidth={1.5}
          strokeLinecap="square"
          strokeDasharray={i === 0 ? "2 10" : "2 14"}
        />
      ))}
    </svg>
  );
}
