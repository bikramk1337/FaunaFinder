import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IPaginationRequest,
  IUser,
  IUserCreate,
  IUsersResponse,
} from "../../Types";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUsersResponse, IPaginationRequest>({
      query: ({ skip, limit }) =>
        `users?skip=${skip ?? 0}&limit=${limit ?? 100}`,
      providesTags: ["User"],
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    addUser: builder.mutation<IUser, IUserCreate>({
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
    updateUser: builder.mutation<IUser, IUser>({
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = userApi;
