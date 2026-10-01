/// <reference types="vite/client" />

/**
 * Variables d'environnement publiques du site (prefixe VITE_), injectees
 * au build. Voir .env.example.
 */
interface ImportMetaEnv {
  /** Adresse de l'API des formulaires, sans barre finale. Vide : pas d'envoi. */
  readonly VITE_API_URL?: string;
  /** Page LinkedIn de l'evenement. Vide : liens LinkedIn masques. */
  readonly VITE_LINKEDIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
