import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISection } from "./../types/Sections";

export const sectionsApi = createApi({
  reducerPath: "sectionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/sections`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Section"],
  endpoints: (build) => ({
    getSections: build.query<ISection, string>({
      query: () => "/",
      providesTags: ["Section"],
    }),
    getSection: build.query<ISection, string>({
      query: (id) => `/${id}`,
      providesTags: ["Section"],
    }),
    createSection: build.mutation<{ success: boolean; id: string }, ISection>({
      query(data) {
        return {
          url: "/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Section"],
    }),
    updateSection: build.mutation<{ success: boolean; id: string }, { id: string; data: any }>({
      query({ id, data }) {
        return {
          url: `/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Section"],
    }),
    deleteSection: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Section"],
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionsApi;
