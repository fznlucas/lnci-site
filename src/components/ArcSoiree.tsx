import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SOIREES } from "@/data/contenu";
import { Bouton } from "@/components/ui/Bouton";
import { Halo } from "@/components/brand/Halo";
import { HaloHero } from "@/components/brand/HaloHero";

/**
 * L'arc du programme. Figma : Site / Programme (arc), ton Nuit.
 *
 * Seule animation du site (arbitrage de l'equipe). Charte page 9 :
 * ellipse pointillee, points d'heure, ouverte de bord a bord.
 *
 * Deux orientations, selon la largeur mesuree :
 *
 *   horizontale, a partir de 1024px. La section est epinglee pendant le
 *   defilement : l'arc se trace de gauche a droite, chaque heure s'allume
 *   quand le trace l'atteint (point de 4 a 7px, libelle de 12 a 14px) et
 *   le detail du creneau change en fondu. Le survol d'une heure affiche
 *   son detail.
 *
 *   verticale, en dessous. L'arc descend le long du bord gauche, tous les
 *   creneaux sont listes a sa droite, sans epinglage.
 *
 * Les onglets Jeudi / Vendredi choisissent la journee tracee.
 * `prefers-reduced-motion` : l'arc est trace d'emblee, sans epinglage.
 *
 * Le trace est calcule a partir de la largeur reellement mesuree, en
 * unites de pixels : l'ellipse est exacte a toute taille.
 */

const RUPTURE = 1024;
const H_ARC = 226; // hauteur de l'arc horizontal (Figma : 226px)
/* Profondeur de l'arc vertical, tablette puis mobile (Figma : 110 et 64). */
const BOMBE_TABLETTE = 110;
const BOMBE_MOBILE = 64;

/**
 * Retrait angulaire des points d'heure, en degres. Le trace va d'un bord
 * a l'autre ; les heures occupent la plage de 150 a 30 degres, ce qui les
 * pose exactement aux abscisses du Figma (96, 360, 720, 1080, 1344 a
 * 1440px) et garde leurs libelles hors de la marge de page.
 */
const RETRAIT = 30;

/** Marge basse, pour que le trait et les cercles ne soient pas rognes. */
const GARDE = 14;

/** Marge haute reservee aux libelles d'heure. */
const MARGE = 46;

/** Pas du semis, en pixels d'arc. */
const PAS = 14;

/** Rayons : point de ligne, heure au repos, heure atteinte. */
const R_LIGNE = 2;
const R_HEURE = 4;
const R_HEURE_ATTEINT = 7;

/** Ecart entre le bas du libelle d'heure et le bord du point. */
const ECART_LIBELLE = 10;

/** Corps du libelle d'heure, au repos et atteint (style surtitre). */
const CORPS_HEURE = "0.75rem";
const CORPS_HEURE_ATTEINT = "0.875rem";

const COURBE = "cubic-bezier(.22,.61,.24,1)";

type Point = { x: number; y: number };

/**
 * Semis de points le long d'un arc parametre. Generateur unique de la
 * ligne : les points d'heure sont pris dans ce semis, de sorte que l'ecart
 * entre deux points reste constant d'un bout a l'autre.
 *
 * L'arc n'a pas de longueur en forme close : on l'echantillonne finement
 * et on cumule les cordes. `versRang` convertit un parametre en rang de
 * point du semis.
 */
function semis(surLArc: (t: number) => Point, tDebut: number, tFin: number) {
  const N = 600;
  const bruts: Point[] = [];
  for (let i = 0; i <= N; i++) bruts.push(surLArc(tDebut + (i / N) * (tFin - tDebut)));

  const cumul = [0];
  for (let i = 1; i <= N; i++) {
    cumul.push(cumul[i - 1] + Math.hypot(bruts[i].x - bruts[i - 1].x, bruts[i].y - bruts[i - 1].y));
  }
  const total = cumul[N];

  /* Un nombre entier d'intervalles : les deux extremites portent un point. */
  const nb = Math.max(2, Math.round(total / PAS) + 1);
  const ecart = total / (nb - 1);

  const versPoint = (longueur: number) => {
    let j = 0;
    while (j < N - 1 && cumul[j + 1] < longueur) j++;
    const seg = cumul[j + 1] - cumul[j] || 1;
    const f = Math.min(1, Math.max(0, (longueur - cumul[j]) / seg));
    return {
      x: bruts[j].x + (bruts[j + 1].x - bruts[j].x) * f,
      y: bruts[j].y + (bruts[j + 1].y - bruts[j].y) * f,
    };
  };

  const ligne = Array.from({ length: nb }, (_, k) => versPoint(k * ecart));

  const versRang = (t: number) => {
    const i = Math.min(N, Math.max(0, Math.round(((t - tDebut) / (tFin - tDebut)) * N)));
    return Math.min(nb - 1, Math.max(0, Math.round(cumul[i] / ecart)));
  };

  return { ligne, versRang };
}

function mouvementReduit() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * `enTete` (pastille et titre) et `pied` (lien et legende) sont poses par
 * la section appelante et rendus DANS le bloc epingle, de part et d'autre
 * de l'arc, pour rester immobiles pendant toute la course.
 */
export function ArcSoiree({
  enTete,
  pied,
  haloHero = false,
}: {
  enTete?: ReactNode;
  pied?: ReactNode;
  /** Halo des heros, en haut a droite, quand la section ouvre la page. */
  haloHero?: boolean;
}) {
  const enveloppe = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLOListElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState(0);
  const [hauteurListe, setHauteurListe] = useState(0);
  const [jour, setJour] = useState(0);
  const [survole, setSurvole] = useState<number | null>(null);
  const [progression, setProgression] = useState(0);
  const [reduit] = useState(mouvementReduit);

  const creneaux = SOIREES[jour].creneaux;
  const n = creneaux.length;

  /* Mesure de l'enveloppe avant peinture : l'orientation est juste des
     la premiere image, sans bascule visible. */
  useLayoutEffect(() => {
    const el = enveloppe.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setLargeur(e.contentRect.width));
    obs.observe(el);
    setLargeur(el.getBoundingClientRect().width);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = liste.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setHauteurListe(e.contentRect.height));
    obs.observe(el);
    setHauteurListe(el.getBoundingClientRect().height);
    return () => obs.disconnect();
  }, [jour, largeur]);

  const horizontal = largeur >= RUPTURE;
  const epingle = horizontal && !reduit;
  const bombe = largeur >= 640 ? BOMBE_TABLETTE : BOMBE_MOBILE;

  /* Progression du defilement dans la piste, entre 0 et 1. Ecouteur
     passif et requestAnimationFrame : aucune lecture de mise en page en
     boucle. */
  useEffect(() => {
    const el = piste.current;
    if (!el || !epingle) return;

    let frame = 0;
    const calcul = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      if (course <= 0) return setProgression(1);
      setProgression(Math.min(1, Math.max(0, -r.top / course)));
    };
    const auDefilement = () => {
      if (!frame) frame = requestAnimationFrame(calcul);
    };

    calcul();
    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement);
    return () => {
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [epingle]);

  /* Geometrie. Les listes sont positionnelles : le point i est le i-eme
     creneau de la journee affichee. La cle est donc le rang, ce qui laisse
     jouer les transitions au changement de jour. */
  const { ligne, points, rangsHeure, boite } = useMemo(() => {
    if (horizontal) {
      const W = Math.max(largeur, 320);
      const rx = W / 2;
      const ry = H_ARC;
      const surLArc = (t: number) => ({
        x: rx + rx * Math.cos(t),
        y: MARGE + ry - ry * Math.sin(t),
      });
      const { ligne, versRang } = semis(surLArc, Math.PI, 0);
      const haut = ((180 - RETRAIT) * Math.PI) / 180;
      const bas = (RETRAIT * Math.PI) / 180;
      const rangs = Array.from({ length: n }, (_, i) =>
        versRang(haut - (i / (n - 1)) * (haut - bas)),
      );
      return {
        ligne,
        points: rangs.map((r) => ligne[r]),
        rangsHeure: new Set(rangs),
        boite: { w: W, h: MARGE + ry + GARDE },
      };
    }

    const Hc = Math.max(hauteurListe, 360);
    const ry = Hc / 2;
    const rx = bombe;
    const surLArc = (t: number) => ({ x: rx * Math.sin(t), y: ry - ry * Math.cos(t) });
    const { ligne, versRang } = semis(surLArc, 0, Math.PI);
    const haut = (RETRAIT * Math.PI) / 180;
    const bas = ((180 - RETRAIT) * Math.PI) / 180;
    const rangs = Array.from({ length: n }, (_, i) =>
      versRang(haut + (i / (n - 1)) * (bas - haut)),
    );
    return {
      ligne,
      points: rangs.map((r) => ligne[r]),
      rangsHeure: new Set(rangs),
      boite: { w: rx + R_HEURE_ATTEINT + 2, h: Hc },
    };
  }, [horizontal, largeur, hauteurListe, n, bombe]);

  /* Le trace part du premier creneau, deja allume a l'arrivee (etape 1
     du Figma), et avance un peu plus vite que le defilement : le dernier
     creneau est atteint avant la fin de la piste. Sans animation, tout
     est trace. */
  const depart = horizontal && boite.w > 0 && points[0] ? points[0].x / boite.w : 0;
  const avance = epingle ? depart + (1 - depart) * Math.min(1, progression * 1.12) : 1;

  /* Un point s'allume quand le trace l'a depasse : l'abscisse du point
     sert de seuil, trace et points ne peuvent pas se desynchroniser. */
  const atteint = (i: number) => boite.w > 0 && avance >= points[i].x / boite.w - 0.005;
  const indexDefilement = points.reduce((acc, _, i) => (atteint(i) ? i : acc), 0);
  const courant = survole ?? (epingle ? indexDefilement : 0);

  const onglets = (
    <div
      role="group"
      aria-label="Choisir une journée"
      className="rounded-pastille inline-flex shrink-0 gap-1 self-start border border-white/[0.14] bg-white/[0.06] p-1 lg:self-end"
    >
      {SOIREES.map((s, i) => (
        <Bouton
          key={s.id}
          variante="onglet"
          aria-pressed={i === jour}
          onClick={() => {
            setJour(i);
            setSurvole(null);
          }}
        >
          <span className="sm:hidden">{s.ongletCourt}</span>
          <span className="hidden sm:inline">{s.onglet}</span>
        </Bouton>
      ))}
    </div>
  );

  return (
    <div ref={piste} className="relative" style={epingle ? { height: "200vh" } : undefined}>
      <div
        className={
          epingle
            ? "sticky top-0 flex h-svh flex-col overflow-hidden pt-[128px] pb-14"
            : "relative flex flex-col gap-10 overflow-hidden py-20 sm:py-[104px] lg:min-h-svh lg:justify-center lg:py-32"
        }
      >
        {haloHero ? (
          <HaloHero />
        ) : (
          <Halo
            ton="nuit"
            taille={horizontal ? 804 : 520}
            style={horizontal ? { left: -215, top: 128 } : { left: -200, top: 200 }}
          />
        )}

        {/* En-tete : titre a gauche, onglets a droite en desktop, dessous
            ailleurs. */}
        <div className="contenu relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {enTete}
          {onglets}
        </div>

        {epingle && <div className="min-h-6 grow" aria-hidden />}

        {/* L'arc. Il deborde du gabarit : bord a bord. */}
        <div ref={enveloppe} className="relative w-full">
          {horizontal ? (
            <div className="relative" style={{ height: boite.h }}>
              <svg
                width={boite.w}
                height={boite.h}
                viewBox={`0 0 ${boite.w} ${boite.h}`}
                className="block"
                aria-hidden
              >
                {/* La ligne, point par point. Les rangs occupes par une heure
                    sont sautes : le gros point les remplace. */}
                <g className="text-sur-nuit-legende" fill="currentColor" opacity={0.55}>
                  {ligne.map((p, k) =>
                    rangsHeure.has(k) ? null : <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />,
                  )}
                </g>

                {/* La meme ligne, revelee par un clip horizontal. */}
                <g
                  className="text-accent-clair"
                  fill="currentColor"
                  style={{ clipPath: `inset(0 ${100 - avance * 100}% 0 0)` }}
                >
                  {ligne.map((p, k) =>
                    rangsHeure.has(k) ? null : <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />,
                  )}
                </g>

                {points.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={atteint(i) ? R_HEURE_ATTEINT : R_HEURE}
                    fill="currentColor"
                    className={atteint(i) ? "text-accent-clair" : "text-sur-nuit-legende"}
                    style={{
                      transition: `cx 420ms ${COURBE}, cy 420ms ${COURBE}, r 300ms ${COURBE}`,
                    }}
                  />
                ))}
              </svg>

              {/* Heures en HTML, centrees au-dessus de leur point. */}
              <ul className="absolute inset-0">
                {points.map((p, i) => (
                  <li
                    key={i}
                    className="absolute"
                    style={{
                      left: p.x,
                      top: p.y,
                      transform: `translate(-50%, calc(-100% - ${(atteint(i) ? R_HEURE_ATTEINT : R_HEURE) + ECART_LIBELLE}px))`,
                      transition: `left 420ms ${COURBE}, top 420ms ${COURBE}, transform 300ms ${COURBE}`,
                    }}
                  >
                    <Bouton
                      variante="nu"
                      onMouseEnter={() => setSurvole(i)}
                      onFocus={() => setSurvole(i)}
                      onMouseLeave={() => setSurvole(null)}
                      onBlur={() => setSurvole(null)}
                      className="num leading-[1.2] font-bold tracking-[0.18em]"
                      style={{
                        color: atteint(i) ? "var(--accent-clair)" : "var(--text-sur-nuit-legende)",
                        fontSize: atteint(i) ? CORPS_HEURE_ATTEINT : CORPS_HEURE,
                        transition: `color 300ms ${COURBE}, font-size 300ms ${COURBE}`,
                      }}
                    >
                      {creneaux[i].heure}
                    </Bouton>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* Vertical : l'arc descend depuis la marge gauche en bombant
               vers la droite, les creneaux se lisent a sa droite. */
            <div className="contenu relative">
              <svg
                width={boite.w}
                height={boite.h}
                viewBox={`0 0 ${boite.w} ${boite.h}`}
                className="pointer-events-none absolute top-0 left-5 overflow-visible sm:left-10"
                aria-hidden
              >
                <g className="text-sur-nuit-legende" fill="currentColor" opacity={0.55}>
                  {ligne.map((p, k) =>
                    rangsHeure.has(k) ? null : <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />,
                  )}
                </g>
                {points.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={R_HEURE_ATTEINT}
                    fill="currentColor"
                    className="text-accent-clair"
                  />
                ))}
              </svg>

              <ol ref={liste} className="relative flex flex-col gap-8 py-6">
                {creneaux.map((c, i) => (
                  <li key={i} style={{ paddingLeft: bombe + 28 }}>
                    <p className="num text-w-surtitre text-accent-clair">{c.heure}</p>
                    <p className="text-d-bloc text-sur-nuit mt-2">{c.intitule}</p>
                    <p className="text-w-dense text-sur-nuit-legende mt-2 max-w-[60ch]">
                      {c.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Detail du creneau courant, en desktop : fondu d'un creneau a
            l'autre, hauteur fixe pour que rien ne saute. */}
        {horizontal && (
          <div className="contenu relative">
            <div className="relative min-h-[156px] max-w-[720px]">
              {creneaux.map((c, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: i === courant ? 1 : 0,
                    transform: `translateY(${i === courant ? 0 : 10}px)`,
                    transition: `opacity 380ms ${COURBE}, transform 380ms ${COURBE}`,
                    pointerEvents: "none",
                  }}
                  aria-hidden={i !== courant}
                >
                  <p className="num text-w-surtitre text-accent-clair">{c.heure}</p>
                  <p className="text-d-sous-titre text-sur-nuit mt-3">{c.intitule}</p>
                  <p className="text-w-courant text-sur-nuit-legende mt-3">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {epingle && <div className="min-h-6 grow" aria-hidden />}

        {pied && <div className="contenu relative">{pied}</div>}
      </div>
    </div>
  );
}
