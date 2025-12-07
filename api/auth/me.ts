import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAuth } from "../middlewares/checkAuth";
import { User } from "../models/User";
import { safeUser } from "../utils/safeUser";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const user = await checkAuth(req, res); // ⚠️ checkAuth doit retourner le user
    if (!user) return; // checkAuth s'occupe de la réponse si non authentifié

    let userFull;
    if (user._id) userFull = await User.findById(user._id);

    res.json({ user: userFull ? safeUser(userFull) : user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
