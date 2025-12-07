import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Route de test
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from local API!" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
