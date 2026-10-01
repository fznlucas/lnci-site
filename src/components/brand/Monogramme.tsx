type Props = {
  /** Hauteur en pixels. La largeur suit le rapport 88 sur 84 de la charte. */
  taille?: number;
  className?: string;
  titre?: string;
};

/**
 * Monogramme des Nuits du Capital Investissement.
 *
 * Construction, charte page 4 : boite 88 par 84, futs de 17, coupe de 6
 * centree a 58 pour cent de la hauteur du glyphe. Le trace inclut la coupe,
 * il n'y a donc ni masque ni calque a gerer.
 *
 * La couleur se pilote en CSS via currentColor. Ne jamais deformer,
 * incliner, remplir d'un degrade ni ajouter d'ombre. Charte page 6.
 */
export function Monogramme({ taille = 24, className, titre }: Props) {
  return (
    <svg
      viewBox="0 0 88 84"
      height={taille}
      width={(taille * 88) / 84}
      fill="currentColor"
      role={titre ? "img" : "presentation"}
      aria-label={titre}
      aria-hidden={titre ? undefined : true}
      className={className}
    >
      <path d="M17 84 L17 51.72 L0 51.72 L0 84 Z M17 25.846 L35.454 45.72 L59.454 45.72 L17 0 L0 0 L0 45.72 L17 45.72 Z M71 84 L88 84 L88 51.72 L71 51.72 L71 58.154 L65.026 51.72 L41.026 51.72 Z M88 0 L71 0 L71 45.72 L88 45.72 Z" />
    </svg>
  );
}
