/**
 * keywords.ts
 * ============================================================
 * - Charge un dictionnaire texte (public/assets/dictionary.txt)
 * - Accepte tous les mots (input libre)
 * - Suggestions intelligentes (startsWith > includes)
 * - Enrichissement dynamique
 * ============================================================
 */

let dictionaryWords: string[] = [];
const dynamicWords = new Set<string>();
let dictionaryLoaded = false;

/**
 * Normalisation commune
 */
const normalize = (word: string) =>
  word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

/**
 * Chargement du dictionnaire (une seule fois)
 */
export const loadDictionary = async () => {
  if (dictionaryLoaded) return;

  try {
    const response = await fetch("/assets/dictionary.txt");
    if (!response.ok) throw new Error("Fichier dictionnaire introuvable");
    const text = await response.text();

    dictionaryWords = text
      .split("\n")
      .map((w) => normalize(w))
      .filter((w) => w.length > 1);

    dictionaryLoaded = true;
    console.log(`✅ Dictionnaire chargé (${dictionaryWords.length} mots)`);
  } catch (error) {
    console.error("❌ Impossible de charger le dictionnaire", error);
    dictionaryWords = [];
  }
};

/**
 * Ajout dynamique (objets utilisateur)
 */
export const addDynamicWords = (words: string[]) => {
  words.forEach((word) => {
    const clean = normalize(word);
    if (clean.length > 1) dynamicWords.add(clean);
  });
};

/**
 * Source globale unique
 */
const getAllWords = () =>
  Array.from(new Set([...dictionaryWords, ...dynamicWords]));

/**
 * 🔍 Recherche de suggestions
 * - retourne un tableau vide si dictionnaire pas encore chargé
 */
export const searchKeywords = (input: string, limit = 10): string[] => {
  if (!dictionaryLoaded) return []; // ⚠️ éviter les appels prématurés

  const query = normalize(input);
  if (query.length < 2) return [];

  const words = getAllWords();

  const startsWith = words.filter((w) => w.startsWith(query));
  const includes = words.filter((w) => !w.startsWith(query) && w.includes(query));

  return [...startsWith, ...includes].slice(0, limit);
};