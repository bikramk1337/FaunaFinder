import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISpeciesQueryParams } from "../../Types";

export const initialFilterData: ISpeciesQueryParams = {
  label: "",
  scientific_name: "",
  common_name: "",
};

const initialState = {
  filterData: initialFilterData,
};
export const speciesSlice = createSlice({
  name: "species",
  initialState,
  reducers: {
    setFilterData: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        filterData: {
          ...state.filterData,
          ...payload,
        },
      };
    },
    resetFilterData: (state) => {
      return {
        ...state,
        filterData: initialFilterData,
      };
    },
  },
});

export const { setFilterData, resetFilterData } = speciesSlice.actions;

export const selectFaunaFilterData = (state: RootState) =>
  state.species.filterData;

export default speciesSlice.reducer;
