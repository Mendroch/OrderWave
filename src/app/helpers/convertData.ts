import { IDish } from "../types/Dishes";

export const convertData = (data: IDish, dish: IDish, price: number) => {
  return {
    _id: dish._id,
    name: dish.name,
    description: dish.description,
    variant: dish?.variants ? dish.variants[Number(data.variant)] : "",
    extraIngredients: data?.extraIngredients
      ? (data.extraIngredients as unknown as string[]).reduce(
          (ingredients: any[], ingredient: string) => {
            const extraIngredient = dish.extraIngredients?.[Number(ingredient)];
            if (extraIngredient) {
              return [...ingredients, extraIngredient];
            }
            return ingredients;
          },
          []
        )
      : [],
    removableIngredients: data.removableIngredients ? data.removableIngredients : [],
    currency: dish.currency,
    price: price,
  };
};
