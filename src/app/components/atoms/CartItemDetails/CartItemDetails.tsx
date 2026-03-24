import { ICartDish } from "../../../types/CartDish";
import { Wrapper } from "./CartItemDetails.styles";

interface CartItemDetailsProps {
  dish: ICartDish;
}

const CartItemDetails = ({ dish }: CartItemDetailsProps) => {
  if (!dish) {
    console.warn('CartItemDetails: dish prop is undefined');
    return <Wrapper />;
  }

  return (
    <Wrapper>
      {dish?.description && <p>{dish.description}</p>}
      {dish?.extraIngredients && Array.isArray(dish.extraIngredients) &&
        dish.extraIngredients.map((ingredient, index) => (
          <p key={index}>
            + {ingredient.name} ({ingredient.extraPrice} {dish.currency})
          </p>
        ))}
      {dish?.removableIngredients && Array.isArray(dish.removableIngredients) &&
        dish.removableIngredients.map((ingredient, index) => {
          const ingredientName = typeof ingredient === 'string' ? ingredient : String(ingredient);
          return <p key={index}>- {ingredientName}</p>;
        })}
    </Wrapper>
  );
};

export default CartItemDetails;
