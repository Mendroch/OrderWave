import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { ordersApi } from "../features/order-slice";
import { dishesApi } from "../features/dish-slice";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [dishesApi.reducerPath]: dishesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersApi.middleware, dishesApi.middleware),
});

setupListeners(store.dispatch);
