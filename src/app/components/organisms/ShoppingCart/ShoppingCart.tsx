import { useTranslation } from "react-i18next";
import { Button, Header } from "../../atoms/PreviewStyles/PreviewStyles.styles";
import Shadow from "../../molecules/Shadow/Shadow";
import { ICartDish } from "../../../types/CartDish";
import {
  CartItem,
  ClearButton,
  Container,
  Counter,
  Price,
  ShoppingWrapper,
} from "./ShoppingCart.styles";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { clear, decrement, increment } from "../../../features/cart-slice";
import close from "../../../assets/icons/close.png";
import bin from "../../../assets/icons/bin.png";
import CartItemDetails from "../../atoms/CartItemDetails/CartItemDetails";

interface DishPreviewProps {
  isOpen: boolean;
  toggle: () => void;
  data: ICartDish[];
}

const ShoppingCart = ({ isOpen, toggle, data }: DishPreviewProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <ShoppingWrapper
        animate={{ y: isOpen ? -800 : 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      >
        <Header>{t("menu__shopping__cart")}</Header>
        <ClearButton onClick={() => dispatch(clear())}>
          <img src={bin} alt="bin icon" />
        </ClearButton>
        <Button onClick={toggle}>
          <img src={close} alt="close icon" />
        </Button>
        <Container>
          {data.map((dish, index) => (
            <CartItem key={index}>
              <div>
                <p>{dish.name}</p>
                <CartItemDetails dish={dish} />
                <Price>
                  {dish.price * dish.amound} {dish.currency}
                </Price>
              </div>
              <Counter>
                <button onClick={() => dispatch(decrement(dish._id))}>-</button>
                <p>{dish.amound}</p>
                <button onClick={() => dispatch(increment(dish._id))}>+</button>
              </Counter>
            </CartItem>
          ))}
        </Container>
      </ShoppingWrapper>
      <Shadow isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default ShoppingCart;
