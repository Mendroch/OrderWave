import express from "express";
import { Model } from "mongoose";
import { DishModel } from "./models/dish";
import { SectionModel } from "./models/section";
import { OrderModel } from "./models/order";
import { RestaurantModel } from "./models/restaurant";
import { getController, postController, putController, deleteController } from "./controllers";

const createRouter = (model: Model<any>) => {
  const router = express.Router();

  router.get("/", getController({ model }));
  router.post("/", postController({ model }));
  router.put("/:id", putController({ model }));
  router.delete("/:id", deleteController({ model }));

  return router;
};

export const dishesRouter = createRouter(DishModel);
export const sectionsRouter = createRouter(SectionModel);
export const ordersRouter = createRouter(OrderModel);
export const restaurantRouter = createRouter(RestaurantModel);
