import mongoose, { Schema, Document } from "mongoose";

interface IDish extends Document {
  name: string;
  description?: string;
  isAvailable: boolean;
  section: string;
  sectionId: mongoose.Schema.Types.ObjectId;
  allergens?: string[];
  variants?: string[];
  extraIngredients?: string[];
  removableIngredients?: string[];
  picture?: Buffer;
  pictureType: string;
  price: number;
}

const dishSchema = new Schema<IDish>({
  name: { type: String, required: true },
  description: String,
  isAvailable: { type: Boolean, required: true },
  section: { type: String, required: true },
  sectionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Section" },
  allergens: [String],
  variants: [String],
  extraIngredients: [String],
  removableIngredients: [String],
  picture: Buffer,
  pictureType: String,
  price: { type: Number, required: true },
});

dishSchema.virtual("picturePath").get(function () {
  if (this.picture != null && this.pictureType != null) {
    return `data:${this.pictureType};charset=utf-8;base64,${this.picture.toString("base64")}`;
  }
});

export const DishModel = mongoose.model<IDish>("Dish", dishSchema);
