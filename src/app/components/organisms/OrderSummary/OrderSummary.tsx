import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import CartItemDetails from "../../atoms/CartItemDetails/CartItemDetails";
import { Counter } from "../ShoppingCart/ShoppingCart.styles";
import { BoldText, DeleteButton, OrderItem, Sum, Title, Wrapper } from "./OrderSummary.styles";
import { decrement, increment, remove } from "../../../features/cart-slice";
import bin from "../../../assets/icons/bin.png";
import { useCartPrice } from "../../../hooks/useCartPrice";

interface OrderSummaryProps {
  restaurantName: string;
}

const OrderSummary = ({ restaurantName }: OrderSummaryProps) => {
  const cart = useAppSelector((state) => state.cart.dishes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartPrice = useCartPrice();

  useEffect(() => {
    if (!cart.length) navigate("/client/menu");
    // eslint-disable-next-line
  }, [cart]);

  return (
    <>
      {cart && (
        <Wrapper>
          <Title>{restaurantName}</Title>
          {cart.map((dish, index) => (
            <OrderItem key={index}>
              <div>
                <BoldText>{dish.name}</BoldText>
                <CartItemDetails dish={dish} />
                <Counter>
                  <button onClick={() => dispatch(decrement(dish._id))}>-</button>
                  <p>{dish.amound}</p>
                  <button onClick={() => dispatch(increment(dish._id))}>+</button>
                </Counter>
              </div>
              <div>
                <BoldText>
                  {dish.price * dish.amound} {dish.currency}
                </BoldText>
                <DeleteButton onClick={() => dispatch(remove(dish._id))}>
                  <img src={bin} alt="bin" />
                </DeleteButton>
              </div>
            </OrderItem>
          ))}
          <Sum>
            <p>{t("checkout__sum")}</p>
            <p>
              {cartPrice} {cart[0]?.currency}
            </p>
          </Sum>
        </Wrapper>
      )}
    </>
  );
};

export default OrderSummary;
