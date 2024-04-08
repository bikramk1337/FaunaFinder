import React from "react";
import { FFTopNav } from "../../Components/Navigation";
import { userTabRoutes } from "../../Routes";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";

type Props = {};

const Users = (props: Props) => {
  const location = useLocation();

  return (
    <Box>
      <UserHeader />

      {userTabRoutes.find((item) => item.path === location.pathname) && (
        <FFTopNav navList={userTabRoutes} />
      )}

      <Outlet />
    </Box>
  );
};

export default Users;
