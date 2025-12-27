import type { VercelRequest, VercelResponse } from "@vercel/node";
import { saveToken } from "./tokenStore";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const cookies = req.headers.cookie?.split("; ") || [];
  const tokenCookie = cookies.find((c) => c.startsWith("token="));

  if (!tokenCookie) {
    return res
      .status(400)
      .json({ message: "Aucun token trouvé à sauvegarder" });
  }

  const token = tokenCookie.split("=")[1];

  // Clé unique par IP / session
  const rawKey =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "default";
  const restoreKey = Array.isArray(rawKey) ? rawKey[0] : rawKey;

  // Sauvegarde côté serveur
  saveToken(restoreKey, token);

  res
    .status(200)
    .json({ message: "Token sauvegardé côté serveur", restoreKey });
}
