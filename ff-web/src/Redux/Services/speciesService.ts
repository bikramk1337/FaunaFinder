import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ISpeciesResponse } from "../../Types";

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
  endpoints: (builder) => ({
    getFauna: builder.query<ISpeciesResponse, void>({
      query: () => `fauna`,
    }),
  }),
});

export const { useGetFaunaQuery } = faunaApi;
