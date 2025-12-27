// api/auth/stop-demo.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Set-Cookie",
    `demo_token=; HttpOnly; Path=/; Max-Age=0; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );

  res.json({ message: "Tutoriel terminé, demo_token supprimé" });
}
