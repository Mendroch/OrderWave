import express, { Request, Response } from "express";
import { OrderModel } from "../models/order";
const router = express.Router();

// All orders
router.get("/", async (_, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    console.error("An error occurred while retrieving orders", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// Create new order
router.post("/", async (req: Request, res: Response) => {
  const { number, dishesList } = req.body;
  try {
    const newOrder = await OrderModel.create({ number, dishesList });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(507).json({ error: "Error creating order" });
  }
});

// Delete order
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).json({ error: "Error deleting order" });
  }
});

export const ordersRouter = router;
