import cartReducer, {
  add,
  remove,
  clear,
  increment,
  decrement,
  selectCart,
} from "./cart-slice";
import { RootState } from "../store/store";
import { ICartDish } from "../types/CartDish";

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
  amount: 1,
};

describe("cart-slice", () => {
  describe("initial state", () => {
    it("should return initial state with empty dishes array", () => {
      const state = cartReducer(undefined, { type: "unknown" });

      expect(state.dishes).toEqual([]);
    });
  });

  describe("add", () => {
    it("should add a dish to the cart", () => {
      const state = cartReducer(undefined, add(mockDish));

      expect(state.dishes).toHaveLength(1);
      expect(state.dishes[0]).toEqual(mockDish);
    });

    it("should add multiple dishes to the cart", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, add(mockDish2));

      expect(state.dishes).toHaveLength(2);
      expect(state.dishes[0].name).toBe("Pizza Margherita");
      expect(state.dishes[1].name).toBe("Pasta Carbonara");
    });

    it("should allow adding the same dish multiple times", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, add(mockDish));

      expect(state.dishes).toHaveLength(2);
    });
  });

  describe("remove", () => {
    it("should remove a dish at the specified index", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, add(mockDish2));
      state = cartReducer(state, remove(0));

      expect(state.dishes).toHaveLength(1);
      expect(state.dishes[0].name).toBe("Pasta Carbonara");
    });

    it("should handle removing the last item", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, remove(0));

      expect(state.dishes).toHaveLength(0);
    });
  });

  describe("clear", () => {
    it("should remove all dishes from the cart", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, add(mockDish2));
      state = cartReducer(state, clear());

      expect(state.dishes).toHaveLength(0);
    });

    it("should work on already empty cart", () => {
      const state = cartReducer(undefined, clear());

      expect(state.dishes).toHaveLength(0);
    });
  });

  describe("increment", () => {
    it("should increment the amount of a dish", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, increment(0));

      expect(state.dishes[0].amount).toBe(2);
    });

    it("should increment the correct dish by index", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, add(mockDish2));
      state = cartReducer(state, increment(1));

      expect(state.dishes[0].amount).toBe(1);
      expect(state.dishes[1].amount).toBe(2);
    });

    it("should increment multiple times", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, increment(0));
      state = cartReducer(state, increment(0));
      state = cartReducer(state, increment(0));

      expect(state.dishes[0].amount).toBe(4);
    });
  });

  describe("decrement", () => {
    it("should decrement the amount of a dish", () => {
      let state = cartReducer(undefined, add({ ...mockDish, amount: 3 }));
      state = cartReducer(state, decrement(0));

      expect(state.dishes[0].amount).toBe(2);
    });

    it("should not decrement below 1", () => {
      let state = cartReducer(undefined, add(mockDish));
      state = cartReducer(state, decrement(0));

      expect(state.dishes[0].amount).toBe(1);
    });

    it("should decrement the correct dish by index", () => {
      let state = cartReducer(undefined, add({ ...mockDish, amount: 3 }));
      state = cartReducer(state, add({ ...mockDish2, amount: 5 }));
      state = cartReducer(state, decrement(1));

      expect(state.dishes[0].amount).toBe(3);
      expect(state.dishes[1].amount).toBe(4);
    });
  });

  describe("selectCart", () => {
    it("should select cart dishes from state", () => {
      const result = selectCart({ cart: { dishes: [mockDish, mockDish2] } } as RootState);
      expect(result).toEqual([mockDish, mockDish2]);
    });
  });
});
