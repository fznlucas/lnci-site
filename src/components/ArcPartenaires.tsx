import { useLayoutEffect, useRef, useState } from "react";
import { LOGOS_HERO } from "@/data/partenaires";
import { SURTITRE_LOGOS_HERO } from "@/data/contenu";
import { LogoPartenaire } from "@/components/ui/LogoPartenaire";

// figma : site / hero, version a2 (géométrie relevée par format dans FORMATS)
// tablette : rangée droite qui déborde de chaque côté ; mobile : rangée qui défile en continu
// dans les deux cas le hero doit être en overflow-hidden
// pas d'ombre sur les plaques, la page n'en a qu'une

type Format = {
  plaque: { l: number; h: number };
  pas: number;
  rx: number;
  ry: number;
  decalageArc2: number;
  /** du haut des plaques au bas du sur-titre, les arcs débordent dessous */
  hauteur: number;
  surArc: boolean;
  /** false en mobile : le figma pose les arcs en bas du hero, c'est Hero.tsx qui les dessine */
  arcs: boolean;
};

const FORMATS: Record<"desktop" | "tablette" | "mobile", Format> = {
  desktop: {
    plaque: { l: 150, h: 69 },
    pas: 202,
    rx: 1240,
    ry: 550,
    decalageArc2: 80,
    hauteur: 176,
    surArc: true,
    arcs: true,
  },
  tablette: {
    plaque: { l: 130, h: 60 },
    pas: 144,
    rx: 917,
    ry: 375,
    decalageArc2: 40,
    hauteur: 110,
    surArc: false,
    arcs: true,
  },
  mobile: {
    plaque: { l: 104, h: 48 },
    pas: 114,
    rx: 429,
    ry: 175,
    decalageArc2: 40,
    hauteur: 98,
    surArc: false,
    arcs: false,
  },
};

export function ArcPartenaires() {
  const boite = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState(1440);

  useLayoutEffect(() => {
    const el = boite.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setLargeur(e.contentRect.width));
    obs.observe(el);
    setLargeur(el.getBoundingClientRect().width);
    return () => obs.disconnect();
  }, []);

  const f = largeur >= 1024 ? FORMATS.desktop : largeur >= 640 ? FORMATS.tablette : FORMATS.mobile;
  const centre = largeur / 2;
  // sommet de l'arc principal = centre de la plaque du milieu
  const sommet = f.plaque.h / 2 + 8;
  const n = LOGOS_HERO.length;

  // descente de l'ellipse sous le sommet, à dx du centre
  const chute = (dx: number) => f.ry * (1 - Math.sqrt(Math.max(0, 1 - (dx / f.rx) ** 2)));

  return (
    <div
      ref={boite}
      className="relative w-full"
      style={{ height: f.hauteur }}
      role="group"
      aria-labelledby="arc-partenaires-titre"
    >
      {f.arcs && (
        <svg
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 overflow-visible"
          width={largeur}
          height={f.hauteur + 160}
        >
          <ellipse
            cx={centre}
            cy={sommet + f.ry}
            rx={f.rx}
            ry={f.ry}
            fill="none"
            stroke="white"
            strokeOpacity={0.28}
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeDasharray="2 10"
          />
          <ellipse
            cx={centre}
            cy={sommet + f.decalageArc2 + f.ry}
            rx={f.rx}
            ry={f.ry}
            fill="none"
            stroke="white"
            strokeOpacity={0.14}
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeDasharray="2 14"
          />
        </svg>
      )}

      {largeur < 640 ? (
        /* liste doublée qui glisse de -50 % : la boucle ne se voit pas (defilement-logos) */
        <div
          className="absolute inset-x-0 overflow-hidden"
          style={{ top: sommet - f.plaque.h / 2, height: f.plaque.h }}
        >
          <ul className="defilement-logos relative flex w-max">
            {[...LOGOS_HERO, ...LOGOS_HERO].map((logo, i) => (
              <li
                key={i}
                aria-hidden={i >= n || undefined}
                className="shrink-0"
                data-double={i >= n || undefined}
                style={{ width: f.pas, height: f.plaque.h, paddingRight: f.pas - f.plaque.l }}
              >
                <LogoPartenaire logo={logo} prioritaire className="h-full w-full" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {LOGOS_HERO.map((logo, i) => {
            const dx = (i - (n - 1) / 2) * f.pas;
            const y = sommet + (f.surArc ? chute(dx) : 0);
            return (
              <li
                key={logo.id}
                className="absolute"
                style={{
                  width: f.plaque.l,
                  height: f.plaque.h,
                  left: centre + dx - f.plaque.l / 2,
                  top: y - f.plaque.h / 2,
                }}
              >
                <LogoPartenaire logo={logo} prioritaire className="h-full w-full" />
              </li>
            );
          })}
        </ul>
      )}

      <p
        id="arc-partenaires-titre"
        className="text-w-surtitre text-sur-nuit-legende absolute inset-x-0 bottom-0 text-center uppercase"
      >
        {SURTITRE_LOGOS_HERO}
      </p>
    </div>
  );
}
