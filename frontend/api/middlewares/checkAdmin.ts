import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vérifie que l'utilisateur est authentifié et admin.
 * Si oui, retourne l'utilisateur pour que le handler puisse continuer.
 * Sinon, renvoie directement une réponse 401 ou 403.
 */
export const checkAdmin = (req: VercelRequest, res: VercelResponse) => {
  // req.user doit être défini par ton checkAuth adapté serverless
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ message: "Non authentifié" });
    return null;
  }

  if (user.role !== "admin") {
    res.status(403).json({ message: "Accès refusé : admin requis" });
    return null;
  }

  // tout est ok, retourne l'utilisateur pour le handler
  return user;
};
