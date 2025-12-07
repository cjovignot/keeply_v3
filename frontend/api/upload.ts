import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Multer in memory
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// Convert buffer to stream
const bufferToStream = (buffer: Buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // @ts-ignore
  upload(req, res, async (err: any) => {
    if (err) return res.status(500).json({ error: err.message });

    // @ts-ignore
    const file = req.file;
    if (!file) return res.status(400).json({ error: "Aucun fichier reçu" });

    try {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "boxes" },
        (error, result) => {
          if (error) return res.status(500).json({ error });
          res.json({ url: result?.secure_url });
        }
      );

      bufferToStream(file.buffer).pipe(stream);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
}
