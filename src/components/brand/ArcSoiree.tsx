import { cn } from "@/lib/cn";

const HEURES = ["17h30", "18h30", "20h00", "21h30", "23h00"];

/**
 * Arc de la soiree. Charte page 9, geste signature.
 *
 * Ellipse pointillee, cinq points d'heure, ouverte de bord a bord.
 * Elle marque la duree d'une soiree. Un seul arc par visuel, jamais deux.
 * Les points sont espaces de 45 degres sur l'ellipse.
 */
export function ArcSoiree({ className }: { className?: string }) {
  const L = 1000;
  const H = 112;
  const points = [180, 135, 90, 45, 0].map((deg) => {
    const r = (deg * Math.PI) / 180;
    return { x: L / 2 + (L / 2) * Math.cos(r), y: H - H * Math.sin(r) };
  });

  return (
    <svg
      viewBox={`0 0 ${L} ${H}`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn("w-full", className)}
    >
      <path
        d={`M0 ${H} A${L / 2} ${H} 0 0 1 ${L} ${H}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="0 14"
        opacity={0.55}
      />
      {points.map((p, i) => (
        <circle key={HEURES[i]} cx={p.x} cy={p.y} r={7} fill="currentColor" />
      ))}
    </svg>
  );
}
