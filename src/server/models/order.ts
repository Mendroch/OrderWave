import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  number: number;
  dishesList: Array<{
    name: string;
    variant?: string;
    extraIngredients?: string[];
    removableIngredients?: string[];
  }>;
}

const orderSchema = new Schema<IOrder>({
  number: { type: Number, required: true },
  dishesList: [
    {
      name: { type: String, required: true },
      variant: String,
      extraIngredients: [String],
      removableIngredients: [String],
    },
  ],
});

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
