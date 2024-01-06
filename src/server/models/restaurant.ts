import mongoose, { Schema, Document } from "mongoose";

interface IRestaurant extends Document {
  name: string;
  background: string;
  openDays: boolean[];
  openingHours: Array<{
    start: string;
    end: string;
  }>;
  currency: string;
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  background: { type: String, required: true },
  openDays: { type: [Boolean], required: true },
  openingHours: [
    {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
});

export const RestaurantModel = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
