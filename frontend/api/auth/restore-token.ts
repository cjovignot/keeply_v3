import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const cookies = req.headers.cookie?.split("; ") || [];
  const restore = cookies.find((c) => c.startsWith("restoreToken="));

  if (!restore) {
    return res.status(404).json({ message: "Aucun restoreToken trouvé" });
  }

  const token = restore.split("=")[1];

  res.setHeader(
    "Set-Cookie",
    [
      `token=${token}; HttpOnly; Path=/; ${
        process.env.NODE_ENV === "production"
          ? "Secure; SameSite=None"
          : "SameSite=Lax"
      }`,
      // supprimer restoreToken
      `restoreToken=; Max-Age=0; Path=/; ${
        process.env.NODE_ENV === "production"
          ? "Secure; SameSite=None"
          : "SameSite=Lax"
      }`,
    ]
  );

  res.status(200).json({ message: "Token restauré" });
}