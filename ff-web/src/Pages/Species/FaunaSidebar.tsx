import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import FFTextInput from "../../Components/FFTextInput/FFTextInput";
import FFButton from "../../Components/FFButton/FFButton";

import { useDispatch } from "react-redux";
import {
  resetFilterData,
  selectFaunaFilterData,
  setFilterData,
} from "../../Redux/Slices/speciesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

type Props = {};

const FaunaSidebar = (props: Props) => {
  const dispatch = useDispatch();

  const filterValues = useSelector((state: RootState) =>
    selectFaunaFilterData(state)
  );

  const handleClearClick = () => {
    dispatch(resetFilterData());
  };

  // const handleApplyClick = () => {
  //   dispatch(setFilterData(editData));
  // };

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        display: { xs: "none", lg: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 400,
        },
      }}
      open
    >
      <Toolbar />
      <Box p={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">Filter</Typography>
          <FFButton name="Clear" color="secondary" onClick={handleClearClick} />
        </Box>

        <Box my={3}>
          <FFTextInput
            formLabel="Label"
            sx={{ mb: 2 }}
            placeholder="Enter label"
            value={filterValues.label}
            onChange={(e) =>
              dispatch(
                setFilterData({
                  ...filterValues,
                  label: e.target.value,
                })
              )
            }
          />
          <FFTextInput
            formLabel="Scientific name"
            sx={{ mb: 2 }}
            placeholder="Enter scientific name"
            value={filterValues.scientific_name}
            onChange={(e) =>
              dispatch(
                setFilterData({
                  ...filterValues,
                  scientific_name: e.target.value,
                })
              )
            }
          />
          <FFTextInput
            formLabel="Common name"
            sx={{ mb: 2 }}
            placeholder="Enter common name"
            value={filterValues.common_name}
            onChange={(e) =>
              dispatch(
                setFilterData({
                  ...filterValues,
                  common_name: e.target.value,
                })
              )
            }
          />
        </Box>
        {/* <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6"></Typography>
          <FFButton name="Apply" onClick={handleApplyClick} />
        </Box> */}
      </Box>
    </Drawer>
  );
};

export default FaunaSidebar;
