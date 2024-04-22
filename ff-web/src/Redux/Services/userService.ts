import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserCreate, IUserResponse } from "../../Types";
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getGeneralUsers: builder.query<IUserResponse, void>({
      query: () => `users`,
      providesTags: ["User"],
    }),
    getAdminUsers: builder.query<IUserResponse, void>({
      query: () => `users`,
      providesTags: ["User"],
    }),
    addUser: builder.mutation<IUserResponse, IUserCreate>({
      query: (user) => ({
        url: `users`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IUserResponse, IUser>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<IUserResponse, IUser>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetGeneralUsersQuery,
  useGetAdminUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = userApi;
