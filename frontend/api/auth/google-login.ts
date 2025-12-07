import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { User } from "../models/User";
import { safeUser } from "../utils/safeUser";

const googleClient = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { token, isPWA } = req.body;
    if (!token)
      return res.status(400).json({ error: "Token Google manquant." });

    let id_token = token;

    if (isPWA) {
      const tokenRes = await axios.post(
        "https://oauth2.googleapis.com/token",
        new URLSearchParams({
          code: token,
          client_id: process.env.VITE_GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri: "postmessage",
          grant_type: "authorization_code",
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      id_token = tokenRes.data.id_token;
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: id_token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload)
      return res.status(400).json({ error: "Token Google invalide." });

    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user)
      user = await User.create({
        email,
        name,
        googleId,
        avatar: picture,
        provider: "google",
      });

    if (!isPWA) {
      const cookieToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      res.setHeader(
        "Set-Cookie",
        `token=${cookieToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; ${
          process.env.NODE_ENV === "production"
            ? "Secure; SameSite=None"
            : "SameSite=Lax"
        }`
      );
    }

    const pwaToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    res.json({ user: safeUser(user), token: isPWA ? pwaToken : undefined });
  } catch (err) {
    console.error("❌ Google login error:", err);
    res.status(500).json({ error: "Erreur lors du login Google." });
  }
}
