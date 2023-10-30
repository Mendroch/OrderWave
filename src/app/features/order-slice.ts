import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IOrder } from "../types/Orders";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/orders",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder, string>({
      query: () => "/",
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
