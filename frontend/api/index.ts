import express from "express";
import cors from "cors";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Handlers
import loginHandler from "./auth/login";
import googleLoginHandler from "./auth/google-login";
import logoutHandler from "./auth/logout";
import meHandler from "./auth/me";
import signupHandler from "./auth/signup";
import boxesHandler from "./boxes/index";
import boxHandler from "./boxes/[id]";
import storagesHandler from "./storages/index";
import storageHandler from "./storages/[id]";
import usersHandler from "./user/index";
import userHandler from "./user/[id]";

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

app.use(express.json());

// Adapter Vercel -> Express
const vercelToExpress =
  (handler: (req: VercelRequest, res: VercelResponse) => Promise<void>) =>
  async (req: express.Request, res: express.Response) => {
    await handler(req as VercelRequest, res as VercelResponse);
  };

// AUTH
app.post("/api/auth/login", vercelToExpress(loginHandler));
app.post("/api/auth/google-login", vercelToExpress(googleLoginHandler));
app.post("/api/auth/logout", vercelToExpress(logoutHandler));
app.get("/api/auth/me", vercelToExpress(meHandler));
app.post("/api/auth/signup", vercelToExpress(signupHandler));

// BOXES
app.get("/api/boxes", vercelToExpress(boxesHandler));
app.post("/api/boxes", vercelToExpress(boxesHandler));

app.get("/api/boxes/:id", vercelToExpress(boxHandler));
app.put("/api/boxes/:id", vercelToExpress(boxHandler));
app.delete("/api/boxes/:id", vercelToExpress(boxHandler));

// STORAGES
app.get("/api/storages", vercelToExpress(storagesHandler));
app.post("/api/storages", vercelToExpress(storagesHandler));

app.get("/api/storages/:id", vercelToExpress(storageHandler));
app.patch("/api/storages/:id", vercelToExpress(storageHandler));
app.delete("/api/storages/:id", vercelToExpress(storageHandler));

// USER
app.get("/api/user", vercelToExpress(usersHandler));
app.post("/api/user", vercelToExpress(usersHandler));

app.get("/api/user/:id", vercelToExpress(userHandler));
app.patch("/api/user/:id", vercelToExpress(userHandler));
app.delete("/api/user/:id", vercelToExpress(userHandler));

const port = 3000;
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
