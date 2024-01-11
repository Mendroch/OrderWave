export interface IOrderedDish {
  name: string;
  variant?: string;
  extraIngredients?: string[];
  removableIngredients?: string[];
  _id?: string;
}

export interface IOrder {
  [x: string]: any;
  _id?: string;
  number: number;
  dishesList: IOrderedDish[];
  deliveryMethod: string;
  tableNumber?: string;
  phoneNumber: string;
  clientName: string;
  __v?: number;
}

export interface IOrders extends Array<IOrder> {}
