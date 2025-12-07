import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Set-Cookie",
    `token=; HttpOnly; Path=/; Max-Age=0; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );
  res.json({ message: "Déconnecté" });
}
