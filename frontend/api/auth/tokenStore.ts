// utils/tokenStore.ts
// Stockage temporaire côté serveur (en mémoire)
const savedTokens: Record<string, string> = {};

/**
 * Sauvegarder un token avec une clé unique
 */
export const saveToken = (key: string, token: string) => {
  savedTokens[key] = token;
};

/**
 * Récupérer un token sauvegardé
 */
export const getSavedToken = (key: string) => savedTokens[key];

/**
 * Supprimer un token sauvegardé
 */
export const deleteSavedToken = (key: string) => {
  delete savedTokens[key];
};
