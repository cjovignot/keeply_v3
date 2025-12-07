import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "../utils/db";
import {
  createStorage,
  findAllStorages,
} from "../controllers/storageController";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { ownerId } = req.query;
      const storages = await findAllStorages(ownerId as string | undefined);
      res.json(storages);
    } catch (err) {
      console.error("❌ Erreur récupération entrepôts :", err);
      res.status(500).json({ error: "Erreur serveur." });
    }
  } else if (req.method === "POST") {
    try {
      const { name, address, ownerId } = req.body;
      if (!name || !ownerId)
        return res.status(400).json({ error: "Nom et ownerId requis." });

      const storage = await createStorage({ name, address, ownerId });
      res.status(201).json({ message: "✅ Entrepôt créé", storage });
    } catch (err) {
      console.error("Erreur création entrepôt :", err);
      res.status(500).json({ error: "Erreur serveur." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
