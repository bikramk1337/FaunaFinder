import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ISpecies, ISpeciesQueryParams, ISpeciesResponse } from "../../Types";

export const faunaApi = createApi({
  reducerPath: "faunaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8888/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Fauna"],
  endpoints: (builder) => ({
    getFauna: builder.query<ISpeciesResponse, void>({
      query: () => `fauna`,
      providesTags: ["Fauna"],
    }),
    getFaunaByParameters: builder.query<ISpeciesResponse, ISpeciesQueryParams>({
      query: (params) =>
        `fauna/label=${params.label || ""}&scientific_name=${
          params.scientific_name || ""
        }&common_name=${params.common_name || ""}`,
      providesTags: ["Fauna"],
    }),

    getFaunaById: builder.query<ISpeciesResponse, number>({
      query: (id) => `fauna/${id}`,
      providesTags: ["Fauna"],
    }),

    updateFauna: builder.mutation<ISpeciesResponse, ISpecies>({
      query: (fauna) => ({
        url: `fauna/${fauna.id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: fauna,
      }),
      invalidatesTags: ["Fauna"],
    }),
    deleteFauna: builder.mutation<ISpeciesResponse, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fauna"],
    }),
  }),
});

export const {
  useGetFaunaQuery,
  useGetFaunaByIdQuery,
  useGetFaunaByParametersQuery,
  useUpdateFaunaMutation,
  useDeleteFaunaMutation,
} = faunaApi;
