import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRestaurant } from "../types/Restaurants";

export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/restaurant",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Restaurants"],
  endpoints: (build) => ({
    getRestaurants: build.query<IRestaurant, string>({
      query: () => "/",
      providesTags: ["Restaurants"],
    }),
    updateRestaurants: build.mutation<{ success: boolean; id: string }, { id: string; data: any }>({
      query({ id, data }) {
        return {
          url: `/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Restaurants"],
    }),
  }),
});

export const { useGetRestaurantsQuery, useUpdateRestaurantsMutation } = restaurantsApi;
