import { OrderModel } from "../models/order";
import express from "express";
const router = express.Router();

// All orders
router.get("/", async (_, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    console.error("An error occurred while retrieving orders", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

export const ordersRouter = router;
