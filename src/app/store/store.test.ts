import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { add, remove, clear, increment, decrement } from "../features/cart-slice";
import { ICartDish } from "../types/CartDish";

// Integration test: test store with cart reducer working together
describe("Redux Store Integration", () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

  const mockDish: ICartDish = {
    _id: "d1",
    name: "Pizza Margherita",
    price: 20,
    currency: "PLN",
    amount: 1,
  };

  const mockDish2: ICartDish = {
    _id: "d2",
    name: "Pasta Carbonara",
    price: 25,
    currency: "PLN",
    amount: 2,
  };

  it("should have correct initial state", () => {
    const store = createTestStore();
    const state = store.getState();

    expect(state.cart.dishes).toEqual([]);
  });

  it("should handle a complete order workflow: add, increment, decrement, remove", () => {
    const store = createTestStore();

    // Add dishes
    store.dispatch(add(mockDish));
    store.dispatch(add(mockDish2));
    expect(store.getState().cart.dishes).toHaveLength(2);

    // Increment first dish
    store.dispatch(increment(0));
    expect(store.getState().cart.dishes[0].amount).toBe(2);

    // Decrement second dish
    store.dispatch(decrement(1));
    expect(store.getState().cart.dishes[1].amount).toBe(1);

    // Remove first dish
    store.dispatch(remove(0));
    expect(store.getState().cart.dishes).toHaveLength(1);
    expect(store.getState().cart.dishes[0].name).toBe("Pasta Carbonara");

    // Clear cart
    store.dispatch(clear());
    expect(store.getState().cart.dishes).toHaveLength(0);
  });

  it("should calculate total cart price correctly through multiple operations", () => {
    const store = createTestStore();

    store.dispatch(add(mockDish));   // 20 * 1 = 20
    store.dispatch(add(mockDish2));  // 25 * 2 = 50

    let total = store.getState().cart.dishes.reduce(
      (sum: number, d: ICartDish) => sum + d.price * d.amount, 0
    );
    expect(total).toBe(70);

    // Increment first dish: 20 * 2 = 40
    store.dispatch(increment(0));
    total = store.getState().cart.dishes.reduce(
      (sum: number, d: ICartDish) => sum + d.price * d.amount, 0
    );
    expect(total).toBe(90);

    // Decrement second dish: 25 * 1 = 25
    store.dispatch(decrement(1));
    total = store.getState().cart.dishes.reduce(
      (sum: number, d: ICartDish) => sum + d.price * d.amount, 0
    );
    expect(total).toBe(65);
  });

  it("should maintain state immutability through dispatches", () => {
    const store = createTestStore();

    store.dispatch(add(mockDish));
    const stateAfterAdd = store.getState().cart.dishes;

    store.dispatch(add(mockDish2));
    const stateAfterSecondAdd = store.getState().cart.dishes;

    // The reference should be different (immutable updates)
    expect(stateAfterAdd).not.toBe(stateAfterSecondAdd);
  });
});
