import mongoose, { Schema, Document } from "mongoose";

interface IRestaurant extends Document {
  name: string;
  background: string;
  backgroundType: string;
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
  backgroundType: { type: String, required: true },
  openDays: { type: [Boolean], required: true },
  openingHours: [
    {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
});

// restaurantSchema.virtual("picturePath").get(function () {
//   if (this.background != null && this.backgroundType != null) {
//     return `data:${this.backgroundType};charset=utf-8;base64,${this.background.toString("base64")}`;
//   }
// });

export const RestaurantModel = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
