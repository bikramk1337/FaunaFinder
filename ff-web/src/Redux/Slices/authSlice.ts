import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginApi } from "../Services/loginService";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        isLoggedIn: true,
        accessToken: payload,
      };
    },
    setIsLoggedOut: (state) => {
      localStorage.setItem("token", "");
      return {
        ...state,
        isLoggedIn: false,
        accessToken: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      loginApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("token", payload.access_token);
        state.accessToken = payload.access_token;
        state.isLoggedIn = true;
      }
    );
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
