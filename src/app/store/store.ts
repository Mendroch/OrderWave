import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { ordersApi } from "../features/order-slice";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersApi.middleware),
});

setupListeners(store.dispatch);
