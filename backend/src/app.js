import express from "express";
import cors from "cors";
import insightsRoutes from "./routes/insights.routes.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/insights", insightsRoutes);

  return app;
}
