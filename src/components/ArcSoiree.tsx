import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SOIREES } from "@/data/contenu";
import { Bouton } from "@/components/ui/Bouton";

/**
 * L'arc de la soiree.
 *
 * Charte page 9 : ellipse pointillee, points d'heure, ouverte de bord
 * a bord, un seul arc par visuel, jamais deux. Elle marque la duree
 * d'une soiree.
 *
 * Le trace est calcule en JavaScript a partir de la largeur reellement
 * mesuree, et le viewBox est en unites de pixels reelles. L'ellipse est
 * donc exacte a toute taille, le pointillé garde sa forme, et aucune
 * compensation de trait n'est necessaire.
 *
 * Deux orientations :
 *   horizontale, a partir de lg. L'arc traverse toute la largeur de la
 *   fenetre, d'un bord a l'autre, en debordant du gabarit de contenu.
 *   verticale, en dessous. L'arc descend du bord haut au bord bas de la
 *   section, en bombant vers la droite. Meme geste, meme regle de bord
 *   a bord, sur l'autre axe.
 *
 * Les points portent le statut reel du creneau : plein quand le sujet
 * est arrete, en contour seul quand le creneau est encore ouvert. Le
 * programme se remplit entre septembre et novembre, l'arc en est la
 * jauge. C'est une information, pas un ornement.
 */

const RUPTURE = 1024;
const H_ARC = 220; // hauteur de l'arc horizontal, en pixels
const BOMBE = 132; // profondeur de l'arc vertical, en pixels

/**
 * Retrait angulaire des points, en degres.
 *
 * Le trace va d'un bord a l'autre, conformement a la charte. Les points,
 * eux, occupent une plage resserree : de 150 a 30 degres au lieu de 180
 * a 0. Sans ce retrait, les points extremes tombent sur la ligne de base,
 * leurs cercles sont coupes par le bas de la zone et leurs libelles
 * sortent du cadre.
 *
 * La valeur est dictee par la lecture des heures extremes, pas par le
 * dessin. Le libelle est centre sur son point ; a 30 degres, son bord
 * tombe sur la gouttiere de page a la plus etroite des largeurs
 * horizontales, et plus loin a l'interieur au-dela :
 *
 *              point    bord du libelle
 *   1024       68,6            40,1      (gouttiere de page : 40)
 *   1440       96,5            68,0
 *   1920      128,6           100,1
 *
 * A 20 degres, valeur d'origine calibree pour des libelles plus petits et
 * ancres vers l'interieur, ce bord tombait a 2,4px du bord de fenetre a
 * 1024 : l'heure se lisait collee au cadre. La regle est desormais qu'une
 * heure n'empiete jamais sur la marge de page.
 */
const RETRAIT = 30;

/** Marge basse, pour que le trait et les cercles ne soient pas rognes. */
const GARDE = 14;

/**
 * Marge haute reservee aux libelles d'heure.
 *
 * Les libelles se posent au dessus de leur point. Sans cette reserve,
 * ceux des points hauts sortent du cadre par le haut, ce qui est le
 * pendant exact du defaut corrige en bas par GARDE.
 */
const MARGE = 46;

/**
 * Pas du semis, en pixels d'arc.
 *
 * Le pas reel est ajuste pour tomber juste sur la longueur de l'arc, de
 * sorte que le premier et le dernier point tombent exactement sur les deux
 * extremites. L'ecart entre deux points est donc rigoureusement constant
 * sur toute la ligne.
 */
const PAS = 14;

/** Rayon d'un point de ligne, et des points d'heure au repos et atteints. */
const R_LIGNE = 2.5;
const R_HEURE = 4;
const R_HEURE_ATTEINT = 7;

/**
 * Ecart entre le bas du libelle d'heure et le BORD du point, pas son centre.
 *
 * Le retrait applique au libelle suit donc le rayon courant. Sans cela, le
 * libelle restait fixe pendant que le point grossissait de 4 a 7 : le point
 * montait dans le texte et l'ecart se resserrait de 3px au moment meme ou
 * l'heure devenait celle qu'il faut lire.
 */
const ECART_LIBELLE = 10;

/**
 * Corps du libelle d'heure, au repos et une fois l'heure atteinte.
 *
 * Le point passe de 4 a 7 de rayon ; le libelle grossit avec lui, sinon
 * l'heure atteinte reste une petite mention a cote d'un gros point et la
 * bascule ne se lit pas. L'interlettrage du sur-titre etant en em, il suit
 * le corps sans reglage. Le libelle etant centre sur son point et cale par
 * le bas, il grandit symetriquement et ne derive ni en x ni en y.
 */
const CORPS_HEURE = "0.6875rem";
const CORPS_HEURE_ATTEINT = "0.875rem";

type Point = { x: number; y: number; angle: number };

/**
 * Semis de points le long d'un arc parametre.
 *
 * Generateur unique de la ligne : c'est lui qui pose TOUS les points, et
 * les points d'heure sont pris dans ce semis. Auparavant la ligne etait un
 * trait pointille (strokeDasharray) dont les points tombaient a intervalle
 * de longueur d'arc depuis le debut du trace, tandis que les heures etaient
 * calculees a intervalle angulaire regulier : deux grilles sans rapport, si
 * bien qu'un gros point tombait entre deux petits ou en chevauchait un.
 *
 * L'arc n'a pas de longueur en forme close, on l'echantillonne donc
 * finement et on cumule les cordes. `versRang` convertit ensuite un
 * parametre en rang de point, ce qui permet a une heure de se caler sur un
 * point du semis plutot que de s'y superposer.
 */
function semis(
  surLArc: (t: number) => { x: number; y: number },
  tDebut: number,
  tFin: number,
) {
  const N = 600;
  const bruts: { x: number; y: number }[] = [];
  for (let i = 0; i <= N; i++) {
    bruts.push(surLArc(tDebut + (i / N) * (tFin - tDebut)));
  }

  const cumul = [0];
  for (let i = 1; i <= N; i++) {
    cumul.push(cumul[i - 1] + Math.hypot(bruts[i].x - bruts[i - 1].x, bruts[i].y - bruts[i - 1].y));
  }
  const total = cumul[N];

  /* Un nombre entier d'intervalles, donc un pas legerement corrige pour
     que les deux extremites portent un point. */
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

  /* Rang du point du semis le plus proche d'un parametre donne. */
  const versRang = (t: number) => {
    const i = Math.min(N, Math.max(0, Math.round(((t - tDebut) / (tFin - tDebut)) * N)));
    return Math.min(nb - 1, Math.max(0, Math.round(cumul[i] / ecart)));
  };

  return { ligne, versRang };
}

/**
 * `enTete` et `pied` sont poses par la section appelante et rendus DANS le
 * bloc epingle, entre lesquels l'arc se joue. Ils ne sont pas rendus autour
 * du composant : sinon ils defilent avant que l'arc n'arrive, et la piste
 * laisse une hauteur d'ecran de vide de chaque cote du bloc centre.
 */
export function ArcSoiree({ enTete, pied }: { enTete?: ReactNode; pied?: ReactNode }) {
  const enveloppe = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState(0);
  const [hauteurListe, setHauteurListe] = useState(0);
  const [jour, setJour] = useState(1); // vendredi par defaut
  const [survole, setSurvole] = useState<number | null>(null);
  const [progression, setProgression] = useState(0);
  const liste = useRef<HTMLOListElement>(null);
  const piste = useRef<HTMLDivElement>(null);

  const soiree = SOIREES[jour];
  const creneaux = soiree.creneaux;
  const n = creneaux.length;

  /* Mesure de l'enveloppe. Une seule source pour l'orientation et pour
     la geometrie : pas de media query dupliquee en CSS et en JS.

     useLayoutEffect, et non useEffect : largeur vaut 0 au premier
     rendu, donc horizontal est faux et c'est l'arc vertical qui est
     construit. Mesuree apres peinture, la bascule se voyait, une image
     d'arc vertical sur desktop avant le passage en horizontal. Mesuree
     avant peinture, le re-rendu a lieu dans la meme image et rien ne
     clignote. */
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
  }, [jour]);

  /* Progression du defilement, entre 0 et 1.
     La piste mesure plusieurs hauteurs de vue et la section y reste
     epinglee : le defilement pilote le trace de l'arc au lieu de faire
     defiler la page. Le calcul passe par une requestAnimationFrame et un
     ecouteur passif, aucune propriete de mise en page n'est lue en
     boucle. */
  useEffect(() => {
    const el = piste.current;
    if (!el) return;

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
  }, []);

  const horizontal = largeur >= RUPTURE;

  /* Les listes de ce composant sont purement positionnelles : le point i
     est le i-eme creneau de la soiree affichee, quelle que soit la soiree.
     La cle est donc le rang, et non l'heure. Avec une cle portant l'heure,
     React demontait puis remontait chaque cercle au changement de jour,
     puisque les heures different d'une soiree a l'autre : les transitions
     cx, cy, left, top et opacity ne jouaient jamais et les points
     sautaient d'une position a l'autre. */

  /* Geometrie. Un seul generateur pose le semis, et les heures se calent
     sur ses points : une heure occupe le rang d'un point de ligne, elle est
     seulement dessinee plus grosse. L'ecart reste donc constant sur toute la
     ligne, y compris autour des gros points.

     Les heures gardent leur repartition angulaire reguliere, qui reproduit
     l'ecart de 45 degres de la charte a cinq points ; c'est le calage sur le
     semis qui les arrondit au point le plus proche. */
  const { ligne, points, rangsHeure, boite } = useMemo(() => {
    if (horizontal) {
      const W = Math.max(largeur, 320);
      const rx = W / 2;
      const ry = H_ARC;
      const surLArc = (t: number) => ({
        x: rx + rx * Math.cos(t),
        y: MARGE + ry - ry * Math.sin(t),
      });

      /* La ligne va d'un bord a l'autre, les heures restent en retrait. */
      const { ligne, versRang } = semis(surLArc, Math.PI, 0);
      const haut = ((180 - RETRAIT) * Math.PI) / 180;
      const bas = (RETRAIT * Math.PI) / 180;

      const rangs = Array.from({ length: n }, (_, i) =>
        versRang(haut - (i / (n - 1)) * (haut - bas)),
      );
      const pts: Point[] = rangs.map((r, i) => ({
        ...ligne[r],
        angle: haut - (i / (n - 1)) * (haut - bas),
      }));

      return {
        ligne,
        points: pts,
        rangsHeure: new Set(rangs),
        boite: { w: W, h: MARGE + ry + GARDE },
      };
    }

    const Hc = Math.max(hauteurListe, 360);
    const ry = Hc / 2;
    const rx = BOMBE;
    const surLArc = (t: number) => ({ x: rx * Math.sin(t), y: ry - ry * Math.cos(t) });

    const { ligne, versRang } = semis(surLArc, 0, Math.PI);
    const haut = (RETRAIT * Math.PI) / 180;
    const bas = ((180 - RETRAIT) * Math.PI) / 180;

    const rangs = Array.from({ length: n }, (_, i) =>
      versRang(haut + (i / (n - 1)) * (bas - haut)),
    );
    const pts: Point[] = rangs.map((r, i) => ({
      ...ligne[r],
      angle: haut + (i / (n - 1)) * (bas - haut),
    }));

    return {
      ligne,
      points: pts,
      rangsHeure: new Set(rangs),
      boite: { w: rx + 2, h: Hc },
    };
  }, [horizontal, largeur, hauteurListe, n]);

  /* Le trace avance un peu plus vite que le defilement, pour que le
     dernier creneau soit atteint avant la fin de la piste et laisse le
     temps de le lire. */
  const avance = Math.min(1, progression * 1.12);

  /* Un point s'allume quand le trace l'a depasse. La position du point
     sur l'axe horizontal sert directement de seuil : le trace et les
     points ne peuvent pas se desynchroniser. */
  const atteint = (i: number) =>
    boite.w > 0 && avance >= points[i].x / boite.w - 0.005;

  const indexDefilement = points.reduce(
    (acc, _, i) => (atteint(i) ? i : acc),
    0,
  );

  /* Le survol reste prioritaire : le defilement pose l'etat, la souris
     permet d'aller lire un autre creneau sans remonter. */
  const courant = survole ?? indexDefilement;

  return (
    <div
      ref={piste}
      className="relative"
      /* Deux hauteurs d'ecran suffisent a reveler quatre ou cinq points.
         A trois, la course etait si longue que le trace paraissait s'arreter. */
      style={horizontal ? { height: "200vh" } : undefined}
    >
      <div
        className={
          horizontal
            /* justify-between, et non justify-center : centre, le bloc
               laissait tout l'espace libre en deux tas egaux en haut et en
               bas de l'ecran, si bien que le detail restait colle sous l'arc
               pendant qu'un vide s'accumulait sous le lien. Reparti, l'espace
               libre tombe dans les deux respirations qui en ont besoin,
               au-dessus et au-dessous de l'arc, et le bas se limite au
               rembourrage. Les trois groupes gardent leur cohesion interne
               par un gap fixe. */
            /* Le bloc s'epingle SOUS la barre de navigation, qui est elle
               meme collante et haute de 5rem : cale a top-0, le groupe haut
               passait derriere elle et le sur-titre disparaissait. La hauteur
               retranche donc la barre, et le bloc occupe exactement ce qui
               reste de l'ecran.

               La repartition de l'espace libre passe par trois cales, et non
               par justify-between : celui-ci versait TOUT le libre dans les
               deux respirations, ce qui poussait le selecteur et le detail
               trop bas. La troisieme cale, en bas, en reprend une part. Les
               poids ci-dessous sont le seul reglage de la composition. */
            ? "sticky top-20 flex h-[calc(100svh-5rem)] flex-col overflow-hidden py-6"
            : "flex flex-col gap-10 py-24"
        }
      >
      {/* Groupe haut : ce qui annonce la soiree. */}
      {enTete && <div className="contenu">{enTete}</div>}

      {horizontal && <div className="grow" aria-hidden />}

      {/* Groupe milieu : le selecteur et l'arc qu'il commande. Le selecteur
          appartient a l'arc, pas au titre : c'est lui qui choisit la soiree
          tracee. Groupe avec le titre, il s'en trouvait colle et separe de
          l'arc par toute la respiration flexible. */}
      <div className="flex flex-col gap-6">

      {/* Selecteur de jour, dans le gabarit de contenu. */}
      <div className="contenu">
        <div className="flex flex-wrap gap-x-8 gap-y-3" role="group" aria-label="Choisir une soirée">
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
              {s.onglet}
            </Bouton>
          ))}
        </div>
      </div>

      {/* L'arc. Il deborde du gabarit : bord a bord. */}
      <div ref={enveloppe} className="w-full">
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
                  sont sautes : le gros point les remplace, il ne s'y ajoute
                  pas. L'ecart reste donc celui du semis d'un bout a l'autre. */}
              <g className="text-filet" fill="currentColor">
                {ligne.map((p, k) =>
                  rangsHeure.has(k) ? null : (
                    <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />
                  ),
                )}
              </g>

              {/* La meme ligne, revelee par le defilement. Le devoilement
                  passe par un clip horizontal : aucune propriete de mise en
                  page n'est touchee, le rendu reste fluide. */}
              <g
                className="text-accent"
                fill="currentColor"
                style={{ clipPath: `inset(0 ${100 - avance * 100}% 0 0)` }}
              >
                {ligne.map((p, k) =>
                  rangsHeure.has(k) ? null : (
                    <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />
                  ),
                )}
              </g>

              {/* Les heures : des points du semis, simplement plus gros. */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={atteint(i) ? R_HEURE_ATTEINT : R_HEURE}
                  fill={creneaux[i].statut === "ouvert" ? "none" : "currentColor"}
                  stroke="currentColor"
                  strokeWidth={creneaux[i].statut === "ouvert" ? 2 : 0}
                  className={atteint(i) ? "text-accent" : "text-filet"}
                  style={{
                    transition:
                      "cx 420ms cubic-bezier(.22,.61,.24,1), cy 420ms cubic-bezier(.22,.61,.24,1), r 300ms cubic-bezier(.22,.61,.24,1)",
                  }}
                />
              ))}
            </svg>

            {/* Heures en HTML : selectionnables et correctement composees.
                Les extremites sont calees vers l'interieur pour ne pas
                etre coupees par le bord de la fenetre. */}
            <ul className="absolute inset-0">
              {points.map((p, i) => (
                <li
                  key={i}
                  className="absolute"
                  style={{
                    left: p.x,
                    top: p.y,
                    /* Tous les libelles sont centres sur leur point. Le
                       retrait angulaire rentre deja les points extremes
                       assez loin du bord pour qu'aucun ne soit rogne, ce
                       qui rend inutile l'ancrage decale d'autrefois : une
                       heure se lit au-dessus de son point, pas a cote.

                       Le retrait vertical suit le rayon, donc l'ecart au
                       bord du point ne bouge pas quand celui-ci grossit, et
                       la transition a la meme duree et la meme courbe que
                       celle du rayon : les deux se font en meme temps. */
                    transform: `translate(-50%, calc(-100% - ${
                      (atteint(i) ? R_HEURE_ATTEINT : R_HEURE) + ECART_LIBELLE
                    }px))`,
                    transition:
                      "left 420ms cubic-bezier(.22,.61,.24,1), top 420ms cubic-bezier(.22,.61,.24,1), transform 300ms cubic-bezier(.22,.61,.24,1)",
                  }}
                >
                  <Bouton
                    variante="nu"
                    onMouseEnter={() => setSurvole(i)}
                    onFocus={() => setSurvole(i)}
                    onMouseLeave={() => setSurvole(null)}
                    onBlur={() => setSurvole(null)}
                    className="num text-w-surtitre uppercase"
                    style={{
                      /* Plus d'opacite : --legende a 45% tombait a 1,73 de
                         contraste sur le fond clair, une heure a venir etait
                         illisible. L'etat se joue sur la couleur et sur le
                         corps, et les deux couleurs passent AA. */
                      color: atteint(i) ? "var(--accent)" : "var(--courant)",
                      fontSize: atteint(i) ? CORPS_HEURE_ATTEINT : CORPS_HEURE,
                      /* Meme duree et meme courbe que le rayon du point :
                         l'heure et son point grossissent d'un seul geste. */
                      transition:
                        "color 300ms cubic-bezier(.22,.61,.24,1), font-size 300ms cubic-bezier(.22,.61,.24,1)",
                    }}
                  >
                    {creneaux[i].heure}
                  </Bouton>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* Vertical : l'arc descend du bord haut au bord bas de la
             section, en bombant vers la droite. Les creneaux se lisent
             a droite de l'arc. */
          <div className="relative">
            <svg
              width={boite.w}
              height={boite.h}
              viewBox={`0 0 ${boite.w} ${boite.h}`}
              className="pointer-events-none absolute left-0 top-0"
              aria-hidden
            >
              {/* Meme regle qu'en horizontal : la ligne pose les points, les
                  heures occupent un rang du semis au lieu de s'y superposer. */}
              <g className="text-filet" fill="currentColor">
                {ligne.map((p, k) =>
                  rangsHeure.has(k) ? null : (
                    <circle key={k} cx={p.x} cy={p.y} r={R_LIGNE} />
                  ),
                )}
              </g>
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={R_HEURE_ATTEINT}
                  fill={creneaux[i].statut === "ouvert" ? "none" : "currentColor"}
                  stroke="currentColor"
                  strokeWidth={creneaux[i].statut === "ouvert" ? 2 : 0}
                  className="text-accent"
                />
              ))}
            </svg>

            <ol ref={liste} className="relative">
              {creneaux.map((c, i) => (
                <li
                  key={i}
                  className="flex min-h-[120px] flex-col justify-center"
                  style={{ paddingLeft: points[i] ? points[i].x + 28 : 40, paddingRight: 24 }}
                >
                  <p className="num text-w-surtitre uppercase text-accent">{c.heure}</p>
                  <p className="mt-2 text-w-courant text-encre">{c.intitule}</p>
                  {c.statut === "ouvert" && (
                    <p className="mt-1.5 text-w-surtitre uppercase text-accent">
                      Créneau ouvert
                    </p>
                  )}
                  {c.detail && (
                    <p className="mt-2 max-w-[46ch] text-w-legende text-texte-courant">
                      {c.detail}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Detail du creneau courant. Hauteur fixe, aucun saut de page.
          Desktop uniquement : en vertical, le detail est deja dans la liste.
          Il fait partie du groupe milieu : dates, arc et detail ne forment
          qu'un bloc, sans respiration entre eux. */}
      {horizontal && (
        <div className="contenu">
          <div className="relative min-h-[124px] max-w-[60ch]">
            {creneaux.map((c, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: i === courant ? 1 : 0,
                  transform: `translateY(${i === courant ? 0 : 10}px)`,
                  transition:
                    "opacity 380ms cubic-bezier(.22,.61,.24,1), transform 380ms cubic-bezier(.22,.61,.24,1)",
                  pointerEvents: "none",
                }}
                aria-hidden={i !== courant}
              >
                {/* L'heure quitte l'echelon sur-titre : a 11px sous un intitule
                    de 30px, elle ne pesait plus rien. Elle se pose a 16px en
                    700, la graisse que la charte page 8 reserve aux sur-titres
                    lettres, et garde son interlettrage lettre et l'accent.
                    Passee un temps a 22px en 900, elle rivalisait avec
                    l'intitule : elle n'est qu'une amorce, elle annonce le
                    creneau, elle ne le nomme pas.
                    `leading-none` la retient : a l'interligne du courant, 1,7,
                    le bloc depassait sa hauteur fixe et poussait la mise en
                    page. La mention qui la suit reprend l'echelon sur-titre
                    pour elle seule, sans quoi elle grossissait avec l'heure. */}
                <p className="num text-[1rem] font-bold uppercase leading-none tracking-[0.16em] text-accent">
                  {c.heure}
                  {c.statut === "ouvert" && (
                    <span className="ml-4 text-w-surtitre text-legende">Créneau ouvert</span>
                  )}
                </p>
                <p className="mt-3 text-d-sous-titre text-encre">{c.intitule}</p>
                {c.detail && (
                  <p className="mt-3 text-w-legende text-texte-courant">{c.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      </div>

      {/* Cale basse, de meme poids que la haute : les deux respirations sont
          egales, le groupe milieu tombe donc au centre exact de ce qui reste
          entre le titre et le lien de fin. */}
      {horizontal && <div className="grow" aria-hidden />}

      {pied && <div className="contenu">{pied}</div>}
      </div>
    </div>
  );
}
