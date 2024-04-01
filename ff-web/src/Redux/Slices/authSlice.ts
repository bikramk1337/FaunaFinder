import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      return {
        isLoggedIn: true,
      };
    },
    setIsLoggedOut: (state) => {
      return {
        isLoggedIn: false,
      };
    },
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
