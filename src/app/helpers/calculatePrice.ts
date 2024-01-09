import { IDish } from "../types/Dishes";

export const calculatePrice = (
  dish: IDish | undefined,
  watchVariant?: any,
  watchExtraIngredients?: any
) => {
  let variantPrice = 0;
  let extraIngredientsPrice = 0;
  if (dish?.variants && watchVariant) variantPrice = dish?.variants[watchVariant]?.extraPrice || 0;
  if (dish?.extraIngredients && watchExtraIngredients) {
    if (Array.isArray(watchExtraIngredients)) {
      extraIngredientsPrice = watchExtraIngredients.reduce((price: number, ingredient: string) => {
        const extraPrice = dish.extraIngredients?.[Number(ingredient)]?.extraPrice || 0;
        return price + extraPrice;
      }, 0);
    } else {
      extraIngredientsPrice = dish.extraIngredients?.[Number(watchExtraIngredients)]?.extraPrice;
    }
  }
  return dish ? dish.price + variantPrice + extraIngredientsPrice : 0;
};
