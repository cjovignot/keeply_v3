import express from "express";
import cors from "cors";
import path from "path";
import { glob } from "glob";
import { VercelRequest, VercelResponse } from "@vercel/node";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = express();

  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://keeeply.vercel.app",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Origin non autorisée par CORS"), false);
      },
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());

  // ------------------------------------------
  // 🔥 CHARGEMENT DES ROUTES SERVERLESS
  // ------------------------------------------
  const apiDir = __dirname;

  const files = await glob(`${apiDir}/**/*.ts`, {
    ignore: [
      `${apiDir}/index.ts`,
      `${apiDir}/**/*.d.ts`,
      `${apiDir}/node_modules/**/*.ts`,
    ],
  });

  for (const file of files) {
    const relativePath = file.replace(apiDir, "").replace(".ts", "");

    let routePath = "/api" + relativePath.replace(/\\/g, "/");

    // index.ts → /
    routePath = routePath.replace(/\/index$/, "/");

    // [id].ts → :id
    routePath = routePath.replace(/\[([^\]]+)\]/g, ":$1");

    const handlerModule = await import(file);
    const handler = handlerModule.default;

    if (typeof handler === "function") {
      app.all(routePath, (req, res) => handler(req as any, res as any));
      console.log("➡ Route montée :", routePath);
    }
  }

  // Test
  app.get("/hello", (req, res) => {
    res.json({ message: "Hello from local API!" });
  });

  // Lancement serveur
  const port = 3000;
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}

// ⚠️ IMPORTANT : on appelle la fonction ici, pas de top-level await
bootstrap().catch((err) => {
  console.error("Erreur au démarrage :", err);
});
