import { ICartDish } from "../../../types/CartDish";
import { Wrapper } from "./CartItemDetails.styles";

interface CartItemDetailsProps {
  dish: ICartDish;
}

const CartItemDetails = ({ dish }: CartItemDetailsProps) => {
  return (
    <Wrapper>
      {dish?.description && <p>{dish.description}</p>}
      {dish?.extraIngredients &&
        dish.extraIngredients.map((ingredient, index) => (
          <p key={index}>
            + {ingredient.name} ({ingredient.extraPrice} {dish.currency})
          </p>
        ))}
      {dish?.removableIngredients &&
        dish.removableIngredients.map((ingredient, index) => <p key={index}>- {ingredient}</p>)}
    </Wrapper>
  );
};

export default CartItemDetails;
