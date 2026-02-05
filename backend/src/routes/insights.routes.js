import express from "express";
import { WatchSession } from "../models/WatchSession.js";
import { buildPipeline } from "../services/insights/pipelines.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { pipeline, meta } = buildPipeline(req.body);
    const items = await WatchSession.aggregate(pipeline).allowDiskUse(true);
    res.json({ meta, items });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
