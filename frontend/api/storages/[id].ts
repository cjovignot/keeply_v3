import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Types } from "mongoose";
import { connectDB } from "../utils/db";
import {
  findStorageById,
  updateStorageById,
  deleteStorageById,
} from "../controllers/storageController";
import { Box } from "../models/Box";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  const id = (req.params?.id || req.query?.id) as string;
  if (!id || Array.isArray(id) || !Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  if (req.method === "GET") {
    try {
      const storage = await findStorageById(id);
      if (!storage)
        return res.status(404).json({ error: "Entrepôt introuvable." });
      res.json(storage);
    } catch (err) {
      console.error("❌ Erreur récupération entrepôt :", err);
      res.status(500).json({ error: "Erreur serveur." });
    }
  } else if (req.method === "PATCH") {
    try {
      const updates = req.body;
      const updatedStorage = await updateStorageById(id, updates);
      if (!updatedStorage)
        return res.status(404).json({ error: "Entrepôt introuvable." });
      res.json({ message: "✅ Entrepôt mis à jour", storage: updatedStorage });
    } catch (err) {
      console.error("Erreur mise à jour entrepôt :", err);
      res.status(500).json({ error: "Erreur serveur." });
    }
  } else if (req.method === "DELETE") {
    try {
      const storageId = new Types.ObjectId(id);

      const deleteResult = await Box.deleteMany({ storageId });
      const deletedStorage = await deleteStorageById(id);
      if (!deletedStorage)
        return res.status(404).json({ error: "Entrepôt introuvable." });

      res.json({
        message: `Entrepôt supprimé (${deleteResult.deletedCount} boîtes supprimées).`,
      });
    } catch (err) {
      console.error("Erreur suppression entrepôt :", err);
      res.status(500).json({ error: "Erreur serveur." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
