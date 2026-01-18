import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectToDatabase } from "./mongo/connection";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const PORT = process.env.APP_PORT || 5000;

const app = express();

app.use(express.json());

app.get("/api/status", (req: Request, res: Response) => {
  res.json({
    message: "Backend is running!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToDatabase();

  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
