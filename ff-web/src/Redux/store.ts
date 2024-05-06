import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import speciesReducer from "./Slices/speciesSlice";
import { userApi } from "./Services/userService";
import { loginApi } from "./Services/loginService";
import { faunaApi } from "./Services/speciesService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    species: speciesReducer,
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
