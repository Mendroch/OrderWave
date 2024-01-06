import mongoose, { Schema, Document } from "mongoose";

interface IDish extends Document {
  name: string;
  description?: string;
  isAvailable: boolean;
  sectionId: mongoose.Schema.Types.ObjectId;
  allergens?: string[];
  variants?: [
    {
      name: string;
      extraPrice: number;
    },
  ];
  extraIngredients?: [
    {
      name: string;
      extraPrice: number;
    },
  ];
  removableIngredients?: string[];
  picture?: string;
  price: number;
}

const dishSchema = new Schema<IDish>({
  name: { type: String, required: true },
  description: String,
  isAvailable: { type: Boolean, required: true },
  sectionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Section" },
  allergens: [String],
  variants: [
    {
      name: String,
      extraPrice: Number,
    },
  ],
  extraIngredients: [
    {
      name: String,
      extraPrice: Number,
    },
  ],
  removableIngredients: [String],
  picture: String,
  price: { type: Number, required: true },
});

export const DishModel = mongoose.model<IDish>("Dish", dishSchema);
