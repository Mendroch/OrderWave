import { IDish } from "../types/Dishes";

export const convertData = (data: IDish, dish: IDish, price: number) => {
  if (!dish) {
    throw new Error("Dish data is required for conversion");
  }

  return {
    _id: dish._id,
    name: dish.name,
    description: dish.description ? dish.description : "",
    variant: (dish?.variants && dish.variants.length > 0 && data.variant !== undefined && data.variant !== null)
      ? {
          name: dish.variants[Number(data.variant)]?.name,
          extraPrice: dish.variants[Number(data.variant)]?.extraPrice,
          _id: dish.variants[Number(data.variant)]?._id,
        }
      : undefined,
    extraIngredients: (data?.extraIngredients && dish?.extraIngredients && dish.extraIngredients.length > 0)
      ? Array.isArray(data.extraIngredients)
        ? (data.extraIngredients as unknown as string[]).reduce(
            (ingredients: any[], ingredient: string) => {
              const index = Number(ingredient);
              if (!isNaN(index) && index >= 0 && index < dish.extraIngredients!.length) {
                const extraIngredient = dish.extraIngredients![index];
                if (extraIngredient) {
                  return [...ingredients, extraIngredient];
                }
              }
              return ingredients;
            },
            []
          )
        : (() => {
            const index = Number(data.extraIngredients);
            if (!isNaN(index) && index >= 0 && dish.extraIngredients!.length > index) {
              const extraIngredient = dish.extraIngredients![index];
              return extraIngredient ? [extraIngredient] : [];
            }
            return [];
          })()
      : [],
    removableIngredients: data.removableIngredients ? data.removableIngredients : [],
    currency: dish.currency ? dish.currency : "",
    price: price,
    amount: 1,
  };
};
