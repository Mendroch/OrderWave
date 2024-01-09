export interface ICartDish {
  name: string;
  description?: string;
  variant?: {
    name: string;
    extraPrice: number;
    _id: string;
  };
  extraIngredients?: any[];
  removableIngredients?: string[];
  currency: string;
  price: number;
  amound: number;
  _id: string;
}
