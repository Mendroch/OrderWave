import { IDish } from "../types/Dishes";

export const convertData = (data: IDish, dish: IDish, price: number) => {
  return {
    _id: dish._id,
    name: dish.name,
    description: dish.description ? dish.description : "",
    variant: dish?.variants
      ? {
          name: dish.variants[Number(data.variant)].name,
          extraPrice: dish.variants[Number(data.variant)].extraPrice,
          _id: dish.variants[Number(data.variant)]._id,
        }
      : undefined,
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
    currency: dish.currency ? dish.currency : "",
    price: price,
  };
};
