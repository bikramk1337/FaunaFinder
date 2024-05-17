import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import speciesReducer from "./Slices/speciesSlice";
import { userApi } from "./Services/userService";
import { loginApi } from "./Services/loginService";
import { faunaApi } from "./Services/speciesService";
import { classifierApi } from "./Services/classifierService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    species: speciesReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [faunaApi.reducerPath]: faunaApi.reducer,
    [classifierApi.reducerPath]: classifierApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(userApi.middleware)
      .concat(faunaApi.middleware)
      .concat(classifierApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
