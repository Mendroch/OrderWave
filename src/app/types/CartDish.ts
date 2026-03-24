export interface ICartDish {
  name: string;
  description?: string;
  variant?: {
    name: string;
    extraPrice: number;
    _id: string;
  };
  extraIngredients?: Array<{
    name: string;
    extraPrice: number;
    _id?: string;
  }>;
  removableIngredients?: string[];
  currency: string;
  price: number;
  amount: number;
  _id: string;
}
