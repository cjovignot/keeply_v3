import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from API!" });
});

export const handler = serverless(app);
