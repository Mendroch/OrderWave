import { ICartDish } from "../types/CartDish";
import { CheckoutData } from "../types/CheckoutData";

export const convertToOrder = (data: CheckoutData, cart: ICartDish[]) => {
  return {
    number: Math.floor(Math.random() * 200) + 1,
    clientName: data.clientName,
    deliveryMethod: data.deliveryMethod,
    paymentMethod: data.paymentMethod,
    phoneNumber: data.phoneNumber,
    tableNumber: data.deliveryMethod === "tableService" && data.tableNumber ? data.tableNumber : "",
    createdAt: new Date().toISOString(),
    dishesList: cart.map((dish: ICartDish) => ({
      name: dish.name,
      variant: dish?.variant?.name ? dish.variant.name : "",
      extraIngredients: dish?.extraIngredients
        ? dish.extraIngredients.map((ingredient) => ingredient.name)
        : [],
      removableIngredients: dish?.removableIngredients ? dish.removableIngredients : [],
      amount: dish.amount,
      price: dish.price,
      currency: dish.currency,
      totalPrice: dish.price * dish.amount,
    })),
  };
};
