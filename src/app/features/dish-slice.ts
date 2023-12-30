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
    getDish: build.query<IDish, string>({
      query: (id) => `/${id}`,
      providesTags: ["Dish"],
    }),
    createDish: build.mutation<{ success: boolean; id: string }, string>({
      query(data) {
        return {
          url: "/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Dish"],
    }),
    updateDish: build.mutation<{ success: boolean; id: string }, { id: string; data: any }>({
      query({ id, data }) {
        return {
          url: `/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Dish"],
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

export const {
  useGetDishesQuery,
  useGetDishQuery,
  useCreateDishMutation,
  useUpdateDishMutation,
  useDeleteDishMutation,
} = dishesApi;
