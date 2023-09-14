import { DishModel } from "../models/dish";
import express from "express";
const router = express.Router();

// All dishes
router.get("/", async (_, res) => {
  try {
    const dishes = await DishModel.find();
    res.json(dishes);
  } catch (error) {
    console.error("An error occurred while retrieving dishes", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

export const dishesRouter = router;
