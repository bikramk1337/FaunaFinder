import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import { userApi } from "./Services/userService";
import { loginApi } from "./Services/loginService";
import { faunaApi } from "./Services/speciesService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [faunaApi.reducerPath]: faunaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(userApi.middleware)
      .concat(faunaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
