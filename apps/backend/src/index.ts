import express, { Request, Response } from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/status", (req: Request, res: Response) => {
  res.json({
    message: "Backend is running!",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
