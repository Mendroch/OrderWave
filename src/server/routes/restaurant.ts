import { RestaurantModel } from "../models/restaurant";
import express from "express";
const router = express.Router();

// All restaurant data
router.get("/", async (_, res) => {
  try {
    const restaurant = await RestaurantModel.find();
    res.json(restaurant);
  } catch (error) {
    console.error("An error occurred while retrieving restaurant", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

export const restaurantRouter = router;
