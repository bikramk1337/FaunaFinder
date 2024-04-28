import React from "react";
import { FFTopNav } from "../../Components/Navigation";
import { userTabRoutes } from "../../Routes";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";

type Props = {};

const Users = (props: Props) => {
  return (
    <Box>
      <UserHeader />
      <Outlet />
    </Box>
  );
};

export default Users;
