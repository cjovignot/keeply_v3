// api/auth/save-token.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Pour stockage temporaire côté serveur
// 🔹 Ici un simple objet en mémoire, en prod tu utiliserais Redis ou DB
const savedTokens: Record<string, string> = {};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // 🔹 Récupérer le cookie token existant
  const cookies = req.headers.cookie?.split("; ") || [];
  const tokenCookie = cookies.find((c) => c.startsWith("token="));
  if (tokenCookie) {
    const token = tokenCookie.split("=")[1];

    // 🔹 Stockage temporaire avec un identifiant unique (par ex. IP ou session)
    const rawKey =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "default";
    const restoreKey = Array.isArray(rawKey) ? rawKey[0] : rawKey; // si tableau, prendre le premier élément
    savedTokens[restoreKey] = token;

    res
      .status(200)
      .json({ message: "Token sauvegardé côté serveur", restoreKey });
  } else {
    res.status(400).json({ message: "Aucun token trouvé à sauvegarder" });
  }
}

// 🔹 Fonction utilitaire pour récupérer le token sauvegardé
export const getSavedToken = (restoreKey: string) => savedTokens[restoreKey];
export const deleteSavedToken = (restoreKey: string) => {
  delete savedTokens[restoreKey];
};
