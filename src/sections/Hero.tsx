import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Bouton } from "@/components/ui/Bouton";

/**
 * Separateur de la date, dans la premiere cellule du bandeau.
 *
 * Le point median du clavier ne convenait pas : il est petit, il prend la
 * couleur du texte, et sa position comme son dessin dependent de la fonte.
 * Celui-ci est un element a lui seul, rond, plein, en accent.
 *
 * Le calage vertical n'est pas laisse a `vertical-align: middle`, qui vise le
 * milieu de la hauteur d'x : les chiffres de la fonte sont alignes sur la
 * capitale, ils montent donc bien plus haut et le point tombait sous leur
 * milieu. Un element vide en inline-block a sa ligne de base sur son bord
 * bas ; pour que son CENTRE se pose au centre optique des chiffres, son bord
 * bas doit monter de la moitie de la capitale, moins son propre rayon.
 */
/* Hauteur de capitale de Schibsted Grotesk, en em. Mesuree sur la fonte
   reellement servie, via actualBoundingBoxAscent, et non estimee : a 0,7
   le point tombait 0,4px sous le centre des chiffres a 48px de corps. */
const CAP = 0.7168;
/* Diametre du point, en em, donc solidaire du corps de la ligne.

   Le point ne porte aucune marge : son diametre EST l'intervalle entre
   deux chiffres. Les deux reglages n'en font donc qu'un, et le contact
   avec les chiffres ne depend pas de la valeur choisie, seulement de
   l'approche des glyphes. Grossir le point ecarte les chiffres d'autant
   sans jamais ouvrir de jour ; le retrecir les rapproche, toujours au
   contact.

   Plafond a ne pas franchir : CAP. Au dela, le point serait plus haut
   que les chiffres qu'il separe, ce qui n'est pas un separateur mais
   une puce. */
const DIAMETRE = 0.28;

function PointDate() {
  return (
    <span
      aria-hidden
      className="rounded-pastille bg-accent inline-block"
      style={{
        width: `${DIAMETRE}em`,
        height: `${DIAMETRE}em`,
        /* Aucune marge : l'intervalle est porte par le seul diametre. */
        verticalAlign: `${CAP / 2 - DIAMETRE / 2}em`,
      }}
    />
  );
}

/**
 * La date, sur une seule ligne, au corps commun du bandeau.
 *
 * Elle ne prend plus de corps ni de graisse a elle : les quatre cellules
 * recoivent le meme traitement typographique, celui du <dt>. Seule reste la
 * chasse proportionnelle, qui ne touche pas au corps mais au dessin des
 * chiffres, et les points, dont le diametre est en em et suit donc le corps
 * de la ligne.
 */
function ValeurDate() {
  return (
    /* `proportional-nums` annule le tabulaire herite de `.num`, porte par le
       <dt>. En chasse fixe, le "1" de Schibsted Grotesk prend un pied
       horizontal qui remplit sa gouttiere : correct dans une colonne de
       valeurs comparables, deplace sur une date isolee, ou il se lit comme
       une serif egaree. Le tabulaire reste partout ailleurs, notamment sur
       les horaires de l'arc et du programme, qui s'alignent vraiment. */
    <span className="proportional-nums">
      12
      <PointDate />
      13
      <PointDate />
      14 novembre 2026
    </span>
  );
}

/**
 * Hero institutionnel.
 *
 * Pas de photographie, pas de plein ecran, pas d'effet. La surface est
 * tenue par la typographie et par un tableau de faits. C'est la
 * structure des pages de societes de gestion : une phrase de
 * positionnement, puis immediatement des donnees verifiables.
 *
 * Le titre est en grotesque, corps large, graisse 700. Charte page 8 :
 * une seule famille, la hierarchie se joue sur les graisses.
 */
export function Hero() {
  /* Les cellules 2 et 4 s'ecartent de deux regles fermes de CONVENTIONS.md,
     sur demande explicite : "aucun chiffre d'audience previsionnel sur le
     site" pour le +600, et le vocabulaire dedouble qui reserve "hackathon" a
     la page de candidature etudiante et impose ailleurs "competition
     d'analyse d'investissement". Ne pas les remettre en conformite sans
     redemander : ce n'est pas un oubli. */
  const faits: [valeur: ReactNode, libelle: string][] = [
    [<ValeurDate key="date" />, "Trois soirées consécutives"],
    ["+600", "Participants attendus"],
    ["Professionnels", "Fonds, conseils, dirigeants, banquiers"],
    ["Hackathon", "Remise des prix en clôture"],
  ];

  return (
    <section className="bg-nuit text-sur-nuit">
      <div className="contenu">
        <div className="grid gap-x-6 gap-y-12 pt-20 pb-16 lg:grid-cols-12 lg:pt-28 lg:pb-20">
          <div className="lg:col-span-7">
            <p className="text-w-surtitre text-accent-clair uppercase">Édition Lyon 2026</p>
            <h1 className="lg:text-d-hero mt-8 max-w-[15ch] text-[2.5rem] leading-[1.06] font-extrabold tracking-[-0.02em] text-balance sm:text-[3rem]">
              Le rendez-vous annuel du capital investissement régional
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <p className="text-w-courant text-sur-nuit-body max-w-[42ch]">
              Trois soirées qui réunissent fonds d'investissement, banques d'affaires, conseils,
              dirigeants de PME et d'ETI autour de la création de valeur.
            </p>
            <p className="text-w-legende text-sur-nuit-legende mt-5 max-w-[46ch]">
              Sous l'égide de Lyon Place Financière.
            </p>
            {/* Pleine largeur sur mobile, en ligne des sm. Le gap de 12px
                et la hauteur de 40px ne bougent pas d'un cas a l'autre. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Bouton to="/reserver" className="w-full sm:w-auto">
                Réserver sa place
              </Bouton>
              <Bouton
                variante="secondaire"
                ton="nuit"
                to="/partenaires"
                className="w-full sm:w-auto"
              >
                Devenir partenaire
              </Bouton>
            </div>
          </div>
        </div>

        {/* Tableau de faits. Aucun total agrege, aucune projection. */}
        <dl className="border-sur-nuit/20 grid border-t border-dotted sm:grid-cols-2 lg:grid-cols-4">
          {faits.map(([valeur, libelle], i) => (
            <div
              key={libelle}
              /* Une colonne : filet haut sauf sur la premiere. Deux colonnes :
                 filet gauche sur les rangs impairs, filet haut sur la seconde
                 rangee. Quatre colonnes : filet gauche partout sauf la
                 premiere, aucun filet haut. */
              className={cn(
                "border-sur-nuit/20 border-dotted py-8 sm:pr-8",
                i === 1 && "border-t sm:border-t-0 sm:border-l sm:pl-8",
                i === 2 && "border-t lg:border-t-0 lg:border-l lg:pl-8",
                i === 3 && "border-t sm:border-l sm:pl-8 lg:border-t-0",
              )}
            >
              <dt className="num text-sur-nuit text-[1.5rem] leading-none font-extrabold">
                {valeur}
              </dt>
              <dd className="text-w-legende text-sur-nuit-legende mt-2.5 max-w-[26ch]">
                {libelle}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
