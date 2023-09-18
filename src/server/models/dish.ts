import mongoose, { Schema, Document } from "mongoose";

interface IDish extends Document {
  name: string;
  description?: string;
  isAvailable: boolean;
  section: string;
  allergens?: string[];
  variants?: string[];
  extraIngredients?: string[];
  removableIngredients?: string[];
  picture?: Buffer;
  price: number;
}

const dishSchema = new Schema<IDish>({
  name: { type: String, required: true },
  description: String,
  isAvailable: { type: Boolean, required: true },
  section: { type: String, required: true },
  allergens: [String],
  variants: [String],
  extraIngredients: [String],
  removableIngredients: [String],
  picture: Buffer,
  price: { type: Number, required: true },
});

export const DishModel = mongoose.model<IDish>("Dish", dishSchema);
