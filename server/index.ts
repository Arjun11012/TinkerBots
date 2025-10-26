import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { stellarRouter } from "./routes/stellar";

// Load environment variables from the project root .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

console.log('Environment variables loaded from:', envPath);
console.log('STELLAR_SECRET_KEY exists:', !!process.env.STELLAR_SECRET_KEY);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Stellar routes
  app.use("/api/stellar", stellarRouter);

  return app;
}
