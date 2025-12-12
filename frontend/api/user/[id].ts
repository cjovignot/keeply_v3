import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "../utils/db";
import { User } from "../models/User";
import {
  findUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";
import { safeUser } from "../utils/safeUser";
import jwt from "jsonwebtoken";

// ------------------------
// Fonctions Auth
// ------------------------
const getUserFromToken = async (req: VercelRequest | any) => {
  // 1️⃣ Récupération sécurisée du token
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.token ||
    (authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null);

  if (!token) return null;

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(payload._id);
    return user || null;
  } catch (err) {
    console.error("Invalid token:", err);
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

// ------------------------
// Handler principal
// ------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();
  const id = (req.params?.id || req.query?.id) as string;
  if (!id || typeof id !== "string")
    return res.status(400).json({ error: "ID requis" });

  try {
    switch (req.method) {
      // GET /api/user/:id
      case "GET": {
        const authUser = await checkAuth(req, res);
        if (!authUser) return;

        const user = await User.findById(id);
        if (!user)
          return res.status(404).json({ error: "Utilisateur non trouvé" });
        return res.json(user);
      }

      // PATCH /api/user/:id
      case "PATCH": {
        const authUser = await checkAuth(req, res);
        if (!authUser) return;

        const updates = req.body;
        const allowedFields = [
          "name",
          "email",
          "picture",
          "provider",
          "password",
          "printSettings",
        ];
        const allowedUpdates: any = {};
        allowedFields.forEach((key) => {
          if (updates[key] !== undefined) allowedUpdates[key] = updates[key];
        });

        if (updates.role && authUser.role === "admin")
          allowedUpdates.role = updates.role;

        const userToUpdate = await findUserById(id);
        if (!userToUpdate)
          return res.status(404).json({ error: "Utilisateur introuvable." });

        if (authUser.role !== "admin" && authUser._id.toString() !== id) {
          return res.status(403).json({ error: "Accès refusé." });
        }

        const updatedUser = await updateUserById(id, allowedUpdates);
        return res.json({
          message: "Utilisateur mis à jour",
          user: safeUser(updatedUser!),
        });
      }

      // DELETE /api/user/:id
      case "DELETE": {
        const authUser = await checkAuth(req, res);
        if (!authUser) return;

        const userToDelete = await findUserById(id);
        if (!userToDelete)
          return res.status(404).json({ error: "Utilisateur introuvable." });

        if (authUser.role !== "admin" && authUser._id.toString() !== id) {
          return res.status(403).json({ error: "Accès refusé." });
        }

        await deleteUserById(id);
        return res.json({ message: "Utilisateur supprimé" });
      }

      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err: any) {
    console.error("Erreur user [id] handler:", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
}
