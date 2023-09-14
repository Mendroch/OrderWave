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
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  allergens: {
    type: [String],
  },
  variants: {
    type: [String],
  },
  extraIngredients: {
    type: [String],
  },
  removableIngredients: {
    type: [String],
  },
  picture: {
    type: Buffer,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const DishModel = mongoose.model<IDish>("Dish", dishSchema);
