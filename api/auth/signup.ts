import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { authLimiter } from "../middlewares/authLimiter";
import { findUserByEmail, createUser } from "../controllers/userController";
import { safeUser } from "../utils/safeUser";

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

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await authLimiter(req, res); // si ta fonction supporte req,res Vercel

    const { name, email, password } = signupSchema.parse(req.body);
    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const user = await createUser({
      name,
      email,
      password,
      provider: "local",
      role: "user",
    });
    sendTokenCookie(res, user);

    res.status(201).json({ message: "Utilisateur créé", user: safeUser(user) });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
