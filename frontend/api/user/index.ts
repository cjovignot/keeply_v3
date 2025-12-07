import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "../utils/db";
import { findAllUsers, createUser } from "../controllers/userController";
import { safeUser } from "../utils/safeUser";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

// ------------------------
// Fonctions Auth
// ------------------------
const getUserFromToken = async (req: VercelRequest) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) return null;
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(payload._id);
    return user;
  } catch {
    return null;
  }
};

const checkAuth = async (req: VercelRequest, res: VercelResponse) => {
  const user = await getUserFromToken(req);
  if (!user) {
    res.status(401).json({ error: "Non authentifié" });
    return null;
  }
  return user;
};

const checkAdmin = (user: any, res: VercelResponse) => {
  if (user.role !== "admin") {
    res.status(403).json({ error: "Admin requis" });
    return false;
  }
  return true;
};

// ------------------------
// Handler principal
// ------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  try {
    switch (req.method) {
      // GET /api/user — tous les utilisateurs (admin seulement)
      case "GET": {
        const authUser = await checkAuth(req, res);
        if (!authUser) return;
        if (!checkAdmin(authUser, res)) return;

        const users = await findAllUsers();
        return res.json(users.map(safeUser));
      }

      // POST /api/user — création utilisateur (admin)
      case "POST": {
        const authUser = await checkAuth(req, res);
        if (!authUser) return;
        if (!checkAdmin(authUser, res)) return;

        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ error: "Champs requis manquants." });
        }

        const user = await createUser({
          name,
          email,
          password,
          role: role || "user",
        });

        return res
          .status(201)
          .json({
            message: "Utilisateur créé par admin",
            user: safeUser(user),
          });
      }

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err: any) {
    console.error("Erreur user index handler:", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
}
