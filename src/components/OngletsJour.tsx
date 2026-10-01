import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * Selecteur Jeudi / Vendredi de l'arc du programme (onglets ARIA).
 *
 * Un indicateur blanc unique glisse d'un onglet a l'autre en changeant de
 * largeur, sur une courbe ressort (350 ms, cubic-bezier(.34,1.3,.64,1),
 * leger depassement). Seule la transformation est animee : l'indicateur
 * est fait de deux disques (les bouts arrondis) qui se deplacent en
 * translateX et d'une bande centrale qui s'etire en scaleX, si bien que
 * les bouts ne se deforment jamais. Position et largeur des onglets sont
 * mesurees au montage et au redimensionnement, jamais pendant l'animation.
 *
 * Texte : bleu nuit sur l'indicateur, blanc ailleurs, en fondu de 200 ms.
 * Survol d'un onglet inactif : voile blanc a 8 %. Appui : l'indicateur se
 * tasse (scale 0.97).
 *
 * Clavier : fleches gauche et droite (et Debut / Fin) changent de jour ;
 * seul l'onglet actif est dans l'ordre de tabulation. Rien d'anime en
 * mouvement reduit.
 */
export type Onglet = { id: string; libelle: string; libelleCourt: string };

const COURBE = "cubic-bezier(.34,1.3,.64,1)";
const BASE = 100; // largeur de reference de la bande centrale, etiree en scaleX

export function OngletsJour({
  onglets,
  actif,
  onChange,
  idPanneau,
  prefixe,
}: {
  onglets: readonly Onglet[];
  actif: number;
  onChange: (i: number) => void;
  /** Identifiant du panneau (l'arc) que les onglets commandent. */
  idPanneau: string;
  /** Prefixe des identifiants des onglets (unique dans la page). */
  prefixe: string;
}) {
  const boutons = useRef<(HTMLButtonElement | null)[]>([]);
  const [mesures, setMesures] = useState<{ x: number; w: number; h: number }[]>([]);

  useLayoutEffect(() => {
    const mesurer = () =>
      setMesures(
        boutons.current.map((b) => ({
          x: b?.offsetLeft ?? 0,
          w: b?.offsetWidth ?? 0,
          h: b?.offsetHeight ?? 0,
        })),
      );
    mesurer();
    const obs = new ResizeObserver(mesurer);
    boutons.current.forEach((b) => b && obs.observe(b));
    document.fonts?.ready.then(mesurer);
    return () => obs.disconnect();
  }, [onglets.length]);

  function auClavier(e: KeyboardEvent) {
    const n = onglets.length;
    const cible =
      e.key === "ArrowRight"
        ? (actif + 1) % n
        : e.key === "ArrowLeft"
          ? (actif - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (cible === null) return;
    e.preventDefault();
    onChange(cible);
    boutons.current[cible]?.focus();
  }

  const m = mesures[actif];
  const transition = `transform 350ms ${COURBE}`;

  return (
    <div
      role="tablist"
      aria-label="Choisir une journée"
      onKeyDown={auClavier}
      className="group rounded-pastille relative inline-flex shrink-0 gap-1 self-start border border-white/[0.14] bg-white/[0.06] p-1 lg:self-end"
    >
      {/* Indicateur : pose des la premiere mesure, sans glissement initial. */}
      {m && m.w > 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1 left-0 motion-reduce:transition-none"
          style={{ height: m.h, transform: `translateX(${m.x}px)`, transition }}
        >
          <span
            className="absolute inset-0 block transition-[scale] duration-150 ease-out group-has-[[role=tab]:active]:scale-[0.97]"
            style={{ transformOrigin: `${m.w / 2}px 50%` }}
          >
            <span
              className="absolute top-0 left-0 rounded-full bg-white motion-reduce:transition-none"
              style={{ width: m.h, height: m.h }}
            />
            <span
              className="absolute top-0 left-0 origin-left bg-white motion-reduce:transition-none"
              style={{
                width: BASE,
                height: m.h,
                transform: `translateX(${m.h / 2}px) scaleX(${Math.max(0, m.w - m.h) / BASE})`,
                transition,
              }}
            />
            <span
              className="absolute top-0 left-0 rounded-full bg-white motion-reduce:transition-none"
              style={{
                width: m.h,
                height: m.h,
                transform: `translateX(${m.w - m.h}px)`,
                transition,
              }}
            />
          </span>
        </span>
      )}

      {onglets.map((o, i) => {
        const selectionne = i === actif;
        return (
          <button
            key={o.id}
            ref={(b) => {
              boutons.current[i] = b;
            }}
            type="button"
            role="tab"
            id={`${prefixe}-${o.id}`}
            aria-selected={selectionne}
            aria-controls={idPanneau}
            tabIndex={selectionne ? 0 : -1}
            onClick={() => onChange(i)}
            className={cn(
              "rounded-pastille relative z-10 px-[18px] py-2.5 font-sans text-[0.9375rem] leading-none font-semibold whitespace-nowrap",
              "transition-[color,background-color] duration-200 ease-out",
              "focus-visible:outline-accent-clair focus-visible:outline-2 focus-visible:outline-offset-2",
              selectionne ? "text-nuit" : "text-sur-nuit hover:bg-white/8",
            )}
          >
            <span className="sm:hidden">{o.libelleCourt}</span>
            <span className="hidden sm:inline">{o.libelle}</span>
          </button>
        );
      })}
    </div>
  );
}
