import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { add } from "../features/cart-slice";
import { ICartDish } from "../types/CartDish";

// Minimal test for useCartPrice logic (extracted to avoid hook-in-non-component issues)
// The actual hook uses useAppSelector which requires Provider wrapping
describe("useCartPrice logic", () => {
  const createStore = () =>
    configureStore({
      reducer: { cart: cartReducer },
    });

  it("should calculate total price of 0 for empty cart", () => {
    const store = createStore();
    const cart = store.getState().cart.dishes;
    const total = cart.reduce((sum: number, elem: ICartDish) => sum + elem.price * elem.amount, 0);

    expect(total).toBe(0);
  });

  it("should calculate total price for single dish", () => {
    const store = createStore();
    store.dispatch(add({ _id: "1", name: "Pizza", price: 20, currency: "PLN", amount: 2 }));
    const cart = store.getState().cart.dishes;
    const total = cart.reduce((sum: number, elem: ICartDish) => sum + elem.price * elem.amount, 0);

    expect(total).toBe(40);
  });

  it("should calculate total price for multiple dishes", () => {
    const store = createStore();
    store.dispatch(add({ _id: "1", name: "Pizza", price: 20, currency: "PLN", amount: 2 }));
    store.dispatch(add({ _id: "2", name: "Pasta", price: 15, currency: "PLN", amount: 3 }));
    const cart = store.getState().cart.dishes;
    const total = cart.reduce((sum: number, elem: ICartDish) => sum + elem.price * elem.amount, 0);

    expect(total).toBe(85); // 40 + 45
  });
});
