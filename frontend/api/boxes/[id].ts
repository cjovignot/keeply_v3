import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Types } from "mongoose";
import { connectDB } from "../utils/db";
import { Box } from "../models/Box";
import { updateStorageById } from "../controllers/storageController";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  const id = (req.params?.id || req.query?.id) as string;
  if (!id || Array.isArray(id) || !Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "ID invalide" });

  if (req.method === "GET") {
    try {
      const box = await Box.findById(id);
      if (!box) return res.status(404).json({ error: "Boîte introuvable" });
      res.json(box);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedBox = await Box.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedBox)
        return res.status(404).json({ error: "Boîte introuvable" });
      res.json(updatedBox);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else if (req.method === "DELETE") {
    try {
      const box = await Box.findById(id);
      if (!box) return res.status(404).json({ error: "Boîte introuvable" });

      await Box.findByIdAndDelete(id);

      if (box.storageId) {
        await updateStorageById(box.storageId.toString(), {
          $pull: { boxes: box._id },
        });
      }

      res.json({ message: "Boîte supprimée et retirée de l’entrepôt" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
