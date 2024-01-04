import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { ordersApi } from "../features/order-slice";
import { dishesApi } from "../features/dish-slice";
import { sectionsApi } from "../features/section-slice";
import { restaurantsApi } from "../features/restaurant-slice";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [dishesApi.reducerPath]: dishesApi.reducer,
    [sectionsApi.reducerPath]: sectionsApi.reducer,
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
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
