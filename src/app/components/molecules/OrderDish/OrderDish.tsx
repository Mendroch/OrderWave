import { Ingredient, Name, Variant, Wrapper } from "./OrderDish.styles";
import { IOrderedDish } from "../../../types/Orders";

interface OrderDishProps {
  dish: IOrderedDish;
}

const OrderDish = ({ dish }: OrderDishProps) => {
  return (
    <Wrapper>
      <div>
        <Name>{dish.name}</Name>
        <Variant>{dish?.variant}</Variant>
        {dish?.extraIngredients?.map((ingredient, index) => (
          <Ingredient key={index}>+ {ingredient}</Ingredient>
        ))}
        {dish?.removableIngredients?.map((ingredient, index) => (
          <Ingredient key={index}>- {ingredient}</Ingredient>
        ))}
      </div>
      <input type="checkbox" name="dish" id={dish._id} />
      <label htmlFor={dish._id}></label>
    </Wrapper>
  );
};

export default OrderDish;
