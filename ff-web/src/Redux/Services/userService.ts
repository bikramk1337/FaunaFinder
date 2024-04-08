import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserResponse } from "../../Types";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
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
    getGeneralUsers: builder.query<IUserResponse, void>({
      query: () => `users`,
    }),
    getAdminUsers: builder.query<IUserResponse, void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetGeneralUsersQuery, useGetAdminUsersQuery } = userApi;
