// api/auth/login.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { connectDB } from "../utils/db";
import { User } from "../models/User";
import { safeUser } from "../utils/safeUser";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const sendTokenCookie = (res: VercelResponse, user: any) => {
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );

  return token;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user || user.provider === "google") {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const isValid = await bcrypt.compare(password, user.password!);
    if (!isValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    sendTokenCookie(res, user);

    res.json({ message: "Connexion réussie", user: safeUser(user) });
  } catch (err: any) {
    console.error("❌ /api/auth/login error:", err);
    res.status(400).json({ message: err.message });
  }
}
