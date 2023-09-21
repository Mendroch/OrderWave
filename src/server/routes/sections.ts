import express, { Request, Response } from "express";
import { SectionModel } from "../models/section";
const router = express.Router();

// All sections
router.get("/", async (_, res: Response) => {
  try {
    const sections = await SectionModel.find();
    res.json(sections);
  } catch (error) {
    console.error("An error occurred while retrieving sections", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// Create new section
router.post("/", async (req: Request, res: Response) => {
  const { name, isAvailable, hoursOfAvailability } = req.body;
  try {
    const newSection = await SectionModel.create({ name, isAvailable, hoursOfAvailability });
    res.status(201).json(newSection);
  } catch (error) {
    console.log("Error creating section", error);
    res.status(507).json({ error: "Error creating section" });
  }
});

// Update section
router.put("/:id", async (req: Request, res: Response) => {
  const { name, isAvailable, hoursOfAvailability } = req.body;
  try {
    const updatedSection = await SectionModel.findByIdAndUpdate(
      req.params.id,
      { $set: { name, isAvailable, hoursOfAvailability } },
      { new: true }
    );
    if (!updatedSection) res.status(404).json({ error: "Section not found" });
    res.status(200).json(updatedSection);
  } catch (error) {
    console.error("Error updating section", error);
    res.status(500).json({ error: "Error updating section" });
  }
});

// Delete section
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedSection = await SectionModel.findByIdAndDelete(req.params.id);
    if (!deletedSection) res.status(404).json({ error: "Section not found" });
    res.json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section", error);
    res.status(500).json({ error: "Error deleting section" });
  }
});

export const sectionsRouter = router;
