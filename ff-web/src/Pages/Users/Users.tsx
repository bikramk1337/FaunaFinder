import React from "react";
import { FFTopNav } from "../../Components/Navigation";
import { userRoutes } from "../../Routes";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

type Props = {};

const Users = (props: Props) => {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Users
      </Typography>
      <FFTopNav navList={userRoutes} />
      <Outlet />
    </Box>
  );
};

export default Users;
