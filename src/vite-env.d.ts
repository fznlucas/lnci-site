/// <reference types="vite/client" />

// injectées au build, voir .env.example
interface ImportMetaEnv {
  /** api des formulaires ; vide = pas d'envoi */
  readonly VITE_API_URL?: string;
  /** vide = liens linkedin masqués */
  readonly VITE_LINKEDIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
