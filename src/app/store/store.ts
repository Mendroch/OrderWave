import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { ordersApi } from "../features/order-slice";
import { dishesApi } from "../features/dish-slice";
import { sectionsApi } from "../features/section-slice";
import { restaurantsApi } from "../features/restaurant-slice";
import cartReducer from "../features/cart-slice";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [dishesApi.reducerPath]: dishesApi.reducer,
    [sectionsApi.reducerPath]: sectionsApi.reducer,
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ordersApi.middleware,
      dishesApi.middleware,
      sectionsApi.middleware,
      restaurantsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
