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
    remove: (state, action: PayloadAction<string>) => {
      state.dishes.filter((dish) => dish._id !== action.payload);
    },
    clear: (state) => {
      state.dishes = [];
    },
  },
});

export const { add, remove } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.dishes;

export default cartSlice.reducer;
