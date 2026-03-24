import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ICartDish } from "../types/CartDish";

interface CartState {
  dishes: ICartDish[];
}

const initialState: CartState = {
  dishes: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ICartDish>) => {
      state.dishes.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.dishes.splice(action.payload, 1);
    },
    clear: (state) => {
      state.dishes = [];
    },
    increment: (state, action: PayloadAction<number>) => {
      const dish = state.dishes[action.payload];
      if (dish?.amount) dish.amount++;
    },
    decrement: (state, action: PayloadAction<number>) => {
      const dish = state.dishes[action.payload];
      if (dish?.amount && dish.amount > 1) dish.amount--;
    },
  },
});

export const { add, remove, clear, increment, decrement } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.dishes;

export default cartSlice.reducer;
