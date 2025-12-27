import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSavedToken, deleteSavedToken } from "./tokenStore";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // Clé unique pour retrouver le token
  const rawKey =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "default";
  const restoreKey = Array.isArray(rawKey) ? rawKey[0] : rawKey;

  const token = getSavedToken(restoreKey);
  if (!token) {
    return res.status(404).json({ message: "Token sauvegardé introuvable" });
  }

  // Réinjecter le token dans le cookie HttpOnly
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );

  // Supprimer le token temporaire côté serveur
  deleteSavedToken(restoreKey);

  res.status(200).json({ message: "Token restauré" });
}
