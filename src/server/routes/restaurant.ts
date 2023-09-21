import express, { Request, Response } from "express";
import { RestaurantModel } from "../models/restaurant";
const router = express.Router();

// All restaurant data
router.get("/", async (_, res: Response) => {
  try {
    const restaurant = await RestaurantModel.find();
    res.json(restaurant);
  } catch (error) {
    console.error("An error occurred while retrieving restaurant", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// Update restaurant
router.put("/:id", async (req: Request, res: Response) => {
  const { name, background, openDays, openingHours, currency } = req.body;
  try {
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      req.params.id,
      { $set: { name, background, openDays, openingHours, currency } },
      { new: true }
    );
    if (!updatedRestaurant) res.status(404).json({ error: "Restaurant not found" });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant", error);
    res.status(500).json({ error: "Error updating restaurant" });
  }
});

export const restaurantRouter = router;
