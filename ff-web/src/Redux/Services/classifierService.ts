import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ISpecies, ISpeciesQueryParams, ISpeciesResponse } from "../../Types";
import { IClassificationHistoryResponse } from "../../Types/ClassificationHistory";

export const classifierApi = createApi({
  reducerPath: "classifierApi",
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
  endpoints: (builder) => ({
    getClassificationHistory: builder.query<
      IClassificationHistoryResponse,
      void
    >({
      query: () => `classifier/classification-histories?skip=0&limit=1000`,
    }),
  }),
});

export const { useGetClassificationHistoryQuery } = classifierApi;
