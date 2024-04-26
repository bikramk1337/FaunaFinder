import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../Types";

const initialEditData: IUser = {
  full_name: "",
  email: "",
  email_verified: false,
  user_type: "dashboard",
  id: 0,
  is_active: true,
};

interface UserState {
  editData: IUser;
}

const initialState: UserState = {
  editData: initialEditData,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEditData: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        editData: {
          ...state.editData,
          ...payload,
        },
      };
    },
    resetEditData: (state) => {
      return {
        ...state,
        editData: initialEditData,
      };
    },
  },
});

export const { setEditData, resetEditData } = userSlice.actions;

export const selectEditData = (state: RootState) => state.user.editData;

export default userSlice.reducer;
