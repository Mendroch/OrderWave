import express, { Request, Response } from "express";
import { DishModel } from "../models/dish";
const router = express.Router();

// All dishes
router.get("/", async (_, res: Response) => {
  try {
    const dishes = await DishModel.find();
    res.json(dishes);
  } catch (error) {
    console.error("An error occurred while retrieving dishes", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// Create new dish
router.post("/", async (req: Request, res: Response) => {
  const {
    name,
    description,
    isAvailable,
    section,
    allergens,
    variants,
    extraIngredients,
    removableIngredients,
    picture,
    pictureType,
    price,
  } = req.body;

  try {
    const newDish = await DishModel.create({
      name,
      description,
      isAvailable,
      section,
      allergens,
      variants,
      extraIngredients,
      removableIngredients,
      picture,
      pictureType,
      price,
    });
    res.status(201).json(newDish);
  } catch (error) {
    console.error("Error creating dish", error);
    res.status(507).json({ error: "Error creating dish" });
  }
});

// Update dish
router.put("/:id", async (req: Request, res: Response) => {
  const {
    name,
    description,
    isAvailable,
    section,
    allergens,
    variants,
    extraIngredients,
    removableIngredients,
    picture,
    pictureType,
    price,
  } = req.body;

  try {
    const updatedDish = await DishModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          description,
          isAvailable,
          section,
          allergens,
          variants,
          extraIngredients,
          removableIngredients,
          picture,
          pictureType,
          price,
        },
      },
      { new: true }
    );

    if (!updatedDish) res.status(404).json({ error: "Dish not found" });
    res.status(200).json(updatedDish);
  } catch (error) {
    console.error("Error updating dish", error);
    res.status(500).json({ error: "Error updating dish" });
  }
});

// Delete dish
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedDish = await DishModel.findByIdAndDelete(req.params.id);
    if (!deletedDish) res.status(404).json({ error: "Dish not found" });
    res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Error deleting dish", error);
    res.status(500).json({ error: "Error deleting dish" });
  }
});

export const dishesRouter = router;
