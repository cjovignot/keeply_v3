import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Types } from "mongoose";
import QRCode from "qrcode";
import cloudinary from "cloudinary";
import { connectDB } from "../utils/db";
import { Box } from "../models/Box";
import { updateStorageById } from "../controllers/storageController";

cloudinary.v2.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { ownerId, storageId, ids } = req.query;
      const filter: any = {};

      if (ownerId) {
        filter.ownerId = Types.ObjectId.isValid(ownerId as string)
          ? new Types.ObjectId(ownerId as string)
          : ownerId;
      }

      if (storageId) {
        filter.storageId = Types.ObjectId.isValid(storageId as string)
          ? new Types.ObjectId(storageId as string)
          : storageId;
      }

      if (ids) {
        const idsArray = (ids as string)
          .split(",")
          .filter(Types.ObjectId.isValid)
          .map((id) => new Types.ObjectId(id));
        filter._id = { $in: idsArray };
      }

      const boxes = await Box.find(filter).sort({ createdAt: -1 });
      res.json(boxes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else if (req.method === "POST") {
    try {
      const { ownerId, storageId, destination, content, dimensions, fragile } =
        req.body;

      if (!ownerId)
        return res.status(400).json({ error: "ownerId est requis" });

      const ownerObjectId = Types.ObjectId.isValid(ownerId)
        ? new Types.ObjectId(ownerId)
        : ownerId;
      const storageObjectId =
        storageId && Types.ObjectId.isValid(storageId)
          ? new Types.ObjectId(storageId)
          : null;

      const userBoxes = await Box.find({ ownerId: ownerObjectId }).sort({
        createdAt: 1,
      });
      const nextNumber = (userBoxes.length + 1).toString().padStart(3, "0");
      const boxNumber = `BOX-${nextNumber}`;

      const newBox = new Box({
        ownerId: ownerObjectId,
        storageId: storageObjectId || null,
        number: boxNumber,
        fragile: fragile || false,
        destination: destination || "Inconnu",
        content: content || [],
        dimensions: {
          width: dimensions?.width || 0,
          height: dimensions?.height || 0,
          depth: dimensions?.depth || 0,
        },
      });

      const savedBox = await newBox.save();

      if (storageObjectId) {
        await updateStorageById(storageObjectId.toString(), {
          $addToSet: { boxes: savedBox._id },
        });
      }

      const boxURL = `${
        process.env.FRONTEND_URL || "https://scanmyboxes.app"
      }/box/${savedBox._id}`;
      const qrCodeDataURL = await QRCode.toDataURL(boxURL);

      const uploadResponse = await cloudinary.v2.uploader.upload(
        qrCodeDataURL,
        {
          folder: "scan-my-boxes/qrcodes",
          public_id: `qrcode_${savedBox._id}`,
          overwrite: true,
        }
      );

      savedBox.qrcodeURL = uploadResponse.secure_url;
      await savedBox.save();

      res.status(201).json(savedBox);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
