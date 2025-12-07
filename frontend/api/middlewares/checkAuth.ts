import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { safeUser } from "../utils/safeUser";

// ⚠️ Cette fonction retourne le user si authentifié, ou envoie la réponse 401 sinon
export const checkAuth = async (req: VercelRequest, res: VercelResponse) => {
  let token: string | undefined;

  // 🔹 Cookie (VercelRequest ne parse pas automatiquement les cookies, il faut un parseur)
  const cookieHeader = req.headers.cookie || "";
  const cookies: Record<string, string> = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...vals] = c.trim().split("=");
      return [key, vals.join("=")];
    })
  );
  token = cookies.token;

  // 🔹 Authorization Bearer
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ error: "Non authentifié." });
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).json({ error: "Utilisateur non trouvé" });
      return null;
    }

    return safeUser(user); // retourne le user pour le handler serverless
  } catch (err) {
    res.status(401).json({ error: "Token invalide." });
    return null;
  }
};
