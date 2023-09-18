import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { dishesRouter } from "./routes/dishes";
import { ordersRouter } from "./routes/orders";
import { sectionsRouter } from "./routes/sections";
import { restaurantRouter } from "./routes/restaurant";

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

const corsOptions: cors.CorsOptions = {
  origin: process.env.ORIGIN,
};

app.use(cors(corsOptions), express.urlencoded({ extended: true }), express.json());

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

mongoose.connect(process.env.DATABASE_URL as string, mongooseOptions);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/dishes", dishesRouter);
app.use("/orders", ordersRouter);
app.use("/sections", sectionsRouter);
app.use("/restaurant", restaurantRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
