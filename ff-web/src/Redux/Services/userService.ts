import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../Types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8888/api/v1/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser, void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
