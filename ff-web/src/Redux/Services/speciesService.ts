import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ISpecies, ISpeciesQueryParams, ISpeciesResponse } from "../../Types";

export const faunaApi = createApi({
  reducerPath: "faunaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
      query: () => `fauna?skip=0&limit=1000`,
      providesTags: ["Fauna"],
    }),
    getFaunaByParameters: builder.query<ISpecies[], ISpeciesQueryParams>({
      query: (params) =>
        `fauna/search?${
          params.label ? `&label=${parseInt(params.label)}` : ""
        }${
          params.scientific_name
            ? `&scientific_name=${params.scientific_name}`
            : ""
        }${params.common_name ? `&common_name=${params.common_name}` : ""}`,
      providesTags: ["Fauna"],
    }),

    getFaunaById: builder.query<ISpecies, string>({
      query: (id) => `fauna/${id}`,
      providesTags: ["Fauna"],
    }),

    updateFauna: builder.mutation<ISpecies, ISpecies>({
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
    deleteFauna: builder.mutation<ISpecies, string>({
      query: (id) => ({
        url: `fauna/${id}`,
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
