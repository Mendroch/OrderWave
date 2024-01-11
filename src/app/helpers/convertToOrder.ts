import { ICartDish } from "../types/CartDish";
import { CheckoutData } from "../types/CheckoutData";
import { IDish } from "./../types/Dishes";

export const convertToOrder = (data: CheckoutData, cart: ICartDish[]) => {
  return {
    number: Math.floor(Math.random() * 200) + 1,
    clientName: data.clientName,
    deliveryMethod: data.deliveryMethod,
    phoneNumber: data.phoneNumber,
    tableNumber: data.tableNumber ? data.tableNumber : "",
    dishesList: cart.map((dish: ICartDish) => ({
      name: dish.name,
      variant: dish?.variant?.name ? dish.variant.name : "",
      extraIngredients: dish?.extraIngredients
        ? dish.extraIngredients.map((ingredient: IDish) => ingredient.name)
        : [],
      removableIngredients: dish?.removableIngredients ? dish.removableIngredients : [],
      amound: dish.amound,
    })),
  };
};
