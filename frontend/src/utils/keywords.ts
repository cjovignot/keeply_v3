// frontend/utils/keywords.ts

export const KEYWORDS = [
  // 🏠 Pièces
  "salon",
  "chambre",
  "cuisine",
  "salle de bain",
  "bureau",
  "garage",
  "cave",
  "grenier",

  // 📦 Types d’objets
  "livres",
  "vêtements",
  "vaisselle",
  "outils",
  "documents",
  "électronique",
  "jouets",
  "meubles",

  // 🧳 Catégories utiles
  "fragile",
  "important",
  "à trier",
  "don",
  "à jeter",
] as const;

/**
 * 🔍 Retourne les mots-clés correspondant à une recherche
 */
export const searchKeywords = (query: string, limit = 6): string[] => {
  if (!query.trim()) return [];

  const q = query.toLowerCase();

  return KEYWORDS.filter((k) => k.toLowerCase().includes(q)).slice(0, limit);
};
