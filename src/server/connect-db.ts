import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URL as string);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
