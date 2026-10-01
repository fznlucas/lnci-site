/**
 * La ligne d'horizon. Charte page 9.
 *
 * Une bande de fond qui coupe un mot en capitales, a 58 pour cent de sa
 * hauteur. Reservee aux mots cles, jamais a une phrase. Le geste existe
 * dans la charte et n'etait employe nulle part.
 */
export function MotHorizon({ children }: { children: string }) {
  return (
    <span className="relative inline-block uppercase">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="bg-nuit absolute inset-x-[-0.06em] z-20"
        style={{ top: "58%", height: "0.085em" }}
      />
    </span>
  );
}
