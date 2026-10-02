import type { ReactNode } from "react";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SOIREES } from "@/data/contenu";
import { Bouton } from "@/components/ui/Bouton";
import { Halo } from "@/components/brand/Halo";
import { HaloHero } from "@/components/brand/HaloHero";
import { OngletsJour } from "@/components/OngletsJour";
import { surDefilement } from "@/lib/defilement";

// figma : site / programme (arc), ton nuit
// animation principale du site (charte p. 9 : ellipse pointillée de bord à bord)
// dès 1024px : arc horizontal, section épinglée ; en dessous : arc vertical à gauche, sans épinglage
// tout est calculé en px sur la largeur mesurée pour que l'ellipse reste exacte

const RUPTURE = 1024;
const H_ARC = 226; // hauteur de l'arc horizontal, figma 226px
// profondeur de l'arc vertical, figma 110 (tablette) et 46 (mobile)
const BOMBE_TABLETTE = 110;
const BOMBE_MOBILE = 46;
// figma mobile : texte des créneaux à 86px du bord du contenu
const ECART_TEXTE = 40;
// arc vertical : point de 10px à venir, 14px atteint ; heure de 18px réduite à 16px à venir
const R_V_ATTEINT = 7;
const R_V = 5;
const ECHELLE_HEURE_V = 16 / 18;

// heures entre 150° et 30° : ça tombe pile sur les abscisses du figma
// (96, 360, 720, 1080, 1344 à 1440px) et les libellés restent hors marge
const RETRAIT = 30;

// sinon le trait et les cercles sont rognés en bas
const GARDE = 14;

// place des libellés d'heure en haut (22px, 12px d'écart, le point)
const MARGE = 56;

// pas du semis, en px d'arc
const PAS = 14;

// heures : point de 12px à venir, 18px atteint, plus lisibles que la ligne
const R_LIGNE = 2;
const R_HEURE = 6;
const R_HEURE_ATTEINT = 9;

const ECART_LIBELLE = 12;

// libellé : 22px cyan une fois atteint, 17px blanc à 70 % à venir
// les 17px sont les 22px réduits en transform, pas en font-size
const CORPS_HEURE_ATTEINT = "1.375rem";
const ECHELLE_HEURE = 17 / 22;
const COULEUR_HEURE = "rgb(255 255 255 / 0.7)";
const COULEUR_POINT = "rgb(255 255 255 / 0.55)";

const COURBE = "cubic-bezier(.22,.61,.24,1)";

type Point = { x: number; y: number };

// les points d'heure sont pris dans le semis pour garder un écart constant sur toute la ligne
// pas de longueur d'ellipse en forme close : on échantillonne finement et on cumule les cordes
function semis(surLArc: (t: number) => Point, tDebut: number, tFin: number) {
  const N = 600;
  const bruts: Point[] = [];
  for (let i = 0; i <= N; i++) bruts.push(surLArc(tDebut + (i / N) * (tFin - tDebut)));

  const cumul = [0];
  for (let i = 1; i <= N; i++) {
    cumul.push(cumul[i - 1] + Math.hypot(bruts[i].x - bruts[i - 1].x, bruts[i].y - bruts[i - 1].y));
  }
  const total = cumul[N];

  // nombre entier d'intervalles pour avoir un point à chaque extrémité
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

// enTete et pied sont rendus dans le bloc épinglé pour rester immobiles pendant la course
export function ArcSoiree({
  enTete,
  pied,
  haloHero = false,
}: {
  enTete?: ReactNode;
  pied?: ReactNode;
  /** halo des heros, quand la section ouvre la page */
  haloHero?: boolean;
}) {
  const enveloppe = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLOListElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState(0);
  const [hauteurListe, setHauteurListe] = useState(0);
  const [jour, setJour] = useState(0);
  const [survole, setSurvole] = useState<number | null>(null);
  // seul état touché pendant le défilement, et seulement quand il change
  const [nbAtteints, setNbAtteints] = useState(0);
  // ref : lue à chaque image par le calcul du défilement
  const geometrie = useRef({ depart: 0, seuils: [] as number[] });
  const recalcul = useRef<(() => void) | null>(null);
  const [reduit] = useState(mouvementReduit);
  const idArc = useId();
  // arc vertical : le point de chaque créneau est posé à la hauteur mesurée de son heure
  const heures = useRef<(HTMLParagraphElement | null)[]>([]);
  const traceVertical = useRef<SVGSVGElement>(null);
  const [ysHeures, setYsHeures] = useState<number[]>([]);
  const [nbAtteintsV, setNbAtteintsV] = useState(0);

  const creneaux = SOIREES[jour].creneaux;
  const n = creneaux.length;

  // mesure avant peinture : bonne orientation dès la première image, sans bascule visible
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

  // appelé à chaque image par lenis (déjà dans un raf) : la progression va dans --avance,
  // sans rendu react ; l'état ne change que quand une heure s'allume ou s'éteint
  useEffect(() => {
    const el = piste.current;
    if (!el || !epingle) return;

    const calcul = () => {
      const r = el.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      const progression = course <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / course));
      const { depart, seuils } = geometrie.current;
      const avance = depart + (1 - depart) * Math.min(1, progression * 1.12);
      el.style.setProperty("--avance", avance.toFixed(4));
      const nb = seuils.filter((seuil) => avance >= seuil).length;
      setNbAtteints((avant) => (avant === nb ? avant : nb));
    };
    recalcul.current = calcul;
    calcul();
    const desabonner = surDefilement(calcul);
    window.addEventListener("resize", calcul, { passive: true });
    return () => {
      desabonner();
      window.removeEventListener("resize", calcul);
      recalcul.current = null;
    };
  }, [epingle]);

  // listes positionnelles, clé = rang : les transitions jouent au changement de jour
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

    // vertical : l'arc couvre toute la liste, on retire les points de ligne trop proches d'une heure
    const Hc = Math.max(hauteurListe, 360);
    const ry = Hc / 2;
    const rx = bombe;
    const surLArc = (t: number) => ({ x: rx * Math.sin(t), y: ry - ry * Math.cos(t) });
    const { ligne } = semis(surLArc, 0, Math.PI);
    const points = Array.from({ length: n }, (_, i) => {
      const y = Math.min(Hc, Math.max(0, ysHeures[i] ?? (i + 0.5) * (Hc / n)));
      return { x: rx * Math.sin(Math.acos(1 - y / ry)), y };
    });
    const rangsHeure = new Set(
      ligne.flatMap((p, k) => (points.some((h) => Math.abs(h.y - p.y) < PAS * 0.8) ? [k] : [])),
    );
    return { ligne, points, rangsHeure, boite: { w: rx + R_V_ATTEINT + 2, h: Hc } };
  }, [horizontal, largeur, hauteurListe, n, bombe, ysHeures]);

  // libellé réduit en transform : sa hauteur ne bouge pas quand il s'allume, pas besoin de remesurer
  useLayoutEffect(() => {
    const ol = liste.current;
    if (horizontal || !ol) return;
    const mesurer = () => {
      const haut = ol.getBoundingClientRect().top;
      setYsHeures(
        heures.current
          .slice(0, n)
          .map((h) => (h ? h.getBoundingClientRect().top - haut + h.offsetHeight / 2 : 0)),
      );
    };
    mesurer();
    const obs = new ResizeObserver(mesurer);
    obs.observe(ol);
    return () => obs.disconnect();
  }, [horizontal, jour, n]);

  // vertical : une heure s'allume quand elle passe le milieu de l'écran, le tracé suit via --avance-v
  // en mouvement réduit tout est allumé d'emblée
  useEffect(() => {
    const ol = liste.current;
    const svg = traceVertical.current;
    if (horizontal || reduit || !ol || !svg) return;
    const calcul = () => {
      const milieu = window.innerHeight / 2;
      const r = ol.getBoundingClientRect();
      const avance = r.height > 0 ? Math.min(1, Math.max(0, (milieu - r.top) / r.height)) : 0;
      svg.style.setProperty("--avance-v", avance.toFixed(4));
      const nb = heures.current.slice(0, n).filter((h) => {
        if (!h) return false;
        const b = h.getBoundingClientRect();
        return b.top + b.height / 2 <= milieu;
      }).length;
      setNbAtteintsV((avant) => (avant === nb ? avant : nb));
    };
    calcul();
    const desabonner = surDefilement(calcul);
    window.addEventListener("resize", calcul, { passive: true });
    return () => {
      desabonner();
      window.removeEventListener("resize", calcul);
    };
  }, [horizontal, reduit, jour, n]);
  const allumeeV = (i: number) => reduit || i < nbAtteintsV;

  // le tracé part du premier créneau déjà allumé (étape 1 du figma) et va un peu plus vite
  // que le défilement (x1.12) pour atteindre le dernier avant la fin de la piste
  // l'abscisse du point sert de seuil : tracé et points ne peuvent pas se désynchroniser
  const depart = horizontal && boite.w > 0 && points[0] ? points[0].x / boite.w : 0;
  const seuils = points.map((p) => (boite.w > 0 ? p.x / boite.w - 0.005 : Infinity));
  // nouvelle géométrie (largeur, jour) : recalcul immédiat sans attendre le prochain défilement
  const cleSeuils = seuils.join();
  useLayoutEffect(() => {
    geometrie.current = { depart, seuils: cleSeuils ? cleSeuils.split(",").map(Number) : [] };
    recalcul.current?.();
  }, [depart, cleSeuils]);
  const nbAffiches = epingle ? nbAtteints : n;
  const atteint = (i: number) => i < nbAffiches;
  const courant = survole ?? (epingle ? Math.max(0, nbAtteints - 1) : 0);

  const onglets = (
    <OngletsJour
      onglets={SOIREES.map((s) => ({ id: s.id, libelle: s.onglet, libelleCourt: s.ongletCourt }))}
      actif={jour}
      onChange={(i) => {
        setJour(i);
        setSurvole(null);
      }}
      idPanneau={`${idArc}-arc`}
      prefixe={`${idArc}-onglet`}
    />
  );

  return (
    <div
      ref={piste}
      data-zone-epinglee
      className="relative"
      style={epingle ? { height: "200vh" } : undefined}
    >
      {/* desktop : centré sous l'en-tête fixe (88px) comme les heros
          safe : sur un écran trop bas le bloc se cale en haut au lieu de passer sous l'en-tête */}
      <div
        className={
          epingle
            ? "sticky top-0 flex h-svh flex-col [justify-content:safe_center] gap-10 overflow-hidden pt-[88px]"
            : "relative flex flex-col gap-10 overflow-hidden py-20 sm:py-[104px] lg:min-h-svh lg:[justify-content:safe_center] lg:pt-[176px] lg:pb-[88px]"
        }
      >
        {haloHero ? (
          <HaloHero />
        ) : (
          <Halo
            ton="nuit"
            taille={horizontal ? 804 : 520}
            style={
              horizontal
                ? { left: -215, top: "50%", transform: "translateY(-50%)" }
                : { left: -200, top: 200 }
            }
          />
        )}

        <div className="contenu relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {enTete}
          {onglets}
        </div>

        {/* hors gabarit : l'arc va de bord à bord */}
        <div
          ref={enveloppe}
          id={`${idArc}-arc`}
          role="tabpanel"
          aria-labelledby={`${idArc}-onglet-${SOIREES[jour].id}`}
          className="relative w-full"
        >
          {horizontal ? (
            <div className="relative" style={{ height: boite.h }}>
              <svg
                width={boite.w}
                height={boite.h}
                viewBox={`0 0 ${boite.w} ${boite.h}`}
                className="block"
                aria-hidden
              >
                {/* rangs d'heure sautés, le gros point les remplace */}
                <g className="text-sur-nuit-legende" fill="currentColor" opacity={0.55}>
                  {ligne.map((p, k) =>
                    rangsHeure.has(k) ? null : <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />,
                  )}
                </g>

                {/* même ligne en cyan, révélée par le clip sur --avance */}
                <g
                  className="text-accent-clair"
                  fill="currentColor"
                  style={{ clipPath: "inset(0 calc((1 - var(--avance, 1)) * 100%) 0 0)" }}
                >
                  {ligne.map((p, k) =>
                    rangsHeure.has(k) ? null : <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />,
                  )}
                </g>

                {/* position et taille en transform (point à venir = point atteint réduit), jamais cx, cy ou r */}
                {points.map((p, i) => (
                  <circle
                    key={i}
                    r={R_HEURE_ATTEINT}
                    style={{
                      transform: `translate(${p.x}px, ${p.y}px) scale(${atteint(i) ? 1 : R_HEURE / R_HEURE_ATTEINT})`,
                      fill: atteint(i) ? "var(--accent-clair)" : COULEUR_POINT,
                      transition: `transform 300ms ${COURBE}, fill 300ms ${COURBE}`,
                    }}
                  />
                ))}
              </svg>

              {/* heures en html au-dessus de leur point, réduites depuis le bas tant qu'elles sont à venir */}
              <ul key={jour} className="fondu-jour absolute inset-0">
                {points.map((p, i) => (
                  <li
                    key={i}
                    className="absolute top-0 left-0"
                    style={{
                      transform: `translate(${p.x}px, ${p.y}px) translate(-50%, calc(-100% - ${(atteint(i) ? R_HEURE_ATTEINT : R_HEURE) + ECART_LIBELLE}px))`,
                      transition: `transform 300ms ${COURBE}`,
                    }}
                  >
                    <Bouton
                      variante="nu"
                      onMouseEnter={() => setSurvole(i)}
                      onFocus={() => setSurvole(i)}
                      onMouseLeave={() => setSurvole(null)}
                      onBlur={() => setSurvole(null)}
                      className="num leading-[1.2] font-bold"
                      style={{
                        color: atteint(i) ? "var(--accent-clair)" : COULEUR_HEURE,
                        fontSize: CORPS_HEURE_ATTEINT,
                        transform: atteint(i) ? "none" : `scale(${ECHELLE_HEURE})`,
                        transformOrigin: "50% 100%",
                        transition: `color 300ms ${COURBE}, transform 300ms ${COURBE}`,
                      }}
                    >
                      {creneaux[i].heure}
                    </Bouton>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="contenu relative">
              <svg
                ref={traceVertical}
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
                <g
                  className="text-accent-clair"
                  fill="currentColor"
                  style={{ clipPath: "inset(0 0 calc((1 - var(--avance-v, 1)) * 100%) 0)" }}
                >
                  {ligne.map((p, k) =>
                    rangsHeure.has(k) ? null : <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />,
                  )}
                </g>
                {points.map((p, i) => (
                  <circle
                    key={i}
                    r={R_V_ATTEINT}
                    style={{
                      transform: `translate(${p.x}px, ${p.y}px) scale(${allumeeV(i) ? 1 : R_V / R_V_ATTEINT})`,
                      fill: allumeeV(i) ? "var(--accent-clair)" : COULEUR_POINT,
                      transition: `transform 300ms ${COURBE}, fill 300ms ${COURBE}`,
                    }}
                  />
                ))}
              </svg>

              <ol ref={liste} key={jour} className="fondu-jour relative flex flex-col gap-7">
                {creneaux.map((c, i) => (
                  <li key={i} style={{ paddingLeft: bombe + ECART_TEXTE }}>
                    <p
                      ref={(el) => {
                        heures.current[i] = el;
                      }}
                      className="num origin-left text-[1.125rem] leading-[1.2] font-bold tracking-[0.02em]"
                      style={{
                        color: allumeeV(i) ? "var(--accent-clair)" : COULEUR_HEURE,
                        transform: allumeeV(i) ? "none" : `scale(${ECHELLE_HEURE_V})`,
                        transition: `color 300ms ${COURBE}, transform 300ms ${COURBE}`,
                      }}
                    >
                      {c.heure}
                    </p>
                    <p className="text-d-bloc text-sur-nuit mt-1.5">{c.intitule}</p>
                    <p className="text-w-legende text-sur-nuit-legende mt-1.5 max-w-[60ch]">
                      {c.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* hauteur fixe pour que rien ne saute d'un créneau à l'autre */}
        {horizontal && (
          <div className="contenu relative">
            <div key={jour} className="fondu-jour relative min-h-[156px] max-w-[720px]">
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

        {pied && <div className="contenu relative">{pied}</div>}
      </div>
    </div>
  );
}
