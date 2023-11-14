import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IDish } from "../types/Dishes";

export const dishesApi = createApi({
  reducerPath: "dishesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/dishes",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Dish"],
  endpoints: (build) => ({
    getDishes: build.query<IDish, string>({
      query: () => "/",
      providesTags: ["Dish"],
    }),
    deleteDish: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Dish"],
    }),
  }),
});

export const { useGetDishesQuery, useDeleteDishMutation } = dishesApi;
