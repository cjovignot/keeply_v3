// api/auth/me.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "../utils/db";
import { User } from "../models/User";
import { safeUser } from "../utils/safeUser";
import jwt from "jsonwebtoken";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(payload._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user: safeUser(user) });
  } catch (err: any) {
    console.error("❌ /api/auth/me error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
