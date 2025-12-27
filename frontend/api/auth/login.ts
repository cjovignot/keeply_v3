// api/auth/login.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { boolean, z } from "zod";
import { connectDB } from "../utils/db";
import { User } from "../models/User";
import { safeUser } from "../utils/safeUser";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  demo: z.boolean().optional(),
});

// ─────────────────────────────────────────────
// Génère un JWT avec les infos usuelles
// ─────────────────────────────────────────────
const createToken = (user: any) =>
  jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

// ─────────────────────────────────────────────
// Cookie pour utilisateur normal
// ─────────────────────────────────────────────
const sendUserCookie = (res: VercelResponse, token: string) => {
  res.appendHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );
};

// ─────────────────────────────────────────────
// Cookie spécifique au tutoriel (demo)
// ─────────────────────────────────────────────
const sendDemoCookie = (res: VercelResponse, token: string) => {
  res.appendHeader(
    "Set-Cookie",
    `demo_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { email, password, demo } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user || user.provider === "google") {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const isValid = await bcrypt.compare(password, user.password!);
    if (!isValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const token = createToken(user);

    if (demo === true) {
      // 🔥 Mode tutoriel → on pose le cookie demo_token
      sendDemoCookie(res, token);
    } else {
      // 🔥 Mode normal → cookie token standard
      sendUserCookie(res, token);
    }

    res.json({
      message: "Connexion réussie",
      user: safeUser(user),
      demo,
    });
  } catch (err: any) {
    console.error("❌ /api/auth/login error:", err);
    res.status(400).json({ message: err.message });
  }
}
