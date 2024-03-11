import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedOut: (state) => {
      return {
        isLoggedIn: false,
      };
    },
  },
});

export const { setIsLoggedOut } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
