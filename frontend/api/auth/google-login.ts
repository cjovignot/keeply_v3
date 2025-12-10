export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- CORS ---
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL!);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDB();

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

    const createJwt = (userId: string) =>
      jwt.sign({ _id: userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Web classique → cookie
    if (!isPWA) {
      res.setHeader(
        "Set-Cookie",
        `token=${createJwt(user._id.toString())}; HttpOnly; Path=/; Max-Age=${
          7 * 24 * 60 * 60
        }; Secure; SameSite=None`
      );
    }

    // PWA → token en JSON
    res.json({
      user: safeUser(user),
      token: isPWA ? createJwt(user._id.toString()) : undefined,
    });
  } catch (err) {
    console.error("❌ Google login error:", err);
    res.status(500).json({ error: "Erreur lors du login Google." });
  }
}