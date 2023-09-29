import mongoose, { ConnectOptions } from "mongoose";

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

mongoose.connect(process.env.DATABASE_URL as string, mongooseOptions);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
