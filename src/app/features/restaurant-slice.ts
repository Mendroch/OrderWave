import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRestaurant } from "../types/Restaurants";

export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Restaurants"],
  endpoints: (build) => ({
    getRestaurants: build.query<IRestaurant, string>({
      query: () => "/restaurant",
      providesTags: ["Restaurants"],
    }),
    getCurrencyController: build.query<string, string>({
      query: () => "/currency",
      providesTags: ["Restaurants"],
    }),
    updateRestaurants: build.mutation<{ success: boolean; id: string }, { id: string; data: any }>({
      query({ id, data }) {
        return {
          url: `/restaurant/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Restaurants"],
    }),
  }),
});

export const { useGetRestaurantsQuery, useUpdateRestaurantsMutation } = restaurantsApi;
