import { useLayoutEffect, useRef, useState } from "react";
import { LOGOS_HERO } from "@/data/partenaires";
import { SURTITRE_LOGOS_HERO } from "@/data/contenu";
import { LogoPartenaire } from "@/components/ui/LogoPartenaire";

/**
 * Arc des partenaires du hero de l'accueil. Figma : Site / Hero, version
 * A2 (retenue).
 *
 * Fixe : aucune animation (arbitrage de l'equipe, seule l'arc du
 * programme bouge). Deux ellipses pointillees en fond (Decor / Arc), les
 * sept plaques de logos par-dessus, puis le sur-titre.
 *
 * Desktop (>= 1024) : les plaques sont posees SUR l'arc principal, leur
 * centre suit l'ellipse. Tablette et mobile : les plaques forment une
 * rangee droite centree sur le sommet de l'arc, et la rangee deborde de
 * l'ecran de chaque cote, comme dans le Figma. Le hero qui l'accueille
 * doit donc etre en overflow-hidden.
 *
 * Les arcs ne croisent jamais le sur-titre : au centre, le second arc
 * passe au-dessus de lui.
 *
 * Geometrie relevee dans le Figma, par format :
 *
 *            plaque     pas    ellipse (rx x ry)   arc 2
 *   desktop  150 x 69   ~205   1240 x 550          +80px
 *   tablette 130 x 60   144    917 x 375           +40px
 *   mobile   104 x 48   114    (arcs en bas du hero, voir Hero.tsx)
 *
 * Aucune ombre sur les plaques : la page n'en porte qu'une (CONVENTIONS).
 */

type Format = {
  plaque: { l: number; h: number };
  pas: number;
  rx: number;
  ry: number;
  decalageArc2: number;
  /* Hauteur du bloc, du haut des plaques au bas du sur-titre. Les arcs
     debordent dessous, derriere la suite du hero. */
  hauteur: number;
  surArc: boolean;
  /* Les arcs sont-ils dessines ici, sous les logos ? Non en mobile : le
     Figma les pose tout en bas du hero, c'est le Hero qui les dessine. */
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
  /* Sommet de l'arc principal : le centre de la plaque du milieu. */
  const sommet = f.plaque.h / 2 + 8;
  const n = LOGOS_HERO.length;

  /* Hauteur de l'arc a une distance dx du centre, sous le sommet. */
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
              <LogoPartenaire logo={logo} className="h-full w-full" />
            </li>
          );
        })}
      </ul>

      <p
        id="arc-partenaires-titre"
        className="text-w-surtitre text-sur-nuit-legende absolute inset-x-0 bottom-0 text-center uppercase"
      >
        {SURTITRE_LOGOS_HERO}
      </p>
    </div>
  );
}
