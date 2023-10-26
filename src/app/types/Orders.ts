export interface IOrderedDish {
  name: string;
  variant?: string;
  extraIngredients?: string[];
  removableIngredients?: string[];
  _id: string;
}

export interface IOrder {
  _id: string;
  number: number;
  dishesList: IOrderedDish[];
  deliveryMethod: string;
  tableNumber?: number;
  __v: number;
}

export interface IOrders extends Array<IOrder> {}
