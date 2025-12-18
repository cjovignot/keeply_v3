// frontend/utils/keywords.ts

/** 🔑 Liste des mots-clés classés par catégorie */
export const KEYWORDS = {
  /** 📍 Lieux / pièces */
  location: [
    // Intérieur
    "salon",
    "chambre",
    "chambre enfant",
    "cuisine",
    "salle de bain",
    "toilettes",
    "bureau",
    "entrée",
    "couloir",
    "dressing",

    // Rangements
    "garage",
    "cave",
    "grenier",
    "cellier",
    "buanderie",
    "placard",

    // Extérieur
    "balcon",
    "terrasse",
    "jardin",
    "abri de jardin",
  ] as const,

  /** 📦 Objets / contenu */
  item: [
    // Général
    "livres",
    "documents",
    "papiers",
    "archives",
    "photos",
    "souvenirs",

    // Vêtements
    "vêtements",
    "chaussures",
    "manteaux",
    "linge",
    "linge de maison",

    // Cuisine
    "vaisselle",
    "verres",
    "casseroles",
    "ustensiles",
    "électroménager",
    "petit électroménager",

    // Maison
    "meubles",
    "décoration",
    "cadres",
    "lampes",
    "rideaux",
    "tapis",

    // Bricolage
    "outils",
    "bricolage",
    "visserie",
    "peinture",
    "matériel électrique",

    // Loisirs
    "jouets",
    "jeux",
    "jeux de société",
    "jeux vidéo",
    "livres enfants",
    "sport",
    "musique",

    // Tech
    "électronique",
    "informatique",
    "câbles",
    "chargeurs",
    "ordinateur",
    "écran",

    // Catégories / états
    "fragile",
    "important",
    "urgent",
    "à trier",
    "à donner",
    "à vendre",
    "à jeter",
    "à conserver",
  ] as const,
} as const;

export type KeywordCategory = keyof typeof KEYWORDS;

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * 🔍 Retourne les mots-clés correspondant à une recherche
 * @param query Texte saisi par l'utilisateur
 * @param category Catégorie de mots-clés à utiliser
 * @param limit Nombre maximum de suggestions
 */
export const searchKeywords = (
  query: string,
  category: keyof typeof KEYWORDS = "item",
  limit = 6
): string[] => {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const words = KEYWORDS[category];

  const scored = words
    .map((word) => {
      const lower = word.toLowerCase();

      if (lower.startsWith(q)) return { word, score: 100 };
      const parts = lower.split(" ");
      if (parts.some((p) => p.startsWith(q))) return { word, score: 75 };
      const idx = lower.indexOf(q);
      if (idx >= 0) return { word, score: 50 - idx };

      return { word, score: 0 };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ word }) => capitalize(word)); // 👈 MAJUSCULE ICI

  return scored.slice(0, limit);
};
