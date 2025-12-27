import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const cookies = req.headers.cookie?.split("; ") || [];
  const tokenCookie = cookies.find((c) => c.startsWith("token="));

  if (!tokenCookie) {
    return res.status(400).json({ message: "Aucun token trouvé" });
  }

  const token = tokenCookie.split("=")[1];

  res.setHeader(
    "Set-Cookie",
    `restoreToken=${token}; HttpOnly; Path=/; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );

  res.status(200).json({ message: "Token de restauration sauvegardé" });
}