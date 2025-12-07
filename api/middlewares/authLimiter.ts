import type { VercelRequest, VercelResponse } from "@vercel/node";

interface RateRecord {
  count: number;
  firstRequestAt: number;
}

// On stocke en mémoire (chaque instance serverless aura son propre stockage)
const rateMap = new Map<string, RateRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export const authLimiter = (req: VercelRequest, res: VercelResponse) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    "unknown";

  const now = Date.now();
  const record = rateMap.get(ip as string);

  if (!record) {
    rateMap.set(ip as string, { count: 1, firstRequestAt: now });
    return;
  }

  if (now - record.firstRequestAt > WINDOW_MS) {
    // Reset window
    rateMap.set(ip as string, { count: 1, firstRequestAt: now });
    return;
  }

  if (record.count >= MAX_REQUESTS) {
    res
      .status(429)
      .json({
        message: "Trop de tentatives de connexion, réessayez dans une minute.",
      });
    throw new Error("Rate limit exceeded"); // stop execution
  }

  record.count += 1;
  rateMap.set(ip as string, record);
};
