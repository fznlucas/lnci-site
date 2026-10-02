import { cn } from "@/lib/cn";

// figma : decor / arc du kit
// seul le sommet se voit, la section parente doit être en overflow-hidden
// jamais sur du texte : à poser dans les zones vides, souvent en bas de section
// mobile : un seul arc par page (celui du hero, en une ellipse), les autres sont masqués
export function Arcs({
  rx,
  ry,
  haut,
  depuisLeBas,
  decalage = 80,
  opacites = [0.28, 0.14],
  clair = false,
  enHero = false,
  className,
}: {
  rx: number;
  ry: number;
  /** sommet du premier arc depuis le haut de la section, en px */
  haut?: number;
  /** pareil mais depuis le bas de la section */
  depuisLeBas?: number;
  decalage?: number;
  opacites?: [number, number];
  /** fond Clair : trait accent-detail, opacité doublée */
  clair?: boolean;
  /** seul arc gardé en mobile */
  enHero?: boolean;
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
      className={cn(
        "pointer-events-none absolute left-1/2 -translate-x-1/2",
        !enHero && "max-sm:hidden",
        className,
      )}
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
          className={i === 1 && enHero ? "max-sm:hidden" : undefined}
        />
      ))}
    </svg>
  );
}
