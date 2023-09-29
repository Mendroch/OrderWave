import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import "./connect-db";
import { dishesRouter, sectionsRouter, ordersRouter, restaurantRouter } from "./routers";

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

const corsOptions: cors.CorsOptions = {
  origin: process.env.ORIGIN,
};

app.use(cors(corsOptions), express.urlencoded({ extended: true }), express.json());

app.use("/dishes", dishesRouter);
app.use("/orders", ordersRouter);
app.use("/sections", sectionsRouter);
app.use("/restaurant", restaurantRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
