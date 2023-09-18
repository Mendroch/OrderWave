import { SectionModel } from "../models/section";
import express from "express";
const router = express.Router();

// All sections
router.get("/", async (_, res) => {
  try {
    const sections = await SectionModel.find();
    res.json(sections);
  } catch (error) {
    console.error("An error occurred while retrieving sections", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

export const sectionsRouter = router;
