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
  tagTypes: ["Order"],
  endpoints: (build) => ({
    getOrders: build.query<IOrder, string>({
      query: () => "/",
      providesTags: ["Order"],
    }),
    createOrder: build.mutation<{ success: boolean; id: string }, IOrder>({
      query(data) {
        return {
          url: "/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    deleteOrder: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation, useDeleteOrderMutation } = ordersApi;
