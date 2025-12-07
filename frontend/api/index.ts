import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://keeeply.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      // autoriser requêtes server-to-server ou internes
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin non autorisée par CORS"), false);
    },
    credentials: true, // ⚠️ nécessaire pour cookies HTTP-only
  })
);
app.use(express.json());

// Route de test
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from local API!" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
