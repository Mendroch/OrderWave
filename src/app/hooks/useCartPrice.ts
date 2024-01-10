import { useAppSelector } from "./reduxHooks";

export const useCartPrice = () => {
  const cart = useAppSelector((state) => state.cart.dishes);
  return cart.reduce((sum, elem) => sum + elem.price * elem.amound, 0);
};
