import { Halo } from "@/components/brand/Halo";
import { TitreBicolore } from "@/components/brand/TitreBicolore";
import { Bouton, type Ton } from "@/components/ui/Bouton";
import { LogoPartenaire } from "@/components/ui/LogoPartenaire";
import { Pastille } from "@/components/ui/Pastille";
import { EVENEMENT } from "@/data/evenement";
import { page } from "@/data/pages";
import { LOGOS_PARTENAIRES, MUR, OBJET_PLAQUETTE } from "@/data/partenaires";
import { cn } from "@/lib/cn";
import { ACCENT, COURANT, FILET, FOND, PLEIN } from "@/lib/tons";

// figma : site / partenaires (mur), ton clair sur l'accueil, nuit sur /partenaires
// plaques toujours blanches, bordure seulement sur fond clair
export function MurPartenaires({
  ton = "clair",
  actionPrincipale,
}: {
  ton?: Ton;
  /** sur /partenaires, "devenir partenaire" renverrait à la page elle-même */
  actionPrincipale?: { libelle: string; to: string };
}) {
  const partenaires = page("partenaires");
  const principale =
    actionPrincipale ??
    (partenaires ? { libelle: MUR.actions.partenaire, to: partenaires.chemin } : undefined);
  const plaquette = `mailto:${EVENEMENT.email}?subject=${encodeURIComponent(OBJET_PLAQUETTE)}`;

  return (
    <section className={cn("rythme-section relative overflow-hidden", FOND[ton])}>
      <Halo
        ton={ton}
        taille={726}
        style={{ left: -161, top: "50%", transform: "translateY(-50%)" }}
      />

      <div className="contenu relative flex flex-col items-center gap-10 sm:gap-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-5">
            <Pastille ton={ton}>{MUR.pastille}</Pastille>
            <TitreBicolore ton={ton} attenue={MUR.titre.attenue} plein={MUR.titre.plein} />
          </div>
          <p className={cn("text-w-courant sm:text-w-chapeau max-w-[680px]", COURANT[ton])}>
            {MUR.chapeau}
          </p>
        </div>

        <ul className="flex w-full flex-wrap justify-center gap-3 sm:gap-4">
          {LOGOS_PARTENAIRES.map((logo) => (
            <li key={logo.id} className="h-20 w-[calc(50%-6px)] sm:h-[100px] sm:w-[185px]">
              <LogoPartenaire
                logo={logo}
                mur
                className={cn(
                  "rounded-carte h-full w-full",
                  ton === "clair" && "border-bordure border",
                )}
              />
            </li>
          ))}
        </ul>

        <ul className="grid w-full gap-6 sm:grid-cols-3">
          {MUR.benefices.map((b) => (
            <li
              key={b.surtitre}
              className={cn("flex flex-col gap-2 border-t border-dashed pt-5", FILET[ton])}
            >
              <p className={cn("text-w-surtitre uppercase", ACCENT[ton])}>{b.surtitre}</p>
              <p className={cn("text-w-courant", PLEIN[ton])}>{b.texte}</p>
            </li>
          ))}
        </ul>

        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
          {principale && (
            <Bouton to={principale.to} ton={ton} className="w-full sm:w-auto">
              {principale.libelle}
            </Bouton>
          )}
          <Bouton variante="secondaire" ton={ton} href={plaquette} className="w-full sm:w-auto">
            {MUR.actions.plaquette}
          </Bouton>
        </div>
      </div>
    </section>
  );
}
