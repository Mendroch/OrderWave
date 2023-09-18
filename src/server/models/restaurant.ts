import mongoose, { Schema, Document } from "mongoose";

interface IRestaurant extends Document {
  name: string;
  background: Buffer;
  openDays: Boolean[];
  openingHours: Array<{
    day: string;
    start: string;
    end: string;
  }>;
  currency: string;
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  background: { type: Buffer, required: true },
  openDays: { type: [Boolean], required: true },
  openingHours: [
    {
      day: { type: String, required: true },
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
});

export const RestaurantModel = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
